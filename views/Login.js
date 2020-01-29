import React from 'react';
import {Form, Label, Button, Body, Item} from 'native-base';
import {
    AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import {login, register} from "../hooks/APIHooks";
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";

const Login = (props) => { // props is needed for navigation
    const {
        handleUsernameChange,
        handlePasswordChange,
        handleEmailChange,
        handleFullnameChange,
        inputs
    } = useSignUpForm();
    const signInAsync = async () => {
        try {
            const user = await login(inputs);
            console.log('Login', user);
            await AsyncStorage.setItem('userToken', user.token);
            console.log(user.token);
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
        <Form style={{paddingTop: 40,}}>
            {/* Login form */}
            <Form>
                <Item style={{borderColor: "transparent"}}>
                    <Body>
                        <Label style={{fontWeight: "bold", fontSize: 25}}>Login</Label>
                    </Body>
                </Item>
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
                <Button onPress={signInAsync}>
                    <Body>
                        <Label style={{color: "white"}}>Sign in!</Label>
                    </Body>
                </Button>
            </Form>
            {/* Register form */}

            <Form>
                <Item style={{borderColor: "transparent"}}>
                    <Body>
                        <Label style={{fontWeight: "bold", fontSize: 25}}>Register</Label>
                    </Body>
                </Item>
                <Form>
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
                    <Button onPress={registerAsync}>
                        <Body>
                            <Label style={{color: "white"}}>Register!</Label>
                        </Body>
                    </Button>
                </Form>
            </Form>
        </Form>
    );
};


// proptypes here
Login.propTypes = {
    navigation: PropTypes.object,
};
export default Login;