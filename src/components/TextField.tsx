import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

interface TextFieldProps {
    placeHolder:string;
    isSecure?:boolean ;
    onTextChange:Function;
    isOTP?:boolean;
}


const TextField:React.FC<TextFieldProps> = ({placeHolder, isSecure = false, onTextChange, isOTP = false}) => {

    if(isOTP){
        return (
            <View style={styles.container} >
                <TextInput
                maxLength={6}
                placeholder={placeHolder}
                autoCapitalize="none"
                secureTextEntry={isSecure}
                onChangeText={(item) => onTextChange(item)}
                style={styles.otptextField}
                />
            </View>
        )

    }else{
        return (
            <View style={styles.container} >
                <TextInput
                placeholder={placeHolder}
                autoCapitalize="none"
                secureTextEntry={isSecure}
                onChangeText={(item) => onTextChange(item)}
                style={styles.textField}
                />
            </View>
        )

    }

    
}

const styles = StyleSheet.create({
    container:{
        width:340,
        backgroundColor:'#DBDBDB',
        height:50,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        marginLeft:30,
        marginRight:30,
        paddingRight:10,
        paddingLeft:20
    },
    textField:{
        flex:1,
        width:320,
        height:50,
        fontSize:20,
        color:'#000'
    },
    otptextField:{
        flex:1,
        width:320,
        height:50,
        fontSize:20,
        color:'#000',
        textAlign:'center'
    },
})



export {TextField}
