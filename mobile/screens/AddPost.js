import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
    } else {
        alert('No values stored under that key.');
    }
}

async function deleteValueFor(key) {
    await SecureStore.deleteItemAsync(key);
}


export default function AddPost({ route, navigation }) {
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: postTitle, postDesc: postDesc })
    };

    const { image_uri } = route.params;

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View
                style={styles.top}
            >
                <Image
                    style={styles.img}
                    source={{ uri: image_uri }}
                />
            </View>
            <View style={styles.bottom}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Title'
                    onChangeText={setPostTitle}
                    value={postTitle}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Description'
                    onChangeText={setPostDesc}
                    value={postDesc}
                />
                <Button title='Submit' onPress={() => getValueFor("accessToken")} />
                <Button title='Clear' onPress={() => deleteValueFor("accessToken")} />

            </View>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 300,
        width: 300
    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
    },
});
// From CameraScreen, get the image that was taken.
// Have a text box for a title, a description, and a post button.
// When the post button is pressed, send a post request to the api.
// Cropped image on top, title, description, button center aligned and on the bottom.
// No image? Choose one from ur library or something
// title is required, description isn't
// What about critter ID?
// what about location?
