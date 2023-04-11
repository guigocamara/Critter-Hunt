import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, FlatList, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

const Item = ({ title, navigation }) => (
    <Pressable onPress={() => Alert.alert(title)}>
        <View style={styles.item}>
            <Image
                style={styles.image}
                source={{ uri: 'https://media.discordapp.net/attachments/1094306153313353948/1095103189822480524/image.png' }}
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
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={results}
                renderItem={({ item }) => <Item title={item.crittername} />}
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