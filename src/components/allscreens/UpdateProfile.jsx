import React, { useState, useEffect } from 'react';
import {
    Text, Image, View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert, Platform, ActivityIndicator
} from 'react-native';

import { getProfile, updateProfile } from '../user/UserHTTP';

// Một hàm nhỏ để định dạng ngày tháng cho dễ nhìn
const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (e) {
        return ''; // Trả về rỗng nếu ngày không hợp lệ
    }
};

const UpdateProfile = ({ navigation }) => {
    const androidBehavior = Platform.OS === 'android' ? 'height' : undefined;

    // --- State để lưu trữ thông tin người dùng ---
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        weight: '',
        height: '',
        avatarUrl: null
    });

    // --- State để quản lý trạng thái loading ---
    const [isFetching, setIsFetching] = useState(true); // Khi tải dữ liệu lần đầu
    const [isUpdating, setIsUpdating] = useState(false); // Khi nhấn nút "Lưu"

    // --- Tải thông tin người dùng khi màn hình được mở ---
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                if (response.ok && response.user) {
                    const { user } = response;
                    setProfile({
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        dob: formatDateForDisplay(user.dob), // Định dạng lại ngày
                        weight: user.weight ? String(user.weight) : '', // Chuyển sang string
                        height: user.height ? String(user.height) : '', // Chuyển sang string
                        avatarUrl: user.avatarUrl
                    });
                }
            } catch (error) {
                Alert.alert('Lỗi tải dữ liệu', error.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfile();
    }, []); // Mảng rỗng đảm bảo chỉ chạy 1 lần

    // --- Hàm xử lý khi nhấn nút "Lưu thông tin" ---
    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        try {
            // Chỉ gửi những trường có giá trị, backend của bạn rất tốt trong việc xử lý này
            const updates = {
                name: profile.name,
                email: profile.email,
                dob: profile.dob,
                weight: profile.weight,
                height: profile.height,
            };

            const response = await updateProfile(updates);
            Alert.alert('Thành công', response.message);

            // Cập nhật lại header với tên mới (tùy chọn)
            // (Bạn có thể dùng Context/Redux để làm việc này tốt hơn)

        } catch (error) {
            Alert.alert('Cập nhật thất bại', error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    // Hàm để cập nhật state khi người dùng nhập liệu
    const handleInputChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    // Màn hình loading trong khi chờ tải dữ liệu
    if (isFetching) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#30C451" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={androidBehavior}
            keyboardVerticalOffset={0}>
            <View style={styles.infoContainer}>
                <View style={styles.headerInfoContainer}>
                    <TouchableOpacity style={styles.backHeaderInfo} onPress={() => navigation.goBack()}>
                        <Image tintColor='#212020' source={require('../../media/pictures/Arrow.png')} />
                        <Text style={styles.textBackHeader}>Quay lại</Text>
                    </TouchableOpacity>
                    <View style={styles.titleInfoContainer}>
                        <Text style={styles.titltInfo}>Thông tin</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={styles.avtContainer}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageAvt}
                            source={profile.avatarUrl ? { uri: profile.avatarUrl } : require('../../media/pictures/avt.png')} />
                        <TouchableOpacity style={styles.editContainer}>
                            <Image source={require('../../media/pictures/edit.png')} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.titltInfo}>{profile.name || 'Chưa cập nhật'}</Text>
                    </View>
                    <View>
                        <Text style={styles.mailAvt}>{profile.email || 'Chưa cập nhật'}</Text>
                    </View>
                    <View>
                        <Text style={styles.bold}>Ngày sinh: <Text style={styles.birthdayAvt}>{profile.dob || 'Chưa cập nhật'}</Text></Text>
                    </View>
                </View>

                <View style={styles.infoBodyContainer}>
                    <View>
                        <Text style={styles.textInfoBody}>{profile.weight || '--'} <Text>Kg</Text></Text>
                        <Text style={styles.textInfoBody}>Cân nặng</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>{profile.dob ? new Date().getFullYear() - new Date(profile.dob.split('/').reverse().join('-')).getFullYear() : '--'}</Text>
                        <Text style={styles.textInfoBody}>Tuổi</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>{profile.height || '--'} <Text>CM</Text></Text>
                        <Text style={styles.textInfoBody}>Chiều cao</Text>
                    </View>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.inputContainer}>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Họ tên</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập họ tên'
                                value={profile.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Email</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập email'
                                value={profile.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Số điện thoại</Text>
                            <TextInput style={[styles.textInputItem, styles.textInputDisabled]}
                                value={profile.phone}
                                editable={false} // Không cho phép sửa SĐT
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Ngày sinh</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='dd/mm/yyyy'
                                value={profile.dob}
                                onChangeText={(text) => handleInputChange('dob', text)}
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Cân nặng</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập cân nặng'
                                value={profile.weight}
                                onChangeText={(text) => handleInputChange('weight', text)}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Chiều cao</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập chiều cao'
                                value={profile.height}
                                onChangeText={(text) => handleInputChange('height', text)}
                                keyboardType='numeric'
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer} onPress={handleUpdateProfile} disabled={isUpdating}>
                        <View style={[styles.button, isUpdating && styles.buttonDisabled]}>
                            {isUpdating ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.textButton}>Lưu thông tin</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default UpdateProfile;

const styles = StyleSheet.create({
    button: {
        color:'#fff',
        backgroundColor: '#30C451',
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 20,
        minWidth: 150,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    textInputDisabled: {
        backgroundColor: '#f0f0f0',
        color: '#999',
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        // backgroundColor: '#30C451',
        // paddingHorizontal: 15,
        // paddingVertical: 7,
        // borderRadius: 20
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center'
    },
    textInputItem: {
        borderWidth: 1,
        borderRadius: 15,
        marginTop: 10,
        borderColor: '#30C451',
        paddingHorizontal: 10,
        fontSize: 16
    },
    textItem: {
        fontSize: 18,
        color: '#30C451',
        fontWeight: '600'
    },
    itemInput: {
        marginVertical: 5
    },
    inputContainer: {
        marginVertical: 5
    },
    contentContainer: {
        flex: 1,
        padding: 34,
        marginTop: 15,
        paddingBottom: 0
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
        alignItems: 'center',
        marginHorizontal: 35
    },
    birthdayAvt: {
        fontWeight: 'normal'
    },
    bold: {
        color: '#212020',
        fontWeight: '600',
        fontSize: 13
    },
    mailAvt: {
        fontSize: 13
    },
    editContainer: {
        position: 'absolute',
        backgroundColor: '#E2F163',
        width: 25,
        height: 25,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
        end: 5
    },
    imageAvt: {
        marginVertical: 4,
        borderRadius: 100
    },
    imageContainer: {
        position: 'relative'
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
    titleInfoContainer: {
        flex: 1
    },
    textBackHeader: {
        color: '#212020',
        marginStart: 7
    },
    backHeaderInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerInfoContainer: {
        flexDirection: 'row',
        paddingTop: 35,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    infoContainer: {
        height: 296,
        backgroundColor: '#B5DB7F',
        paddingBottom: 0,
        position: 'relative'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    }
});