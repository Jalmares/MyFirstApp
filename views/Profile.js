import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';

const Profile = (props) => {
    const [user, setUser] = useState({});
    const userToState = async () => {
      const userFromStorage = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userFromStorage));
    };

    useEffect(() => {
        userToState();
    }, []);

    const signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text>Username: {user.username}</Text>
            <Text>Fullname: {user.full_name}</Text>
            <Text>Email: {user.email}</Text>
            <Button title="Logout!" onPress={signOutAsync} />
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

Profile.propTypes = {
    navigation: PropTypes.object,
};

export default Profile;