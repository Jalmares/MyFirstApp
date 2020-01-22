import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import {login, register} from "../hooks/APIHooks";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";

const Login = (props) => { // props is needed for navigation
    const {handleUsernameChange, handlePasswordChange, handleEmailChange, handleFullnameChange, inputs} = useSignUpForm();
    const signInAsync = async () => {
        try {
            const user = await login(inputs);
            console.log('Login', user);
            await AsyncStorage.setItem('userToken', user.token);
            await AsyncStorage.setItem('user', JSON.stringify(user.user));
            props.navigation.navigate('App');
        } catch (e) {
            console.log(e.message);
        }
    };

    const registerAsync = async () => {
        try {
            const result = await register(inputs);
            console.log('Register', result);
            if (!result.error) {
                signInAsync();
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Login form */}
            <View style={styles.form}>
                <Text>Login</Text>
                <FormTextInput
                    autoCapitalize='none'
                    placeholder='username'
                    onChangeText={handleUsernameChange}
                />

                <FormTextInput
                    autoCapitalize='none'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={handlePasswordChange}
                />
                <Button title="Sign in!" onPress={() => {
                    signInAsync();
                }}/>
            </View>
            {/* Register form */}

            <View style={styles.form}>
                <Text>Register</Text>
                <View>
                    <FormTextInput
                        autoCapitalize='none'
                        placeholder='username'
                        onChangeText={handleUsernameChange}
                    />
                    <FormTextInput
                        autoCapitalize='none'
                        placeholder='email'
                        onChangeText={handleEmailChange}
                    />
                    <FormTextInput
                        autoCapitalize='none'
                        placeholder='fullname'
                        onChangeText={handleFullnameChange}
                    />
                    <FormTextInput
                        autoCapitalize='none'
                        placeholder='password'
                        secureTextEntry={true}
                        onChangeText={handlePasswordChange}
                    />
                    <Button title="Register!" onPress={() => {
                        registerAsync()
                    }}/>
                </View>
            </View>
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

    form: {
        padding: 20,
    },
});

// proptypes here
Login.propTypes = {
    navigation: PropTypes.object,
};
export default Login;