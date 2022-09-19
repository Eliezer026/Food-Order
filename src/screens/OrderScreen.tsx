import React,{useState, useEffect} from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { Restaurant, FoodModel,ApplicationState, onUpdateCart,UserState, onCreateOrder, onGetOrders, OrderModel } from '../redux';
import { connect } from "react-redux";
import { ButtonWithIcon, ButtonWithTitle, FoodCardInfo, OrderCard } from "../components"


interface OrderScreenProps {
    userReducer:UserState;
    onGetOrders:Function;
    navigation:{navigate:Function, goBack:Function};
    route:{params:any }
}


const _OrderScreen:React.FC<OrderScreenProps> = (props) => {


    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const { Cart,user,location, orders } = props.userReducer;

   


    useEffect(() => {
    
       // console.log(orders, "orders")
       props.onGetOrders(user)

    },[]);


    const onTapOrder = (order:OrderModel) => {
        navigation.navigate('OrderDetailPage',{order:order})

    }


   
    const orderView = () => {


        



        const orderArray:any = [{
            _id:"1",
            orderID:"234554433",
            items:[{
            _id:"211221212",    
            food:{                
            _id:"1",
            name:"hjjhj",
            description:"njnjn",
            category:"njnj",
            price:"jjjj",
            readyTime:"nnnjn",
            images: ["https://reactnative.dev/docs/assets/p_cat1.png"]},
             unit:2,   
            }
            ],
            totalAmount:123,
            orderDate:new Date(),
            paidThrough:"fkfkf",
            paymentResponse:"fgggfgf",
            orderStatus:"Waiting",
        }]

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                <View style={{ display:'flex', height:60, justifyContent:'flex-start', flexDirection:'row', alignItems:'center', marginLeft:4, paddingLeft:20, paddingRight:20 }} >
    
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigation.goBack()} width={32} height={38} />
                <Text style={{ fontSize:22, fontWeight:'600', marginLeft:30 }} > My Orders</Text>
                
                    
                </View>
    
    
                </View>
                
                <View style={styles.body} >
             <FlatList 
                showsHorizontalScrollIndicator={false}
                data={orderArray}
                renderItem={({ item }) => <OrderCard 
                onTap={() => onTapOrder(item)}
                item={item}
               
                />}
                keyExtractor={(item) => `${item._id}`}
                /> 
    
                </View>

                <View style={styles.footer} >
                    

                </View>

    
            </View>
        )


    }

    

    if(orders!==undefined){
        //orders.length > 0

        
      return orderView();



    }else{

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                <View style={{ display:'flex', height:60, justifyContent:'flex-start', flexDirection:'row', alignItems:'center', marginLeft:4, paddingLeft:20, paddingRight:20 }} >
    
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigation.goBack()} width={32} height={38} />
                <Text style={{ fontSize:18, fontWeight:'600' }}> my Orders</Text>
                
                
                </View>
    
    
                </View>
                
                <View style={styles.body} >
                <Text style={{ fontSize:25, fontWeight:'600' }} >Your Orders is Empty</Text>
    
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
    
    userReducer:state.userReducer

})

const OrderScreen = connect(mapStateToProps,{onGetOrders})(_OrderScreen)
export { OrderScreen }