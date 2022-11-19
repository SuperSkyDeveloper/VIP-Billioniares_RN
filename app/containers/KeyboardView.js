import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';

import scrollPersistTaps from '../utils/scrollPersistTaps';

const KeyboardView = props => {
  const {
    style,
    contentContainerStyle,
    scrollEnabled,
    keyboardVerticalOffset,
    children,
  } = props;

  return (
    <KeyboardAwareScrollView
      {...scrollPersistTaps}
      style={style}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={scrollEnabled}
      alwaysBounceVertical={false}
      extraHeight={keyboardVerticalOffset}
      behavior='position'>
      {children}
    </KeyboardAwareScrollView>
  );
};

KeyboardView.propTypes = {
  style: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  keyboardVerticalOffset: PropTypes.number,
  scrollEnabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default KeyboardView;
