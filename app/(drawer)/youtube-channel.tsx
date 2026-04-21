import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function YoutubeChannelScreen() {
  const insets = useSafeAreaInsets();
  // NOTE: Exact Channel ID
  const CHANNEL_ID = 'UCsQvox_DAmM8g027TnCNslA'; 

  const openChannel = () => {
    // Correct Subscription Link
    Linking.openURL('https://www.youtube.com/channel/UCsQvox_DAmM8g027TnCNslA?sub_confirmation=1');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: 25 + insets.bottom }]}>
      
      <View style={styles.iconContainer}>
        <FontAwesome5 name="youtube" size={80} color="#FF0000" />
      </View>

      <Text style={styles.headerTitle}>ডেভলপারকে সাপোর্ট করুন!</Text>
      
      <Text style={styles.subtitle}>
        অ্যাপটি যদি আপনার সামান্য উপকারে এসে থাকে এবং আপনি যদি আমাদের ইসলামিক কনটেন্টগুলো পছন্দ করে থাকেন, তবে আমাদের ইউটিউব চ্যানেলটি সাবস্ক্রাইব করে সাপোর্ট করার অনুরোধ রইলো!
      </Text>

      <TouchableOpacity style={styles.subscribeButton} onPress={openChannel} activeOpacity={0.8}>
        <FontAwesome5 name="bell" size={18} color="#FFF" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>চ্যানেলটি সাবস্ক্রাইব করুন</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  contentContainer: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0000', // YouTube Red
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
