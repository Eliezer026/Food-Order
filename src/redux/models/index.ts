import { LocationGeocodedAddress } from "expo-location"


interface Category {
    title:String;
    icon:String;
}

export interface FoodModel{
    _id:String;
    name:String;
    description:String;
    category:String;
    price:number;
    readyTime:string;
    images:string[];
    unit:number;

}

export interface Restaurant {
    _id:String;
    name:String;
    foodType:String;
    address:String;
    phone:String;
    images:String;
    foods:[FoodModel];
}

export interface FoodAvailability {
    categories:[Category];
    restaurants:[Restaurant];
    foods:[FoodModel]
}



export interface UserState{
    user:UserModel;
    location:LocationGeocodedAddress;
    error:string | undefined;
    Cart:[FoodModel];
    orders: [OrderModel]
}

export interface ShoppingState {
    availability:FoodAvailability;
    availabilityFoods:[FoodModel]
}


export interface WeatherState {
    weather:WeatherAvailability
}


export interface UserModel {
    firstName:string;
    lastName:string;
    email:String;
    token:string;
    verified:boolean;

}


export interface CartModel {
    _id:string;
    food:FoodModel;
    unit:number
}


export interface OrderModel {
    _id:string;
    orderID:string;
    items:[CartModel];
    totalAmount:number;
    orderDate:number;
    paidThrough:string;
    paymentResponse:string;
    orderStatus:string;
}


export interface WeatherAvailability {
    base:       string;
    clouds:     Clouds;
    cod:        number;
    coord:      Coord;
    dt:         number;
    id:         number;
    main:       Main;
    name:       string;
    sys:        Sys;
    timezone:   number;
    visibility: number;
    weather:    Weather[];
    wind:       Wind;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface Main {
    feels_like: number;
    humidity:   number;
    pressure:   number;
    temp:       number;
    temp_max:   number;
    temp_min:   number;
}

export interface Sys {
    country: string;
    id:      number;
    sunrise: number;
    sunset:  number;
    type:    number;
}

export interface Weather {
    description: string;
    icon:        string;
    id:          number;
    main:        string;
}

export interface Wind {
    deg:   number;
    speed: number;
}
