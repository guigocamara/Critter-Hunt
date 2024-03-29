import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, FlatList, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

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

export default function PostFeed({ navigation }) {
    const [results, setResults] = useState('');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search: "", jwtToken: "" })
    };

    const getPosts = async () => {
        try {
            await fetch('http://critterhunt.herokuapp.com/api/searchposts', requestOptions)
                .then(response => {
                    response.json()
                        .then(data => {
                            if (data.error) {
                                Alert.alert("Error", data.error);
                            }
                            else {
                                setResults(data._ret);
                            }
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }



    useEffect(() => {
        getPosts();
        navigation.setOptions({
            headerRight: () => (
                <Ionicons name="refresh" size={24} color="green" onPress={getPosts} />
            ),
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={results}
                renderItem={({ item }) => <Item title={item.crittername} picture={item.picture} navigation={navigation} postID={item._id} />}
                keyExtractor={item => item._id}
                numColumns={2}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#14AE5C'
    },
    item: {
        backgroundColor: '#ffffff',
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 155,
        borderRadius: 10
    },
    title: {
        fontSize: 12,
        fontWeight: "bold"
    },
    image: {
        width: 145,
        height: 145
    }
});