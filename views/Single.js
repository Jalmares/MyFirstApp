import React from 'react';
import {Text, Image, Dimensions, View} from 'react-native';
import {Body, Container, Left, Icon} from 'native-base';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
    const {navigation} = props;
    console.log(navigation.getParam('filename', 'no picture'));
    return (
        <Container style={{padding: 15, paddingTop: 30,}}>
            <Body>
            <Image style={{
                width: Dimensions.get("window").width * 0.9,
                height: Dimensions.get("window").height * 0.4,
            }}
                   source={{uri: mediaURL + navigation.getParam('filename', 'no picture')}}/>

                <Text style={{fontSize: 20, fontWeight: "bold", color: "orange", paddingTop: 30,}}>
                    {navigation.getParam('title', 'no title')}
                </Text>

                <Text style={{fontSize: 20}}>
                    {navigation.getParam('description', 'no description')}
                </Text>

            </Body>
        </Container>
    );
};


export default Single;