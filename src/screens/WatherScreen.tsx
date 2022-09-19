import React,{useState,useEffect} from 'react';
import { View,Text } from "react-native";
import axios from 'axios';


import { connect } from "react-redux"
import { onUpdateLocationWeather, UserState, ApplicationState } from "../redux"


interface WeatherProps {
    onUpdateLocationWeather:Function
}

export const _WatherScreen:React.FC<WeatherProps> = (props) => {

    const { onUpdateLocationWeather } = props
    const [weatherData, setWeatherData] = useState<any>();
    const [loaded, setLoaded] = useState(true)


    useEffect(() => {

        onUpdateLocationWeather('cali')
       // weatheraxios('cali');

        

    },[])

    const weatheraxios = async (city:string) => {

        const SECRET_KEY = "0cbfc74e093c31b8325fedc59ee93c3c";
        const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${SECRET_KEY}`;
    

    try {

       /* const reponse = await fetch(BASE_URL);

        if(reponse.status === 200) {
            const data = await reponse.json();
            setWeatherData(data);
                console.log(data, 'dates')
            
        }else{
            console.log("problem")
        }*/

        axios.get<any>(BASE_URL)
        .then(response => {
         const posts = response.data;
         console.log(posts)
         setWeatherData(posts);
})

    }catch(error){

    }
    }
    return (
        <View>

            <Text> Water</Text>
        
        </View>
    )
}



const mapToStateProps = (state:ApplicationState) => ({
    weatherReducer:state.weatherReducer
});

const WatherScreen = connect(mapToStateProps, { onUpdateLocationWeather})(_WatherScreen)


export {WatherScreen}