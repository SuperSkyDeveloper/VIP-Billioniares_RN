import React, { useState, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { TextInput } from 'react-native-paper';

import { date_str_format, DATE_STRING_DISPLAY_FORMAT } from '../utils/datetime';
import { COLOR_BLUE, COLOR_YELLOW, themes } from '../constants/colors';
import sharedStyles from '../views/Styles';
import { VectorIcon } from './VectorIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    ...sharedStyles.textSemibold,
  },
  content: {},
  selectContainer: {
    flex: 1,
    borderRadius: 12,
    paddingBottom: 8,
    width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
    height: 36,
  },
  selectContent: {
    flexDirection: 'row',
    height: 120,
  },
  headerContainer: {
    height: 36,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    color: 'white',
    position: 'absolute',
    right: 4,
    top: 8,
    fontWeight: 'bold',
  },
  daySelect: {
    width: 80,
  },
  monthSelect: {
    flexGrow: 1,
    marginHorizontal: 8,
  },
  yearSelect: {
    width: 80,
  },
  selectHeader: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLOR_YELLOW,
  },
  selectStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  selectValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  value: {
    marginRight: 12,
  },
  iconStyle: {
    position: 'absolute',
    right: 12,
  },
  textInput: {
    flex: 1,
    height: 50,
    marginBottom: 3,
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
  },
});

const calendarLightOption = {
  mainColor: COLOR_BLUE,
  borderColor: 'transparent',
};

const calendarDarkOption = {
  mainColor: COLOR_BLUE,
  borderColor: 'transparent',
  backgroundColor: 'transparent',
  textHeaderColor: COLOR_BLUE,
  textDefaultColor: 'white',
};

const ExDatePicker = props => {
  const [show, setShow] = useState(false);
  const { label, containerStyle, theme, error, value: currentDate } = props;
  const inputBox = useRef(null);

  const rightIcon = () => {
    return (
      <View style={styles.iconWrap}>
        <VectorIcon
          type={'Entypo'}
          name={show ? 'chevron-thin-up' : 'chevron-thin-down'}
          color={themes[theme].activeTintColor}
          size={18}
        />
      </View>
    );
  };

  const selectedDate = useMemo(() => {
    if (currentDate) {
      const units = currentDate.split('/');
      const newDate = `${units[2]}-${units[0]}-${units[1]}`;
      return newDate;
    } else {
      return getFormatedDate(new Date(), 'YYYY/MM/DD');
    }
  }, [currentDate]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        <TextInput
          ref={ref => {inputBox.current = ref;}}
          label={label}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          value={
            currentDate
              ? date_str_format(currentDate, DATE_STRING_DISPLAY_FORMAT)
              : null
          }
          mode="outlined"
          style={[
            styles.textInput,
            {
              fontSize: Platform.OS === 'ios' ? 14 : 13,
              lineHeight: Platform.OS === 'ios' ? 14 : 14,
              backgroundColor: themes[theme].backgroundColor,
            },
          ]}
          outlineColor={error ? '#DD2E2E' : '#888888'}
          activeOutlineColor={error ? '#DD2E2E' : themes[theme].infoText}
          theme={{
            roundness: 15,
            borderWidth: 1,
            colors: {
              text: themes[theme].activeTintColor,
              placeholder: themes[theme].infoText,
            },
          }}
          right={
            <TextInput.Icon
              name={rightIcon}
              style={{ marginTop: 15 }}
              onPress={() => setShow(!show)}
            />
          }
          showSoftInputOnFocus={false}
        />
        {show ? (
          <View style={styles.selectContainer}>
            <DatePicker
              mode="calendar"
              style={[
                { borderRadius: 10 },
                theme === 'dark' && { borderWidth: 1, borderColor: 'white' },
              ]}
              options={theme === 'dark' ? calendarDarkOption : calendarLightOption}
              current={selectedDate}
              selected={selectedDate}
              onSelectedChange={date => {
                console.log('MMM - ' + date);
                let units = date.split('/');
                const newDate = `${units[1]}/${units[2]}/${units[0]}`;
                units = selectedDate.split(/-|\//);
                const selDate = `${units[1]}/${units[2]}/${units[0]}`;
                if (newDate !== selDate) {
                  if (inputBox.current) {
                    inputBox.current.blur();
                  }
                  props.action({ value: newDate });
                }
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

ExDatePicker.PropTypes = {
  label: PropTypes.string,
  containerStyle: PropTypes.object,
  value: PropTypes.string,
  action: PropTypes.func,
  toggleShow: PropTypes.func,
  topScrollEnable: PropTypes.bool,
  theme: PropTypes.string,
};

export default ExDatePicker;
