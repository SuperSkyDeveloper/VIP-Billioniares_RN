import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR_BLACK_LIGHT, COLOR_BLUE } from '../constants/colors';

const CheckBox = React.memo(
  ({
    title,
    checked,
    checkedColor,
    unCheckedColor,
    checkedIcon,
    uncheckedIcon,
    textStyle,
    containerStyle,
    onPress,
  }) => (
    <TouchableOpacity
      style={{
        ...containerStyle,
        flexDirection: 'row',
        alignItems: 'center',
        height: 49,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 11,
        borderColor: checked ? COLOR_BLUE : COLOR_BLACK_LIGHT,
        marginBottom: 5,
      }}
      onPress={onPress}>
      <Ionicons
        name={checked ? checkedIcon : uncheckedIcon}
        size={12}
        color={checked ? checkedColor : unCheckedColor}
      />
      {title ? (
        <Text style={{ marginLeft: 8, ...textStyle }}>{title}</Text>
      ) : null}
    </TouchableOpacity>
  ),
);

CheckBox.propTypes = {
  title: PropTypes.string,
  checked: PropTypes.bool,
  checkedColor: PropTypes.string,
  unCheckedColor: PropTypes.string,
  checkedIcon: PropTypes.string,
  uncheckedIcon: PropTypes.string,
  textStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  onPress: PropTypes.func,
};

export default CheckBox;
