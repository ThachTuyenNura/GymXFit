import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import các screen
import Home from './Home';
import Notification from './Notification';
import Profile from './Profile';
import Search from './Search';
import QRScanner from './QRScanner';
import UpdateProfile from './UpdateProfile';
import SearchCalendarScreen from './SearchCalendarScreen';
import News from './News';
import CalendarScreen from './CalendarScreen';
import CardMembershipScreen from './CardMembershipScreen'
import WorkoutScreen from '../user/screens/WorkoutScreen'
import WorkoutScreen2 from '../user/screens/WorkoutScreen2'
import WorkoutVideo from '../user/screens/WorkoutVideo'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Tab Bar với FAB
const CustomTabBar = ({ state, descriptors, navigation }) => {
    const [showQRScanner, setShowQRScanner] = useState(false);

    return (
        <View style={styles.tabContainer}>
            {/* QR Scanner Modal */}
            <QRScanner
                visible={showQRScanner}
                onClose={() => setShowQRScanner(false)}
            />

            {/* Nút Home */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('HomeStack')}
            >
                <Icon
                    name="home"
                    size={24}
                    color={state.routes[state.index].name === 'HomeStack' ? '#fff' : '#ddd'}
                />
                <Text style={[styles.tabLabel, state.routes[state.index].name === 'HomeStack' && styles.activeLabel]}>
                    Trang chủ
                </Text>
            </TouchableOpacity>

            {/* Nút Search */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('SearchCalendarScreen')}
            >
                <Icon
                    name="assignment"
                    size={24}
                    color={state.routes[state.index].name === 'SearchCalendarScreen' ? '#fff' : '#ddd'}
                />
                <Text style={[styles.tabLabel, state.routes[state.index].name === 'SearchCalendarScreen' && styles.activeLabel]}>
                    Đặt lịch
                </Text>
            </TouchableOpacity>

            {/* FAB - QR Scan ở giữa */}
            <TouchableOpacity
                style={styles.fabContainer}
                onPress={() => setShowQRScanner(true)}
            >
                <View style={styles.fab}>
                    <Icon name="qr-code-scanner" size={32} color="#fff" />
                </View>
                <Text style={styles.fabLabel}>Quét mã</Text>
            </TouchableOpacity>

            {/* Nút Notification */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('Notification')}
            >
                <Icon
                    name="star"
                    size={24}
                    color={state.routes[state.index].name === 'Notification' ? '#fff' : '#ddd'}
                />
                <Text style={[styles.tabLabel, state.routes[state.index].name === 'Notification' && styles.activeLabel]}>
                    Yêu thích
                </Text>
            </TouchableOpacity>

            {/* Nút Profile */}
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => navigation.navigate('ProfileStack')}
            >
                <Icon
                    name="headset-mic"
                    size={24}
                    color={state.routes[state.index].name === 'ProfileStack' ? '#fff' : '#ddd'}
                />
                <Text style={[styles.tabLabel, state.routes[state.index].name === 'ProfileStack' && styles.activeLabel]}>
                    Hỗ trợ
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='SearchCalendarScreen' component={SearchCalendarScreen} />
            <Stack.Screen name='News' component={News} />
            <Stack.Screen name='CalendarScreen' component={CalendarScreen} />
            <Stack.Screen name='CardMembershipScreen' component={CardMembershipScreen} />
            <Stack.Screen name='WorkoutScreen' component={WorkoutScreen} />
            <Stack.Screen name='WorkoutScreen2' component={WorkoutScreen2} />
            <Stack.Screen name='WorkoutVideo' component={WorkoutVideo} />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Prolife' component={Profile} />
            <Stack.Screen name='UpdateProfile' component={UpdateProfile} />
        </Stack.Navigator>
    )
}

const HomeNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='HomeStack'
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="SearchCalendarScreen" component={SearchCalendarScreen} />
            <Tab.Screen name="Notification" component={Notification} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#30C451',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        position: 'relative',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    tabLabel: {
        fontSize: 11,
        color: '#ddd',
        marginTop: 2,
        textAlign: 'center',
    },
    activeLabel: {
        color: '#fff',
        fontWeight: '600',
    },
    fabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -20,
    },
    fab: {
        backgroundColor: '#30C451',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 12,
        shadowColor: '#30C451',
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        borderWidth: 5,
        borderColor: '#fff',
    },
    fabLabel: {
        color: '#fff',
        fontSize: 11,
        marginTop: 4,
        fontWeight: '600',
    },
});

export default HomeNavigation;