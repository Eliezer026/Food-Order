import React, {useState, useEffect} from 'react';
import { View,Text, StyleSheet, Dimensions, Image, ScrollView,FlatList } from "react-native";
import { SearchBar, ButtonWithIcon, CategoryCard, RestaurantCard } from "../components"
import { connect } from "react-redux";
import { onAvailability,UserState,ApplicationState,ShoppingState,FoodModel, onSearchFoods, Restaurant } from "../redux"
import { useNavigation } from '@react-navigation/native';



interface HomeProps{
    userReducer:UserState,
    shoppingReducer:ShoppingState,
    onAvailability:Function,
    onSearchFoods:Function;
}

export const _HomeScreen:React.FC<HomeProps> = (props) => {


    

    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;

    const { categories, foods, restaurants } = availability;

    const navigation:any = useNavigation();

    useEffect(()=> {
        
        props.onAvailability(location.postalCode);
        
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        },1000)

    },[])

    const categoriess:any = 
        [{
            id:1,
            title:"one",
            icon:"https://reactnative.dev/docs/assets/p_cat1.png"
        },{
            id:2,
            title:"two",
            icon:"https://reactnative.dev/docs/assets/p_cat1.png"

        },
        {
            id:3,
            title:"thirt",
            icon:"https://reactnative.dev/docs/assets/p_cat1.png"

        },
        {
            id:4,
            title:"four",
            icon:"https://reactnative.dev/docs/assets/p_cat1.png"

        },
    ];
     
        
        const restaurantss:any = 
        [{
            _id:1,
            name:"firts",
            foodType:"assa",
            address:"wqqw",
            phone:"212112",
            images:"https://reactnative.dev/docs/assets/p_cat1.png",
            foods:[
                {
                    _id:"1",
                    name:"firts",
                    description:"weweee",
                    category:"2",
                    price:"212",
                    readyTime:"qwwqqw",
                    images:["https://reactnative.dev/docs/assets/p_cat1.png",
                    "https://reactnative.dev/docs/assets/p_cat1.png"]
                }
            ]

        },{
            _id:2,
            name:"second",
            foodType:"ccc",
            address:"cxcxc",
            phone:"22121222",
            images:"https://reactnative.dev/docs/assets/p_cat1.png",
            foods:[
                {
                    _id:"1",
                    name:"asasa",
                    description:"wqwqw",
                    category:"2",
                    price:"",
                    readyTime:"",
                    images:[
                    "https://reactnative.dev/docs/assets/p_cat1.png",
                    "https://reactnative.dev/docs/assets/p_cat1.png"]
                }
            ]

        }];

        const foodss:any = [ 
        {
            _id:"1",
            name:"hjjhj",
            description:"njnjn",
            category:"njnj",
            price:"jjjj",
            readyTime:"nnnjn",
            images: ["https://reactnative.dev/docs/assets/p_cat1.png"]
            
        },
        {
            _id:"2",
            name:"okokoko",
            description:"mkkm",
            category:"mkmk",
            price:"kmk",
            readyTime:"njn",
            images: ["https://reactnative.dev/docs/assets/p_cat1.png"]
            
        },
    ]

    const onTapRestaurant = (item:Restaurant) => {
        navigation.navigate('RestaurantPage',{restaurant:item})

    }

    const onTapFood = (item:FoodModel) => {
        navigation.navigate('FoodDetailPage',{food:item})

    }



    return (
        <View style={styles.container} >
        <View style={styles.navigation} >
            <View style={{ marginTop:20, flex:3, backgroundColor:'white',paddingLeft:20, paddingRight:20, alignItems:"center",justifyContent:'center',flexDirection:'row' }} >
            <Text>{`${location.name},${location.postalCode},${location.country},${location.street}`}</Text>
            <Text>Edit</Text>
            </View>
            <View style={{ display:'flex', flex:3, paddingLeft:5,backgroundColor:'white', paddingRight:10 / 1.8 / 2 - 40, flexDirection:'row', alignItems:'center', marginLeft:4 }} >
                <SearchBar didTouch={() => {
                    navigation.navigate('SearchPage')

                }} onTextChange={() => {

                }} /> 
                <ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40} />
            </View>
           
        </View>
        <View style={styles.body} > 
            <ScrollView
            
            >
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoriess}
                renderItem={({item})=> <CategoryCard item={item} onTap={() => alert('hello baby')} /> }
                keyExtractor={(item)=> `${item.id} `}
                />
            
            <View>
                <Text style={{ fontSize:25, fontWeight:'600', color:'#f15b5d', marginLeft:20 }} >Top Restaurants</Text>
            </View>
        
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={restaurantss}
                renderItem={({item})=> <RestaurantCard item={item} onTap={onTapRestaurant} /> }
                keyExtractor={(item)=> `${item._id} `}
                />

                <View>
                    <Text style={{ fontSize:25, fontWeight:'600', color:'#f15b5d',marginLeft:20 }} >30 Minutes Foods</Text>
                </View>

                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={foodss}
                renderItem={({item})=> <RestaurantCard item={item} onTap={onTapFood  } /> }
                keyExtractor={(item)=> `${item._id} `}
                />

            </ScrollView>

       </View>
        
    </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF'
    },
    navigation:{
        flex:2,

    },
    body:{
        flex:10,
        justifyContent:'center',
        alignItems:'center',
    },
   
})

const mapToStateProps = (state:ApplicationState) => ({
    userReducer:state.userReducer,
    shoppingReducer:state.shoppingReducer
});

const HomeScreen = connect(mapToStateProps, {onAvailability, onSearchFoods})(_HomeScreen);

export { HomeScreen }



/**
 * 
 * return (
        <View style={styles.container} >
        <View style={styles.navigation} >
            <View style={{ marginTop:50, flex:4, backgroundColor:'white',paddingLeft:20, paddingRight:20, alignItems:"center",justifyContent:'center',flexDirection:'row' }} >
            <Text>{`${location.name},${location.postalCode},${location.country},${location.street}`}</Text>
            <Text>Edit</Text>
            </View>
            <View style={{ flex:8, backgroundColor:'green' }} >
                <Text> Search Bar</Text>
            </View>
           
        </View>
        <View style={styles.body} > 
            <Text>  Home Screen</Text>
       </View>
       <View style={styles.footer} >
           <Text> Footer</Text>
       </View> 
    </View>
    )
}
 */