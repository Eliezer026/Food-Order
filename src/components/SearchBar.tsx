import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity,TextInput,Image } from "react-native"


interface SearchBarProps {
    onEndEditing?:any | undefined;
    didTouch?:any | undefined;
    autoFocus?:any | undefined;
    onTextChange:Function
}

const SearchBar:React.FC<SearchBarProps> = ({ onEndEditing,didTouch,autoFocus=false, onTextChange }) => {
    return (
     <View style={styles.container} >
         <View style={styles.searchBar} >
             <Image style={{ width:25, height:25 }} source={require('../images/search.png')} />
             <TextInput 
             style={{ marginLeft:5, flex:9, display:'flex', fontSize:20, height:42}}
             placeholder={"Search Foods"}
             autoFocus={autoFocus}
             onTouchStart={didTouch}
             onChangeText={(text) => onTextChange(text)}
             onEndEditing={onEndEditing}
             />
         </View>
     </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        height:50,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20
    },

    searchBar:{
        flex:1,
        display:'flex',
        height:32,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        borderRadius:20,
        borderColor:'#E5E5E5',
        borderWidth:2,
        backgroundColor:'#ededed'
    }
})

export {SearchBar}
