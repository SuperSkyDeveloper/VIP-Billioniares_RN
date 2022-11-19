import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';

import {
  COLOR_WHITE,
  HEADER_BACKGROUND,
  HEADER_BAR_START,
  NAV_BAR_END,
  NAV_BAR_START,
  themes,
} from '../../constants/colors';
import StatusBar from '../../containers/StatusBar';
import { withTheme } from '../../theme';
import styles from './styles';
import images from '../../assets/images';
import SidebarItem from './SidebarItem';
import scrollPersistTaps from '../../utils/scrollPersistTaps';
import { logout as logoutAction } from '../../actions/login';
import { showConfirmationAlert } from '../../lib/info';
import { GradientHeader } from '../../containers/GradientHeader';
import LinearGradient from 'react-native-linear-gradient';
import Navigation from '../../lib/Navigation';
import I18n from '../../i18n';
import { SITE_SHOP_URL } from '../../constants/app';

const SidebarView = (props) => {
  const { user, theme, navigation } = props;
  const home = useRef('Feed');
  const routeName = Navigation.getCurrentRoute();
  const menus = [
    {
      id: 'feed',
      name: I18n.t('Feed'),
      icon: images.menu_feed,
      route: 'Home',
      routes: ['Feed'],
      init: 'Feed',
    },
    {
      id: 'open_post',
      name: I18n.t('Open_posts'),
      icon: images.menu_open_post,
      route: 'Home',
      routes: ['Posts'],
      init: 'Posts',
    },
    {
      id: 'shop',
      name: I18n.t('Shop'),
      icon: images.menu_shop,
      route: 'Shop',
      routes: ['Shop'],
    },
    {
      id: 'vip_members',
      name: I18n.t('Vip_members'),
      icon: images.menu_vip_members,
      route: 'VipMembers',
      routes: ['VipMembers'],
    },
    {
      id: 'privacy_policy',
      name: I18n.t('Privacy_policy'),
      icon: images.menu_privacy,
      route: 'Privacy',
      routes: ['Privacy'],
    },
    {
      id: 'terms_of_use',
      name: I18n.t('Terms_of_use'),
      icon: images.menu_terms,
      route: 'Terms',
      routes: ['Terms'],
    },
    {
      id: 'eula',
      name: I18n.t('Eula'),
      icon: images.menu_eula,
      route: 'Eula',
      routes: ['Eula'],
    },
    {
      id: 'setting',
      name: I18n.t('Settings'),
      icon: images.menu_settings,
      route: 'Setting',
      routes: ['Setting'],
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      title: 'VIP Billionaires',
      headerBackground: () => <GradientHeader />,
    });
  }, []);

  const onClick = item => {
    switch (item.id) {
    case 'terms_of_use':
      return onNavigate('About', { type: 0 });
    case 'privacy_policy':
      return onNavigate('About', { type: 1 });
    case 'eula':
      return onNavigate('About', { type: 2 });
    case 'shop':
      return Linking.openURL(SITE_SHOP_URL);
    default:
      onNavigate(item.route, { type: item.init });
    }
  };

  const onNavigate = (routeName, params) => {
    const { navigation } = props;
    const route = Navigation.getCurrentRoute();
    if (routeName === 'Home') {
      home.current = params.type;
      navigation.navigate(routeName, { screen: 'Home', params: { screen: params.type } });
    } else {
      navigation.navigate(routeName, params);
    }
  };

  const onLogOut = () => {
    const { logout } = props;
    showConfirmationAlert({
      title: I18n.t('Logout'),
      message: I18n.t('are_you_sure_to_log_out'),
      callToAction: I18n.t('Confirm'),
      onPress: () => {
        if (global.unSubscribeRoom) {
          global.unSubscribeRoom();
          global.unSubscribeRoom = undefined;
        }
        logout();
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: themes[theme].backgroundColor }}>
      <StatusBar />
      <View style={{ backgroundColor: themes[theme].sidemenuBackColor }}>
        <View
          style={[styles.profileContainer, { borderBottomWidth: 1, borderBottomColor: themes[theme].separatorColor }]}
          colors={[HEADER_BAR_START, COLOR_WHITE]}
          angle={90}
          useAngle>
          <View
            style={styles.profileInnerContainer}
            colors={[NAV_BAR_END, NAV_BAR_START]}>
            <Image
              source={
                user.avatar ? { uri: user.avatar } : images.default_avatar
              }
              style={styles.avatar}
            />
            <View>
              <Text style={[styles.profileName, { color: themes[theme].activeTintColor }]}>{user.displayName}</Text>
              <Text style={[styles.roleName, { color: themes[theme].infoText }]}>{user.role}</Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: themes[theme].sidemenuBackColor }}
        {...scrollPersistTaps}>
        <View style={styles.headerContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>
        {menus.map(m => (
          <SidebarItem
            id={`sidebar-view-key-${m.id}`}
            text={m.name}
            left={<Image source={m.icon} style={[styles.menuIcon, { tintColor: theme === 'light' &&  m.routes.includes(routeName) ? 'white' : themes[theme].sidemenuTintColor }]} />}
            onPress={() => onClick(m)}
            current={m.routes.includes(routeName) && (!m.init || home.current === m.init)}
            theme={theme}
          />
        ))}
      </ScrollView>
      <View style={{ backgroundColor: themes[theme].sidemenuBackColor }}>
        <View
          style={[styles.logoutContainer, { borderTopWidth: 1, borderTopColor: themes[theme].separatorColor }]}
          colors={[HEADER_BAR_START, COLOR_WHITE]}
          angle={90}
          useAngle>
          <View
            style={styles.logoutInnerContainer}
            colors={[NAV_BAR_END, NAV_BAR_START]}>
            <TouchableOpacity
              onPress={onLogOut}
              style={styles.logoutMenu}>
              <Image
                source={images.ic_menu_logout}
                style={styles.logoutIcon}
              />
              <Text style={[styles.logoutText, { color: themes[theme].sidemenuTintColor }]}>{I18n.t('Logout')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

SidebarView.PropTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  logout: params => dispatch(logoutAction(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SidebarView));
