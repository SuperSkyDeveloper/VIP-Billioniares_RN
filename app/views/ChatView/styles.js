import { StyleSheet } from 'react-native';
import { COLOR_BORDER } from '../../constants/colors';
import sharedStyles from '../../views/Styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bottomLinearGradient: {
    height: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    maxHeight: 100,
    borderRadius: 25,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 4,
    paddingRight: 12,
    marginVertical: 8,
    fontSize: 16,
    flexWrap: 'wrap',
    marginLeft: 8,
  },
  actionButtonContainer: {
    marginHorizontal: 4,
    backgroundColor: 'rgba(229, 229, 229, 0.81)',
    width: 33,
    height: 33,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPhoto: {
    width: 18,
    height: 15,
    resizeMode: 'contain',
  },
  actionButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  btnContainer: {
    marginRight: 12,
  },
  sendBtn: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  messageContainer: {
    paddingHorizontal: 4,
    marginVertical: 2,
  },
  messageOwnContent: {},
  messageContent: {},
  messageInnerContent: {
    marginHorizontal: 4,
    minHeight: 42,
    minWidth: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  photoInnerContent: {
    marginHorizontal: 8,
    position: 'relative',
  },
  contentBackground: {
    width: 48,
    height: 36,
    resizeMode: 'contain',
    position: 'absolute',
  },
  contentOtherBackground: {
    transform: [{ rotateY: '180deg' }],
    width: 48,
    height: 36,
    resizeMode: 'contain',
    position: 'absolute',
  },
  messageOwnText: {
    fontSize: 14,
    lineHeight: 21,
  },
  messageOtherText: {
    fontSize: 14,
    lineHeight: 21,
  },
  imageMsg: {
    width: 200,
    height: 200,
    padding: 4,
    marginRight: 5,
    marginTop: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageOtherMsg: {
    width: 200,
    height: 200,
    padding: 4,
    marginLeft: 5,
    marginTop: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photoMessage: {
    width: '100%',
    height: '100%',
  },
  noPosts: {
    marginTop: 40,
    alignSelf: 'center',
  },
  dateSeparator: {
    marginVertical: 8,
  },
  dateSepText: {
    textAlign: 'center',
    fontSize: 12,
  },
  activeImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000000E0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 27,
  },
});
