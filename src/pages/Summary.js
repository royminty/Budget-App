import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ProgressBarAndroid } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firebase from "../../src/services/firebaseConn";
//import {ProgressBar} from '@react-native-community/progress-bar-android';


export default function Summary(){
    const route = useRoute();

    const [budget, setBudget] = useState("");
    const [user, setUser] = useState("");
    //const [currentExpenses, setCurrentExpenses] = useState("");
    const [total, setTotal] = useState(0);
    const [expenses, setExpenses] = useState([]);



    useEffect(() => {
        async function getTotal(){
            await firebase.database().ref('users').child(user).child('total').on('value', (snapshot) => {
                setTotal(snapshot.val());
            })
        }

        async function getBudget(){
            await firebase.database().ref('users').child(user).child('budget').on('value', (snapshot) => {
                setBudget(snapshot.val());
            })
        }
        
        
        if (route.params?.user) {
            setUser(route.params?.user)
        }
        getBudget();
        getTotal();
    }, [user]);

    
    //const progress = (total / budget) * 100;
   
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}> Summary </Text>
            </View>
            
            {/* <Text>user:{user}</Text> */}
            <View style={styles.budgetContainer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.spent}>Spent: ${total}</Text>
                    <Text style={styles.budget}>Budget: ${budget}</Text>
                </View>
                {/* <ProgressBar
                    styleAttr='Horizontal'
                    indeterminate={false}
                    progress={progress / 100}
                    style={styles.bar}
                    color={'#3FD37A'}
                /> */}
                
            </View>
            

            
            
            
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
        marginBottom: 60,
    },
    budgetContainer:{
        width: 340,
        height: 60,

        borderWidth: 2,
        borderRadius: 12,
        borderColor: 'rgba(153, 151, 151, 0.5)',
    },
    summaryBox:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    spent:{
        fontFamily: 'DMSans-Regular',
        color: '#FF5555',
        fontSize: 24,
        marginLeft: 12,
        marginTop: 12,
    },
    budget:{
        fontFamily: 'DMSans-Regular',
        color: '#3FD37A',
        fontSize: 24,
        marginRight: 12,
        marginTop: 12,
    },
    bar:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        width: '100%',
    }
})