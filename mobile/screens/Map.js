import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ search: "", jwtToken: "" }),
        };
        const response = await fetch('http://critterhunt.herokuapp.com/api/searchposts', requestOptions);
        const data = await response.json();
        if (data.error) {
          console.error(data.error);
        } else {
          setPosts(data._ret);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE} // Use the Google Maps provider
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {posts.map((post) => (
        <Marker
          key={post._id}
          coordinate={{
            latitude: parseFloat(post.location[0]),
            longitude: parseFloat(post.location[1]),
          }}
        >
          <Callout>
            <Text>{post.crittername}</Text>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
