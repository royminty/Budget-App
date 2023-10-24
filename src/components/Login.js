import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, FlatList, Alert} from "react-native";
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import firebase from "../services/firebaseConn";

export default function Login({status}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(){
        //Alert.alert('Logged in')
        const user = firebase.auth().signInWithEmailAndPassword(email,password)
        .then( (user) => {
            Alert.alert('Welcome ' + user.user.email)
            //sending uid to App
            status(user.user.uid)
        })
        .catch( (error) => {
            console.log(error);
            Alert.alert('Something went wrong :(');
            return;
        })
    }

    async function signIn(){
        //Alert.alert('Signed in')
        const user = firebase.auth().createUserWithEmailAndPassword(email,password)
        .then( (user) => {
            console.log(user.email);

            firebase.database().ref('users').child(user.user.uid).set({
                budget: 'empty',
                total: 0
            });

            Alert.alert('User ' + user.user.email + ' saved!')
            //sending uid to App
            status(user.user.uid)
        })
        .catch( (error) => {
            console.log(error);
            Alert.alert('Something went wrong');
            return;
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Login or Sign into your Account</Text>
            </View>
            
            <View style={styles.container2}>
                <TextInput
                placeholder="Enter your email"
                style = {styles.textInput}
                value={email}
                onChangeText={ (text) => setEmail(text)}
                />

                <TextInput
                placeholder="Enter your password"
                style = {styles.textInput2}
                value={password}
                onChangeText={ (text) => setPassword(text)}
                />

                <TouchableOpacity
                style = {styles.loginButton}
                onPress={login}
                >
                    <Text style = {styles.loginBtnText}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.signInButton}
                onPress={signIn}
                >
                    <Text style = {styles.signInText}> Register </Text>
                </TouchableOpacity>
            </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'gray',
    },
    headerContainer:{
        marginTop: 80,
        marginHorizontal: 40,
    },
    headerText:{
        fontFamily: 'DMSans-Bold',
        color: 'white',
        fontSize: 32,
    },
    container2:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 80,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    mainText:{
        fontSize: 20,
    },
    textInput:{
        fontFamily: 'DMSans-Regular',
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: 'rgba(153, 151, 151, 0.25)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 324,
        marginTop: 32,
        marginBottom: 10,
    },
    textInput2:{
        fontFamily: 'DMSans-Regular',
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: 'rgba(153, 151, 151, 0.25)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: 324,
        marginBottom: 32,
    },
    loginButton:{
        backgroundColor: '#43AFEC',
        paddingHorizontal: 125,
        paddingVertical: 20,
        borderRadius: 16,
        marginBottom: 16,
    },
    loginBtnText:{
        fontFamily: 'DMSans-Bold',
        color: 'white',
        fontSize: 24,
    },
    signInButton:{
        backgroundColor: '#43AFEC',
        paddingHorizontal: 110,
        paddingVertical: 20,
        borderRadius: 16,
    },
    signInText:{
        fontFamily: 'DMSans-Bold',
        color: 'white',
        fontSize: 24,
    },

});