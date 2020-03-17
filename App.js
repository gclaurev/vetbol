import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Veterinaries from './app/screens/drawer/veterinaries';
import Products from './app/screens/drawer/products';
import Wholesales from './app/screens/drawer/wholesales';
import User from './app/screens/drawer/user';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Veterinarias">
        <Drawer.Screen name="Veterinarias" component={Veterinaries} />
        <Drawer.Screen name="Productos" component={Products} />
        <Drawer.Screen name="Mayoristas" component={Wholesales} />
        <Drawer.Screen name="Usuario" component={User} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
