import React,{useState, useEffect} from 'react';
import { connect } from "react-redux"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from "react-native";
import { ApplicationState, FoodModel, ShoppingState, onUpdateCart, UserState } from "../redux";
import { ButtonWithIcon, FoodCard, SearchBar } from "../components"
import { checkExistence } from '../utils';

interface SearchScrenProps {
    shoppingReducer:ShoppingState;
    userReducer:UserState;
    navigation:{navigate:Function, goBack:Function};
    onUpdateCart:Function;
    
}

const _SearchScreen:React.FC<SearchScrenProps> = (props) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [keyword, setKeyWord] = useState('');
    const { availabilityFoods } = props.shoppingReducer;
    const { goBack, navigate } = props.navigation;


    

    const foods = [ 
        {
            _id:"1",
            name:"abel",
            description:"njnjn",
            category:"njnj",
            price:234,
            readyTime:"ss",
            images: ["https://reactnative.dev/docs/assets/p_cat1.png",],
            unit:0
            
        },
        {
            _id:"2",
            name:"juan",
            description:"mkkm",
            category:"mkmk",
            price:234,
            readyTime:"ss",
            images: ["https://reactnative.dev/docs/assets/p_cat1.png",],
            unit:0
            
        },
    ]

    

    const onTapFood = (item:FoodModel) => {
        navigate("FoodDetailPage", {food:item})

    }
    const { Cart } = props.userReducer
    console.log(Cart)
    return (
        <View style={styles.container}>
            <View style={styles.navigation} >
            <View style={{ display:'flex', flex:3, paddingLeft:5,backgroundColor:'white', paddingRight:10 / 1.8 / 2 - 40, flexDirection:'row', alignItems:'center', marginLeft:4 }} >
            <ButtonWithIcon icon={require('../images/back_arrow.png')} width={40} height={40} onTap={() => goBack()} />
                <SearchBar onTextChange={setKeyWord} onEndEditing={() => setIsEditing(false)} didTouch={() => setIsEditing(true)} /> 
            </View>
            </View>

            <View style={styles.body} >
                <FlatList 
                showsHorizontalScrollIndicator={false}
                data={
                    isEditing
                    ?
                    foods.filter((item) => {
                        return item.name.includes(keyword)
                    })
                    : foods
                }
                renderItem={({item}) => <FoodCard onTap={onTapFood} item={checkExistence(item, Cart)} onUpdateCart={props.onUpdateCart} />}
                keyExtractor={(item) => `${item._id}`}
                />

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{ flex:1, backgroundColor:'#F2F2F2'},
    navigation:{ flex:1, marginTop:43, },
    body:{ flex:10, justifyContent:'center', alignItems:'center' }
})

const mapStateToProps = (state:ApplicationState) => ({
    shoppingReducer:state.shoppingReducer,
    userReducer:state.userReducer
})

const SearchScreen = connect(mapStateToProps,{onUpdateCart})(_SearchScreen) 

export {SearchScreen}
