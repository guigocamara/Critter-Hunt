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
    const [userId, setUserId] = useState('');
    const [location, setLocation] = useState(['28.219001', '-81.395626']);
    const [picture, setPicture] = useState(''); // store the actual image somehow
    const { image_uri } = route.params;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            crittername: postTitle,
            author: userId,
            likes: 0,
            comments: [],
            location: location,
            picture: "image"
        })
    };

    const doPost = async () => {
        try {
            await fetch('http://critterhunt.herokuapp.com/api/addpost', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            if (data.error) {
                                Alert.alert("Error", data.error);
                            }
                            else {
                                console.log("Successfully posted!");
                                navigation.navigate('Welcome');
                            }
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    const getUserId = async () => {
        let result = await SecureStore.getItemAsync('userId');
        if (result) {
            setUserId(result);
        } else {
            setUserId('');
        }
    }

    useEffect(() => {
        getUserId();
    }, [])

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
                    placeholder='Critter Name'
                    onChangeText={setPostTitle}
                    value={postTitle}
                />

                <Button title='Submit' onPress={() => doPost()} />

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
