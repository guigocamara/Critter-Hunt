import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import CamButton from './cameraComponents/CamButton';

export default function CameraScreen({ navigation }) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    // get access to camera and image library
    // useEffect first thing that happens when user mounts component
    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch (e) {
                console.log(e);
            }
        }
    }

    if (hasCameraPermission === false) {
        return (
            <Text>No camera access</Text>
        )
    }

    return (
        <View style={styles.container}>
            {!image ?
                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flash}
                    ref={cameraRef}
                >
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: 30
                    }}>
                        <CamButton icon="camera" onPress={takePicture} color={'#06301A'} round={true} />
                    </View>

                </Camera>
                :
                <Image source={{ uri: image }} style={styles.camera} />
            }
            <View>
                {image ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 50
                    }}>
                        <CamButton title={"Retake"} icon="retweet" onPress={() => setImage(null)} color={'#06301A'} />
                        <CamButton title={"Post"} icon="check" onPress={() => navigation.navigate('AddPost', { image_uri: image })} color={'#06301A'} />
                    </View>
                    :
                    <View></View>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#128c4b',
        justifyContent: 'center',
        paddingBottom: 20
    },
    camera: {
        flex: 1,
        borderRadius: 20,
    }
})