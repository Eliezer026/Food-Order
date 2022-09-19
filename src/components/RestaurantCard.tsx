import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity,TextInput, Image,Dimensions } from "react-native";
import { Restaurant, FoodModel } from "../redux"

const screenWidth = Dimensions.get('screen').width;

interface RestaurantProp {
    item:Restaurant | FoodModel | any;
    onTap:Function;
    
}

const RestaurantCard:React.FC<RestaurantProp> = ({ item, onTap}) => {

    
    
    return (
        <TouchableOpacity style={styles.container} onPress={()=>onTap(item)} >
            
            <Image style={{ width:screenWidth -20, height:220, borderRadius:20, backgroundColor:'#EAEAEA' }} 
            source={{ uri:`${item.images}` }} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container:{width:screenWidth -20, height:190, justifyContent:'space-around', alignItems:'center', margin:10,borderRadius:20}

})

export {RestaurantCard}
