import React,{useState, useEffect, createRef} from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { Restaurant, FoodModel,ApplicationState, onUpdateCart,UserState, onCreateOrder } from '../redux';
import { connect } from "react-redux";
import { ButtonWithIcon, ButtonWithTitle, FoodCardInfo } from "../components"
import { checkExistence } from "../utils";

import PaymentTypePopup from "react-native-raw-bottom-sheet"
import { ScrollView } from "react-native-gesture-handler";

interface CartScreenProps {
    userReducer:UserState;
    onUpdateCart:Function;
    onCreateOrder:Function;
    navigation:{navigate:Function, goBack:Function};
    route:{params:any }
}


const _CartScreen:React.FC<CartScreenProps> = (props) => {

    const [ totalAmount, setTotalAmount ] = useState(0)
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const { Cart,user,location, orders } = props.userReducer;


    const popupRef = createRef<PaymentTypePopup>();

   


    useEffect(() => {
       // console.log(orders, "orders")
       user.token="hfhfhfhfhfhhfh"
       console.log(Cart,"token")
        onCalculateAmount();

    },[Cart]);


    const onCalculateAmount = () => {
        
        let total = 0;
        if(Array.isArray(Cart)){

        Cart.map(food => {
            total += food.price * food.unit
        })

        

    }
    setTotalAmount(total)

    }


    const onTapFood = (item: FoodModel) => {
      navigate('FoodDetailPage', { food:item })
 

    }

    const onValideteOrder =() =>{
        
    if(user !== undefined){

        
        if(!user.verified){
            navigate('LoginPage')

        }else{
            console.log('Now we can Order');
            popupRef.current?.open();
        }
    }else{

        navigation.navigate('LoginPage')
    }

    }


    const onTapPlaceOrder = () => {

        
        props.onCreateOrder(Cart, user);
        popupRef.current?.close();
        console.log('Place the Order here..')

    }


    const popupView = () => {

        return(<PaymentTypePopup
        height={400}
        ref={popupRef}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
            wrapper:{
                backgroundColor:'transparent'
            },
            draggableIcon:{
                backgroundColor:'#000'
            },
            container:{
                justifyContent:'flex-start',
                alignItems:'center'
            }
        }}
        
        >
            <View 
            style={{ 
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-around',
                width:'100%',
             }}
            >
                <View style={styles.paymentView} >
                <Text style={{ fontSize:20 }} >Payment Options </Text>
                <Text style={{ fontSize:20, fontWeight:'600' }} >$ {totalAmount.toFixed(2)}</Text>

                </View>

              <View style={{ display:'flex', height:100, padding:20, flexDirection:'row' }} >
                  <Image source={require('../images/delivery_icon.png')} style={{ width:50, height:50 }} />
                  <View>
                  <Text style={{ fontSize:16, fontWeight:'600', marginBottom:5 }} >Address Used to Delivery</Text>
                  <Text style={{ fontSize:16, color:'#666666', marginBottom:5, width:Dimensions.get('screen').width - 90 }}  >{`${location.name}, ${location.street}, ${location.postalCode},${location.city}`}</Text>
                  </View>
              </View>

              <ScrollView horizontal={true} >
                  <View style={styles.paymentOptions} >
                      <TouchableOpacity onPress={() => onTapPlaceOrder()} style={styles.options} >
                          <Image source={require('../images/cod_icon.jpeg')} style={styles.icon} />
                          <Text style={styles.optionText} >Cash On Delivery</Text>
                      </TouchableOpacity>


                      <TouchableOpacity onPress={() => {}} style={styles.options} >
                          <Image source={require('../images/card_icon.jpeg')} style={styles.icon} />
                          <Text style={styles.optionText} >Card Payment</Text>
                      </TouchableOpacity>

                  </View>
              </ScrollView>

            </View> 
        </PaymentTypePopup>)
    }

    

    if(Cart.length > 0){

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                <View style={{ display:'flex', height:60, justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginLeft:4, paddingLeft:20, paddingRight:20 }} >
    
                <Text style={{ fontSize:18, fontWeight:'600' }} >My Cart</Text>
                {user.token !== undefined && <TouchableOpacity style={{ alignItems:'center' }} onPress={() => {
                    navigation.navigate('OrderPage')
                }} >
                    <Image source={require('../images/orders.png')} style={{ width:50, height:50 }} />
                </TouchableOpacity >
                
                }
                    
                </View>
    
    
                </View>
                
                <View style={styles.body} >
                <FlatList 
                showsHorizontalScrollIndicator={false}
                data={Cart}
                renderItem={({ item }) => <FoodCardInfo 
                onTap={onTapFood}
                item={checkExistence(item, Cart)}
                onUpdateCart={props.onUpdateCart}
                />}
                keyExtractor={(item) => `${item._id}`}
                />
    
                </View>

                <View style={styles.footer} >
                    <View style={styles.amountView} >
                        <Text style={{ fontSize:18 }} >Total</Text>
                        <Text style={{ fontSize:18 }} >{totalAmount}</Text>

                    </View>
                    <ButtonWithTitle title={"Order Now"} onTap={onValideteOrder} height={40} width={320} /> 

                </View>
                {popupView()}
    
            </View>
        )




    }else{

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                <View style={{ display:'flex', height:60, justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginLeft:4, paddingLeft:20, paddingRight:20 }} >
    
                <Text style={{ fontSize:18, fontWeight:'600' }} >My Cart</Text>
                {user.token !== undefined && <TouchableOpacity style={{ alignItems:'center' }} onPress={() => {
                    navigation.navigate('OrderPage')
                }} >
                    <Image source={require('../images/orders.png')} style={{ width:50, height:50 }} />
                </TouchableOpacity >
                
                }
                
                </View>
    
    
                </View>
                
                <View style={styles.body} >
                <Text style={{ fontSize:25, fontWeight:'600' }} >Your Cart is Empty</Text>
    
                </View>

               
    
            </View>
        )



      /* return <View style={{ flex:1, display:'flex', justifyContent:'center', alignItems:'center' }} >
            <Text style={{ fontSize:25, fontWeight:'700' }} >Your Cart is Empty!!</Text>
        </View>*/

    }


    


}


