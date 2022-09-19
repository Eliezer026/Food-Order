import React from 'react'
import { View, Text, StyleSheet,ImageBackground,Dimensions, FlatList } from 'react-native';
import { Restaurant, FoodModel,ApplicationState, onUpdateCart,UserState } from '../redux';
import { connect } from "react-redux"
import { ButtonWithIcon } from "../components"
import { FoodCard } from "../components";
import { checkExistence} from "../utils"


interface RestaurantProps {
    userReducer: UserState;
    onUpdateCart: Function; 
    navigation:{navigate:Function, goBack:Function};
    route:{params: any}
}
const _RestaurantScreen:React.FC<RestaurantProps> = (props) => {

    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const datesrestaurant = route.params["restaurant"] as Restaurant;
    const { Cart } = props.userReducer


    const onTapFood = (item:FoodModel) => {
        navigation.navigate('FoodDetailPage',{food:item})

    }

    console.log(Cart)

    return (
        <View style={styles.container}>
        <View style={styles.navigation} >
            <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
            <Text style={{ fontSize:22, fontWeight:'600', marginLeft:80 }} >{datesrestaurant.name}</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground
                source={{ uri:`${datesrestaurant.images}` }}
                style={{ width:Dimensions.get('screen').width,height:300,justifyContent:'flex-end' }}
                >
                    <View style={{ height:120, backgroundColor:'rgba(0,0,0,0.6)', padding:10 }} >
                        <Text style={{ color:'#FFF', fontSize:40, fontWeight:'700' }} >{datesrestaurant.name}</Text>
                        <Text style={{ color:'#FFF', fontSize:25,fontWeight:'500' }}> {datesrestaurant.phone}</Text>

                    </View>

                </ImageBackground>
                <FlatList 
                showsHorizontalScrollIndicator={false}
                data={datesrestaurant.foods}
                renderItem={({item}) => <FoodCard item={checkExistence(item, Cart)} onTap={onTapFood} onUpdateCart={props.onUpdateCart}   />}
                keyExtractor={(item) => `${item._id}`}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#F2F2F2'},
    navigation:{flex:1, marginTop:43, paddingLeft:10, flexDirection:'row', alignItems:'center'},
    body:{flex:10, justifyContent:'flex-start', alignItems:'center',backgroundColor:'#FFF'},


})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer:state.userReducer
})

const RestaurantScreen = connect(mapStateToProps,{onUpdateCart})(_RestaurantScreen)

export {RestaurantScreen}
