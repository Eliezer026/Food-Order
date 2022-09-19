import axios from "axios";
import { LocationGeocodedAddress } from "expo-location"
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import { AsyncStorageStatic } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FoodModel, UserModel, OrderModel } from "../models"

export interface UpdateLocationAction{
    readonly type:"ON_UPDATE_LOCATION",
    payload:LocationGeocodedAddress
}

export interface UserErrorAction{
    readonly type:"ON_USER_ERROR",
    payload:any;
}

export interface UpdateCartAction {
    readonly type:'ON_UPDATE_CART',
    payload: FoodModel
}

export interface UserLoginAction {
    readonly type:'ON_USER_LOGIN',
    payload:UserModel
}

export interface CreateOrderAction {
    readonly type: 'ON_CREATE_ORDER',
    payload:OrderModel
}

export interface ViewOrderAction {
    readonly type: 'ON_VIEW_ORDER' | 'ON_CANCEL_ORDER',
    payload:[OrderModel]
}

export interface UserLogoutAction {
    readonly type:'ON_USER_LOGOUT'
}


export type UserAction = 
UpdateLocationAction | 
UserErrorAction | 
UpdateCartAction | 
UserLoginAction | 
CreateOrderAction | 
ViewOrderAction |
UserLogoutAction ;





export const onUpdateCart =(item: FoodModel) => {

    console.log(item,"userAction")
    
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type:'ON_UPDATE_CART',
            payload: item

        })
    }

}



export const onUserLogin =(email:string, password:string) => {

    console.log(email, password);
    
    return async (dispatch: Dispatch<UserAction>) => {
        
        
        try {
            
            const responde = await axios.post<UserModel>(`www.google.com/user/login`,{
                email, password
            });

            
            
            if(!responde){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'User Login error'
                })
            }else{

                dispatch({
                    type:'ON_USER_LOGIN',
                    payload:responde.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}


export const onUserSignup =(email:string, phone:string, password:string) => {

  
    
    return async (dispatch: Dispatch<UserAction>) => {
        
        
        try {
            console.log(email, 
                phone,
                password,"jssjssjjsjsj");
            
            const responde = await axios.post<UserModel>(`www.google.com/user/signup`,{
                email, 
                phone,
                password
            });

            responde.data.verified=true
            
            if(!responde){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'User Login error'
                })
            }else{

                dispatch({
                    type:'ON_USER_LOGIN',
                    payload:responde.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}



export const onVerifyOTP =(otp:string, user:UserModel) => {

  
    
    return async (dispatch: Dispatch<UserAction>) => {
        
        
        try {
           
            console.log(otp, 'onverifyOTP')

                axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            
            const responde = await axios.patch<UserModel>(`www.google.com/user/verify`,{
               otp
            });

            
            
            if(!responde){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'User Verification error'
                })
            }else{

                dispatch({
                    type:'ON_USER_LOGIN',
                    payload:responde.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}



export const onOTPrequest =(user:UserModel) => {

  
    console.log('new Request');
    
    return async (dispatch: Dispatch<UserAction>) => {
        
        
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            
            const responde = await axios.get<UserModel>(`www.google.com/user/verify`);

            
           
            if(!responde){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'User Verification error'
                })
            }else{

                dispatch({
                    type:'ON_USER_LOGIN',
                    payload:responde.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}








// transation ID
export const onCreateOrder =(cartItems: [FoodModel], user:UserModel) => {

  

    let cart = new Array();
    cartItems.map(item => {
        cart.push({_id:item._id, unit:item.unit})
    })
    

    return async (dispatch: Dispatch<UserAction>) => {
        
        
        console.log(cart, 'onCreateOrder');
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            
            const responde = await axios.post<OrderModel>(`www.google.com/user/create-order`,{
                cart
            });

            
           
            if(!responde){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'User Login error'
                })
            }else{

                dispatch({
                    type:'ON_CREATE_ORDER',
                    payload:responde.data
                })
            }


        }catch(error){
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}





// transation ID
export const onGetOrders =( user:UserModel) => {

  

    
  
    
    return async (dispatch: Dispatch<UserAction>) => {
        
        
        console.log(user, 'onCreateOrder');
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            
            
            const responde = await axios.get<[OrderModel]>(`www.google.com/user/order`);
           
        

            

            if(!responde){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'User Login error'
                })
            }else{
                
                dispatch({
                    type:'ON_VIEW_ORDER',
                    payload:responde.data
                })
            }


        }catch(error){
            console.log(error, "error")
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}








export const onCancelOrders =( order:OrderModel, user:UserModel) => {

  

    
  
    
    return async (dispatch: Dispatch<UserAction>) => {
        
        
        console.log(user, 'onCreateOrder');
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
            
            
            const responde = await axios.delete<[OrderModel]>(`www.google.com/user/order/${order._id}`);
           
        

            

            if(!responde){
                dispatch({
                    type:'ON_USER_ERROR',
                    payload:'User Login error'
                })
            }else{
                
                dispatch({
                    type:'ON_CANCEL_ORDER',
                    payload:responde.data
                })
            }


        }catch(error){
            console.log(error, "error")
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}


export const onUserLogout =() => {

  

    
  
    
    return async (dispatch: Dispatch<UserAction>) => {
        
        
        
        try {
            
        

            

           
                dispatch({
                    type:'ON_USER_LOGOUT',
                   
                })
            
               
            


        }catch(error){
            console.log(error, "error")
            dispatch({
                type:'ON_USER_ERROR',
                payload:error
            })

        }

    }

}








export const onUpdateLocation = (location:LocationGeocodedAddress)=>{
    
    return async (dispatch: Dispatch<UserAction>) => {

        try{
           
            const locationString = JSON.stringify(location);
            await AsyncStorage.mergeItem('@userlocation',locationString);
            

            const value = await AsyncStorage.getItem('@userlocation')
    if(value !== null) {
        console.log('AsyncStorage',value);
      // value previously stored
    }

            //save our location in local storage
            dispatch({
                type:'ON_UPDATE_LOCATION',
                payload:location
            })

        }catch(error){
            dispatch({
              type:'ON_USER_ERROR',
              payload:error
            })

        }

    }
}