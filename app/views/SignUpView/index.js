import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScrollView from 'react-native-nested-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import { withTheme } from '../../theme';
import TextInput from '../../containers/TextInput';
import sharedStyles from '../Styles';
import StatusBar from '../../containers/StatusBar';
import styles from './styles';
import Button from '../../containers/Button';
import images from '../../assets/images';
import { isValidEmail } from '../../utils/validators';
import { showErrorAlert, showToast } from '../../lib/info';
import firebaseSdk from '../../lib/firebaseSdk';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_YELLOW,
  HEADER_BAR_END,
  HEADER_BAR_START,
  NAV_BAR_START,
  themes,
} from '../../constants/colors';
import I18n from '../../i18n';
import CsSelectGender from '../../containers/CsSelectGender';
import ExDatePicker from '../../containers/ExDatePicker';
import ExSalary from '../../containers/ExSalary';
import KeyboardView from '../../containers/KeyboardView';
import ExYears from '../../containers/ExYears';
import { CURRENT_USER } from '../../constants/keys';
import { loginSuccess as loginSuccessAction } from '../../actions/login';
import { VectorIcon } from '../../containers/VectorIcon';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { sendEmail } from '../../utils/sendmail';
import FloatingTextInput from '../../containers/FloatingTextInput';

const theme = 'light';

