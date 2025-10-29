import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 🟩 Các màn hình có sẵn
import CustomerServiceScreen from '@screens/support/CustomerServiceScreen';
import HelpCenterScreen from '@screens/support/HelpCenterScreen';
import HelpFaqScreen from '@screens/support/HelpFaqScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import MemberNewsScreen from '@screens/news/MemberNewsScreen';
import OnlineSupportScreen from '@screens/support/OnlineSupportScreen';
import RegisterScreen from '@screens/auth/RegisterScreen';
import SurveyScreen from '@screens/survey/SurveyScreen';
import VerifyRegisterScreen from '@screens/auth/VerifyRegisterScreen';
import VerifyLoginScreen from '@screens/auth/VerifyLoginScreen';
import WelcomeScreen from '@screens/onboarding/WelcomeScreen';
import WorkoutScreen from '@screens/workouts/WorkoutScreen';
import WorkoutScreen2 from '@screens/workouts/WorkoutScreen2';
import WorkoutVideoScreen from '@screens/video/WorkoutVideoScreen';
import UpdateProfileScreen from '@screens/profile/UpdateProfileScreen';
import BookScreen from '@screens/booking/BookScreen';
import CalendarScreen from '@screens/booking/CalendarScreen';
import SearchCalendarScreen from '@screens/booking/SearchCalendarScreen';
import NotificationScreen from '@screens/home/NotificationScreen';
import SearchScreen from '@screens/home/SearchScreen';
import LoginPTScreen from '@screens/PT/LoginPTScreen';

// 🟩 Các màn hình PT mới
import HomePTScreen from '@screens/PT/HomePTScreen';
import PTScheduleScreen from '@screens/PT/PTScheduleScreen';
import PTCustomerListScreen from '@screens/PT/PTCustomerListScreen';
import PTLessonPlanScreen from '@screens/PT/PTLessonPlanScreen';
import PTLessonHistoryScreen from '@screens/PT/PTLessonHistoryScreen';
import PTProfileScreen from '@screens/PT/PTProfileScreen';

const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePTScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 🟩 Màn hình user */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="VerifyRegisterScreen"
        component={VerifyRegisterScreen}
      />
      <Stack.Screen name="VerifyLoginScreen" component={VerifyLoginScreen} />
      <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
      <Stack.Screen
        name="CustomerServiceScreen"
        component={CustomerServiceScreen}
      />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen name="HelpFaqScreen" component={HelpFaqScreen} />
      <Stack.Screen
        name="OnlineSupportScreen"
        component={OnlineSupportScreen}
      />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <Stack.Screen name="WorkoutScreen2" component={WorkoutScreen2} />
      <Stack.Screen name="WorkoutVideoScreen" component={WorkoutVideoScreen} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <Stack.Screen name="BookScreen" component={BookScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen
        name="SearchCalendarScreen"
        component={SearchCalendarScreen}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MemberNewsScreen" component={MemberNewsScreen} />

      {/* 🟩 Màn hình PT */}
      <Stack.Screen name="LoginPTScreen" component={LoginPTScreen} />
      <Stack.Screen name="HomePTScreen" component={HomePTScreen} />
      <Stack.Screen name="PTScheduleScreen" component={PTScheduleScreen} />
      <Stack.Screen
        name="PTCustomerListScreen"
        component={PTCustomerListScreen}
      />
      <Stack.Screen name="PTLessonPlanScreen" component={PTLessonPlanScreen} />
      <Stack.Screen
        name="PTLessonHistoryScreen"
        component={PTLessonHistoryScreen}
      />
      <Stack.Screen name="PTProfileScreen" component={PTProfileScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigator;
