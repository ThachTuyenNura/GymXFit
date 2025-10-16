import React, { useState, useEffect } from 'react'
import {
    Text, View, Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { useContext } from 'react';
import { UserContext } from '../user/UserContext';

const Profile = ({ navigation }) => {
    const { logout } = useContext(UserContext);
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.titltInfo}>Tài khoản</Text>
                </View>
                <View style={styles.avtContainer}>
                    <View>
                        <Image style={styles.imageAvt} source={require('../../media/pictures/avt.png')} />
                    </View>
                    <View>
                        <Text style={styles.titltInfo}>Thạch Tuyển</Text>
                    </View>
                    <View>
                        <Text style={styles.mailAvt}>madisons@example.com</Text>
                    </View>
                    <View>
                        <Text style={styles.bold}>Ngày sinh: <Text style={styles.birthdayAvt}>01/01/2000</Text></Text>
                    </View>
                </View>

                <View style={styles.infoBodyContainer}>
                    <View>
                        <Text style={styles.textInfoBody}>75 <Text>Kg</Text></Text>
                        <Text style={styles.textInfoBody}>Cân nặng</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>28</Text>
                        <Text style={styles.textInfoBody}>Tuổi</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>165 <Text>CM</Text></Text>
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