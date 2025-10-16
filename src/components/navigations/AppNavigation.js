import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserContext } from '../user/UserContext';
import UserNavigation from '../user/UserNavigation';
import HomeNavigation from '../allscreens/HomeNavigation';
import SurveyScreen from '../user/screens/SurveyScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = props => {
  const { user, userToken, isLoading } = useContext(UserContext);

  // Nếu đang trong quá trình kiểm tra token, hiển thị màn hình chờ
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          // 2. NẾU ĐÃ CÓ TOKEN
          user && user.name ? (
            // 2a. Nếu user có tên -> Vào luồng chính
            <Stack.Screen name="HomeApp" component={HomeNavigation} />
          ) : (
            // 2b. Nếu user chưa có tên -> Vào màn hình khảo sát
            <Stack.Screen name="Survey" component={SurveyScreen} />
          )
        ) : (
          // 3. NẾU CHƯA CÓ TOKEN -> Vào luồng xác thực
          <Stack.Screen name="Auth" component={UserNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
