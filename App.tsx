import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { LandingScreen} from './src/screens';
import { TabScreen } from "./src/utils"
import { StackScreen} from "./src/utils/StackScreen";

import { Provider } from "react-redux";
import { store } from "./src/redux"

/*import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack"
import { createBottomTabNavigator } from 'react-navigation-tabs';

const switchNavigation = createStackNavigator({

  landingScreen:{
    screen:createStackNavigator({
      Landing:LandingScreen,
    },
    {
      defaultNavigationOptions:{
        headerShown:false,
      }

    })
  },
  homeStack:createBottomTabNavigator({

    home:{
      screen:createStackNavigator({
          HomePage:HomeScreen
      }),
      navigationOptions:{
        tabBarIcon:({focused, tintColor})=> {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png')

          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    //////
    offer:{
      screen:createStackNavigator({
          HomePage:HomeScreen
      }),
      navigationOptions:{
        tabBarIcon:({focused, tintColor})=> {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png')

          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    cart:{
      screen:createStackNavigator({
          HomePage:HomeScreen
      }),
      navigationOptions:{
        tabBarIcon:({focused, tintColor})=> {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png')

          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    account:{
      screen:createStackNavigator({
          HomePage:HomeScreen
      }),
      navigationOptions:{
        tabBarIcon:({focused, tintColor})=> {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png')

          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
  })

})

const AppNavigation = createAppContainer(switchNavigation)*/


export default function App() {
  return (
    <Provider store={store} >
<StackScreen />
    </Provider>
    
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
