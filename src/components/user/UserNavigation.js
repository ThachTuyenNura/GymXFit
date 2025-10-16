import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 🟩 Import tất cả các màn hình bạn có trong thư mục /user/screens/
import CustomerService from '../allscreens/CustomerService';
import HelpScreen from '../allscreens/HelpScreen';
import HelpScreen2 from '../allscreens/HelpScreen2';
import LoginScreen from './screens/LoginScreen';
import NewsScreen from '../allscreens/NewsScreen';
import OnlineSupport from '../allscreens/OnlineSupport';
import RegisterScreen from '../user/screens/RegisterScreen';
import SurveyScreen from '../user/screens/SurveyScreen';
import VerifyRegisterScreen from './screens/VerifyRegisterScreen';
import VerifyLoginScreen from './screens/VerifyLoginScreen';
import WelcomeScreen from '../user/screens/WelcomeScreen';
import WorkoutScreen from '../allscreens/WorkoutScreen';
import WorkoutScreen2 from '../allscreens/WorkoutScreen2';
import WorkoutVideo from '../allscreens/WorkoutVideo';
import UpdateProfile from '../allscreens/UpdateProfile';
import SearchCalendarScreen from '../allscreens/UserCalendarScreen';

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchCalendarScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="VerifyRegisterScreen"
        component={VerifyRegisterScreen}
      />
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
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen
        name="SearchCalendarScreen"
        component={SearchCalendarScreen}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
