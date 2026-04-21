import { View, Text, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in text for a nice effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Navigate to drawer containing home screen after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/(drawer)');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#E84C22" translucent={true} />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Large Arabic text */}
        <Text style={styles.arabic}>الله</Text>
        
        {/* Bengali App Name */}
        <Text style={styles.bengali}>আল্লাহর ৯৯ টি নাম</Text>
      </Animated.View>
      
      {/* Footer Text */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>Backed by Barik</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E84C22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  arabic: {
    fontSize: 130,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'serif',
    marginBottom: 10,
  },
  bengali: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '500',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 18,
    textDecorationLine: 'underline',
  }
});
