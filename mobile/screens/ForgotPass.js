import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://critterhunt.herokuapp.com/api/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      // Handle success response
      navigation.navigate('ResetPass');
    } catch (error) {
      // Handle error response
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="Send Password Reset Token" onPress={handleResetPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});