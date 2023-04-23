import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { SearchBar } from 'react-native-elements';

export default function Map() {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

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

  const filteredPosts = posts.filter((post) =>
    post.crittername.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = async (text) => {
    setSearchText(text);
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: text, jwtToken: "" }),
      };
      const response = await fetch('http://critterhunt.herokuapp.com/api/searchposts', requestOptions);
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setPosts(data._ret);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  return (
    <>
      <SearchBar
        placeholder="Search for a critter"
        value={searchText}
        onChangeText={handleSearch}
        platform="ios"
      />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} // Use the Google Maps provider
        initialRegion={{
          latitude: 28.6024,
          longitude: -81.2001,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filteredPosts.map((post) => (
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
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

