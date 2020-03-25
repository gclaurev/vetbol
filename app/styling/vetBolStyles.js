import { StyleSheet } from 'react-native';
import { colors } from './colors';

export default StyleSheet.create({
  //Bottom tab
  safeArea: {
    backgroundColor: colors.backgroundYellow,
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
    transform: [{ rotate: '45deg' }],
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
    marginBottom: 3,
  },
  overlayDateButtonTitle: {
    color: colors.brown,
  },
});
