import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';


export default function AddPost({ route, navigation }) {
    const [postTitle, setPostTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [location, setLocation] = useState(null);
    const [locationArray, setLocationArray] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null); // location error message
    const { image_uri } = route.params;

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            crittername: postTitle,
            author: userId,
            likes: 0,
            comments: [],
            location: locationArray,
            picture: image_uri.replace(/^.*[\\\/]/, '')
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
                            }
                        });
                })
            const response = await FileSystem.uploadAsync(`http://critterhunt.herokuapp.com/upload`, image_uri, {
                fieldName: 'file',
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            });
            console.log(JSON.stringify(response, null, 4));
            navigation.navigate('Camera');
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
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            let locationString = [];
            locationString.push(location.coords.latitude + "");
            locationString.push(location.coords.longitude + "");
            setLocationArray(locationString);
        })();
    }, [])

    let text = "Getting location...";
    if (errorMsg) {
        text = errorMsg;
    }
    else if (location) {
        text = "Location retrieved!";
    }

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
                <Text style={styles.loc}>{text}</Text>

                <Pressable style={styles.submit} onPress={() => doPost()}><Text style={{ color: '#128c4b', fontSize: 18 }}>Submit</Text></Pressable>

            </View>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#128c4b',
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
        width: 300,
        borderColor: '#fff',
        borderWidth: 4
    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    loc: {
        color: '#fff',
        fontWeight: 'bold'
    },
    submit: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        margin: 10
    }
});
