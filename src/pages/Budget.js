import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firebase from "../../src/services/firebaseConn";

export default function Budget(){
    //navigation vars
    const route = useRoute();
    const navigation = useNavigation();

    //other vars
    const [user, setUser] = useState("");
    const [budget, setBudget] = useState('');
    const [newBudget, setNewBudget] = useState('');
    // const [month, setMonth] = useState('month goes here');

    useEffect(() => {
        if (route.params?.user) {
            setUser(route.params?.user)
        }

        // async function getBudget(){
        //     await firebase.database().ref('users').child(user).child('budget').on('value', (snapshot) => {
        //         setBudget(snapshot.val());
        //     })
        // }

        // getBudget();

    }, [route.params?.user]);

    function enter(){
        if (newBudget == '') {
            Alert.alert('Fill inputs');
            return;
        }
        setBudget(newBudget);

        //should update database as well
        firebase.database().ref('users').child(user).update({
            budget: newBudget
        });

        //clean up
        navigation.navigate('Home')
        setNewBudget('');
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}> Budget</Text>
                
            </View>
            <TextInput
            style={styles.input}
            placeholder = 'Set Budget'
            value={newBudget}
            onChangeText = {(text) => setNewBudget(text)}
            keyboardType="numeric"
            />
            <TouchableOpacity
            style={styles.enterButton}
            onPress = {enter}
            >
                <Text style={styles.enterText}> Enter </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    header:{
        alignItems: 'center',
        marginTop: 48,
    },
    headerText:{
        fontFamily: 'DMSans-Bold',
        fontSize: 48,
        color: 'black',
        marginBottom: 100,
    },
    input:{
        fontFamily: 'DMSans-Regular',
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: 'rgba(153, 151, 151, 0.25)',
        paddingVertical: 10,
        paddingHorizontal: 110,
        marginBottom: 10,
    },
    enterButton:{
        backgroundColor: '#43AFEC',
        paddingHorizontal: 125,
        paddingVertical: 20,
        borderRadius: 16,
    },
    enterText:{
        fontFamily: 'DMSans-Bold',
        color: 'white',
        fontSize: 24,
    }

})