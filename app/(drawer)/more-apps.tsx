import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MoreAppsScreen() {
  const handleOpenPlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/developer?id=TechBarik');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="google-play" size={60} color="#E84C22" />
        </View>

        <Text style={styles.title}>TechBarik</Text>
        <Text style={styles.subtitle}>
          Discover more useful and amazing applications developed by TechBarik on the Google Play Store.
        </Text>

        <TouchableOpacity 
          style={styles.playStoreButton}
          onPress={handleOpenPlayStore}
          activeOpacity={0.8}
        >
          <FontAwesome5 name="google-play" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Visit Play Store</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FDEAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  playStoreButton: {
    flexDirection: 'row',
    backgroundColor: '#E84C22',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#E84C22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
