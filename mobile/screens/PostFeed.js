import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function PostFeed({ navigation }) {
    const [results, setResults] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: "", jwtToken: "" })
    };

    const getPosts = async () => {
        try {
            await fetch('http://critterhunt.herokuapp.com/api/searchposts', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            if (data.error) {
                                Alert.alert("Error", data.error);
                            }
                            else {
                                let feedstring = "";
                                for (let i = 0; i < data._ret.length; i++) {
                                    feedstring += data._ret[i].crittername + "\n";
                                }
                                setResults(feedstring);
                            }
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <View style={styles.container}>
            <Text>{results}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})