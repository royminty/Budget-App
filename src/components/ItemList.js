import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//import { Swipeable } from 'react-native-gesture-handler';

export default function ItemList({data, deleteItem}){
    return(
        <View style={styles.items}>
            <Text style={styles.date}>{data.dates}</Text>
            <View style = {styles.container}>
                <TouchableOpacity onPress={()=>deleteItem(data.key)} style={styles.button}>
                </TouchableOpacity>
                <View style={styles.betweenNameAmount}>
                    <Text style={styles.name}>{data.names}</Text> 
                    <Text style={styles.amount}> ${data.amounts}</Text>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    items: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        
        marginHorizontal: 10,
        marginTop: 4,
        marginBottom: 32,

        width: 324,
        height: 60,

        backgroundColor: '#FFF',
        borderWidth: 2,
        borderRadius: 12,
        borderColor: 'rgba(153, 151, 151, 0.25)',
        
    },
    betweenNameAmount:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    button:{
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#3FD37A',
        marginHorizontal: 12,
        height:20,
        width:20
    },
    headerText:{
        fontFamily: 'DMSans-Regular',
    },
    date:{
        fontFamily: 'DMSans-Bold',
        fontSize: 18,
        color: 'black',
        marginLeft: 16,
    },
    name:{
        fontFamily: 'DMSans-Regular',
        fontSize: 18,
        color: 'black',
        
    },
    amount:{
        fontFamily: 'DMSans-Regular',
        fontSize: 24,
        marginRight: 12,
        color: '#FF5555',
    },

})
