import { combineReducers } from "redux";
import { ShoppingReducer } from "./shoppingReducer";
import { UserReducer } from "./userReducer";
import { WeatherReducer } from "./weatherReducer"

const rootReducer = combineReducers({
    userReducer:UserReducer,
    shoppingReducer:ShoppingReducer,
    weatherReducer:WeatherReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer }