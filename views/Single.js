import React from 'react';
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

const deviceHeight = Dimensions.get('window').height;

console.log('dh', deviceHeight);


const Single = (props) => {
    const {navigation} = props;
    console.log('Singel navi', navigation.state);
    const file = navigation.state.params.file;
    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        <AsyncImage
                            style={{
                                width: '100%',
                                height: deviceHeight / 2,
                            }}
                            spinnerColor='#777'
                            source={{uri: mediaURL + file.filename}}
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon name='image'/>
                            <Body>
                                <H3>{file.title}</H3>
                                <Text>{file.description}</Text>
                                <Text>By {file.user_id}</Text>
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
