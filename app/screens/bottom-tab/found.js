import React from 'react';
import {SafeAreaView, Text, View, Button} from 'react-native';

export default function Found() {
  return (
    <SafeAreaView>
      <View>
        <Button title="New items" />
        <View>
          <Text>Click para subir foto</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
