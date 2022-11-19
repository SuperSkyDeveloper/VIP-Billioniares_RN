import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 300,
    bottom: 0,
    alignItems: 'center',
  },
  logoContainer: {
    height: 350,
  },
  logoInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 40,
    height: 300,
  },
  logo: {
    maxHeight: 180,
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
  mainText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  subText: {
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 20,
  },
  actionBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  iconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  actionText: {
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'white',
  },
});
