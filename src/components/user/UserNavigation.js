import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//import OnBoarding1 from '../user/screens/Onboarding1';
//import OnBoarding2 from '../user/screens/Onboarding2';
import SurveyScreen from '../user/screens/SurveyScreen';
import RegisterScreen from '../user/screens/RegisterScreen';
import LoginScreen from '../user/screens/LoginScreen';
import VerifyScreen from '../user/screens/VerifyScreen';

const UserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="OnBoarding1" component={OnBoarding1} /> */}
      {/* <Stack.Screen name="OnBoarding2" component={OnBoarding2} /> */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
      <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
