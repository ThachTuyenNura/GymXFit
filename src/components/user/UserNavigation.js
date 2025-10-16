import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 🟩 Import tất cả các màn hình bạn có trong thư mục /user/screens/
import CustomerService from '../user/screens/CustomerService';
import HelpScreen from '../user/screens/HelpScreen';
import HelpScreen2 from '../user/screens/HelpScreen2';
import LoginScreen from '../user/screens/LoginScreen';
import NewsScreen from '../user/screens/NewsScreen';
import OnlineSupport from '../user/screens/OnlineSupport';
import RegisterScreen from '../user/screens/RegisterScreen';
import SurveyScreen from '../user/screens/SurveyScreen';
import VerifyRegisterScreen from './screens/VerifyRegisterScreen';
import VerifyLoginScreen from './screens/VerifyLoginScreen';
import WelcomeScreen from '../user/screens/WelcomeScreen';
import WorkoutScreen from '../user/screens/WorkoutScreen';
import WorkoutScreen2 from '../user/screens/WorkoutScreen2';
import WorkoutVideo from '../user/screens/WorkoutVideo';
import UpdateProfile from '../allscreens/UpdateProfile';

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="RegisterScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="VerifyRegisterScreen" component={VerifyRegisterScreen} />
      <Stack.Screen name="VerifyLoginScreen" component={VerifyLoginScreen} />
      <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
      <Stack.Screen name="CustomerService" component={CustomerService} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="HelpScreen2" component={HelpScreen2} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="OnlineSupport" component={OnlineSupport} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <Stack.Screen name="WorkoutScreen2" component={WorkoutScreen2} />
      <Stack.Screen name="WorkoutVideo" component={WorkoutVideo} />
      {/* <Stack.Screen name="UpdateProfile" component={UpdateProfile} /> */}
    </Stack.Navigator>
  );
};

export default UserNavigation;
