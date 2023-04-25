import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function LikeButton({ title, onPress, icon, color, round }) {
    return (
        <TouchableOpacity onPress={onPress} style={round ? styles.roundButton1 : styles.button}>
            <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
            {title ?
                <Text style={styles.text}>{title}</Text> : null
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row', // icon to the left, text to the right
        alignItems: 'center',
        justifyContent: 'center'
    },
    roundButton1: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#128c4b',
        margin: 10,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        marginLeft: 10
    }
})