import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function AddPost({ route, navigation }) {
    const { image_uri } = route.params;

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: image_uri,
                }}
                style={styles.img}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
    img: {
        height: "60%",
        width: "100%"
    }
});
// From CameraScreen, get the image that was taken.
// Have a text box for a title, a description, and a post button.
// When the post button is pressed, send a post request to the api.
// Cropped image on top, title, description, button center aligned and on the bottom.
// No image? Choose one from ur library or something
// title is required, description isn't
// What about critter ID?
// what about location?
