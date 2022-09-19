import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingScreen, SearchScreen, FoodDetailScreen, LoginScreen, RestaurantScreen,OrderScreen, OrderDetailscreen  } from '../screens';
import { TabScreen } from "./TabScreen"
const Stack = createNativeStackNavigator();

export const StackScreen = () =>{

  const options = {
    headerShown:false
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Landing"  component={LandingScreen} options={options} />
          <Stack.Screen name="TabScreen" component={TabScreen} options={options} />
          <Stack.Screen name="SearchPage" component={SearchScreen} options={options}  />
          <Stack.Screen name="FoodDetailPage" component={FoodDetailScreen} options={options}/>
          <Stack.Screen name="RestaurantPage" component={RestaurantScreen} options={options}/>
          <Stack.Screen name="LoginPage" component={LoginScreen} options={options}/>
          <Stack.Screen name="OrderPage" component={OrderScreen} options={options}/>
          <Stack.Screen name="OrderDetailPage" component={OrderDetailscreen} options={options}   />
      </Stack.Navigator>
    </NavigationContainer>
  );
}