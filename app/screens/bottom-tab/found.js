import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, Button, FlatList} from 'react-native';

import {getKey, storeOne} from '../../services/database';

export default function Found() {
  async function storeItem() {
    const id = getKey();
    const item1 = 'item1';
    const toStore = {
      item1,
      item2: 'item2',
      item3: 'item3',
      item4: 'item4' + Math.random(),
    };
    storeOne(id, 'lost', toStore);
  }

  return (
    <SafeAreaView>
      <View>
        <Button title="New items" onPress={storeItem} />
      </View>
    </SafeAreaView>
  );
}
