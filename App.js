import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ContactsScreen from './screens/ContactsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Provider } from 'react-redux'; // Redux'un Provider bileşenini içe aktarın
import store from './src/store/store'; // Redux store'u burada içe aktarın

const Tab = createBottomTabNavigator();

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
            component={FavoritesScreen}
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

export default App;
