import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, ScrollView, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

async function getItem(key) {
  return await SecureStore.getItemAsync(key);
}

const Item = ({ title, picture, navigation, postID }) => (
  <Pressable onPress={() => navigation.navigate('PostDetails', { postID: postID })}>
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={{ uri: 'http://critterhunt.herokuapp.com/image/' + picture }}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  </Pressable>
);

export default function Profile({ route, navigation }) {
  const [userId, setUserId] = useState('');
  const [dateJoined, setDateJoined] = useState('');
  const [rank, setRank] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [numPosts, setNumPosts] = useState(0);
  const [username, setUsername] = useState('');

  const doLogout = async () => {
    await SecureStore.deleteItemAsync('userData');
    await SecureStore.deleteItemAsync('userId');
    navigation.navigate('Login');
  }

  const fetchData = async () => {
    const userId = await getItem('userId');
    setUserId(userId);
    const response = await fetch(`http://critterhunt.herokuapp.com/api/datejoined/${userId}`);
    const data = await response.json();
    setDateJoined(data.dateJoined);
    getUsername(userId);
  };

  const getUsername = async (userId) => {
    const response = await fetch(`http://critterhunt.herokuapp.com/api/getUsername/${userId}`);
    const jsonData = await response.json();
    setUsername(jsonData.username);
  }

  // Fetch user's posts
  const fetchUserPosts = async () => {
    const userId = await getItem('userId');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search: "", jwtToken: "", userId: userId }),
    };

    try {
      const response = await fetch('http://critterhunt.herokuapp.com/api/searchposts', requestOptions);
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        const filteredPosts = data._ret.filter(post => post.author === userId);
        setUserPosts(filteredPosts);
      }
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchUserPosts();
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons name="log-out-outline" size={24} color="red" onPress={doLogout} />
      ),
      headerRight: () => (
        <Ionicons name="refresh-outline" size={24} color="green" onPress={fetchUserPosts} />
      ),
    })
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
        const user = data.find(user => user._id === userId);
        const userRank = data.findIndex(user => user._id === userId) + 1;
        setRank(userRank);
        setNumPosts(user.numPosts);
      } catch (error) {
        console.error('Error fetching rank:', error);
      }
    };
    fetchRank();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        <Image
          style={styles.profileImage}
          source={require('mobile/assets/rickL.jpg')}
        />
        <Text style={styles.text}>{"\n"}Hunter name: {username}</Text>
        <Text style={styles.text}>{"\n"}Number of critters caught: {numPosts}</Text>
        <Text style={styles.text}>
          {"\n"}Critter Hunter since: {dateJoined ? formatDate(dateJoined) : ''}
        </Text>
        {rank && <Text style={styles.text}>{"\n"}Current rank: {rank}</Text>}
      </View>

      <Text style={styles.headerText}>{"\n"}Your Critters:</Text>
      <SafeAreaView style={styles.postsContainer}>
        <FlatList
          style={styles.postList}
          data={userPosts}
          renderItem={({ item }) => (
            <Item
              title={item.crittername}
              picture={item.picture}
              navigation={navigation}
              postID={item._id}
            />
          )}
          keyExtractor={item => item._id}
          numColumns={2}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  postsContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#128c4b',
    width: '100%',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 155,
    borderRadius: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    width: 145,
    height: 145,
  },
  profileContent: {
    alignItems: 'center',
  },
});


