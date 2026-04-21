import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useIsFocused } from '@react-navigation/native';

// Replace with your actual Ad Unit ID
const adUnitId = __DEV__ 
  ? TestIds.ADAPTIVE_BANNER 
  : 'ca-app-pub-9082337666591788/4710438219';

interface AdBannerProps {
  onLoad?: () => void;
  onFail?: () => void;
}

const AdBanner = ({ onLoad, onFail }: AdBannerProps) => {
  const isFocused = useIsFocused();
  const [isLoaded, setIsLoaded] = React.useState(false);

  // If focus is lost and ad isn't visible, ensure states are reset
  useEffect(() => {
    if (!isFocused && !isLoaded) {
      onFail?.();
    }
  }, [isFocused, isLoaded]);

  return (
    <View style={[styles.container, !isLoaded && styles.hidden]}>
      {isFocused && (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            setIsLoaded(true);
            onLoad?.();
          }}
          onAdFailedToLoad={(error) => {
            console.warn('Ad failed to load: ', error);
            setIsLoaded(false);
            onFail?.();
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#F2F2F2',
    height: 32, // User requested 32dp height
  },
  hidden: {
    height: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

export default AdBanner;
