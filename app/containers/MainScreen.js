import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { COLOR_YELLOW, themes } from '../constants/colors';
import { withTheme } from '../theme';
import sharedStyles from '../views/Styles';
import images from '../assets/images';
import { isAndroid, isIOS } from '../utils/deviceInfo';
import Touch from '../utils/touch';
import { withDimensions } from '../dimensions';
import {
  checkCameraPermission,
  checkPhotosPermission,
  imagePickerConfig,
  libraryVideoPickerConfig,
  videoPickerConfig,
} from '../utils/permissions';
import {
  POST_TYPE_PHOTO,
  POST_TYPE_TEXT,
  POST_TYPE_VIDEO,
} from '../constants/app';
import SearchBox from './SearchBox';
import I18n from '../i18n';

export const Button = isAndroid ? Touch : TouchableOpacity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTabContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    right: 0,
  },
  topLinearGradient: {
    height: 4,
  },
  linearGradient: {
    height: 1,
  },
  tabBarContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 19,
    paddingBottom: 30,
  },
  tabContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: isIOS ? 8 : 0,
    width: '25%',
    position: 'relative',
  },
  unread: {
    position: 'absolute',
    top: -6,
    right: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    minWidth: 16,
    minHeight: 16,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
  },
  vipTabContainer: {
    width: '20%',
    position: 'relative',
  },
  tabText: {
    fontSize: 12,
  },
  tabImage: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  tabImage2: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  vipTab: {
    position: 'absolute',
    top: -52,
    left: 6,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: 50,
  },
  vipTabImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    resizeMode: 'contain',
  },
  vipContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.27,
    backgroundColor: 'black',
  },
  vipMenu: {
    position: 'absolute',
  },
  vipItem: {
    position: 'absolute',
  },
  itemImage: {
    width: 90,
    height: 90,
  },
  itemText: {
    color: COLOR_YELLOW,
    textAlign: 'center',
  },
  underLine: {
    width: 22,
    resizeMode: 'contain',
    height: 3,
  },
  vipButton: {
    width: 68,
    height: 68,
    borderRadius: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipButtonText: {
    fontWeight: '700',
    fontSize: 22,
    color: '#5790DF',
  },
});

