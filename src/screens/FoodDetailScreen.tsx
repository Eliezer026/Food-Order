import React from 'react'
import { View, Text, StyleSheet, ImageBackground,Dimensions,FlatList } from 'react-native';
import { FoodModel } from "../redux";
import { ButtonWithIcon, FoodCard } from "../components"


interface FoodDetailProps {
    navigation:{navigate:Function, goBack: Function};
    route:{ params:any}
}

const FoodDetailScreen:React.FC<FoodDetailProps> = (props) => {

    const { params } = props.route;
    const { navigate, goBack } = props.navigation
    const datesfood = params['food'] as FoodModel 

    console.log(datesfood)

    


    return (
        <View style={styles.container} >
            <View style={styles.navigation} >
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} /> 
                <Text style={{ fontSize:22, fontWeight:'600', marginLeft:60 }} >{datesfood.name}</Text>
            </View>
            <View style={styles.body} >
                <ImageBackground
                 source={{ uri:`${datesfood.images}` }}
                 style={{ width:Dimensions.get('screen').width,height:300,justifyContent:'flex-end' }}
                >
                  <View style={{ height:120, backgroundColor:'rgba(0,0,0,0.6)', padding:10 }} >
                      <Text style={{ color:'#FFF', fontSize:40, fontWeight:'400' }} >{datesfood.name}</Text>
                      <Text style={{ color:'#FFF', fontSize:25, fontWeight:'500' }} >{datesfood.category}</Text>
                  </View>  
                </ImageBackground>
                <View style={{ display:'flex', height:300, padding:20 }} >
                    <Text>Food  Will be ready within{datesfood.readyTime} Minute(s)</Text>
                    <Text>{datesfood.description}</Text>
                </View>
                <View style={{ height:120, }} >
                    <FoodCard item={datesfood} onTap={() =>{}} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1, backgroundColor:'#F2F2F2',},
    navigation:{flex:1, marginTop:43, paddingLeft:10, flexDirection:'row',alignItems:'center', },
    body:{ flex:10, justifyContent:'flex-start', alignItems:'center', backgroundColor:'#FFF' , paddingBottom:160}

})

export {FoodDetailScreen}

