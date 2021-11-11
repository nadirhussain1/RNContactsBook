import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contact from './screens/contacts';
import Profile from './screens/profile';
import Favourites from './screens/favourites';

import colors from './utils/colors';


const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Favourite'
      >
        <Stack.Screen
          name='List'
          component={Contact}
          options={{title:'Contacts'}}
        />

        <Stack.Screen
          name='Favourite'
          component={Favourites}
          options={{title:'Favourites'}}
        />

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={
            {
              title:'Profile',
              headerStyle:{backgroundColor:colors.blue},
              headerTintColor:'white',
            }

          }
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
