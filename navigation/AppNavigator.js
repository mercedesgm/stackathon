import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import PostScreen from '../screens/PostScreen'
import LoginScreen from '../screens/LoginScreen'

export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
    Post: {
      screen: PostScreen
    },
    Login: {
      screen: LoginScreen
    }
  })
);
