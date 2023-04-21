import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch('http://critterhunt.herokuapp.com/api/users/rank');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.rank}>#{item.rank}</Text>
      <Text style={styles.numPosts}>{item.numPosts} posts</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    flex: 2,
    fontSize: 18,
  },
  rank: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  numPosts: {
    flex: 2,
    fontSize: 18,
    textAlign: 'right',
  },
});

export default Leaderboard;
