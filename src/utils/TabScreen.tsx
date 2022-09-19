import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import {  WatherScreen, HomeScreen, AccountScreen,OfferScreen,CartScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();


const options:any = {
  headerShown:false,
  

}

export const TabScreen =()=> {
  return (
    
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused == true ? require('../images/home_icon.png') : require('../images/home_n_icon.png')
            }  else if(route.name === "Offer"){
              iconName = focused == true ? require('../images/offer_icon.png') : require('../images/offer_n_icon.png')
            } else if(route.name === "Cart"){
              iconName = focused == true ? require('../images/cart_icon.png') : require('../images/cart_n_icon.png')
            } else if(route.name === "Account"){
              iconName = focused == true ? require('../images/account_icon.png') : require('../images/account_n_icon.png')
            }

            // You can return any component that you like here!
            return  <Image source={iconName} style={styles.tabIcon} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })} initialRouteName="Account" >
          <Tab.Screen name="Wather" component={WatherScreen} options={options}  />
          <Tab.Screen name="Home" component={HomeScreen} options={options} />
          <Tab.Screen name="Offer" component={OfferScreen} options={options}  />
          <Tab.Screen name="Cart" component={CartScreen} options={options} />
          <Tab.Screen name="Account" component={AccountScreen} options={options}  />
          
      </Tab.Navigator>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon:{
    width:30,
    height:30
  }
});
