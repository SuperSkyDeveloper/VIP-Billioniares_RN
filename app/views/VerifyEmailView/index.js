import React from 'react';
import PropTypes from 'prop-types';
import { Image, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import StatusBar from '../../containers/StatusBar';
import { withTheme } from '../../theme';
import styles from './styles';
import images from '../../assets/images';
import sharedStyles from '../../views/Styles';
import {
  COLOR_WHITE,
  HEADER_BAR_START,
  NAV_BAR_END,
  NAV_BAR_START,
  themes,
} from '../../constants/colors';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { loginSuccess as loginSuccessAction } from '../../actions/login';

const theme = 'light';

const VerifyEmailView = props => {
  return (
    <View
      style={[
        sharedStyles.container,
        { backgroundColor: themes[theme].navbarBackground },
      ]}>
      <StatusBar />
      <ScrollView
        {...scrollPersistTaps}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: themes[theme].navbarBackground,
        }}>
        <LinearGradient style={styles.logoContainer} colors={[NAV_BAR_START, NAV_BAR_END]}>
          <View
            style={styles.logoInnerContainer} >
            <Image style={styles.logo} source={images.logo} />
            <Image style={styles.logoText} source={images.logo_text} />
          </View>
        </LinearGradient>
        <View
          style={[
            styles.container,
            { backgroundColor: themes[theme].backgroundColor, borderTopLeftRadius: 30,
              borderTopRightRadius: 30, },
          ]}>
          <Text style={[styles.mainText, { marginTop: 40, color: themes[theme].activeTintColor }]}>
            Verify your email address
          </Text>
          <Image style={[styles.logo, { width: '30%', height: 125 }]} source={images.email_verified} />
          <Text style={[styles.subText, { color: themes[theme].activeTintColor }]}>
            Thank you for your registration, before we move forward please
            verify your email address
          </Text>
          <Text style={[styles.subText, { color: themes[theme].activeTintColor }]}>
            {
              'ご登録ありがとうございます。 \n次に進む前にメールアドレスの確認をお願いいたします。'
            }
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

VerifyEmailView.propTypes = {
  user: PropTypes.object,
  loginSuccess: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  loginSuccess: params => dispatch(loginSuccessAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(VerifyEmailView));
