import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  logo: {
    height: 300,
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 44,
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  forgotContainer: {
    marginVertical: 10,
  },
  forgotText: {
    textAlign: 'right',
    textDecorationLine: 'none',
    color: '#0165FF',
  },
  oauthContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  roundInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
  },
  textStyle: {
    textAlignVertical: 'center',
  },
  loginText: {
    fontSize: 27,
    fontWeight: '600',
    marginVertical: 22,
  },
  loginIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  dontText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A3A7AF',
  },
});
