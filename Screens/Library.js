import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { RefreshControl } from "react-native";

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();
const imageRef = storage.ref('Images');

export default function Library({ refreshing }) {

    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        imageRef.listAll()
            .then((result) => {
                const promises = result.items.map((imageRef) => imageRef.getDownloadURL());
                Promise.all(promises).then(setImageUrls);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={() => { Library }}
                    refreshing={refreshing}
                />}
            >
            <View style={styles.container}>
                <TouchableOpacity>
                {imageUrls.map((url, index) => (
                <Image key={index} source={{ uri: url }} style={styles.image} />
            ))}
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c8e6c9',
        alignItems: 'center',
    },
    image: {
        marginTop: 30,
        width: 250,
        height: 250,
        margin: 1
    }
});