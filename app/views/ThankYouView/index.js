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
import I18n from '../../i18n';
import scrollPersistTaps from '../../utils/scrollPersistTaps';

const theme = 'light';

const ThankYouView = props => {
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
            style={styles.logoInnerContainer}
            colors={[NAV_BAR_START, NAV_BAR_END]}>
            <Image style={styles.logo} source={images.logo} />
            <Image style={styles.logoText} source={images.logo_text} />
          </View>
        </LinearGradient>
        <View
          style={[
            styles.contentContainer,
            { backgroundColor: themes[theme].backgroundColor, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
          ]}>
          <Text style={[styles.mainText, { marginTop: 40, color: themes[theme].activeTintColor }]}>
            {I18n.t('Thank_you_title_1')}
          </Text>
          <Text style={[styles.subText, { color: themes[theme].activeTintColor }]}>
            Your application will be examined and within a few hours you will
            be notified of the result.
          </Text>
          <Text style={[styles.subText, { color: themes[theme].activeTintColor }]}>
            * There might be cases your application might not be approved. In
            that case, the payment will be fully refunded.
          </Text>
          <Text style={[styles.subText, { color: themes[theme].activeTintColor }]}>
            このたびは入会のご申請をいただきありがとうございます。これより入会審査の後数時間で結果をお知らせさせていただきます。
          </Text>
          <Text style={[styles.subText, { color: themes[theme].activeTintColor }]}>
            ※審査の結果、入会のご希望に添えない場合もございます。
            その場合にはいただいた代金は返金させていただきます。
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

ThankYouView.propTypes = {
  user: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.login.user,
});

export default connect(mapStateToProps, null)(withTheme(ThankYouView));
