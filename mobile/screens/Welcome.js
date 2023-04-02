import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function Welcome({ route, navigation }) {
    const { username } = route.params;

    return (
        <View style={styles.container}>
            <Text>Welcome, {username}</Text>
            <Button title="Log out" onPress={() => navigation.navigate('Login')} />
            <Button title="Go to camera" onPress={() => navigation.navigate('Camera')} />
            <StatusBar style="auto" />
        </View>
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