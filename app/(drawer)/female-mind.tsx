import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import * as Linking from 'expo-linking';
import { FontAwesome5 } from '@expo/vector-icons';

export default function FemaleMindScreen() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const openVideo = () => {
    Linking.openURL('https://youtu.be/J5UpSRP-BXs');
  };

  const openPlaylist = () => {
    Linking.openURL('https://www.youtube.com/playlist?list=PL506NMU6kUaBD-7cgvA6Gej5h3NQ0ybAB');
  };

  // Dimensions to make the video responsive to the user's phone width
  const { width } = Dimensions.get('window');
  const videoHeight = (width * 9) / 16; // Standard 16:9 aspect ratio

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Welcome to Female Mind</Text>
      <Text style={styles.subtitle}>Watch our introductory video below!</Text>
      
      <View style={styles.videoContainer}>
        <YoutubeIframe
          height={videoHeight}
          play={playing}
          videoId={'J5UpSRP-BXs'}
          onChangeState={onStateChange}
          webViewStyle={{ opacity: 0.99 }} // Hardware acceleration workaround on android
          forceAndroidAutoplay={false}
        />
        
        {/* Fallback open button if webview fails on Expo Go */}
        <TouchableOpacity style={styles.fallbackButton} onPress={openVideo}>
           <FontAwesome5 name="youtube" size={16} color="#FFF" style={styles.buttonIcon} />
           <Text style={styles.buttonText}>Play Video in YouTube App</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>Want to explore the complete series?</Text>
        <TouchableOpacity style={styles.playlistButton} onPress={openPlaylist} activeOpacity={0.8}>
          <FontAwesome5 name="external-link-alt" size={16} color="#FFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Watch Full Playlist</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E84C22',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  videoContainer: {
    backgroundColor: '#000', // Provides a sharp block while the iframe mounts
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 30,
  },
  actionContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontWeight: '500',
  },
  playlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008000', // Green, consistent with numbers design
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: '#008000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fallbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
  }
});
