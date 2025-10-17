import React, { useState, useEffect, useContext } from 'react';
import {
    Text, Image, View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert, Platform, ActivityIndicator
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { updateProfile, updateAvatar, requestDeleteAccount, confirmDeleteAccount } from '../user/UserHTTP';
import { UserContext } from '../user/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';

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
    const [showPicker, setShowPicker] = useState(false);
    const { user, refreshUser, logout } = useContext(UserContext);
    // --- State để lưu trữ thông tin người dùng ---
    const [profileData, setProfileData] = useState({ name: '', email: '', phone: '', dob: '', weight: '', height: '', gender: '' });
    const [avatarSource, setAvatarSource] = useState(require('../../media/pictures/avt.png'));
    // --- State để quản lý trạng thái loading ---
    const [isFetching, setIsFetching] = useState(true); // Khi tải dữ liệu lần đầu
    const [isUpdating, setIsUpdating] = useState(false); // Khi nhấn nút "Lưu"
    const [isUploading, setIsUploading] = useState(false);

    // Tự động điền form khi có dữ liệu user từ context
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                dob: formatDateForDisplay(user.dob) || '',
                weight: user.weight ? String(user.weight) : '',
                height: user.height ? String(user.height) : '',
                gender: user.gender || '',
            });
            // Cập nhật avatar từ user.avatar (đây là URL)
            if (user.avatar) {
                setAvatarSource({ uri: user.avatar });
            }
        }
        setIsFetching(false);
    }, [user]); // Chạy lại mỗi khi đối tượng user trong context thay đổi

    const onChangeDate = (event, selectedDate) => {
        // Luôn ẩn picker sau khi chọn xong hoặc hủy
        setShowPicker(false);
        // Chỉ cập nhật nếu người dùng đã chọn một ngày (không phải nhấn "Cancel")
        if (selectedDate) {
            const formattedDate = formatDateForDisplay(selectedDate);
            handleInputChange('dob', formattedDate);
        }
    };

    // --- Hàm xử lý chọn và upload avatar ---
    const handleAvatarChange = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, async (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                return Alert.alert('Lỗi', `Lỗi chọn ảnh: ${response.errorMessage}`);
            }
            if (response.assets && response.assets.length > 0) {
                const file = response.assets[0];
                setAvatarSource({ uri: file.uri }); // Cập nhật UI ngay lập tức
                setIsUploading(true);
                try {
                    await updateAvatar(file);
                    Alert.alert('Thành công', 'Cập nhật ảnh đại diện thành công!');
                    await refreshUser(); // Tải lại toàn bộ profile để đồng bộ
                } catch (error) {
                    Alert.alert('Lỗi', error.message);
                    setAvatarSource(user.avatar ? { uri: user.avatar } : require('../../media/pictures/avt.png')); // Hoàn tác ảnh nếu lỗi
                } finally {
                    setIsUploading(false);
                }
                // Kiểm tra xem file có đủ thông tin cần thiết không
                if (!file.uri || !file.type) {
                    Alert.alert('Lỗi', 'Ảnh được chọn không hợp lệ.');
                    return;
                }
            }
        });
    };

    // --- Hàm xử lý khi nhấn nút "Lưu thông tin" ---
    const handleUpdateProfile = async () => {
        setIsUpdating(true);
        try {
            // --- BƯỚC QUAN TRỌNG: Chuẩn bị dữ liệu đúng định dạng ---
            const updates = {
                name: profileData.name,
                email: profileData.email,
                gender: profileData.gender,
            };

            // 1. Chỉ gửi `dob` nếu nó tồn tại và chuyển sang định dạng YYYY-MM-DD
            if (profileData.dob) {
                const parts = profileData.dob.split('/'); // Tách chuỗi "dd/mm/yyyy"
                if (parts.length === 3) {
                    updates.dob = `${parts[2]}-${parts[1]}-${parts[0]}`; // Ghép lại thành "yyyy-mm-dd"
                }
            }

            // 2. Chỉ gửi `weight` nếu nó là một con số hợp lệ
            if (profileData.weight && !isNaN(profileData.weight)) {
                updates.weight = Number(profileData.weight);
            }

            // 3. Chỉ gửi `height` nếu nó là một con số hợp lệ
            if (profileData.height && !isNaN(profileData.height)) {
                updates.height = Number(profileData.height);
            }

            console.log('Đang gửi dữ liệu cập nhật:', updates); // Dòng này để debug

            const response = await updateProfile(updates);
            Alert.alert('Thành công', response.message);
            await refreshUser(); // Làm mới thông tin sau khi cập nhật thành công

        } catch (error) {
            // Hiển thị lỗi cụ thể từ server
            const errorMessage = error.response?.data?.message || error.message;
            Alert.alert('Cập nhật thất bại', errorMessage);
        } finally {
            setIsUpdating(false);
        }
    };

    // --- Hàm xử lý xóa tài khoản ---
    const handleDeleteRequest = () => {
        Alert.alert(
            "Xác nhận xóa tài khoản",
            "Hành động này không thể hoàn tác. Một mã OTP sẽ được gửi đến số điện thoại của bạn để xác nhận.",
            [
                { text: "Hủy", style: 'cancel' },
                {
                    text: "Xác nhận", style: 'destructive', onPress: async () => {
                        try {
                            await requestDeleteAccount();
                            Alert.prompt(
                                "Nhập mã OTP",
                                "Vui lòng nhập mã OTP bạn vừa nhận được để xóa tài khoản vĩnh viễn.",
                                async (otp) => {
                                    if (otp) {
                                        try {
                                            await confirmDeleteAccount(otp);
                                            Alert.alert("Thành công", "Tài khoản của bạn đã được xóa.");
                                            logout(); // Đăng xuất và đưa về màn hình login
                                        } catch (e) { Alert.alert("Lỗi", e.message); }
                                    }
                                }
                            );
                        } catch (e) { Alert.alert("Lỗi", e.message); }
                    }
                }
            ]
        );
    };

    // Hàm để cập nhật state khi người dùng nhập liệu
    const handleInputChange = (field, value) => setProfileData(prev => ({ ...prev, [field]: value }));

    // Màn hình loading trong khi chờ tải dữ liệu
    if (isFetching) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#30C451" />
            </View>
        );
    }

    const dobAsDateObject = profileData.dob
        ? new Date(profileData.dob.split('/').reverse().join('-'))
        : new Date();
    // Kiểm tra xem ngày có hợp lệ không, nếu không thì dùng ngày hiện tại
    if (isNaN(dobAsDateObject.getTime())) {
        dobAsDateObject = new Date();
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
                        <Image style={styles.imageAvt} source={avatarSource} />
                        <TouchableOpacity
                            style={styles.editContainer}
                            onPress={handleAvatarChange}
                        >
                            {isUploading
                                ? <ActivityIndicator size="small" color="#000" />
                                : <Image source={require('../../media/pictures/edit.png')}
                                />}
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.titltInfo}>{profileData.name || 'Chưa cập nhật'}</Text>
                    </View>
                    <View>
                        <Text style={styles.mailAvt}>{profileData.email || 'Chưa cập nhật'}</Text>
                    </View>
                    <View>
                        <Text style={styles.bold}>Ngày sinh: <Text style={styles.birthdayAvt}>{profileData.dob || 'Chưa cập nhật'}</Text></Text>
                    </View>
                </View>

                <View style={styles.infoBodyContainer}>
                    <View>
                        <Text style={styles.textInfoBody}>{profileData.weight || '--'} <Text>Kg</Text></Text>
                        <Text style={styles.textInfoBody}>Cân nặng</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>{profileData.dob ? new Date().getFullYear() - new Date(profileData.dob.split('/').reverse().join('-')).getFullYear() : '--'}</Text>
                        <Text style={styles.textInfoBody}>Tuổi</Text>
                    </View>
                    <View style={styles.duongke}></View>
                    <View>
                        <Text style={styles.textInfoBody}>{profileData.height || '--'} <Text>CM</Text></Text>
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
                                value={profileData.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Email</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập email'
                                value={profileData.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                                keyboardType='email-address'
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Số điện thoại</Text>
                            <TextInput style={[styles.textInputItem, styles.textInputDisabled]}
                                value={profileData.phone}
                                editable={false} // Không cho phép sửa SĐT
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Ngày sinh</Text>
                            <TouchableOpacity onPress={() => setShowPicker(true)} >
                                <TextInput style={styles.textInputItem}
                                    placeholder='dd/mm/yyyy'
                                    value={profileData.dob}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {showPicker && (
                                <DateTimePicker
                                    value={dobAsDateObject} // Giá trị khởi tạo là đối tượng Date
                                    mode="date"
                                    display="spinner" // Giao diện đẹp hơn cho iOS và Android
                                    onChange={onChangeDate}
                                />
                            )}
                        </View>

                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Giới tính</Text>
                            <View style={styles.genderContainer}>
                                <TouchableOpacity style={styles.genderOption} onPress={() => handleInputChange('gender', 'male')}>
                                    <View style={[styles.radioOuter, profileData.gender === 'male' && styles.radioSelected]}>
                                        {profileData.gender === 'male' && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={styles.genderText}>Nam</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.genderOption} onPress={() => handleInputChange('gender', 'female')}>
                                    <View style={[styles.radioOuter, profileData.gender === 'female' && styles.radioSelected]}>
                                        {profileData.gender === 'female' && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={styles.genderText}>Nữ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.genderOption} onPress={() => handleInputChange('gender', 'other')}>
                                    <View style={[styles.radioOuter, profileData.gender === 'other' && styles.radioSelected]}>
                                        {profileData.gender === 'other' && <View style={styles.radioInner} />}
                                    </View>
                                    <Text style={styles.genderText}>Khác</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Cân nặng</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập cân nặng'
                                value={profileData.weight}
                                onChangeText={(text) => handleInputChange('weight', text)}
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Chiều cao</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập chiều cao'
                                value={profileData.height}
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
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 40
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#30C451',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#30C451'
    },
    radioSelected: {
        borderColor: '#30C451'
    },
    genderText: {
        fontSize: 16,
        color: '#000'
    },
    button: {
        color: '#fff',
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