import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState, UserState,onUserLogin, onUserSignup, onVerifyOTP, onOTPrequest } from '../redux';
import { TextField, ButtonWithIcon, ButtonWithTitle } from "../components"

interface LoginProps {

    onUserSignup:Function,
    onUserLogin:Function,
    userReducer:UserState,
    onVerifyOTP:Function,
    onOTPrequest:Function,
    navigation:{navigate:Function}

}

const _LoginScreen:React.FC<LoginProps> = ({ onUserLogin, onUserSignup, userReducer, onOTPrequest, onVerifyOTP, navigation }) => {


    const [email, setEmail]=useState('');
    const [phone, setPhone]=useState('');
    const [password, setPassword]=useState('');
    const [title, setTitle]=useState('Login');
    const [isSignUp, setIsSignup]=useState(false);

    const [otp, setOtp] = useState('');
    const [verified, setVerified] = useState(true);
    const [requestOtpTitle, setRequestOptTitle] = useState('Request a New OTP in');
    const [canRequestOtp, setCanRequestOtp] = useState(false);

    const [num, setNum] = useState<number>(60);

    
    let countDown2:any = useRef();

    const { user } = userReducer;

    //user.token="jjjji";



    useEffect(() => {       

        

        if(user.token !== undefined){
            console.log('true')
            user.verified=true;
            if(user.verified === true){
                navigation.navigate('TabScreen')

            }else{
                setVerified(user.verified);
                
                

            }
        }else{
            console.log('else', user.verified)
        }

        countDown2.current = setInterval(decreaseNum, 1000);
        

    },[user]);


   
    const decreaseNum = () => setNum((prev) =>{

        if(prev === 1){
            clearInterval(countDown2.current);
            setRequestOptTitle(`Request a New OTP`);
            setCanRequestOtp(true);

         
            

        }else{

            setRequestOptTitle(`Request a New OTP in ${prev-1}`);
        }
        
            

        
        
        //console.log(prev)


       return  prev -1
    });
    

   
    



    const onTapOptions =() => {
        setIsSignup(!isSignUp);
        setTitle(!isSignUp ? 'Signup': 'Login')
    }

    const onTapAutheticate = () => {
        if(isSignUp){
            onUserSignup(email, phone, password)
            console.log("signup")

        }else{
            onUserLogin(email, password)
            console.log("login")
            
        }
    }
    


    const onTapVerify = () => {
        onVerifyOTP(otp, user)
    }

    const onTapRequestNewOTP =() => {
        setCanRequestOtp(false);
        setNum(60);
        countDown2.current = setInterval(decreaseNum, 1000);
        onOTPrequest(user)
    }

   


    if(!verified){
        //console.log(num + "jssjsj");
        

        return(
            <View style={styles.container} >
                <View style={styles.body} >
                    <Image source={require('../images/verify_otp.jpeg')} style={{ width:200, height:200, margin:20 }} />
                    <Text style={{ fontSize:22, fontWeight:'500', margin:10 }} >Verification</Text>
                    <Text style={{ fontSize:16, padding:10, marginBottom:20, color:'#716F6F' }} >Enter your OTP sent to your mobile number</Text>
                    <TextField isOTP={true} placeHolder='OTP' onTextChange={setOtp} />


                    <ButtonWithTitle title='Verify OTP' onTap={onTapVerify} width={340} height={50} />
                    <ButtonWithTitle disable={!canRequestOtp} title={requestOtpTitle} isNoBg={true} onTap={onTapRequestNewOTP} width={430} height={50}  />
                </View>
              <View style={styles.footer}></View>
            </View>
        )

    }else{

        return (
            <View style={styles.container} >
            <View style={styles.navigation} ><Text style={{ fontSize:30 }} >{title}</Text></View>
            <View style={styles.body} >
                <TextField placeHolder='Email' onTextChange={setEmail} />
                { isSignUp &&
                 <TextField placeHolder='Phone' onTextChange={setPhone} />
                }
               
                <TextField placeHolder='Password' onTextChange={setPassword} isSecure={true} />
                <ButtonWithTitle title={title} onTap={onTapAutheticate} width={340} height={50}  />
                <ButtonWithTitle title={!isSignUp ? "No Account? Signup here": "Have an Account? Login here"} 
                onTap={onTapOptions}
                width={340}
                height={50}
                isNoBg={true}
                />
    
            
            </View>    
                
            </View>
        )


    }

    
}

const styles = StyleSheet.create({
    container:{flex:1, },
    navigation:{ flex:1, paddingLeft:50, paddingTop:50 },
    body:{ flex:10, justifyContent:'center', alignItems:'center', },
    footer:{flex:1, }
})

const mapStateToProps = (state:ApplicationState) => ({
    userReducer:state.userReducer

})

const LoginScreen = connect(mapStateToProps, {onUserSignup, onUserLogin, onOTPrequest, onVerifyOTP})(_LoginScreen)

export {LoginScreen}
