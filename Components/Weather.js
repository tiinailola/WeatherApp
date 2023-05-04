import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import Search from "./Search";
import CityWise from "../Screens/CityWise";

export default function Weather({ weatherData, fetchWeatherData }) {

    const { weather,
            visibility,
            weather: [{ description, icon}],
            name,
            main: { temp, humidity, feels_like },
            wind: { speed },
            sys: {sunrise, sunset },
        } = weatherData;
    const [{ main }] = weather;

    return (
        <SafeAreaView style={styles.container}>

                <Search fetchWeatherData={fetchWeatherData} />
                <ScrollView>
                    <View style={{ alignItems: 'center '}}>
                        <Text style={styles.title}>{name}</Text>
                    </View>

                    <View style={styles.current}>
                        <Image
                            style={styles.largeIcon}
                            source={{
                                uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
                            }}
                        />
                        <Text style={styles.currentTemp}>{temp} °C</Text>
                    </View>
                    <Text style={styles.currentDescription}>{description} right now</Text>
                    <View style={styles.extraInfo}>

                        <View style={styles.info}>
                            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Feels like</Text>
                            <Image
                                source={require('../assets/temperature.png')}
                                style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft: 50 }}
                            />
                            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>{feels_like} °C</Text>
                        </View>

                        <View style={styles.info}>
                            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Humidity</Text>
                            <Image
                                source={require('../assets/humidity.png')}
                                style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft: 50 }}
                            />
                            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{humidity}%</Text>
                        </View>
                    </View>

                        <View style={styles.extraInfo}>

                        <View style={styles.info}>
                            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Visibility</Text>
                            <Image 
                                source={require('../assets/visibility.png')}
                                style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
                                />
                                <Text style={{ fontSize: 22, color: 'white', textAlign:'center' }}>{visibility}</Text>
                        </View>

                        <View style={styles.info}>
                            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Wind speed</Text>
                            <Image 
                                source={require('../assets/windspeed.png')}
                                style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
                            />
                                <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{speed} m/s</Text>
                        </View>
  
                    </View>
                        <View style={styles.extraInfo}>

                        <View style={styles.info}>
                            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Sunrise</Text>
                            <Image 
                                source={require('../assets/sunrise.png')}
                                style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
                            />
                            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{new Date(sunrise*1000).toLocaleString()}</Text>
                        </View>

                        <View style={styles.info}>
                            <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>Sunset</Text>
                            <Image 
                                source={require('../assets/sunset.png')}
                                style={{width:40, height:40, borderRadius:40/2, marginLeft:50}}
                            />
                                <Text style={{ fontSize: 20, color: 'white', textAlign:'center' }}>{new Date(sunset*1000).toLocaleString()}</Text>
                        </View>
                
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#b2ebf2',
      
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 0,
        justifyContent: 'space-around',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    },
    largeIcon: {
        width: 250,
        height: 200,
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
        textAlign:'center',
        fontSize:24,
        fontWeight:'400',
        marginBottom: 10
      },
      title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'regular',
        color: '#212121',
      },
});