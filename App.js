import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Current from './Screens/Current';
import CityWise from './Screens/CityWise';
import Library from './Screens/Library';
import Camera from './Screens/Camera';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {

  const theme = useTheme();
  theme.colors.secondaryContainer = 'transparent';

  return (

    <Tab.Navigator labeled={true} style={ activeColor='#ffeb3b' } >
        <Tab.Screen name='Location' component={Current}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='weather-partly-cloudy' color={color}
            size={26} />
          ),
        }} />
        <Tab.Screen name='City' component={CityWise}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='city' color={color}
            size={26} />
          ),
        }} />
        <Tab.Screen name='Camera' component={Camera}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" color={color}
            size={26} />
          ),
        }} />
        <Tab.Screen name='Library' component={Library}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name='picture' color={color}
            size={26} />
          ),
        }} />
      </Tab.Navigator>

  );
}

export default function App() {

  return (
    
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabnavigator: {
    backgroundColor: '#fff',
  }
});