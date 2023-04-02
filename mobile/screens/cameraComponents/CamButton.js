import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function CamButton({ title, onPress, icon, color, round }) {
    return (
        <TouchableOpacity onPress={onPress} style={round ? styles.roundButton1 : styles.button}>
            <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
            <Text style={styles.text}>{title}</Text>
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
        width: 70,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#14AE5C',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#06301A',
        marginLeft: 10
    }
})