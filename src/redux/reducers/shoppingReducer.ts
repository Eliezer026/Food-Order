import { ShoppingAction } from "../actions"
import { FoodAvailability, ShoppingState, FoodModel }  from "../models"


const initialState = {
    availability:{}  as FoodAvailability,
    availabilityFoods:{} as [FoodModel]
}

const ShoppingReducer = (state: ShoppingState = initialState, action: ShoppingAction) => {

    switch(action.type){
        case 'ON_AVAILABILITY':
            return{
                ...state,
                availability:action.payload
            }

        case 'ON_FOODS_SEARCH':
            return{
                ...state,
                availabilityFoods:action.payload
            }    
        default:
            return state    
    }

}

export { ShoppingReducer }