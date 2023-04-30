import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
            <Tab.Screen name="MapStack" component={MapStack} options={{ headerShown: false, title: "Map" }} />
            <Tab.Screen name="CameraStack" component={CameraStack} options={{ headerShown: false, title: "Camera" }} />
            <Tab.Screen name="Feed" component={PostStack} options={{ title: 'Feed', headerShown: false }} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Profile', headerShown: false }} />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();

function CameraStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddPost" component={AddPost} options={{ title: 'Post' }} />
        </Stack.Navigator>
    );
}

function PostStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PostFeed" component={PostFeed} options={{ title: 'Feed' }} />
            <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Details' }} />
        </Stack.Navigator>
    );
}

function MapStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Details' }} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Details' }} />
        </Stack.Navigator>
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