import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default function Search({ fetchWeatherData }) {

    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <EvilIcons name='search' style={styles.iconcontainer}
            onPress={() => fetchWeatherData(cityName)} />

            <TextInput style={styles.textcontainer}
                placeholder="Search for city..."
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 15,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    },
    textcontainer: {
        fontSize: 25
    },
    iconcontainer: {
        color: 'black',
        justifyContent: 'flex-end',
        fontSize: 35,
    }
})
