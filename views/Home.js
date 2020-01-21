import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import List from '../components/List';
import {MediaProvider} from "../contexts/MediaContext";

const Home = (props) => {
    const {navigation} = props;
    return (
        <View>
            <Image
                style={main.picture}
                source={require("../img/sloth.jpg")}/>
            <Text style={main.imgText}>Lazy Sloth</Text>
            <MediaProvider>
                <List navigation={navigation}></List>
            </MediaProvider>
        </View>
    );
};

const main = StyleSheet.create({
    picture: {
        width: Dimensions.get("window").width * 1,
        height: Dimensions.get("window").height * 0.4,
        marginBottom: 5,
    },
    imgText: {
        position: "absolute",
        fontSize: 25,
        left: 10,
        top: 80,
        backgroundColor: "#8b8b8b",
    }

});

export default Home;