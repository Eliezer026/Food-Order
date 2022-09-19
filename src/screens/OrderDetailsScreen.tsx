import React,{useState, useEffect} from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions, FlatList, Image, TouchableOpacity,Alert } from "react-native";
import { ApplicationState,UserState,  onGetOrders, OrderModel, onCancelOrders } from '../redux';
import { connect } from "react-redux";
import { ButtonWithIcon, ButtonWithTitle, FoodCard, FoodCardInfo, OrderCard } from "../components"
import moment from "moment";

interface OrderDetailScreenProps {
    userReducer:UserState;
    onCancelOrders:Function;
    navigation:{navigate:Function, goBack:Function};
    route:{params:any }
}


const _OrderDetailscreen:React.FC<OrderDetailScreenProps> = (props) => {


    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const { user} = props.userReducer;

   
    const order = route.params['order'] as OrderModel;

    const onTapCancelOrder = () => {

        Alert.alert(
            "Do you want to cancel this Order?",
            "Cancellation charge my applicable as per terms and conditions",
            [
                { text:'Cancel', onPress:() => {}, style:"cancel"},
                {text:'Yes', onPress:() => {
                    props.onCancelOrders(order, user);
                    navigation.goBack();
                }}
            ]
        )

    }


    const headerCart = () => {


        return (
            <View style={{ padding:10, alignItems:'flex-start' }} >
                <Text style={styles.orderInfo} >Order Date:{moment(order.orderDate).format('Do MM YY, h:mm a')} </Text>
                <Text style={styles.orderInfo}>Paid Through: {order.paidThrough}</Text>
                <Text style={styles.orderInfo}>Status: {order.orderStatus}</Text>
                
            </View>
        )
    }


    const footerCard = () => {

        if(order.orderStatus.toLowerCase() === "cancelled"){

            return (
                <>
                <View style={{ marginBottom:10, justifyContent:'center',  alignItems:'center', height:200 }} >
                    <Text>Order is Cancelled with ID : XXXX</Text>
                </View>
                </>
            )

        }else{

            return (
                <>
                <View style={{ display:'flex', margin:10, marginBottom:10, justifyContent:'center',  alignItems:'center', height:300, backgroundColor:'#C5C5C5' }} >
                    <Text>Map view will go here</Text>
                </View>

                <View>
                    <ButtonWithTitle title={"Cancel Order"} onTap={() => onTapCancelOrder()} height={30} width={320} />
                </View>
                </>
            )

        }
    }

    console.log(order);

   

        return(
            <View style={styles.container} >
                <View style={styles.navigation} >
                <View style={{ display:'flex', height:60, justifyContent:'flex-start', flexDirection:'row', alignItems:'center', marginLeft:4, paddingLeft:20, paddingRight:20 }} >
    
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => navigation.goBack()} width={32} height={38} />
                <Text style={{ fontSize:18, fontWeight:'600', marginLeft:30 }}> Order ID:{order.orderID}</Text>
                
                
                </View>
    
    
                </View>
                
            
            <View style={styles.body} >
             <FlatList 
                showsHorizontalScrollIndicator={false}
                data={order.items}
                renderItem={({ item }) => <FoodCard
                onUpdateCart={() =>{}}
                onTap={() => {}}
                item={item.food}
                unit={item.unit}
               
                />}
                keyExtractor={(item) => `${item._id}`}
                ListHeaderComponent={headerCart}
                ListFooterComponent={footerCard}
                /> 
    
                </View>

                
    
                </View>

               
    
            
        )



      /* return <View style={{ flex:1, display:'flex', justifyContent:'center', alignItems:'center' }} >
            <Text style={{ fontSize:25, fontWeight:'700' }} >Your Cart is Empty!!</Text>
        </View>*/




    


}


const styles = StyleSheet.create({
    container:{flex:1, backgroundColor:'#F2F2F2'},
    navigation:{flex:1, marginTop:43},
    body:{flex:11, justifyContent:'center', alignItems:'center'},

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
    orderInfo:{
      fontSize:22,
      color:'#7C7C7C',
      fontWeight:'400',
      marginBottom:10
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

const OrderDetailscreen = connect(mapStateToProps,{onCancelOrders})(_OrderDetailscreen)
export { OrderDetailscreen }