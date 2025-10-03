import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const HelpScreen = () => {
  const [activeLargeTab, setActiveLargeTab] = useState('FAQ');
  const [activeSmallTab, setActiveSmallTab] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Sample FAQ questions
  const faqs = [
    'What is Lorem Ipsum?',
    'Why do we use it?',
    'Where does it come from?',
    'Where can I get some?',
    'What is the standard chunk of Lorem Ipsum?',
  ];

  // Toggle the expansion of FAQ answers
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
        {['FAQ', 'Contact Us'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.largeTab,
              activeLargeTab === tab && styles.activeLargeTab,
            ]}
            onPress={() => setActiveLargeTab(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.smallTabContainer}>
        {['General', 'Account', 'Services'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.smallTab,
              activeSmallTab === tab && styles.activeSmallTab,
            ]}
            onPress={() => setActiveSmallTab(tab)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={styles.searchInput} placeholder="Search" />

      <ScrollView style={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.faqItem}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.faqQuestion}>{faq}</Text>
              <Image
                source={require('../assets/ArrowDown.png')}
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={styles.faqAnswer}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            )}
          </View>
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
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 40,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  smallTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallTab: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeLargeTab: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  activeSmallTab: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  tabText: {
    color: 'black',
    fontSize: 16,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  faqContainer: {
    flex: 1,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  faqQuestion: {
    fontSize: 16,
  },
  faqAnswer: {
    paddingVertical: 10,
    paddingLeft: 20,
    color: '#555',
  },
  chevronIcon: {
    width: 5,
    height: 5,
  },
});

export default HelpScreen;
