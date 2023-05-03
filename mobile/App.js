import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import CameraScreen from './screens/CameraScreen';
import AddPost from './screens/AddPost';
import Profile from './screens/ProfileScreen';
import ForgotPass from './screens/ForgotPass';
import ResetPass from './screens/ResetPass';
import PostFeed from './screens/PostFeed';
import PostDetails from './screens/PostDetails';
import Map from './screens/Map';
import Leaderboard from './screens/Leaderboard';
import VerifyEmail from './screens/VerifyEmail';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />

        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="ResetPass" component={ResetPass} />

        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />

      </Stack.Navigator>
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
