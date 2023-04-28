import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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

  const renderUsers = () => {
    return users.map((item, index) => (
      <View style={styles.userContainer} key={item._id}>
        {index === 0 ? (
          <Text style={[styles.rank, styles.gold]}>{index + 1}.</Text>
        ) : index === 1 ? (
          <Text style={[styles.rank, styles.silver]}>{index + 1}.</Text>
        ) : index === 2 ? (
          <Text style={[styles.rank, styles.bronze]}>{index + 1}.</Text>
        ) : (
          <Text style={styles.rank}>{index + 1}.</Text>
        )}
        <Text style={[styles.username, { fontWeight: 'bold' }]}>
          {item.username}
        </Text>
        <Text style={[styles.numPosts, { fontWeight: 'bold' }]}>
          {item.numPosts} posts
        </Text>
      </View>
    ));
  };

  return (
    <View style={[styles.container, { backgroundColor: '#128c4b' }]}>
      <Text style={[styles.title, { fontWeight: 'bold' }]}>Leaderboard</Text>
      {users.length > 0 ? (
        renderUsers()
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
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
    marginBottom: 20,
    color: 'white'
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
    color: 'white'
  },
  rank: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
  numPosts: {
    flex: 2,
    fontSize: 18,
    textAlign: 'right',
    color: 'white'
  },
  gold: {
    color: 'gold',
  },
  silver: {
    color: 'silver',
  },
  bronze: {
    color: '#cd7f32',
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  }
});

export default Leaderboard;
