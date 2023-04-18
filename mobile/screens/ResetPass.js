import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';

const ResetPass = () => {
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://critterhunt.herokuapp.com/api/resetpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, password: newPassword })
      });

      const data = await response.json();
      // Handle success response
      Alert.alert('Success', data.message);
    } catch (error) {
      // Handle error response
      Alert.alert('Error', 'An error occurred while resetting the password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reset Token</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setResetToken}
        value={resetToken}
      />
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setNewPassword}
        value={newPassword}
        secureTextEntry
      />
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        onChangeText={setConfirmNewPassword}
        value={confirmNewPassword}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

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
});

export default ResetPass;