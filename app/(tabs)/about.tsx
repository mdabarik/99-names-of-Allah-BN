import React from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.appName}>আল্লাহর ৯৯ টি নাম</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About This App</Text>
        <Text style={styles.cardText}>
          This application provides a beautiful and interactive way to learn and memorize the 99 Names of Allah (Asmaul Husna).
          It includes Arabic text, Bengali meanings and correct audio pronunciations.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Developer Information</Text>
        <Text style={styles.cardText}>
          Developed by Md A Barik, working as a Software Engineer at Be Data Solutions Ltd. 
          This project was made with passion to help Muslims learn the beautiful names of the Almighty.
        </Text>
        <TouchableOpacity style={styles.contactButton} onPress={() => Linking.openURL('https://www.linkedin.com/in/md-a-barik')}>
          <Text style={styles.buttonText}>Connect on LinkedIn</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FA',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFE8CC',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8800',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  contactButton: {
    marginTop: 15,
    backgroundColor: '#FF8800',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
