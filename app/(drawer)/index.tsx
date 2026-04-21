import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5 } from '@expo/vector-icons';
import namesData from '../../assets/data/asmaul_husna.json';
import { audioMap } from '../../constants/AudioMap';
import AdBanner from '../../components/AdBanner';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubscribeModal from '../../components/SubscribeModal';
import * as Linking from 'expo-linking';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [adVisible, setAdVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkModalStatus = async () => {
      try {
        const hasShown = await AsyncStorage.getItem('has_shown_subscribe_modal');
        if (hasShown === null) {
          // Show modal after a short delay for better UX
          setTimeout(() => {
            setModalVisible(true);
          }, 1500);
        }
      } catch (error) {
        console.error('Error checking storage', error);
      }
    };
    checkModalStatus();
  }, []);

  const handleCloseModal = async () => {
    setModalVisible(false);
    try {
      await AsyncStorage.setItem('has_shown_subscribe_modal', 'true');
    } catch (error) {
      console.error('Error saving storage', error);
    }
  };

  const handleSubscribe = async () => {
    handleCloseModal();
    Linking.openURL('https://www.youtube.com/channel/UCsQvox_DAmM8g027TnCNslA?sub_confirmation=1');
  };

  useEffect(() => {
    const backAction = () => {
      // If we are on the Home screen and the drawer is closed, exit the app
      // This solves the 'two back presses to exit' bug
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // Enable audio playback in silent mode
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false, // Ensures it plays through the main speaker
    });

    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  const playSound = async (id: number) => {
    try {
      if (playingId === id) return; // Prevent multiple clicks
      
      setPlayingId(id);

      // Stop previous sound if any
      if (sound) {
        await sound.unloadAsync();
      }

      console.log('Loading Local Sound for ID:', id);
      const audioAsset = audioMap[id];
      const { sound: newSound } = await Audio.Sound.createAsync(audioAsset);
      setSound(newSound);

      console.log('Playing Sound');
      await newSound.playAsync();

      // Reset playing state after finished
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setPlayingId(null);
        }
      });

    } catch (error) {
      console.error('Error playing sound', error);
      setPlayingId(null);
    }
  };

  const renderItem = ({ item }: { item: typeof namesData[0] }) => {
    const formattedId = item.id < 10 ? `0${item.id}` : item.id;
    return (
      <View style={[styles.card, playingId === item.id && styles.playingCard]}>
        <Text style={styles.numberText}>{formattedId}</Text>
        
        <Text style={styles.arabicName}>{item.arabic}</Text>
        <Text style={styles.banglaName}>{item.bangla}</Text>
        <Text style={styles.pronunciation}>{item.pronunciation}</Text>

        <TouchableOpacity 
          style={[styles.playButton, playingId === item.id && styles.playButtonActive]}
          onPress={() => playSound(item.id)}
          disabled={playingId !== null && playingId !== item.id}
          activeOpacity={0.8}
        >
          {playingId === item.id ? (
             <ActivityIndicator size="small" color="#FFF" />
          ) : (
             <FontAwesome5 name="volume-up" size={16} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={namesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: (adVisible ? 45 : 20) + insets.bottom }
        ]}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
      
      {/* Absolute positioned or fixed bottom ad banner */}
      <View style={[
        styles.adContainer, 
        { 
          borderTopWidth: adVisible ? 1 : 0,
          paddingBottom: insets.bottom // Ensure ad is above system gesture bar
        }
      ]}>
        <AdBanner 
          onLoad={() => setAdVisible(true)} 
          onFail={() => setAdVisible(false)} 
        />
      </View>

      <SubscribeModal 
        visible={modalVisible} 
        onClose={handleCloseModal} 
        onSubscribe={handleSubscribe} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  list: {
    flex: 1,
  },
  adContainer: {
    backgroundColor: '#F2F2F2',
    borderTopColor: '#DDD',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 20, // Default padding when no ad
  },
  listWithAd: {
    paddingBottom: 80, // Space to ensure the 99th name is above the ad
  },
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#999',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  playingCard: {
    backgroundColor: '#f9eee8',
    borderColor: '#E84C22',
  },
  numberText: {
    color: '#008000',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  arabicName: {
    fontSize: 34,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 46, // needed for Arabic scripts
  },
  banglaName: {
    fontSize: 22,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 6,
  },
  pronunciation: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 18,
  },
  playButton: {
    backgroundColor: '#E84C22',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E84C22',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  playButtonActive: {
    backgroundColor: '#cc401a',
  }
});
