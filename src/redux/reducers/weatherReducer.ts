import { WeatherAction } from "../actions";
import { WeatherAvailability, WeatherState } from '../models';

const initialState = { 
    weather:{} as WeatherAvailability
}

const WeatherReducer = (state: WeatherState = initialState, action:WeatherAction) => {

    switch(action.type){
        case 'ON_WEATHER':
            return {
                ...state,
                weather:action.payload
            }
        default:
            return state    
    }
}

export { WeatherReducer }