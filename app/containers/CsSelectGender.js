import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import sharedStyles from '../views/Styles';
import {
  COLOR_DANGER,
  COLOR_BLUE,
  themes,
} from '../constants/colors';
import CheckBox from './CheckBox';
import { Genders } from '../constants/app';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    ...sharedStyles.textSemibold,
  },
  required: {
    marginBottom: 10,
    color: COLOR_DANGER,
    fontSize: 14,
    fontWeight: '700',
  },
  selectText: {
    ...sharedStyles.textRegular,
    fontSize: 14,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  CheckBoxContainer: {},
});

const CsSelectGender = (props) => {
  const { 
    label, 
    value, 
    required, 
    containerStyle, 
    theme 
  } = props;
  
  const setCheck = value => {
    props.onChange(value);
  };

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label ? (
        <Text
          contentDescription={null}
          accessibilityLabel={null}
          style={[styles.label, { color: themes[theme].titleText }]}>
          {label}
          {required ? (
            <Text
              contentDescription={null}
              accessibilityLabel={null}
              style={[styles.required]}>{` ${required}`}</Text>
          ) : null}
        </Text>
      ) : null}
      <View
        style={styles.wrap}>
        {Genders.map(val => (
          <CheckBox
            key={`gender-key-${val.value}`}
            title={val.text}
            checked={value === val.value}
            onPress={() => setCheck(val.value)}
            onIconPress={() => setCheck(val.value)}
            checkedIcon="radio-button-on"
            uncheckedIcon="radio-button-off"
            checkedColor={COLOR_BLUE}
            unCheckedColor={themes[theme].bodyText}
            textStyle={{ color: themes[theme].bodyText }}
            containerStyle={{ ...styles.CheckBoxContainer }}
          />
        ))}
      </View>
    </View>
  );
};

CsSelectGender.PropTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.string,
  containerStyle: PropTypes.object,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

export default CsSelectGender;