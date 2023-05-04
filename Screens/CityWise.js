import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import Weather from "../Components/Weather";
import Search from "../Components/Search";

const API_KEY = '934b02b3c63309885d0d129353183c72';

function CityWise() {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Helsinki');
    }, [])

    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray' size={36} />
            </View>
        )
    } else if (weatherData === null) {
        return (
            <View style={styles.container}>
                <Search fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>Kaupunkia ei löytynyt, yritä uudelleen!</Text>
                <Image
                    source={require('../assets/sad.png')}
                    style={{ width: 200, height: 200, alignItems: 'center' }}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    primaryText: {
        margin: 20,
        fontSize: 28,
        justifyContent: 'center'
    }
});

export default CityWise;