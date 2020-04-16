import {StyleSheet, PixelRatio} from 'react-native';
import {colors} from './colors';

export default StyleSheet.create({
  //Title
  title: {
    color: colors.brown,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 15,
  },
  //Bottom tab
  headerImageContainer: {
    alignItems: 'center',
  },
  headerImage: {
    height: 100,
    width: '95%',
    resizeMode: 'contain',
  },
  bottomCat: {
    position: 'absolute',
    width: 50,
    height: 91,
    resizeMode: 'contain',
    bottom: 0,
    left: 95,
  },
  bottomDog: {
    position: 'absolute',
    width: 60,
    height: 60,
    resizeMode: 'contain',
    bottom: 55,
    right: 5,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.red,
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.backgroundYellow,
    fontSize: 25,
    justifyContent: 'center',
  },

  //Overlay
  closeOverlay: {
    backgroundColor: colors.red,
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '45deg'}],
  },
  closeButtonText: {
    color: colors.backgroundYellow,
    fontSize: 20,
    justifyContent: 'center',
  },
  overlayTitle: {
    color: colors.brown,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  overlayLabel: {
    marginLeft: 15,
    color: colors.brown,
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 3,
  },
  overlayTextInput: {
    color: colors.brown,
    paddingLeft: 15,
    fontSize: 12,
    borderRadius: 18,
    height: 35,
    backgroundColor: colors.backgroundYellow,
    borderColor: colors.darkYellow,
    borderWidth: 1,
    marginBottom: 3,
  },
  overlayDateButton: {
    backgroundColor: colors.darkYellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    height: 35,
    borderColor: colors.darkYellow,
    borderWidth: 1,
    marginBottom: 5,
  },
  overlayDateButtonTitle: {
    color: colors.brown,
  },
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: colors.backgroundYellow,
    borderColor: colors.darkYellow,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  overlayFinishButton: {
    backgroundColor: colors.darkYellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    height: 35,
    borderColor: colors.darkYellow,
    borderWidth: 1,
    marginTop: 5,
  },
  overlayCheckBoxText: {
    color: colors.brown,
    fontSize: 10,
  },
  overlayTextInputHours: {
    alignItems: 'center',
    height: 35,
    width: 42,
    color: colors.brown,
    fontSize: 12,
    backgroundColor: colors.backgroundYellow,
    borderColor: colors.darkYellow,
    borderWidth: 1,
  },
  overlayLabelHours: {
    color: colors.brown,
    fontSize: 12,
    textAlign: 'center',
  },
  overlayHoursRow: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  //Item
  itemContainer: {
    flexDirection: 'row',
    height: 115,
    borderColor: colors.brown,
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  itemImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 15,
  },
  itemContent: {
    flex: 2,
    flexDirection: 'column',
  },
  itemName: {
    color: colors.brown,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  itemText: {
    color: colors.brown,
    fontSize: 12,
  },

  //Item Overlay
  itemOverlayName: {
    color: colors.brown,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  itemOverlayImageContainer: {
    alignItems: 'center',
    margin: 5,
  },
  itemOverlayImage: {
    height: 200,
    width: 200,
    borderRadius: 30,
  },
  itemOverlayWhatsAppLabel: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 5,
  },
  itemOverlayWhatsApp: {
    backgroundColor: colors.whatsApp,
    borderRadius: 18,
    height: 35,
    marginTop: 5,
    marginBottom: 5,
  },
  itemOverlayLabel: {
    marginLeft: 15,
    color: colors.brown,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 3,
  },
  itemOverlayLabelText: {
    marginLeft: 15,
    color: colors.brown,
    fontSize: 12,
    textAlign: 'left',
    marginBottom: 3,
  },

  //Item Vet
  itemContainerVet: {
    borderRadius: 25,
    flexDirection: 'row',
    height: 135,
    borderColor: colors.brown,
    borderWidth: 1,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
  },
  itemImageContainerVet: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContentVet: {
    flex: 2.5,
    flexDirection: 'column',
  },
  itemImageVet: {
    height: 115,
    width: 115,
    borderRadius: 20,
  },
  itemNameVet: {
    color: colors.brown,
    fontSize: Platform.OS === 'ios' ? 12 :10,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 1,
  },
  itemTextTitleVet: {
    fontWeight: 'bold',
    color: colors.brown,
    fontSize: Platform.OS === 'ios' ? 10 :8,
  },
  itemTextVet: {
    color: colors.brown,
    fontSize: Platform.OS === 'ios' ? 10 :8,
    marginBottom: -2,
  },

  //Others
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
