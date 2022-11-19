import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SearchBox } from '../../containers/SearchBox';

test('renders correctly', () => {
  const tree = renderer.create(<SearchBox onChangeText={() => {}} theme="dark"/>).toJSON();
  expect(tree).toMatchSnapshot();
});