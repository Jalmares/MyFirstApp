import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = (props) => {
    const { navigation } = props;
    console.log(navigation.getParam('filename', 'no picture'));
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: "bold", color: "orange"}}>
                {navigation.getParam('title', 'no title')}
            </Text>

            <Text style={{fontSize: 20}}>
                {navigation.getParam('description', 'no description')}
            </Text>

            <Image style={{
                flex: 1,
                width: '100%',
                height: null,
            }}
                   source={{uri: mediaURL + navigation.getParam('filename', 'no picture')}}/>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
});

export default Single;