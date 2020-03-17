import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <View>
          <Text>Soy App!</Text>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
