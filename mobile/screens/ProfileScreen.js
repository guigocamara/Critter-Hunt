import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Profile({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require('mobile/assets/kermit.jpg')} // Updated image file name
      />
      <Text style={styles.text}>{"\n"}Number of critters caught:</Text>
      <Text style={styles.text}>{"\n"}Critter Hunter since:</Text>
      <Text style={styles.text}>{"\n"}Current rank:</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 70, 
    },
    imageContainer: {
      marginTop: 0,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
    textContainer: {
      marginTop: 10,
    },
    text: {
      fontSize: 15,
      color: 'white',
      fontWeight: 'bold',
    },
  });
