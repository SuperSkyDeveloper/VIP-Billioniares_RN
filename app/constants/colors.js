import { isIOS, isAndroid } from '../utils/deviceInfo';

export const COLOR_DANGER = '#f5455c';
export const COLOR_BUTTON_PRIMARY = '#ffffff';
export const COLOR_BUTTON_SECONDARY = '#C4CFD5';
export const COLOR_BUTTON_DEFAULT = '#EBEBEB';
export const COLOR_BUTTON_DANGER = '#F95522';
export const COLOR_BUTTON_WHITE = '#FFFFFF';
export const COLOR_BUTTON_GRAY = '#c7c7c7';
export const COLOR_BUTTON_DONE = '#3f65b2';
export const COLOR_BUTTON_FACEBOOK = '#3f65b2';
export const COLOR_BUTTON_GOOGLE = '#ce011b';
export const COLOR_BUTTON_APPLE_LIGHT = '#000000';
export const COLOR_BUTTON_APPLE_DARK = '#FFFFFF';
export const COLOR_BUTTON_APPLE_BLACK = '#FFFFFF';

export const COLOR_BUTTON_TEXT_PRIMARY = '#FFFFFF';
export const COLOR_BUTTON_TEXT_SECONDARY = '#FFFFFF';
export const COLOR_BUTTON_TEXT_DEFAULT = '#000000';
export const COLOR_BUTTON_TEXT_DANGER = '#FFFFFF';
export const COLOR_BUTTON_TEXT_WHITE = '#000000';
export const COLOR_BUTTON_TEXT_DONE = '#FFFFFF';
export const COLOR_BUTTON_TEXT_FACEBOOK = '#FFFFFF';
export const COLOR_BUTTON_TEXT_GOOGLE = '#FFFFFF';
export const COLOR_BUTTON_TEXT_APPLE_LIGHT = '#FFFFFF';
export const COLOR_BUTTON_TEXT_APPLE_DARK = '#000000';

export const COLOR_TEXT = '#292E35';
export const COLOR_SEPARATOR = '#CBCED1';
export const COLOR_SUCCESS = '#2de0a5';
export const COLOR_PRIMARY = '#1d74f5';
export const COLOR_WHITE = '#ffffff';
export const COLOR_BLACK = '#000000';
export const COLOR_BLACK_LIGHT = '#888888';
export const COLOR_TITLE = '#0C0D0F';
export const COLOR_BORDER = '#c9c9c9';
export const COLOR_UNREAD = '#e1e5e8';
export const COLOR_TOAST = '#0C0D0F';
export const COLOR_ORANGE = '#f26522';
export const COLOR_ORANGE_DARK = '#d6591e';
export const COLOR_ORANGE_LIGHT = '#fa8e5b';
export const COLOR_BLUE = '#5790DF';
export const COLOR_BLUE_DARK = '#00387f';
export const COLOR_GREEN = '#21b632';
export const COLOR_GRAY = '#e3e3e3';
export const COLOR_GRAY_LIGHT = '#fdf8f8';
export const COLOR_YELLOW = '#DCB042';

export const STATUS_COLORS = {
  online: '#2de0a5',
  busy: '#f5455c',
  away: '#ffd21f',
  offline: '#cbced1',
};

export const HEADER_BACKGROUND = '#000';
export const HEADER_TITLE = '#efc455';
export const HEADER_BACK = '#efc455';
export const NAV_BAR_START = '#5D5D5A';
export const NAV_BAR_END = '#222222';
export const HEADER_BAR_START = '#DCB042';
export const HEADER_BAR_END = '#faeac4';
export const DARK_WEAK = '#808080';

export const SWITCH_TRACK_COLOR = {
  false: '#f5455c',
  true: '#2de0a5',
};

const mentions = {
  unreadColor: '#0bb203',
  tunreadColor: '#1d74f5',
  mentionGroupColor: '#F38C39',
};

