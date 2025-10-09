// // App.jsx - PHIÊN BẢN CUỐI CÙNG, ĐÃ DỌN DẸP SẠCH SẼ

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Chỉ import các màn hình của chúng ta, đường dẫn đã chính xác
// // Thay vì import { SplashScreen } from './src/screens/SplashScreen';
// // Bạn cần import file component cụ thể, ví dụ:
// import { SplashScreen } from './src/screens/SplashScreen/SplashScreen';
// import {OnboardingScreen1 } from './src/screens/OnboardingScreen1/OnboardingScreen1';
// import {OnboardingScreen2} from './src/screens/OnboardingScreen2/OnboardingScreen2';
// import {OnboardingScreen3} from './src/screens/OnboardingScreen3/Onboarding3/OnboardingScreen3';
// import {HomeScreen} from './src/screens/HomeScreen/HomeScreen';

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{
//           headerShown: false,
//         }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
//         <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
//         <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import WelcomeScreen from './src/components/screens/WelcomeScreen'; 
import OnboardingScreen from './src/components/screens/OnboardingScreen';
import OBScreen1 from './src/components/screens/OBScreen1';
import OBScreen2 from './src/components/screens/OBScreen2';
import ProfileScreen from './src/components/screens/ProfileScreen';
// ...

const App = () => {
  return (
    // <WelcomeScreen />
    // <OnboardingScreen/>
    <OBScreen1/>
    // <OBScreen2/>
    // <ProfileScreen/>
  );
};

export default App;