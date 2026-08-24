import React from 'react';
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SystemBars } from "react-native-edge-to-edge";
import { useColorScheme } from 'react-native';


import colors from '../../utils/colors'; 


import { 
  useFonts, 
  Syne_400Regular, 
  Syne_500Medium, 
  Syne_600SemiBold, 
  Syne_700Bold, 
  Syne_800ExtraBold 
} from '@expo-google-fonts/syne';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Syne_400Regular, 
    Syne_500Medium, 
    Syne_600SemiBold, 
    Syne_700Bold, 
    Syne_800ExtraBold
  });
  
  // Prevent rendering before custom fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <SystemBars style="auto" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors?.accentPrimary || '#007AFF',
          tabBarInactiveTintColor: colors?.textMuted || '#8E8E93',
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Departments"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'easel' : 'easel-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Details"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'document-text' : 'document-text-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Setting"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}