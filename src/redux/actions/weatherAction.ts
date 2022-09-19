import axios from "axios";
import { Dispatch } from "react";
import { WeatherAvailability } from "../models";

export interface UpdateWeatherAction{
    readonly type:'ON_WEATHER',
    payload:WeatherAvailability
}

export interface WeatherErrorAction {
    readonly type:'ON_WEATHER_ERROR',
    payload:any
}



export type WeatherAction = UpdateWeatherAction | WeatherErrorAction;

export const onUpdateLocationWeather = (city:string) => {

    return async (dispatch:Dispatch<WeatherAction>) => {
        
        try {
            const SECRET_KEY = "0cbfc74e093c31b8325fedc59ee93c3c";
            const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${SECRET_KEY}`;
    
            const response = await axios.get<WeatherAvailability>(`${BASE_URL}`);
            console.log(response.data,"weatheraction")
            if(!response){
                dispatch({
                    type:'ON_WEATHER_ERROR',
                    payload:'Weather error'
                })
            }else{
                dispatch({
                    type:'ON_WEATHER',
                    payload:response.data
                })
            }

        }catch(error){
            dispatch({
                type:'ON_WEATHER_ERROR',
                payload:error
            })

        }
    }
}