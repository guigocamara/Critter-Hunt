import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function PostDetails() {

    const route = useRoute();
    const { postID } = route.params;
    const [post, setPost] = useState(null);

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


    useEffect(() => {
        getPost();
    }, [])


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
                    <ScrollView >
                        <Text style={styles.critterName}>{post.crittername}</Text>
                        <Text style={styles.author}>Posted by: {post.author}</Text>
                        <Text>Likes: {post.likes}</Text>
                        <Text>comments: {post.comments}</Text>
                    </ScrollView>
                </>
                : <View><Text>Getting post...</Text></View>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 300,
        width: 300
    },
    critterName: {
        fontSize: 30
    },
    author: {
        fontSize: 20
    }
});