export const MainTabBar = React.memo(({ theme, navigation, state }) => {
  const { unread } = useSelector(state => state.chat);
  const [showVipScreen, setShowVipScreen] = useState(false);
  const { width } = Dimensions.get('window');

  const onVip = () => {
    setShowVipScreen({ showVipScreen: true });
  };

  return (
    <>
      <ImageBackground
        source={images.tab_background}
        style={styles.mainTabContainer}>
        <View style={styles.tabBarContainer}>
          <TouchableOpacity
            style={styles.tabContainer}
            onPress={() => navigation.navigate('Home')}>
            <Image source={images.home_icon} style={styles.tabImage} />
            <Image
              source={images.under_line}
              style={[styles.underLine, { opacity: state.index === 0 ? 1 : 0 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabContainer}
            onPress={() => navigation.navigate('Profile')}>
            <Image source={images.profile_icon} style={styles.tabImage2} />
            <Image
              source={images.under_line}
              style={[styles.underLine, { opacity: state.index === 1 ? 1 : 0 }]}
            />
          </TouchableOpacity>
          <View style={styles.vipTabContainer}>
            <Button style={styles.vipTab} onPress={onVip} theme={theme}>
              <View
                style={[
                  styles.vipButton,
                  {
                    overflow: 'hidden',
                  },
                ]}>
                <Image source={theme === 'dark' ? images.bk_vip_dark : images.bk_vip_light} blurRadius={0}/>
                <Text style={[styles.vipButtonText, { position: 'absolute' }]}>VIP</Text>
              </View>
            </Button>
          </View>
          <TouchableOpacity
            style={styles.tabContainer}
            onPress={() => navigation.navigate('Message')}>
            <Image source={images.message_icon} style={styles.tabImage} />
            <Image
              source={images.under_line}
              style={[styles.underLine, { opacity: state.index === 2 ? 1 : 0 }]}
            />
            {unread > 0 && (
              <View style={styles.unread}>
                <Text style={styles.unreadText}>{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabContainer}
            onPress={() => navigation.navigate('Activity')}>
            <Image source={images.activity_icon} style={styles.tabImage} />
            <Image
              source={images.under_line}
              style={[styles.underLine, { opacity: state.index === 3 ? 1 : 0 }]}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {showVipScreen && (
        <VipScreen
          theme={theme}
          width={width}
          onClose={() => setShowVipScreen(false)}
          navigation={navigation}
        />
      )}
    </>
  );
});

const VipScreen = React.memo(({ onClose, theme, width, navigation }) => {
  const takePhoto = async () => {
    onClose();
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(imagePickerConfig).then(image => {
        console.log('image', image);
        navigation.push('CreatePost', {
          type: POST_TYPE_PHOTO,
          file_path: image.path,
        });
      });
    }
  };

  const takeVideo = async () => {
    onClose();
    if (await checkCameraPermission()) {
      ImagePicker.openCamera(videoPickerConfig).then(video => {
        navigation.push('CreatePost', {
          type: POST_TYPE_VIDEO,
          file_path: video.path,
        });
      });
    }
  };

  const choosePhoto = async () => {
    onClose();
    // navigation.push('PickLibrary', { type: POST_TYPE_PHOTO });
    if (await checkPhotosPermission()) {
    	ImagePicker.openPicker(imagePickerConfig).then(image => {
    		navigation.push('CreatePost', { type: POST_TYPE_PHOTO, file_path: image.path });
    	});
    }
  };

  const chooseVideo = async () => {
    onClose();
    //navigation.push('PickLibrary', {type: POST_TYPE_VIDEO});
    if (await checkPhotosPermission()) {
      ImagePicker.openPicker(libraryVideoPickerConfig).then(video => {
        navigation.push('CreatePost', {
          type: POST_TYPE_VIDEO,
          file_path: video.path,
        });
      });
    }
  };

  const itemWidth = 80;
  const radius = 120;
  const baseBottom = 80;
  const middleRadius = Math.round(Math.sqrt((radius * radius) / 2));
  const middleWidth = width / 2 - itemWidth / 2;

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.vipContainer} />
      </TouchableWithoutFeedback>
      <Button
        style={[
          styles.vipItem,
          { left: middleWidth - radius, bottom: baseBottom },
        ]}
        onPress={() => takeVideo()}
        theme={theme}>
        <Image source={images.take_video} style={styles.itemImage} />
      </Button>
      <Button
        style={[
          styles.vipItem,
          { left: middleWidth - middleRadius, bottom: baseBottom + middleRadius },
        ]}
        onPress={() => takePhoto()}
        theme={theme}>
        <Image source={images.take_photo} style={styles.itemImage} />
      </Button>
      <Button
        style={[
          styles.vipItem,
          { left: middleWidth, bottom: baseBottom + radius },
        ]}
        onPress={() => {
          onClose();
          navigation.push('CreatePost', { type: POST_TYPE_TEXT });
        }}
        theme={theme}>
        <Image source={images.text_image} style={styles.itemImage} />
      </Button>
      <Button
        style={[
          styles.vipItem,
          { left: middleWidth + middleRadius, bottom: baseBottom + middleRadius },
        ]}
        onPress={() => choosePhoto()}
        theme={theme}>
        <Image source={images.choose_image} style={styles.itemImage} />
      </Button>
      <Button
        style={[
          styles.vipItem,
          { left: middleWidth + radius, bottom: baseBottom },
        ]}
        onPress={() => chooseVideo()}
        theme={theme}>
        <Image source={images.choose_video} style={styles.itemImage} />
      </Button>
    </>
  );
});

const MainView = props => {
  const {
    style,
    children,
    hasSearch = false,
    hideNavBorderBar = false,
    onSearchChangeText,
    onSearch,
    theme,
  } = props;

  return (
    <View
      style={[
        sharedStyles.container,
        { backgroundColor: themes[theme].backgroundColor },
      ]}>
      <SafeAreaView />
      <View style={[styles.container, style]}>
        {hasSearch && (
          <SearchBox
            onChangeText={onSearchChangeText}
            onSubmitEditing={onSearch}
            testID="federation-view-search"
            placeholder={I18n.t('Search')}
          />
        )}
        {children}
      </View>
    </View>
  );
};

MainView.PropTypes = {
  testID: PropTypes.string,
  vertical: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.element,
  hideNavBorderBar: PropTypes.bool,
  route: PropTypes.string,
  unread: PropTypes.number,
};

const mapStateToProps = state => ({
  route: state.app.route,
  unread: state.chat.unread,
});

export default connect(
  mapStateToProps,
  null,
)(withDimensions(withTheme(MainView)));
