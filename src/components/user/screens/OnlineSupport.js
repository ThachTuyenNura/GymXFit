// screens/OnlineSupport.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

const OnlineSupport = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Thanh tiêu đề */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack?.()}>
            <Image
              source={require('../../../media/pictures/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Image
            source={require('../../../media/pictures/customerserviceicon.png')}
            style={styles.avatar}
            resizeMode="contain"
          />

          <View style={styles.headerText}>
            <Text style={styles.title}>Trợ lý trực tuyến</Text>
            <Text style={styles.subtitle}>Tôi luôn sẵn sàng hỗ trợ bạn</Text>
          </View>
        </View>

        {/* Khu vực trò chuyện (nền trắng, trống) */}
        <KeyboardAvoidingView
          style={styles.chatWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            style={styles.chatArea}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
          ></ScrollView>

          {/* Thanh nhập tin nhắn */}
          <View style={styles.inputContainer}>
            <TouchableOpacity>
              <Image
                source={require('../../../media/pictures/File.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor="#6D6D6D"
            />

            <TouchableOpacity>
              <Image
                source={require('../../../media/pictures/Voice.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../../../media/pictures/Send.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },

  /* Thanh tiêu đề */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 18 : 14,
    paddingBottom: 8,
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  avatar: {
    width: 52,
    height: 52,
    marginRight: 10,
  },
  headerText: { flexDirection: 'column' },
  title: { fontSize: 18, fontWeight: '700', color: '#000' },
  subtitle: { fontSize: 12, color: '#555' },

  /* Khu vực trò chuyện */
  chatWrapper: { flex: 1 },
  chatArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  chatContent: { paddingTop: 10, paddingBottom: 24 },

  /* Thanh nhập tin nhắn */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#EEF94E', // nền vàng như mẫu
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff', // khung nhập trắng
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    fontSize: 14,
    color: '#000',
    marginHorizontal: 8,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});

export default OnlineSupport;
