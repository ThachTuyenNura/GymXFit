import React, { useState, useEffect } from 'react'
import {
    Text, View, Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { useContext } from 'react';
import { UserContext } from '../user/UserContext';
import { useNavigation } from '@react-navigation/native';

const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (e) { return ''; }
};

const calculateAge = (dobString) => {
    if (!dobString) return '--';
    try {
        const birthDate = new Date(dobString);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age > 0 ? age : '--';
    } catch (e) {
        return '--';
    }
};

const Profile = () => {
    const { user, logout, isLoading } = useContext(UserContext);
    const navigation = useNavigation();

    // Hiển thị loading nếu user chưa có
    if (isLoading || !user) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#30C451" />
            </View>
        );
    }

    // Lấy dữ liệu từ user object
    const userName = user.name || 'Chưa cập nhật';
    const userEmail = user.email || 'Chưa cập nhật';
    const userDob = formatDateForDisplay(user.dob) || 'Chưa cập nhật';
    const userWeight = user.weight || '--';
    const userHeight = user.height || '--';
    const userAge = calculateAge(user.dob);
    const avatarSource = user.avatar
        ? { uri: `${user.avatar}?timestamp=${Date.now()}` } // Thêm timestamp để tránh cache
        : require('../../media/pictures/avt.png');

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.titltInfo}>Tài khoản</Text>
                </View>
                <View style={styles.avtContainer}>
                    <View>
                        <Image style={styles.imageAvt} source={avatarSource} />
                    </View>
                    <View>
                        <Text style={styles.titltInfo}>{userName}</Text>
                    </View>
                    <View>
                        <Text style={styles.mailAvt}>{userEmail}</Text>
                    </View>
                    <View>
                        <Text style={styles.bold}>Ngày sinh: <Text style={styles.birthdayAvt}>{userDob}</Text></Text>
                    </View>
                </View>

                <View style={styles.infoBodyContainer}>
                    <View>
                        <Text style={styles.textInfoBody}>{userWeight} <Text>Kg</Text></Text>
                        <Text style={styles.textInfoBody}>Cân nặng</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>{userAge}</Text>
                        <Text style={styles.textInfoBody}>Tuổi</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>{userHeight} <Text>CM</Text></Text>
                        <Text style={styles.textInfoBody}>Chiều cao</Text>
                    </View>
                </View>
            </View>

            <View style={styles.optionContainer}>
                <TouchableOpacity
                    style={styles.itemOption}
                    onPress={() => navigation.navigate('UpdateProfile')}
                >
                    <View style={styles.imageItemContainer}>
                        <Image source={require('../../media/pictures/profile.png')} />
                    </View>
                    <View>
                        <Text style={styles.textItemOption}>Thông tin</Text>
                    </View>
                    <View style={styles.iconItemOption}>
                        <Image style={styles.tintblack} source={require('../../media/pictures/arrowright.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemOption}>
                    <View style={styles.imageItemContainer}>
                        <Image style={{ tintColor: '#fff' }} source={require('../../media/pictures/tutorial.png')} />
                    </View>
                    <View>
                        <Text style={styles.textItemOption}>Hướng dẫn sử dụng</Text>
                    </View>
                    <View style={styles.iconItemOption}>
                        <Image style={styles.tintblack} source={require('../../media/pictures/arrowright.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemOption}>
                    <View style={styles.imageItemContainer}>
                        <Image source={require('../../media/pictures/support.png')} />
                    </View>
                    <View>
                        <Text style={styles.textItemOption}>Liên hệ</Text>
                    </View>
                    <View style={styles.iconItemOption}>
                        <Image style={styles.tintblack} source={require('../../media/pictures/arrowright.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemOption}>
                    <View style={styles.imageItemContainer}>
                        <Image style={{ tintColor: '#fff' }} source={require('../../media/pictures/contract.png')} />
                    </View>
                    <View>
                        <Text style={styles.textItemOption}>Hợp đồng</Text>
                    </View>
                    <View style={styles.iconItemOption}>
                        <Image style={styles.tintblack} source={require('../../media/pictures/arrowright.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemOption}>
                    <View style={styles.imageItemContainer}>
                        <Image style={{ tintColor: '#fff' }} source={require('../../media/pictures/password.png')} />
                    </View>
                    <View>
                        <Text style={styles.textItemOption}>Thay mật khẩu</Text>
                    </View>
                    <View style={styles.iconItemOption}>
                        <Image style={styles.tintblack} source={require('../../media/pictures/arrowright.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemOption}
                    onPress={logout}
                >
                    <View style={styles.imageItemContainer}>
                        <Image source={require('../../media/pictures/logout.png')} />
                    </View>
                    <View>
                        <Text style={styles.textItemOption}>Đăng xuất</Text>
                    </View>
                    <View style={styles.iconItemOption}>
                        <Image style={styles.tintblack} source={require('../../media/pictures/arrowright.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tintblack: {
        tintColor: '#212020'
    },
    iconItemOption: {
        flex: 1,
        alignItems: 'flex-end'
    },
    textItemOption: {
        fontSize: 20,
        fontWeight: '500',
        marginStart: 23
    },
    imageItemContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#30C451',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    optionContainer: {
        marginTop: 55,
        padding: 35
    },
    textInfoBody: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500'
    },
    duongke: {
        width: 1,
        height: 41.5,
        borderWidth: 0.7,
        borderColor: '#fff'
    },
    infoBodyContainer: {
        flexDirection: 'row',
        backgroundColor: '#30C451',
        height: 55,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    birthdayAvt: {
        fontWeight: 'normal'
    },
    bold: {
        fontWeight: '600',
        fontSize: 13
    },
    mailAvt: {
        fontSize: 13
    },
    imageAvt: {
        width: 125,
        height: 125,
        marginVertical: 4,
        borderRadius: 100
    },
    avtContainer: {
        alignItems: 'center'
    },
    titltInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#212020'
    },
    infoContainer: {
        height: 296,
        backgroundColor: '#B5DB7F',
        padding: 35,
        paddingBottom: 0,
        position: 'relative'
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    }
})