import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native'
import { FoodModel, OrderModel } from "../redux";
import moment from 'moment';
import { ButtonAddRemove } from './index'

interface OrderCardProps {
item:OrderModel;
onTap:Function;
    
}


const OrderCard:React.FC<OrderCardProps> = ({ item, onTap }) => {


    const orderStatus = () => {
        
        const status = item.orderStatus.toLowerCase();
        let statusIcon = require('../images/order_process.png');
        let statusMessage = status;

        if(status === "completed"){
            statusMessage= "Delivered";
            statusIcon = require('../images/orders.png')

        }else if(status === "cancelled"){
            statusMessage= "Cancelled";
            statusIcon = require('../images/warning-icon.png')

        }


        return (
            <View style={{ display:'flex', flex:3, padding:5, alignItems:'center', justifyContent:'space-around' }} >
               <Image source={statusIcon} style={{ width: 60, height:60 }} />
               <Text style={{ fontSize:12, color:'#7C7C7C' }} >{statusMessage.toUpperCase()}</Text>
            </View>
        )
    }

    

    return (
     
            <TouchableOpacity style={styles.container} onPress={() => onTap()}  >
           <View style={{ display:'flex', flex:1, flexDirection:'row', justifyContent:'space-around' }} >
               <View style={{ display:'flex', flex:8, padding:5, marginTop:5, paddingLeft:20,
                justifyContent:'space-around', alignItems:'flex-start'  }} >
                    <Text style={{ fontSize:22, fontWeight:'500'}} >Order ID:{item._id}</Text>
                    <Text style={{ fontSize:16, fontWeight:'600', color:'#7C7C7C'}} >{ moment(item.orderDate).format('Do MM YY, h:mm a')}</Text>
                    <Text style={{ fontSize:32, fontWeight:'500', color:'#FF5733' }} >$ {item.totalAmount}</Text>
               </View>
               {orderStatus()}
           </View>
           </TouchableOpacity>
           

    )
}

export { OrderCard }

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        width:Dimensions.get('screen').width -20,
        margin:10,
        borderRadius:20,
        backgroundColor:'#FFF',
        height:100,
        justifyContent:'flex-start',
        borderWidth:1,
        borderColor:'#E5E5E5',
        flexDirection:'row'
    }
})