export const themes = {
  light: {
    activeTintColor: '#000000',
    backgroundColor: '#ffffff',
    focusedBackground: '#ffffff',
    chatComponentBackground: '#f3f4f5',
    postBackground: '#E6EEFA',
    auxiliaryBackground: '#efeff4',
    avatarBackground: '#caced1',
    bannerBackground: '#f1f2f4',
    titleText: '#000000',
    ownMsgText: '#000000',
    otherMsgText: '#ffffff',
    ownAuxiliaryText: '#e3e2e2',
    otherAuxiliaryText: '#51555f',
    bodyText: '#222222',
    backdropColor: '#000000',
    dangerColor: '#f5455c',
    successColor: '#2de0a5',
    borderColor: '#e1e5e8',
    controlText: '#54585e',
    auxiliaryText: '#9ca2a8',
    inactiveTintColor: '#898989',
    infoText: '#787878',
    readText: '#404040',
    tintColor: '#1d74f5',
    tintActive: '#549df9',
    auxiliaryTintColor: '#ffcfb8',
    actionTintColor: '#0d3a97',
    actionColor: '#efc455',
    separatorColor: '#888888',
    navbarBackground: '#1B202D',
    headerBorder: '#080808',
    headerBackground: '#1B202D',
    headerSecondaryBackground: '#080808',
    headerTintColor: '#ffffff',
    headerTitleColor: '#ffffff',
    headerSecondaryText: '#1d74f5',
    toastBackground: '#414852',
    videoBackground: '#1f2329',
    favoriteBackground: '#ffbb00',
    hideBackground: '#54585e',
    messageboxBackground: '#ffffff',
    searchboxBackground: '#E5EEF1',
    buttonBackground: '#414852',
    buttonText: '#000000',
    messageOwnBackground: '#ffffff',
    messageOtherBackground: '#5790DF',
    modalBackground: '#E6E6E7',
    menuText: '#999999',
    sidemenuBackColor: '#FFFFFF',
    sidemenuTintColor: '#526581',
    itemPressedColor: '#F6F6F6',
    moreIcon: '#000000',
    postTool: 'rgba(0, 0, 0, 0.3)',
    messageList: '#E6EEFA',
    message: '#B3B9C9',
    messageHeader: '#ffffff',
    chatBackground: '#5790DF30',
    dateText: '#333333',
    chatInput: '#ffffff',
    sendButton: '#000000',
    chatInputPlaceholder: 'rgba(65, 65, 65, 0.45)',
    vipColor: 'rgba(255, 255, 255, 0.6)',
    popupBackColor: '#FFFFFF',
    profileBackground: '#ffffff',
    jobText: '#6C7A9C',
    profilePostBorder: '#3030308A',
    profileHandle: '#8E8E8E',
    profileMore: '#898989',
    messageButton: '#ffffff',
  },
  dark: {
    activeTintColor: '#FFFFFF',
    backgroundColor: '#131517',
    focusedBackground: '#131517',
    chatComponentBackground: '#f3f4f5',
    postBackground: '#21242C',
    auxiliaryBackground: '#efeff4',
    avatarBackground: '#caced1',
    bannerBackground: '#f1f2f4',
    titleText: '#ffffff',
    ownMsgText: '#ffffff',
    otherMsgText: '#ffffff',
    ownAuxiliaryText: '#e3e2e2',
    otherAuxiliaryText: '#51555f',
    bodyText: '#2f343d',
    backdropColor: '#000000',
    dangerColor: '#f5455c',
    successColor: '#2de0a5',
    borderColor: '#e1e5e8',
    controlText: '#54585e',
    auxiliaryText: '#AFAFAF',
    inactiveTintColor: '#A2A8B8',
    infoText: '#B2B2B2',
    readText: '#404040',
    tintColor: '#1d74f5',
    tintActive: '#549df9',
    auxiliaryTintColor: '#ffcfb8',
    actionTintColor: '#0d3a97',
    actionColor: '#efc455',
    separatorColor: '#6d6d6d',
    navbarBackground: '#21242C',
    headerBorder: '#080808',
    headerBackground: '#21242C',
    headerSecondaryBackground: '#080808',
    headerTintColor: '#ffffff',
    headerTitleColor: '#ffffff',
    headerSecondaryText: '#1d74f5',
    toastBackground: '#414852',
    videoBackground: '#1f2329',
    favoriteBackground: '#ffbb00',
    hideBackground: '#54585e',
    messageboxBackground: '#ffffff',
    searchboxBackground: '#2F3034',
    buttonBackground: '#414852',
    buttonText: '#000000',
    messageOwnBackground: '#7A8194',
    messageOtherBackground: '#373E4E',
    modalBackground: '#2F3034',
    menuText: '#999999',
    sidemenuBackColor: '#21242C',
    sidemenuTintColor: '#FFFFFF',
    itemPressedColor: '#2F3336',
    moreIcon: '#A2A8B8',
    postTool: 'rgba(0, 0, 0, 0.3)',
    messageList: '#131517', // '#292F3F',
    message: '#888888',
    messageHeader: '#21242C', // '#1B202D',
    chatBackground: '#21242C', // '#1B202D',
    dateText: '#ffffff',
    chatInput: '#3D4354',
    sendButton: 'rgba(255, 255, 255, 0.45)',
    chatInputPlaceholder: 'rgba(255, 255, 255, 0.45)',
    vipColor: 'rgba(0, 0, 0, 0.6)',
    popupBackColor: '#202326',
    profileBackground: '#131517',
    jobText: '#A2A8B8',
    profilePostBorder: '#A2A8B861',
    profileHandle: '#A2A8B8',
    profileMore: '#A2A8B8',
    messageButton: '#21242C',
  },
};
