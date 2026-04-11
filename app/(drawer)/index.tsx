import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5 } from '@expo/vector-icons';
import namesData from '../../assets/data/asmaul_husna.json';
import { audioMap } from '../../constants/AudioMap';

export default function HomeScreen() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

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
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
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
