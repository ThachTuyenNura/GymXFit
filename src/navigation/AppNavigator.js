import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserContext } from '@context/UserContext';
import UserNavigator from '@navigation/UserNavigator';
import HomeNavigator from '@navigation/HomeNavigator';
import SurveyScreen from '@screens/survey/SurveyScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, userToken, isLoading } = useContext(UserContext);

  // Nếu đang trong quá trình kiểm tra token, hiển thị màn hình chờ
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
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
            <Stack.Screen name="HomeApp" component={HomeNavigator} />
          ) : (
            // 2b. Nếu user chưa có tên -> Vào màn hình khảo sát
            <Stack.Screen name="Survey" component={SurveyScreen} />
          )
        ) : (
          // 3. NẾU CHƯA CÓ TOKEN -> Vào luồng xác thực
          <Stack.Screen name="Auth" component={UserNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
