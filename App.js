import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ContactsScreen from './screens/ContactsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Provider } from 'react-redux';
import store from './src/store/store'; 
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Kişiler"
            component={ContactsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Favoriler"
            component={StacNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="star-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

function StacNavigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name = 'Favori' options={{headerShown:false}} component={FavoritesScreen}/>
      <Stack.Screen name = 'Detaylar'  component={DetailScreen}/>
    </Stack.Navigator>
  )
}


export default App;
