import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Alert, SafeAreaView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
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
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});