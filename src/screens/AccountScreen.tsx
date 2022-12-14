import React,{useState, useEffect, createRef} from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { Restaurant, FoodModel,ApplicationState, onUpdateCart,UserState, onCreateOrder, onUserLogout } from '../redux';
import { connect } from "react-redux";
import { ButtonWithIcon, ButtonWithTitle, FoodCardInfo } from "../components"
import { checkExistence } from "../utils";

import PaymentTypePopup from "react-native-raw-bottom-sheet"
import { ScrollView } from "react-native-gesture-handler";
import {LoginScreen} from "./LoginScreen"

interface AccountScreenProps {
    userReducer:UserState;
    onUpdateCart:Function;
    onCreateOrder:Function;
    onUserLogout:Function;
    navigation:{navigate:Function, goBack:Function};
    route:{params:any }
}


const _AccountScreen:React.FC<AccountScreenProps> = (props) => {

    
    const { user } = props.userReducer;

    //user.token="JDJDJJ"
    const options = [
        {
            title: 'Edit Profile',
            action: () => {alert('edit profile')}
        },
        {
            title: 'View Orders',
            action: () => {alert('view Orders')}
        },
        {
            title: 'Contact Support',
            action: () => {alert('Contact Support')}
        },
        {
            title: 'Logout',
            action: () => {props.onUserLogout()}
        },
    ];

    const optionCard = (title:string, action:Function) => {

        return (<TouchableOpacity 
            style={{ 
                backgroundColor:'#FFF',
                height:80,
                justifyContent:'space-around',
                flexDirection:'row',
                alignItems:'center',
                padding:10,
                paddingLeft:50,
                paddingRight:20,
                borderTopColor:'#D3D3D3',
                borderBottomColor:'#D3D3D3',
                borderTopWidth:0.5,
                borderBottomWidth:0.5
             }} 
             key={title} onPress={() => action()} >
            <Text style={{ flex:1, fontSize:18, color:'#525252' }} >{title}</Text>
            <Image source={require('../images/arrow_icon.png')} style={{ width:40, height:40 }} />
        </TouchableOpacity>)

    }


    if(user.token !== undefined){

        return(
            <View style={styles.container} >
               <View style={styles.navigation} >
                <View style={{ display:'flex', height:60, justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginLeft:4, paddingLeft:20, paddingRight:20 }} >
                    <Image source={require('../images/avatar.png')} style={{ width:150, height:150, marginRight:20 }} />
                     
                     <View>
                     <Text style={{ fontSize:22, fontWeight:'600' }} >{user.firstName || 'Guest'}</Text>
                     </View>
                
                </View>

                </View>
                <View style={styles.body} >
                    <ScrollView>
                        {options.map(({title, action})=>{
                            return optionCard(title, action)
                        })}
                    </ScrollView>

                
                </View>
    
            </View>
        )




    }else{

        return (<LoginScreen navigation={props.navigation} />)



      /* return <View style={{ flex:1, display:'flex', justifyContent:'center', alignItems:'center' }} >
            <Text style={{ fontSize:25, fontWeight:'700' }} >Your Cart is Empty!!</Text>
        </View>*/

    }


    


}


const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#F2F2F2'},
    navigation:{
        flex:3, 
        marginTop:44,
        padding:10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    body:{flex:9, display:'flex'},
    footer:{flex:2, padding:10},
    paymentView:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10,
        margin:5,
        backgroundColor:'#E3BE74'
    },
    paymentOptions:{
        display:'flex',
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10

    },
    options:{
        display:'flex',
        height:126,
        width:160,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column',
        padding:10,
        borderColor:'#A0A0A0',
        backgroundColor:'#F2F2F2',
        borderWidth:0.2,
        borderRadius:10,
        margin:10

,
    },
    icon:{
        width:115,
        height:80
    },
    optionText:{

        fontSize:16, fontWeight:'600', color:'#545252'
    },
    amountView:{display:'flex', flexDirection:'row', justifyContent:'space-between',paddingLeft:20, paddingRight:20}
})

const mapStateToProps = (state:ApplicationState) => ({
    shoppingReducer:state.shoppingReducer,
    userReducer:state.userReducer

})

const AccountScreen = connect(mapStateToProps,{onUserLogout})(_AccountScreen)
export { AccountScreen }