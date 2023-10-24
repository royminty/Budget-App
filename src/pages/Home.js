import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, FlatList, SafeAreaView, Alert, Keyboard} from 'react-native';
import React, { useState, useEffect, useRef, Component } from 'react';
import { Picker } from '@react-native-picker/picker';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ItemList from '../../src/components/ItemList';
import firebase from "../../src/services/firebaseConn";


import { CurrentRenderContext, useRoute } from '@react-navigation/native';


export default function Home(){
    //navigation vars
    const route = useRoute();

    //other vars
    const [user, setUser] = useState("");
    const inputRef = useRef(null);
    const [budget, setBudget] = useState("");
    //const [currentExpenses, setCurrentExpenses] = useState(0);

    //const [tempSubtract, setTempSubtract] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [newExpense, setNewExpense] = useState('');
    const [expenses, setExpenses] = useState([]);

    const [total, setTotal] = useState(0);

    //initialization
    useEffect(() => {
        async function getBudget(){
            await firebase.database().ref('users').child(user).child('budget').on('value', (snapshot) => {
                console.log("budget " + snapshot.val());
                setBudget(snapshot.val());
            })
        }
        getUser();
        if (route.params?.user) {
            setUser(route.params?.user)
        }
        getBudget();
        //getCurrentExpenses();
    }, [user]);

    async function getUser(){
        if(!user){
            return;
        }

        await firebase.database().ref('users').child(user).child('items').once('value', (snapshot) =>{
            setExpenses([]);
            let tempTotal = 0;
            firebase.database().ref('users').child(user).update({
              total: tempTotal
            });
            setTotal(tempTotal);
            
            snapshot.forEach((item)=>{
            let data = {
                key: item.key,
                amounts: item.val().amounts,
                names: item.val().names,
                dates: item.val().dates
            }
            tempTotal += Number(item.val().amounts);
            console.log(data)
            setExpenses(oldExpenses=>[...oldExpenses, data])
            setTotal(tempTotal);
            
            firebase.database().ref('users').child(user).update({
              total: tempTotal
            });
            })
        })
    }

    // async function getCurrentExpenses(){
    //   await firebase.database().ref('users').child(user).child('currentExpenses').on('value', (snapshot) => {
    //       console.log("currrentExpenses " + snapshot.val());
    //       setCurrentExpenses(snapshot.val());
    //   })
    // }

    function addExpenseFunc(){
        let expenses = firebase.database().ref('users').child(user).child('items');
        let key = expenses.push().key
    
        expenses.child(key).set({
          amounts: amount,
          names: name,
          dates: date
        })
    
        .then(()=>{
          
          console.log("Expense Saved")
    
          const item = {
            key: key,
            amounts: amount,
            names: name,
            dates: date,
          }

          // firebase.database().ref('users').child(user).update({
          //   currentExpenses: (currentExpenses + Number(amount))
          // });
    
          //setExpenses(oldExpenses => [...oldExpenses, item]);
          getUser();
        })
    
        setAmount("");
        setName("");
        setDate("");
        Keyboard.dismiss();
    }

    async function deleteItem(key){

      await firebase.database().ref('users').child(user).child('items').child(key).remove()
      .then( () => {
        const findTasks = expenses.filter(expenses=>expenses.key !== key)
        setExpenses(findTasks)
      })
      
      getUser();

      // firebase.database().ref('users').child(user).child('items').child(key).child('amounts').once('value', (snapshot) => {
      //   setTempSubtract(snapshot.val())
      // })
      // firebase.database().ref('users').child(user).update({
      //   currentExpenses: (currentExpenses - Number(setTempSubtract))
      // });

    }

    const ListHeader = () => {
      return (
        <View style={styles.header}>
              <Text style={styles.setBudget}> Budget ${budget} </Text>
              <Text style={styles.amountSpent}>${total}</Text>
        </View>
      );
    };
    
    return(
        <SafeAreaView style={styles.container}>
            {/* <Text> User key: {user} </Text> */}
            {/* <View style={styles.header}>
              <Text style={styles.setBudget}> Budget ${budget} </Text>
              <Text style={styles.amountSpent}>${total}</Text>
            </View> */}
            
            <FlatList
                data={expenses}
                keyExtractor={(item)=>item.key}
                renderItem={ ({item})=>(<ItemList data={item} deleteItem={deleteItem}/>)}
                ListHeaderComponent={ListHeader}
            />
            
            <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
                <Text style={styles.floatingButtonStyle}>+</Text>
            </TouchableOpacity>
            
            

            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableOpacity style={styles.background} onPress={() => setShowModal(false)}>
                <View style={styles.modal}>
                    <View style={styles.headerButtons}>
                      <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                      </TouchableOpacity>

                      <Text style={styles.modalText}>Add Expense</Text>

                      <TouchableOpacity style={styles.doneButton} onPress={addExpenseFunc}>
                        <Text style={styles.doneButtonText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.modalBox}>
                        <TextInput
                          style={styles.input}
                          placeholder="Expense Amount"
                          value={amount}
                          onChangeText={ (text) => setAmount(text)}
                          keyboardType="numeric"
                          ref={inputRef}
                        />
                        <View style={styles.inputContainer}>
                          <TextInput
                          style={styles.input2}
                          placeholder="Expense Name"
                          value={name}
                          onChangeText={ (text) => setName(text)}
                          ref={inputRef}
                          />
                          <TextInput
                          style={styles.input3}
                          placeholder="Date (Weekday, Month Day)"
                          value={date}
                          onChangeText={ (text) => setDate(text)}
                          ref={inputRef}
                          />
                        </View>
                        
                        
                    </View>
                </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7f7f7',
    },
    header:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      marginBottom: 32,
    },
    

    amountSpent: {
      fontFamily: 'DMSans-Bold',
      fontSize: 48,
      color: 'black',

    },
    setBudget:{
      fontFamily: 'DMSans-Regular',
      fontSize: 20,
    },



    button: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#43AFEC',
      borderRadius: 25,
      width: 50,
      height: 50,
      right: 30,
      bottom: 30,
      
    },
    floatingButtonStyle:{
      fontSize: 25,
      color: 'white',
      
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },

    
    background: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modal: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      minHeight: 200,
    },
    modalText: {
      fontSize: 16,
      
    },
    headerButtons:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    doneButton:{
      padding: 10,
      
    },
    doneButtonText:{
      fontFamily: 'DMSans-Regular',
      fontSize: 18,
      color: '#43AFEC',
    },
    closeButton: {
      padding: 10,
      //alignSelf: 'flex-end',
    },
    closeButtonText: {
      fontFamily: 'DMSans-Regular',
      color: '#43AFEC',
      fontSize: 18,
      
    },
    modalBox: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius: 5,
      
    },
    inputContainer:{
      fontFamily: 'DMSans-Regular',
      fontSize: 18,
      borderWidth: 2,
      borderRadius: 12,
      borderColor: 'rgba(153, 151, 151, 0.25)',
      width: 324,
    },
    input: {
      fontFamily: 'DMSans-Regular',
      fontSize: 18,
      borderWidth: 2,
      borderRadius: 12,
      borderColor: 'rgba(153, 151, 151, 0.25)',
      paddingVertical: 10,
      width: 324,
      marginBottom: 10,
    },
    input2:{
      fontSize: 18,
      borderBottomWidth: 2,
      borderColor: 'rgba(153, 151, 151, 0.25)',
    },
    input3:{
      fontSize: 18,
    }
    
})
