import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const HelpScreen2 = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('FAQ');

  const contacts = [
    {
      name: 'Customer Service',
      icon: require('../assets/customerserviceicon.png'),
    },
    { name: 'Website', icon: require('../assets/websiteicon.png') },
    { name: 'Facebook', icon: require('../assets/facebookicon.png') },
    { name: 'Whatsapp', icon: require('../assets/whatsappicon.png') },
    { name: 'Instagram', icon: require('../assets/instagramicon.png') },
  ];

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Image source={require('../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Help & FAQs</Text>
      <Text style={styles.subtitle}>How Can We Help You?</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.largeTab, activeTab === 'FAQ' && styles.activeTab]}
          onPress={() => setActiveTab('FAQ')}
        >
          <Text style={styles.tabText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.largeTab,
            activeTab === 'Contact Us' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Contact Us')}
        >
          <Text style={styles.tabText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contactContainer}>
        {contacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactItem}
            onPress={() => toggleExpand(index)}
          >
            <View style={styles.contactContent}>
              <Image source={contact.icon} style={styles.contactIcon} />
              <Text style={styles.contactName}>{contact.name}</Text>
            </View>
            <Image
              source={require('../assets/ArrowDown.png')}
              style={styles.chevronIcon}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  largeTab: {
    backgroundColor: 'white', // Màu nền cho nút lớn
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc', // Màu viền
    paddingVertical: 15,
    paddingHorizontal: 30,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50', // Màu nền khi nhấp
  },
  tabText: {
    color: 'black',
    fontSize: 16,
  },
  contactContainer: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 24,
    height: 24,
  },
  contactName: {
    marginLeft: 10,
    fontSize: 16,
  },
  chevronIcon: {
    width: 15, // Đã điều chỉnh kích thước icon mũi tên
    height: 15,
  },
});

export default HelpScreen2;
