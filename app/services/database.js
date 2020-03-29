import database from '@react-native-firebase/database';
import {uploadImage} from './storage';
import {getFileName} from './utils';

export function getKey() {
  const ref = database().ref('/');
  return ref.push().key;
}

export async function storeOneForLists(id, type, item, image) {
  const storedItem = database().ref(`/${type}/${id}`);
  await storedItem.set({
    id,
    ...item,
    imageUrl: await uploadImage(
      type,
      getFileName(item.name, item.whatsApp),
      image,
    ),
  });
}
