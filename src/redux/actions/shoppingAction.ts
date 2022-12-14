import axios from "axios";
import { LocationGeocodedAddress } from "expo-location";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils";
import { FoodAvailability, FoodModel } from "../models";

export interface AvailabilityAction {
    readonly type:'ON_AVAILABILITY',
    payload:FoodAvailability
}

export interface ShoppingErrorAction {
    readonly type:'ON_SHOPPING_ERROR',
    payload:any
}

export interface FoodSearchAction {
    readonly type:'ON_FOODS_SEARCH',
    payload:[FoodModel]

}


export type ShoppingAction = AvailabilityAction | ShoppingErrorAction | FoodSearchAction;


export const onAvailability = (postcode:string) => {
    
    return async ( dispatch:Dispatch<ShoppingAction> ) => {

        try{

            const response = await axios.get<FoodAvailability>(`${BASE_URL}/food/availability/bebe`);

            
            if(!response){
                dispatch({
                    type:'ON_SHOPPING_ERROR',
                    payload:'Availability error'
                })
            }else{
                dispatch({
                    type:'ON_SHOPPING_ERROR',
                    payload:response.data
                })
            }

        }catch(error){
            dispatch({
                type:'ON_SHOPPING_ERROR',
                payload:error
            })


        }

    }
}


export const onSearchFoods = (postcode:string) => {
    
    console.log(postcode, "onSearchFoods")
    return async ( dispatch:Dispatch<ShoppingAction> ) => {

        try{

            const response = await axios.get<[FoodModel]>(`${BASE_URL}/food/availability/bebe`);

            
            if(!response){
                dispatch({
                    type:'ON_SHOPPING_ERROR',
                    payload:'Availability error'
                })
            }else{
                dispatch({
                    type:'ON_FOODS_SEARCH',
                    payload:response.data
                })
            }

        }catch(error){
            dispatch({
                type:'ON_SHOPPING_ERROR',
                payload:error
            })


        }

    }
}