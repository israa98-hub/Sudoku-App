import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomePage from "./Homepage/homepage_view";
import App from "./App"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const navigationMock = {
  navigate: jest.fn(),
};

test('renders splash screen correctly', () => {
  const { getByTestId } = render(<Splash />);
  const image = getByTestId('splash-image');
  expect(image).toBeTruthy();
});



test('pressing "Sign In" button navigates to Login screen', () => {
  const { getByText } = render(<Onboarding navigation={navigationMock} />);
  const signInButton = getByText('Sign In');
  fireEvent.press(signInButton);
  expect(navigationMock.navigate).toHaveBeenCalledWith('Login');
});

test('pressing "Sign Up" button navigates to signup screen', () => {
  const { getByText } = render(<Onboarding navigation={navigationMock} />);
  const signUpButton = getByText('Sign Up');
  fireEvent.press(signUpButton);
  expect(navigationMock.navigate).toHaveBeenCalledWith('signup');
});








    
