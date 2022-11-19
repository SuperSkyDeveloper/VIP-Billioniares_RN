import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

import { withTheme } from '../../theme';
import KeyboardView from '../../containers/KeyboardView';
import StatusBar from '../../containers/StatusBar';
import sharedStyles from '../Styles';
import styles from './styles';
import images from '../../assets/images';
import Button from '../../containers/Button';
import { loginSuccess as loginSuccessAction } from '../../actions/login';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { showErrorAlert, showToast } from '../../lib/info';
import { isValidEmail } from '../../utils/validators';
import firebaseSdk from '../../lib/firebaseSdk';
import { CURRENT_USER } from '../../constants/keys';
import { appStart as appStartAction } from '../../actions/app';
import I18n from '../../i18n';
import { VectorIcon } from '../../containers/VectorIcon';
import {
  HEADER_BAR_END,
  HEADER_BAR_START,
  NAV_BAR_START,
  themes,
} from '../../constants/colors';
import FloatingTextInput from '../../containers/FloatingTextInput';

const theme = 'light';

const SignInView = (props) => {
  const navigation = useNavigation();
  const { loginSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const onGoToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const forgotPassword = () => {
    setShowResetPassword(true);
  };

  const isValid = () => {
    setErrEmail('');
    setErrPassword('');
    if (!email.length) {
      setErrEmail(I18n.t('please_enter_email'));
      emailInput.current.focus();
      return false;
    }
    if (!isValidEmail(email)) {
      setErrEmail(I18n.t('error-invalid-email-address'));
      emailInput.current.focus();
      return false;
    }
    if (!password.length) {
      setErrPassword(I18n.t('please_enter_password'));
      passwordInput.current.focus();
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isValid()) {
      setIsLoading(true);

      firebaseSdk
        .signInWithEmail(email, password)
        .then(async user => {
          setIsLoading(false);
          await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
          loginSuccess(user);
        })
        .catch(err => {
          setIsLoading(false);
          if (err.indexOf('auth/user-not-found') > 0) {
            showErrorAlert(I18n.t('error-user-not_registered'));
          } else if (err.indexOf('auth/wrong-password') > 0) {
            showErrorAlert(I18n.t('error-invalid-password'));
          } else {
            showErrorAlert(I18n.t('error-invalid-user'));
          }
          console.log('error', err);
        });
    }
  };

  return (
    <KeyboardView style={[sharedStyles.container, { backgroundColor: themes[theme].backgroundColor }]} keyboardVerticalOffset={128}>
      <StatusBar />
      <SafeAreaView>
        <ScrollView
          style={{
            flexGrow: 1,
            backgroundColor: themes[theme].backgroundColor,
          }}
          {...scrollPersistTaps}
          keyboardShouldPersistTaps="handled">
          <View style={sharedStyles.headerContainer}>
            <Image style={styles.logo} source={images.logo_new} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.loginText}>{I18n.t('SignIn')}</Text>
            <FloatingTextInput
              inputRef={emailInput}
              iconLeft={images.mail}
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="oneTimeCode"
              label={I18n.t('Email')}
              onChangeText={val => setEmail(val)}
              theme={theme}
              onSubmitEditing={() => {
                passwordInput.current.focus();
              }}
              outlineColor={'transparent'}
              backgroundColor={'#f5f5f5'}
              error={errEmail}
            />
            <FloatingTextInput
              inputRef={passwordInput}
              iconLeft={images.password}
              label={I18n.t('Password')}
              returnKeyType="send"
              textContentType="oneTimeCode"
              onChangeText={value => setPassword(value)}
              theme={theme}
              outlineColor={'transparent'}
              backgroundColor={'#f5f5f5'}
              secureTextEntry
              error={errPassword}
            />
            <View style={styles.forgotContainer}>
              <Text
                style={[sharedStyles.link, styles.forgotText]}
                onPress={forgotPassword}>
                {I18n.t('Forgot_Password')}
              </Text>
            </View>
            <Button
              style={styles.submitBtn}
              title={I18n.t('Login')}
              type="gradient"
              size="W"
              iconCenter={(s) => (
                <Image source={images.login} style={[styles.loginIcon, { ...s }]} />
              )}
              onPress={onSubmit}
              testID="login-submit"
              loading={isLoading}
              theme={theme}
              pressingHighlight
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.dontText}>{I18n.t('Do_not_have_an_account')}</Text>
              <Text
                style={[{ ...sharedStyles.link, color: '#797C84', }, { textDecorationLine: 'none' }]}
                onPress={onGoToSignUp}>
                {` ${I18n.t('SignUp_Now')}`}
              </Text>
            </View>
          </View>
        </ScrollView>
        <DialogInput isDialogVisible={showResetPassword}
          title={I18n.t('Reset_Password')}
          message={I18n.t('please_enter_email')}
          hintInput ={''}
          submitInput={ (email) => {
            if (email && email !== '') {
              setShowResetPassword(false);
              setIsLoading(true);
              console.log('OK Pressed, password: ' + email);
              firebaseSdk
                .resetPassword(email)
                .then(_ => {
                  setIsLoading(false);
                })
                .catch(_ => {
                  setIsLoading(false);
                });
            }
          } }
          closeDialog={ () => {setShowResetPassword(false);}}>
        </DialogInput>
      </SafeAreaView>
    </KeyboardView>
  );
};

SignInView.propTypes = {
  appStart: PropTypes.func,
  loginSuccess: PropTypes.func,
  theme: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
  appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(SignInView));
