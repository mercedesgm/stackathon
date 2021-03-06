import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import PostScreen from '../screens/PostScreen'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen'
import ProfileScreen from '../screens/ProfileScreen'

export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
    Post: {
      screen: PostScreen
    },
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    },
    Add: {
      screen: AddScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  })
);
