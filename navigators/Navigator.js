import React from 'react';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from "react-navigation";
import AuthLoading from "../views/AuthLoading";
import Login from "../views/Login";
import Home from '../views/Home';
import Profile from "../views/Profile";
import Single from "../views/Single";

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Home',
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Profile',
            },
        },
    },
    {
        initialRouteName: 'Home',
    }
);


const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: TabNavigator,
            navigationOptions: {
                headerMode: 'none', // this will hide the header
            },
        },
        Single: {
            screen: Single,
        },
        Logout: {
            screen: Login,
        },
    },
);

const Navigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: StackNavigator,
        Auth: Login,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default createAppContainer(Navigator);