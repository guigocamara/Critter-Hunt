import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';

export default function VerifyEmail({ navigation, route }) {
    const [code, setCode] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');

    const verifyCode = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: route.params.email, verificationCode: parseInt(code) })
            };
            await fetch('http://critterhunt.herokuapp.com/api/verifyEmail', requestOptions)
                .then(response => {
                    if (response.ok) {
                        setVerificationMessage('Your email was successfully verified!');
                    } else {
                        Alert.alert('Error', 'Invalid verification code');
                    }
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Verification Code</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
                keyboardType="numeric"
            />
            <Button title="Verify" onPress={verifyCode} />
            {verificationMessage ? <Text style={styles.message}>{verificationMessage}</Text> : null}
            {verificationMessage ? <Button title="Back to Login" onPress={goToLogin} /> : null}
            <StatusBar style="auto" />
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
    message: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})

