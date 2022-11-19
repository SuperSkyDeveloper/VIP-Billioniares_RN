import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  topLinearGradient: {
    height: 4,
  },
  mainContainer: {
    padding: 20,
    height: '100%',
  },
  logoContainer: {
    marginVertical: 40,
  },
  logo: {
    height: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  logoText: {
    maxWidth: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  welcome: {
    marginTop: 60,
  },
  welcomeText: {
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  submitBtn: {
    marginBottom: 20,
  },
  buttonWrap: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
});