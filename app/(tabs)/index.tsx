import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5 } from '@expo/vector-icons';
import namesData from '../../assets/data/asmaul_husna.json';

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

  const playSound = async (id: number, url: string) => {
    try {
      if (playingId === id) return; // Prevent multiple clicks
      
      setPlayingId(id);

      // Stop previous sound if any
      if (sound) {
        await sound.unloadAsync();
      }

      console.log('Loading Sound', url);
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
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

  const renderItem = ({ item }: { item: typeof namesData[0] }) => (
    <View style={styles.card}>
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{item.id}</Text>
      </View>
      
      <View style={styles.nameContent}>
        <Text style={styles.arabicName}>{item.arabic}</Text>
        <Text style={styles.banglaName}>{item.bangla}</Text>
        <Text style={styles.pronunciation}>{item.pronunciation}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.playButton, playingId === item.id && styles.playingButton]} 
        onPress={() => playSound(item.id, item.audio_url)}
        disabled={playingId !== null && playingId !== item.id}
      >
        {playingId === item.id ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
           <FontAwesome5 name="play" size={16} color="#FFF" />
        )}
      </TouchableOpacity>
    </View>
  );

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
    backgroundColor: '#F7F9FA',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#FF8800', // Our primary orange
  },
  numberBadge: {
    backgroundColor: '#FFF0D9',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  numberText: {
    color: '#FF8800',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameContent: {
    flex: 1,
    paddingRight: 10,
  },
  arabicName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 5,
  },
  banglaName: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
    marginBottom: 2,
  },
  pronunciation: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  playButton: {
    backgroundColor: '#FF8800',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF8800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  playingButton: {
    backgroundColor: '#FFB84D',
  }
});
