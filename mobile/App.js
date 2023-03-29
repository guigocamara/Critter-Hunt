import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'critter_hunter', password: 'spacecontacts' })
  };

  const postExample = async () => {
    try {
      await fetch('http://critterhunt.herokuapp.com/api/login', requestOptions)
        .then(response => {
          response.json()
            .then(data => {
              Alert.alert("Post created at : ",
                data.accessToken);
            });
        })
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="post" onPress={postExample} />
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
