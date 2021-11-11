import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Contacts from './screens/contacts';
import Profile from './screens/profile';
import Favourites from './screens/favourites';
import User from './screens/user';

import colors from './utils/colors';


const ContactsStack = createNativeStackNavigator();
const FavouritesStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


function ContactsStackScreens(){
  return(
    <ContactsStack.Navigator
      initialRouteName='List'  >

      <ContactsStack.Screen
        name='List'
        component={Contacts}
        options={{headerShown: false}}

      />

      <ContactsStack.Screen
        name='Profile'
        component={Profile}
        options={{headerShown: false}}
      />

    </ContactsStack.Navigator>
  );
}

function FavouritesStackScreens(){
  return(
    <FavouritesStack.Navigator
      initialRouteName='Favourites'  >

      <FavouritesStack.Screen
        name='Favourites'
        component={Favourites}
        options={{headerShown: false}}
      />

      <FavouritesStack.Screen
        name='Profile'
        component={Profile}
        options={{headerShown: false}}

      />

    </FavouritesStack.Navigator>
  );
}

function UserStackScreens(){
  return(
    <UserStack.Navigator
      initialRouteName='User'  >

      <UserStack.Screen
        name='User'
        component={User}
        options={{headerShown: false}}
      />


    </UserStack.Navigator>
  );
}

export default function App(){

  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
         headerShown: false
      }}>
           <Tab.Screen
             name="Contacts"
             component={ContactsStackScreens}
           />
           <Tab.Screen
             name="Favourites"
             component={FavouritesStackScreens}

           />
           <Tab.Screen
             name="Me"
             component={UserStackScreens}

           />

         </Tab.Navigator>
    </NavigationContainer>
  );
}