const SignUpView = props => {
  const { loginSuccess } = props;
  const navigation = useNavigation();
  const [state, setState] = useState({
    name: '',
    gender: null,
    city: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    birthday: null,
    job: '',
    company: '',
    role: '',
    years_of_service: 1,
    salary: 2,
    purpose: '',
    topScrollEnable: true,
    allowTerms: false,
    isLoading: false,
  });

  const nameInput = useRef(null);
  const cityInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const jobInput = useRef(null);
  const companyInput = useRef(null);
  const roleInput = useRef(null);
  const purposeInput = useRef(null);

  const onGoToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onGotoTerms = () => {
    navigation.navigate('About', { type: 0 });
  };

  const onGotoPrivacy = () => {
    navigation.navigate('About', { type: 1 });
  };

  const isValid = () => {
    const { name, city, gender, password, confirm_password, email } = state;

    if (!name.length) {
      showToast(I18n.t('please_enter_name'));
      nameInput.current.focus();
      return false;
    }
    if (!gender) {
      showToast(I18n.t('please_select_gender'));
      return false;
    }
    if (!city.length) {
      showToast(I18n.t('please_enter_city'));
      cityInput.current.focus();
      return false;
    }
    if (!email.length) {
      showToast(I18n.t('please_enter_email'));
      emailInput.current.focus();
      return false;
    }
    if (!isValidEmail(email)) {
      showToast(I18n.t('error-invalid-email-address'));
      emailInput.current.focus();
      return false;
    }
    if (!password.length) {
      showToast(I18n.t('please_enter_password'));
      passwordInput.current.focus();
      return false;
    }
    if (password.length < 6) {
      showToast(I18n.t('please_enter_password_with_min_length_6'));
      passwordInput.current.focus();
      return false;
    }
    if (password !== confirm_password) {
      showToast(I18n.t('error-invalid-password-repeat'));
      confirmPasswordInput.current.focus();
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isValid()) {
      setState({ ...state, isLoading: true });
      const {
        name,
        email,
        password,
        phone,
        gender,
        city,
        birthday,
        job,
        company,
        role,
        years_of_service,
        salary,
        purpose,
      } = state;

      const user = {
        displayName: name,
        gender,
        city,
        phone,
        email: email,
        password: password,
        birthday,
        job,
        company,
        role,
        years_of_service,
        salary,
        purpose,
      };
      const mailBody =
        'Name : ' +
        name +
        '\nGender : ' +
        gender +
        '\nCity : ' +
        city +
        '\nPhone : ' +
        phone +
        '\nEmail : ' +
        email;
      sendEmail('info@zedinternational.net', 'A new user registered', mailBody);

      firebaseSdk
        .signUp(user)
        .then(async () => {
          showToast(I18n.t('Register_complete'));
          firebaseSdk
            .signInWithEmail(email, password)
            .then(async user => {
              await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
              setState({ ...state, isLoading: false });
              loginSuccess(user);
            })
            .catch(error => {
              navigation.navigate('SignIn');
            });
        })
        .catch(err => {
          showErrorAlert(I18n.t('Register_fail'));
          setState({ ...state, isLoading: false });
        });
    }
  };

  const {
    isLoading,
    birthday,
    gender,
    salary,
    years_of_service,
    topScrollEnable,
    allowTerms,
  } = state;

  return (
    <KeyboardView
      contentContainerStyle={[sharedStyles.container, { backgroundColor: themes[theme].backgroundColor }]}
      keyboardVerticalOffset={128}>
      <StatusBar />
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: themes[theme].backgroundColor,
          }}
          {...scrollPersistTaps}
          keyboardShouldPersistTaps="handled">
          <View style={sharedStyles.headerContainer}>
            <Image style={styles.logo} source={images.logo_new} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.signupText}>{I18n.t('sign_up')}</Text>
            <FloatingTextInput
              inputRef={nameInput}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('Name')}
              onChangeText={value => setState({ ...state, name: value })}
              theme={theme}
              onSubmitEditing={() => {
                cityInput.current.focus();
              }}
              // error={errEmail}
            />
            <CsSelectGender
              label={I18n.t('Gender')}
              value={gender}
              onChange={value => setState({ ...state, gender: value })}
              theme={theme}
            />
            <FloatingTextInput
              inputRef={cityInput}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('City')}
              onChangeText={value => setState({ ...state, city: value })}
              theme={theme}
              onSubmitEditing={() => {
                phoneInput.current.focus();
              }}
              // error={errEmail}
            />
            <FloatingTextInput
              inputRef={phoneInput}
              returnKeyType="next"
              keyboardType="phone-pad"
              textContentType="oneTimeCode"
              label={I18n.t('Phone')}
              onChangeText={phone => setState({ ...state, phone })}
              theme={theme}
              onSubmitEditing={() => {
                emailInput.current.focus();
              }}
              // error={errEmail}
            />
            <FloatingTextInput
              inputRef={emailInput}
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="oneTimeCode"
              label={I18n.t('Email')}
              onChangeText={email => setState({ ...state, email })}
              theme={theme}
              onSubmitEditing={() => {
                passwordInput.current.focus();
              }}
              // error={errEmail}
            />
            <FloatingTextInput
              inputRef={passwordInput}
              returnKeyType="next"
              secureTextEntry
              textContentType="oneTimeCode"
              label={I18n.t('Password')}
              onChangeText={value => setState({ ...state, password: value })}
              theme={theme}
              onSubmitEditing={() => {
                confirmPasswordInput.current.focus();
              }}
              // error={errEmail}
            />
            <FloatingTextInput
              inputRef={confirmPasswordInput}
              returnKeyType="next"
              secureTextEntry
              textContentType="oneTimeCode"
              label={I18n.t('Confirm_password')}
              onChangeText={value => setState({ ...state, confirm_password: value })}
              theme={theme}
              onSubmitEditing={() => {
                jobInput.current.focus();
              }}
              // error={errEmail}
            />
            <ExDatePicker
              containerStyle={styles.selectStyle}
              inputStyle={{
                backgroundColor: themes[theme].auxiliaryBackground,
              }}
              label={I18n.t('Birthday')}
              value={birthday}
              topScrollEnable={topScrollEnable}
              toggleShow={show => {
                setState({ ...state, topScrollEnable: !show });
              }}
              action={({ value }) => {
                if (!value) {
                  return;
                }
                setState({ ...state, birthday: value });
              }}
              theme={theme}
            />
            <FloatingTextInput
              inputRef={jobInput}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('Job')}
              onChangeText={value => setState({ ...state, job: value })}
              theme={theme}
              onSubmitEditing={() => {
                companyInput.current.focus();
              }}
              // error={errEmail}
            />
            <FloatingTextInput
              inputRef={companyInput}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('Company')}
              onChangeText={value => setState({ ...state, company: value })}
              theme={theme}
              onSubmitEditing={() => {
                roleInput.current.focus();
              }}
              // error={errEmail}
            />
            <FloatingTextInput
              inputRef={roleInput}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('Role')}
              onChangeText={value => setState({ ...state, role: value })}
              theme={theme}
              onSubmitEditing={() => {
                purposeInput.current.focus();
              }}
              // error={errEmail}
            />
            <ExYears
              containerStyle={styles.selectStyle}
              label={I18n.t('Years_of_service')}
              value={years_of_service}
              topScrollEnable={topScrollEnable}
              toggleShow={show => {
                setState({ ...state, topScrollEnable: !show });
              }}
              action={({ value }) => {
                if (!value) {
                  return;
                }
                setState({ ...state, years_of_service: value });
              }}
              theme={theme}
            />
            <ExSalary
              containerStyle={styles.selectStyle}
              label={I18n.t('Salary')}
              value={salary}
              topScrollEnable={topScrollEnable}
              toggleShow={show => {
                setState({ ...state, topScrollEnable: !show });
              }}
              action={({ value }) => {
                if (!value) {
                  return;
                }
                setState({ ...state, salary: value });
              }}
              theme={theme}
            />
            <FloatingTextInput
              inputRef={purposeInput}
              returnKeyType="next"
              keyboardType="default"
              textContentType="oneTimeCode"
              label={I18n.t('Membership_purpose')}
              onChangeText={value => setState({ ...state, purpose: value })}
              theme={theme}
              multiline
              // error={errEmail}
            />
            <View style={styles.terms}>
              <TouchableOpacity
                style={{ marginRight: 8 }}
                onPress={() => setState({ ...state, allowTerms: !allowTerms })}>
                {allowTerms ? (
                  <VectorIcon
                    name={'checksquare'}
                    type={'AntDesign'}
                    size={20}
                    color={COLOR_BLUE}
                  />
                ) : (
                  <VectorIcon
                    name={'square-outline'}
                    type={'Ionicons'}
                    size={20}
                    color={COLOR_BLUE}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.termItem}>
                <Text style={{ color: themes[theme].buttonText }}>
                  {`${I18n.t('agree_with')} `}
                </Text>
                <Text
                  style={{ color: COLOR_BLUE, fontWeight: '600' }}
                  onPress={onGotoTerms}>
                  {`${I18n.t('terms_and_conditions')}`}
                </Text>
                <Text style={{ color: themes[theme].buttonText }}>{` ${I18n.t('and')} `}</Text>
                <Text
                  style={{ color: COLOR_BLUE, fontWeight: '600', marginTop: 10 }}
                  onPress={onGotoPrivacy}>
                  {` ${I18n.t('privacy_policy')} `}
                </Text>
              </View>
            </View>
            <Button
              style={styles.submitBtn}
              title={I18n.t('sign_up')}
              type="gradient"
              size="W"
              onPress={onSubmit}
              testID="login-view-submit"
              loading={isLoading}
              disabled={!allowTerms}
              theme={theme}
              iconCenter={(s) => (
                <Image
                  source={images.login}
                  style={[
                    styles.loginIcon,
                    { opacity: allowTerms ? 1 : 0.6, ...s },
                  ]}
                />
              )}
              pressingHighlight
            />
            <View style={styles.bottomContainer}>
              <Text style={{ color: '#A3A7AF', fontWeight: '500' }}>
                {I18n.t('Have_an_account')}
              </Text>
              <Text
                style={[{ ...sharedStyles.link }, { textDecorationLine: 'none' }]}
                onPress={onGoToSignIn}>
                {` ${I18n.t('SignIn')}`}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardView>
  );
};

SignUpView.propTypes = {
  navigation: PropTypes.object,
  theme: PropTypes.string,
  loginSuccess: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(SignUpView));
