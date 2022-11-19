import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';
import CsDatePicker from '../../containers/CsDatePicker';

test('renders correctly', () => {
  const tree = renderer.create(<CsDatePicker />).toJSON();
  expect(tree).toMatchSnapshot();
});