const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#F2F2F2'},
    navigation:{flex:1, marginTop:43},
    body:{flex:9, justifyContent:'center', alignItems:'center'},
    footer:{flex:2, padding:10},
    paymentView:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10,
        margin:5,
        backgroundColor:'#E3BE74'
    },
    paymentOptions:{
        display:'flex',
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10

    },
    options:{
        display:'flex',
        height:126,
        width:160,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column',
        padding:10,
        borderColor:'#A0A0A0',
        backgroundColor:'#F2F2F2',
        borderWidth:0.2,
        borderRadius:10,
        margin:10

,
    },
    icon:{
        width:115,
        height:80
    },
    optionText:{

        fontSize:16, fontWeight:'600', color:'#545252'
    },
    amountView:{display:'flex', flexDirection:'row', justifyContent:'space-between',paddingLeft:20, paddingRight:20}
})

const mapStateToProps = (state:ApplicationState) => ({
    shoppingReducer:state.shoppingReducer,
    userReducer:state.userReducer

})

const CartScreen = connect(mapStateToProps,{onUpdateCart, onCreateOrder})(_CartScreen)
export { CartScreen }
















/*import React from 'react';
import { View,Text, StyleSheet, Dimensions, Image } from "react-native"


export const CartScreen = () => {
    return (
        <View style={styles.container} >
        <View style={styles.navigation} ><Text>Navigation</Text></View>
        <View style={styles.body} > 
            <Text>  Cart Screen</Text>
       </View>
       <View style={styles.footer} >
           <Text> Footer</Text>
       </View> 
    </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'green'
    },
    navigation:{
        flex:2,
        backgroundColor:'red'
    },
    body:{
        flex:9,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'yellow'
    },
    footer:{
        flex:1,
        backgroundColor:'cyan'
    }
})*/