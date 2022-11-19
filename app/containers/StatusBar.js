import React from 'react';
import { Platform, StatusBar as StatusBarRN } from 'react-native';
import PropTypes from 'prop-types';

import { withTheme } from '../theme';

export const StatusBar = React.memo(({ theme }) => {
  if (Platform.OS === 'ios') {
    return (
      <StatusBarRN
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        animated
      />
    );
  } else {
    return (
      <StatusBarRN
        barStyle={theme === 'dark' ? 'dark-content' : 'light-content'}
        animated
      />
    );
  }
});

StatusBar.propTypes = {
  theme: PropTypes.string,
};

export default withTheme(StatusBar);
