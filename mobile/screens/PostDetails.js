import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import LikeButton from './cameraComponents/LikeButton';

export default function PostDetails({ navigation }) {

    const route = useRoute();
    const { postID } = route.params;
    const [post, setPost] = useState(null);
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postsId: postID, jwtToken: "" }) // jwtToken left blajnk for now
    };

    const getPost = async () => {
        try {
            await fetch('http://critterhunt.herokuapp.com/api/getpost', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            if (data.message) {
                                Alert.alert("Error", data.message);
                            }
                            else {
                                setPost(data);
                            }
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }

    const getUsername = async () => {
        const response = await fetch(`http://critterhunt.herokuapp.com/api/getUsername/${post.author}`);
        const jsonData = await response.json();
        setUsername(jsonData.username);

        // get address from coords
        let addr = await Location.reverseGeocodeAsync({ latitude: parseFloat(post.location[0]), longitude: parseFloat(post.location[1]) });
        setAddress(addr[0].name + ", " + addr[0].city + " ");
    }

    useEffect(() => {
        { post ? getUsername() : getPost() }
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => (console.log("hi"))} title="Delete" color={'#ff0000'} />
            ),
        })
    }, [navigation, post]);


    return (
        <View style={styles.container}>
            {post ?
                <>
                    <View style={styles.top}>
                        <Image
                            style={styles.img}
                            source={{ uri: 'http://critterhunt.herokuapp.com/image/' + post.picture }}
                        />
                    </View>
                    <ScrollView style={styles.bottom}>
                        <Text style={styles.critterName}>{post.crittername}</Text>
                        <Text style={styles.author}>{username}</Text>
                        <LikeButton icon={'star'} title={`Likes: ${post.likes}`} color={'#fff'} round={true} />
                        <Text style={styles.address}>{address}</Text>
                    </ScrollView>
                </>
                : <View><Text>Getting post...</Text></View>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#128c4b',
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        backgroundColor: '#fff'
    },
    img: {
        height: 300,
        width: 300
    },
    critterName: {
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: "underline",
        fontWeight: 'bold'
    },
    author: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 6
    },
    address: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 6
    }
});