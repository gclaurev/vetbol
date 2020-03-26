import database from '@react-native-firebase/database';

export function getKey() {
  const ref = database().ref('/');
  return ref.push().key;
}

export async function storeOne(id, type, item) {
  const storedItem = database().ref(`/${type}/${id}`);
  await storedItem.set({
    id,
    ...item,
  });
}
