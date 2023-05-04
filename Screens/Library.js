import Reac, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";
import { getStorage, ref, listAll, deleteObject } from 'firebase/storage';
import { getApps, initializeApp } from 'firebase/app';
import Current from "./Current";
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
  
if (!getApps().length) {
   initializeApp(firebaseConfig);
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

    const deletePic = async () => {
        deleteObject(imageRef).then(() => {
            Alert.alert('Photo deleted');
        }).catch((error) => {
            Alert.alert('Oh no, error!');
        });
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={() => { Library }}
                    refreshing={refreshing}
            />}
            >
            <View style={styles.container}>
                <TouchableOpacity onLongPress={deletePic}>
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
        justifyContent: 'center',
        flexDirection: 'row',
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    image: {
        marginTop: 30,
        width: 250,
        height: 200,
        margin: 5,
        resizeMode: "center",
        flexDirection: 'column',
        justifyContent: 'center'
    }
});