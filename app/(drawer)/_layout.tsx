import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { View, Text, StyleSheet, BackHandler, Platform, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome5 } from '@expo/vector-icons';

const COLORS = {
  primary: '#E84C22',
};

function CustomDrawerContent(props: any) {
  const currentRouteName = props.state ? props.state.routeNames[props.state.index] : '';

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 40 }}>
        <DrawerItem
          label="Home"
          labelStyle={styles.drawerItemLabel}
          icon={({ color, size }) => <FontAwesome5 name="home" size={20} color="#fff" style={styles.iconStyle} />}
          onPress={() => props.navigation.navigate('index')}
          focused={currentRouteName === 'index'}
          activeBackgroundColor="rgba(255, 255, 255, 0.2)"
          activeTintColor="#fff"
          inactiveTintColor="#fff"
        />
        <DrawerItem
          label="Female Mind"
          labelStyle={styles.drawerItemLabel}
          icon={({ color, size }) => <FontAwesome5 name="brain" size={20} color="#fff" style={styles.iconStyle} />}
          onPress={() => props.navigation.navigate('female-mind')}
          focused={currentRouteName === 'female-mind'}
          activeBackgroundColor="rgba(255, 255, 255, 0.2)"
          activeTintColor="#fff"
          inactiveTintColor="#fff"
        />
        <DrawerItem
          label="YouTube Channel"
          labelStyle={styles.drawerItemLabel}
          icon={({ color, size }) => <FontAwesome5 name="youtube" size={20} color="#fff" style={styles.iconStyle} />}
          onPress={() => props.navigation.navigate('youtube-channel')}
          focused={currentRouteName === 'youtube-channel'}
          activeBackgroundColor="rgba(255, 255, 255, 0.2)"
          activeTintColor="#fff"
          inactiveTintColor="#fff"
        />
        <DrawerItem
          label="More Apps"
          labelStyle={styles.drawerItemLabel}
          icon={({ color, size }) => <FontAwesome5 name="google-play" size={20} color="#fff" style={styles.iconStyle} />}
          onPress={() => props.navigation.navigate('more-apps')}
          focused={currentRouteName === 'more-apps'}
          activeBackgroundColor="rgba(255, 255, 255, 0.2)"
          activeTintColor="#fff"
          inactiveTintColor="#fff"
        />
        <DrawerItem
          label="About"
          labelStyle={styles.drawerItemLabel}
          icon={({ color, size }) => <FontAwesome5 name="user" size={20} color="#fff" style={styles.iconStyle} />}
          onPress={() => props.navigation.navigate('about')}
          focused={currentRouteName === 'about'}
          activeBackgroundColor="rgba(255, 255, 255, 0.2)"
          activeTintColor="#fff"
          inactiveTintColor="#fff"
        />
        <DrawerItem
          label="Exit"
          labelStyle={styles.drawerItemLabel}
          icon={({ color, size }) => <FontAwesome5 name="power-off" size={20} color="#fff" style={styles.iconStyle} />}
          onPress={() => {
            if (Platform.OS === 'android') {
              BackHandler.exitApp();
            }
          }}
          activeTintColor="#fff"
          inactiveTintColor="#fff"
        />
      </DrawerContentScrollView>
    </View>
  );
}

import { StatusBar as RNStatusBar } from 'react-native';

export default function DrawerLayout() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      RNStatusBar.setBackgroundColor('#C53812');
      RNStatusBar.setBarStyle('light-content');
    }
  }, []);

  return (
    <>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          drawerStyle: { backgroundColor: COLORS.primary },
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
        }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'আল্লাহর ৯৯ টি নাম',
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'About',
            title: 'About',
          }}
        />
        <Drawer.Screen
          name="female-mind"
          options={{
            drawerLabel: 'Female Mind',
            title: 'Female Mind',
          }}
        />
        <Drawer.Screen
          name="youtube-channel"
          options={{
            drawerLabel: 'YouTube Channel',
            title: 'My YouTube Channel',
          }}
        />
        <Drawer.Screen
          name="more-apps"
          options={{
            drawerLabel: 'More Apps',
            title: 'More Apps from TechBarik',
          }}
        />
      </Drawer>
    </>
  );
}

const styles = StyleSheet.create({
  drawerItemLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  iconStyle: {
    width: 25,
    textAlign: 'center',
  }
});
