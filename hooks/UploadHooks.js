import {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {fetchFormData, getAllMedia} from './APIHooks';

const useUploadForm = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleTitleChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                title: text,
            }));
    };

    const handleDescriptionChange = (text) => {
        setInputs((inputs) =>
            ({
                ...inputs,
                description: text,
            }));
    };

    const handleUpload = async (file, navigation, setMedia) => {
        const filename = file.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        // fix jpg mimetype
        if (type === 'image/jpg') {
            type = 'image/jpeg';
        }

        const fd = new FormData();
        fd.append('title', inputs.title);
        fd.append('description', inputs.description);
        fd.append('file', {uri: file.uri, name: filename, type});

        console.log('FD:', fd);

        try {
            const token = await AsyncStorage.getItem('userToken');


            const resp = await fetchFormData('media', fd, token);
            console.log('upl resp', resp);
            if (resp.message) {
                const data = getAllMedia();
                setMedia(data);
                setLoading(false);
                navigation.push('Home');
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return {
        handleTitleChange,
        handleDescriptionChange,
        handleUpload,
        inputs,
        errors,
        loading,
        setErrors,
        setInputs,
    };
};

export default useUploadForm;
