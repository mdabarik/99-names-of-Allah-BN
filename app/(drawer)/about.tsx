import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/images/developer.png')} style={styles.developerImage} />
      </View>
      
      <Text style={styles.headerTitle}>ABOUT DEVELOPER</Text>
      
      <View style={styles.textContainer}>
        <Text style={styles.bioText}>
          আসসালামু আলাইকুম ওয়া রহমাতুল্লাহি ওয়া বারাকাতুহু। সকল প্রশংসা মহিয়ান গরিয়ান আল্লাহ্‌ তায়ালার জন্য। আল্লাহর অশেষ মেহেরবানী তে এই অ্যাপটি তৈরি করতে পারলাম। আমি গোপালগঞ্জ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় এর একজন ছাত্র। আল্লাহর ৯৯ টি নাম দিয়ে তৈরী করলাম প্রথম ইসলামিক অ্যাপ। এবং এটিই আমার প্লে স্টোরে পাবলিশ করা প্রথম অ্যাপ। আমার একটি প্রোগ্রামিং ইউটিউব চ্যানেল আছে এবং আমার আরেক টি ইউটিউব চ্যানেল আছে যেখানে আমি ইসলামিক ভিডিও বানাই।
        </Text>

        <Text style={[styles.bioText, styles.workText]}>
          বর্তমানে আমি Be Data Solutions Ltd.-এ সফটওয়্যার ইঞ্জিনিয়ার হিসেবে কাজ করছি। প্রফেশনাল যেকোনো প্রয়োজনে আমার সাথে লিঙ্কডইনের মাধ্যমে যোগাযোগ করতে পারেন:
        </Text>

        <TouchableOpacity 
          style={styles.linkedinButton}
          onPress={() => Linking.openURL('https://www.linkedin.com/in/md-a-barik')}
          activeOpacity={0.7}
        >
          <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
          <Text style={styles.linkedinText}>Let's Connect on LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  developerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#EA4A22',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D13106',
    textAlign: 'center',
    marginBottom: 15,
  },
  textContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  bioText: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 25,
    textAlign: 'center',
  },
  workText: {
    marginTop: 15,
    fontWeight: '500',
  },
  linkedinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E1E9EE',
  },
  linkedinText: {
    fontSize: 16,
    color: '#0077B5',
    fontWeight: 'bold',
    marginLeft: 10,
  }
});
