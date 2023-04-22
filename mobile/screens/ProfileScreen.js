import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function getItem(key) {
  return await SecureStore.getItemAsync(key);
}

export default function Profile({ route, navigation }) {
  const [userId, setUserId] = useState('');
  const [dateJoined, setDateJoined] = useState('');
  const [rank, setRank] = useState(null);

  const fetchData = async () => {
    const userId = await getItem('userId');
    setUserId(userId);
    const response = await fetch(`http://critterhunt.herokuapp.com/api/datejoined/${userId}`);
    const data = await response.json();
    setDateJoined(data.dateJoined);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchRank = async () => {
      const userId = await SecureStore.getItemAsync('userId');
      try {
        const response = await fetch('http://critterhunt.herokuapp.com/api/users/rank');
        const data = await response.json();
        const userRank = data.findIndex(user => user._id === userId) + 1;
        setRank(userRank);
      } catch (error) {
        console.error('Error fetching rank:', error);
      }
    };
    fetchRank();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={require('mobile/assets/kermit.jpg')} // Updated image file name
      />
      <Text style={styles.text}>{"\n"}Number of critters caught:</Text>
      <Text style={styles.text}>
        {"\n"}Critter Hunter since: {dateJoined ? formatDate(dateJoined) : ''}
      </Text>
      {rank && <Text style={styles.text}>{"\n"}Current rank: {rank}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#128c4b',
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

