/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Veterinaries from './app/screens/drawer/veterinaries';
import Products from './app/screens/drawer/products';
import Wholesales from './app/screens/drawer/wholesales';
import User from './app/screens/drawer/user';

import Lost from './app/screens/bottom-tab/lost';
import Found from './app/screens/bottom-tab/found';
import Adopt from './app/screens/bottom-tab/adopt';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

function createBottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Perdidos"
      activeColor="#fefacb"
      inactiveColor="#552419"
      barStyle={{backgroundColor: '#fec90b'}}>
      <Tab.Screen
        name="Perdidos"
        component={Lost}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Encontrados"
        component={Found}
        options={{
          tabBarIcon: ({color}) => <Icon name="dog" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Adoptar"
        component={Adopt}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function createDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      drawerStyle={{
        backgroundColor: '#fefacb',
        width: 150,
      }}
      drawerContentOptions={{
        activeTintColor: '#fec90b',
        inactiveTintColor: '#552419',
        itemStyle: {marginVertical: 1},
      }}>
      <Drawer.Screen name="Inicio" children={createBottomTabs} />
      <Drawer.Screen name="Veterinarias" component={Veterinaries} />
      <Drawer.Screen name="Productos" component={Products} />
      <Drawer.Screen name="Mayoristas" component={Wholesales} />
      <Drawer.Screen name="Usuario" component={User} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return <NavigationContainer>{createDrawer()}</NavigationContainer>;
}
