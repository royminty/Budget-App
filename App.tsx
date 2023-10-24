import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, Keyboard, Alert} from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './src/components/Login';
import firebase from "./src/services/firebaseConn";

import Home from "./src/pages/Home";
import Summary from "./src/pages/Summary";
import Budget from "./src/pages/Budget";

//tab navigation
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState('');

  if(!user){
    return <Login status={ (user) => setUser(user)}/>
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle:{
            height: 60,
            
          },
          tabBarActiveTintColor: '#43AFEC',
          tabBarLabelStyle:{
            fontFamily: 'DMSans-Regular',
            fontSize: 18,
          }
        }}
      >
        <Tab.Screen
          name = "Home"
          component = {Home}
          initialParams={{ user: user}} //transfers user to home page
          options={{
            tabBarIcon: ( {color, size}) => {
              return <Ionicons name="home" color={color} size={32}/>
            },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name = "Budget"
          component = {Budget}
          initialParams={{ user: user}} //transfers user to account page
          options={{
            tabBarIcon: ( {color, size}) => {
              return <Ionicons name="create-outline" color={color} size={32}/>
            },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name = "Summary"
          component = {Summary}
          initialParams={{ user: user}}
          options={{
            tabBarIcon: ( {color, size}) => {
              return <Ionicons name="list-outline" color={color} size={32}/>
            },
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  container:{
    fontFamily: "DMSans-Regular",
    fontSize: 24,
  }
});