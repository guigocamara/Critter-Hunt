import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';

import Login from './Login';
import CameraScreen from './CameraScreen';
import AddPost from './AddPost';
import Profile from './ProfileScreen';
import PostFeed from './PostFeed';
import PostDetails from './PostDetails';
import Map from './Map';
import Leaderboard from './Leaderboard';

export default function Welcome({ navigation }) {
    const [username, setUsername] = useState('');
    const Tab = createBottomTabNavigator();

    const getUsername = async () => {
        let result = await SecureStore.getItemAsync('userData');
        if (result) {
            let userData = JSON.parse(result);
            setUsername(userData.username);
        } else {
            setUsername('');
        }
    }

    const doLogout = async () => {
        await SecureStore.deleteItemAsync('userData');
        await SecureStore.deleteItemAsync('userId');
        navigation.navigate('Login');
    }

    // when this screen renders, get the username from secure store and display
    useEffect(() => {
        getUsername();
    }, [])

    return (
        <Tab.Navigator>
            <Tab.Screen name="Leaderboard" component={Leaderboard} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Feed" component={PostFeed} options={{ title: 'Feed' }} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});