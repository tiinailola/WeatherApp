import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, ScrollView, FlatList, Alert, RefreshControl, Dimensions } from "react-native";
import * as Location from 'expo-location';

const openWeatherKey = `934b02b3c63309885d0d129353183c72`;
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;

function Current() {
    const [weather, setWeather] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadWeather = async () => {
        setRefreshing(true);

        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Ei lupaa sijainnin käyttöön.');
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
        const data = await response.json();

        if (!response.ok) {
            Alert.alert(`Virhe tietojen hakemisessa: ${data.message}`);
        } else {
            setWeather(data);
        }
        setRefreshing(false);
    }

    useEffect(() => {
        loadWeather();
    }, [])

    if (!weather) {
        return <SafeAreaView style={styles.loading}>
            <ActivityIndicator size='large' />
        </SafeAreaView>;
    }

    const current = weather.current.weather[0];

    return (
        <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            onRefresh={() => {  loadWeather() }} 
            refreshing={refreshing}
          />}
      >
        <Text style={styles.title}>Current weather</Text>
        <Text style={{alignItems:'center', textAlign:'center', fontSize: 20}}>in your location</Text>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>{Math.round(weather.current.temp)}°C</Text>
        </View>
        <Text style={styles.currentDescription}>{current.description} right now</Text>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Feels like</Text>
            <Image 
              source={require('../assets/temperature.png')}
              style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
            />  
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{weather.current.feels_like}°C</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Humidity</Text>
            <Image 
              source={require('../assets/humidity.png')}
              style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
            />
            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{weather.current.humidity}% </Text>
          </View>
        </View>
          
        <View>
          <Text style={styles.subtitle}>Hourly forecast</Text>
          <FlatList horizontal
            data={weather.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              return <View style={styles.hour}>
                <Text>{dt.toLocaleTimeString().replace(/:\d+ /)}</Text> 
                <Text>{Math.round(hour.item.temp)}°C</Text>
                <Image
                  style={styles.smallIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                  }}
                />
                <Text>{weather.description}</Text>
              </View>
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
      width: '100%',
      textAlign: 'center',
      fontSize: 36,
      fontWeight: 'regular',
      color: '#212121',
    },
    subtitle: {
      fontSize: 24,
      marginVertical: 12,
      marginLeft:7,
      color: '#212121',
    },
    container: {
      flex: 1,
      backgroundColor: '#b2ebf2',
      
    },
    loading: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    current: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
    },
    currentTemp: {
      fontSize: 32,
      fontWeight: '500',
      textAlign: 'center',
    },  
    currentDescription: {
      width: '100%',
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 24,
      marginBottom: 5,
    },
    hour: {
      padding: 6,
      alignItems: 'center',
    },
    largeIcon: {
      width: 300,
      height: 250,
    },
    smallIcon: {
      width: 100,
      height: 100,
    },
    extraInfo: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-between',
      padding: 10
    },
    info: {
      width: Dimensions.get('screen').width/2.5,
      backgroundColor: 'rgba(0,0,0, 0.5)',
      padding: 10,
      borderRadius: 15,
      justifyContent: 'center',
    },
  });

export default Current;