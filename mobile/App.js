import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import Login from './Screens/Login';

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

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <View style={styles.container}>

        <Button title="post" onPress={postExample} />

      </View>
    </NavigationContainer>

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
