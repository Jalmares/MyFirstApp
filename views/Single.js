import React, {useState, useEffect} from 'react';
import {
    Container,
    Content,
    Card,
    CardItem,
    Left,
    Body,
    H3,
    Icon,
    Text,
} from 'native-base';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import {Dimensions} from 'react-native';
import {mediaURL} from '../constants/urlConst';
import {getUser} from '../hooks/APIHooks';
import {Video} from 'expo-av';

const deviceHeight = Dimensions.get('window').height;

console.log('dh', deviceHeight);


const Single = (props) => {
    const {navigation} = props;
    const [owner, setOwner] = useState({});
    const file = navigation.state.params.file;

    const getOwner = async () => {
        const data = await getUser(file.user_id);
        setOwner(data);
    };
    useEffect(() => {
        getOwner();
    }, []);

    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        {file.media_type === 'image' &&
                        <AsyncImage
                            style={{
                                width: '100%',
                                height: deviceHeight / 2,
                            }}
                            spinnerColor='#777'
                            source={{uri: mediaURL + file.filename}}
                        />
                        }
                        {file.media_type === 'video' &&
                        <Video
                            source={{uri: mediaURL + file.filename}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"
                            shouldPlay
                            isLooping
                            useNativeControls
                            style={{width: '100%', height: deviceHeight / 2}}
                        />
                        }
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon name='image' />
                            <Body>
                                <H3>{file.title}</H3>
                                <Text>{file.description}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon name='person' />
                            <Body>
                                <Text>By {owner.username} ({owner.email})</Text>
                                {owner.full_name &&
                                <Text>{owner.full_name}</Text>
                                }
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
};

Single.propTypes = {
    navigation: PropTypes.object,
    file: PropTypes.object,
};

export default Single;