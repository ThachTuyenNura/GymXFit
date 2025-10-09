import React from 'react';
import {
    Text, Image, View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateProfile = (props) => {
    const androidBehavior = Platform.OS === 'android' ? 'height' : undefined;
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={androidBehavior}
            keyboardVerticalOffset={0}>
            <View style={styles.infoContainer}>
                <View style={styles.headerInfoContainer}>
                    <TouchableOpacity style={styles.backHeaderInfo}>
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
                        <Image style={styles.imageAvt} source={require('../../media/pictures/avt.png')} />
                        <TouchableOpacity style={styles.editContainer}>
                            <Image source={require('../../media/pictures/edit.png')} />
                        </TouchableOpacity>
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
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Email</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập email'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Số điện thoại</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập số điện thoại'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Ngày sinh</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập ngày sinh'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Cân nặng</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập cân nặng'
                            />
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={styles.textItem}>Chiều cao</Text>
                            <TextInput style={styles.textInputItem}
                                placeholder='Nhập chiều cao'
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.textButton}>Lưu thông tin</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

export default UpdateProfile;

const styles = StyleSheet.create({
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: '#30C451',
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 20
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