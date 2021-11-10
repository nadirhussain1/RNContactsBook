import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Contact from './screens/contacts';
import Profile from './screens/profile';

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='List'
          component={Contact}
          options={{title:'Contacts'}}
        />

        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{title:'Profile'}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
