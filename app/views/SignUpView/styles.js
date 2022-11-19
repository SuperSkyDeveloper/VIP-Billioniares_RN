import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  logo: {
    maxHeight: 300,
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 44,
  },
  inputStyle: {
    height: 36,
    fontSize: 16,
    paddingVertical: 0,
  },
  selectStyle: {},
  textareaStyle: {
    height: 120,
    textAlignVertical: 'top',
    paddingVertical: 24,
  },
  submitBtn: {
    marginTop: 12,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  oauthContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  forgotContainer: {
    marginVertical: 20,
  },
  forgotText: {
    textAlign: 'center',
    textDecorationLine: 'none',
  },
  back: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 0,
  },
  terms: {
    flexDirection: 'row',
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  signupText: {
    fontSize: 27,
    fontWeight: '600',
    marginVertical: 22,
  },
  loginIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
});
