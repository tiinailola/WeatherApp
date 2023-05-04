import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Button, Text, StatusBar, SafeAreaView, Image } from "react-native";
import 'firebase/compat/storage';
import * as ImagePicker from 'expo-image-picker';
import { getApps, initializeApp } from 'firebase/app';
import firebase from "firebase/compat/app";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
import { Alert } from "react-native";
import * as Font from 'expo-font';

  const firebaseConfig = {
    apiKey: "AIzaSyCWpRbXDxLM_d8PBHrWh2EXhSnrLLDkCx8",
    authDomain: "weather-94d1b.firebaseapp.com",
    databaseURL: "https://weather-94d1b-default-rtdb.firebaseio.com",
    projectId: "weather-94d1b",
    storageBucket: "weather-94d1b.appspot.com",
    messagingSenderId: "288468601775",
    appId: "1:288468601775:web:125afd9604732105803d5a",
    measurementId: "G-F1X5XT80PX"
  };
  
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export default function Camerafunction() {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

    let cameraRef = useRef();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted.</Text>
    }

    const takeImage = async () => {
        let takenImage = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [4,3],
        });

        const imgsource = {uri: takenImage.assets[0].uri}
        console.log(imgsource)
        setImage(imgsource)
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });

        const source = {uri: result.assets[0].uri}
        console.log(source)
        setImage(source)
    };

    if (image) {
    const shareImage = () => {
        shareAsync(image.uri).then(() => {
            setImage(undefined);
        });
    };

    const uploadImage = async () => {
        setUploading(true)

        const response = await fetch(image.uri)
        const blob = await response.blob()

        const uriSegments = image.uri.split('/');
        const filename = uriSegments[uriSegments.length - 1];

        var ref = firebase.storage().ref().child(`Images/${filename}`);

        const metadata = { contentType: 'image/jpeg' };

        try {
            await ref.put(blob, metadata);
        } catch (e) {
            console.log(e)
        }

        setUploading(false)
        Alert.alert('Photo uploaded!');
        setImage(null);
    };

    return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.text}>Wow!</Text>

        <View style={styles.buttonContainer}>
            <Button title='Save image' onPress={uploadImage} />
        </View>

        <View style={styles.buttonContainer}>
            <Button title='Share' onPress={shareImage} />
        </View>

            <StatusBar style='auto' />

        <View style={styles.imageContainer}>
         {image && <Image source={{uri: image.uri}} style={{width: 300, height: 300}}/>}

         <View style={styles.buttonContainer}>
            <Button title='Discard' onPress={() => setImage(undefined)} />
        </View>

        </View>
    </SafeAreaView>
      
    );
    }
    
    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <Button title='Take pic' onPress={takeImage} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title='Pick an image' onPress={pickImage} />
            </View>

            <StatusBar style='auto' />
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c8e6c9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      backgroundColor: '#fff',
      alignSelf: 'center',
      borderRadius: 10,
      margin: 10,
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    },
    text: {
        fontSize: 36,
        fontWeight: 'regular',
        textAlign: 'center',
    
    }
  });