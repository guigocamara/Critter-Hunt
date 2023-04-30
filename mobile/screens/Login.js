import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Background from '../components/Background'
import Button from '../components/Button'
import { theme } from '../core/theme'

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password })
    };

    const doLogin = async () => {
        try {
            await fetch('http://critterhunt.herokuapp.com/api/login', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            if (data.error) {
                                Alert.alert("Error", data.error);
                            }
                            else {
                                // decode accessToken into an object with user information 
                                let userData = jwt_decode(data.accessToken);
                                // convert the information to a string to be able to save it
                                userData = JSON.stringify(userData);
                                // save the string to secure local storage
                                save("userData", userData);
                                // userId is not sent in token
                                save("userId", data.userId);
                                navigation.navigate('Welcome');
                            }
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    // Possible auto login
    /*
    useEffect(() => {
        getUserData();
        if (isLoggedIn) {
            navigation.navigate("Welcome");
        }
    }, [])
    */
    return (
        <Background>
            <Logo />
            <Header>Get ready to Critter Hunt!</Header>
            <TextInput
                label="Username"
                returnKeyType="next"
                onChangeText={setUsername}
                value={username}
                autoCapitalize="none"
            />
            <TextInput
                label="Password"
                returnKeyType="done"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <View style={styles.forgotPassword}>
            <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPass')}
            >
            <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={doLogin}>
            Login
            </Button>
            <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
            </View>
            <StatusBar style="auto" /> 
        </Background>
    );
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
      },
      row: {
        flexDirection: 'row',
        marginTop: 4,
      },
      forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
      },
      link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
      },
})