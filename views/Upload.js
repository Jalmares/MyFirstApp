import React, {useState, useEffect} from 'react';
import {
    Content,
    Form,
    Button,
    Text,
    Item,
    Label,
} from 'native-base';
import {
    AsyncStorage,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {fetchGET, fetchPOST} from '../hooks/APIHooks';
import FormTextInput from '../components/FormTextInput';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import useUploadForm from "../hooks/UploadHooks";


const Upload = (props) => {
    const [image, setImage] = useState(null);

    const {
        handleTitleChange,
        handleDescriptionChange,
        handleUpload,
        validateForm,
        resetText,
        errors,
        inputs,
    } = useUploadForm();

    const validationProperties = {
        title: {title: inputs.title}
    };

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const resetForms = () => {
        setImage(null);
        resetText("title", "");
        resetText("description", "");
    };

    useEffect(() => {
        getPermissionAsync();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.3,
            exif: true,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result);
        }
    };
    console.log(errors.title);
    return (
        <Content>
            <Form>
                <Item>
                    <FormTextInput
                        placeholder='Title'
                        onChangeText={handleTitleChange}
                        onEndEditing={() => {
                            validateForm(validationProperties.title)
                        }}
                        error={errors.title}
                        />
                </Item>
                <Item>
                    <FormTextInput
                        placeholder='Description'
                        onChangeText={handleDescriptionChange}
                        value={inputs.description}
                    />
                </Item>
                    {image &&
                    <Image source={{ uri: image.uri }} style={{ width: '100%', height: 300 }} />}
                <Button full onPress={pickImage}>
                    <Text>Select file</Text>
                </Button>
                <Button dark full onPress={resetForms}>
                    <Text>Reset form</Text>
                </Button>
                <Button full onPress={() => {
                    handleUpload(image, props.navigation);
                    props.navigation.replace('Home');
                }}>
                    <Text>Upload</Text>
                </Button>
            </Form>
        </Content>
    );
};

// proptypes here
Upload.propTypes = {
    navigation: PropTypes.object,
};

export default Upload;
