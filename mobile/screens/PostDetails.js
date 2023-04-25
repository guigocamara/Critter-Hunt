import { StyleSheet, Text, View, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import LikeButton from './cameraComponents/LikeButton';

export default function PostDetails() {

    const route = useRoute();
    const { postID } = route.params;
    const [post, setPost] = useState(null);
    const [username, setUsername] = useState("");

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
    }

    useEffect(() => {
        { post ? getUsername() : getPost() }
    }, [post])


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
                        <Text style={styles.author}>Posted by: {username}</Text>
                        <LikeButton icon={'star'} title={`Likes: ${post.likes}`} color={'#fff'} round={true} />
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
    },
    author: {
        fontSize: 20,
        borderWidth: 1,
        paddingVertical: 6
    },
});