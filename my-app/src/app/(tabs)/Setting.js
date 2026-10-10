import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import useTheme from '../../store/useTheme';

export default function SettingScreen() {
  const router = useRouter();
  const { colors, isDarkMode, toggleTheme } = useTheme();

  // Functional state
  const [notifications, setNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [langModalVisible, setLangModalVisible] = useState(false);

  const languages = ['English', 'Amharic', 'Oromiffa', 'Tigrigna'];

  // Handlers for settings items
  const handleAbout = () => {
    Alert.alert(
      'About Dept Advisor',
      'Dept Advisor v1.0.0\n\nDesigned to guide students in choosing university departments, streams, and career paths.'
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      'Send Feedback',
      'We value your feedback!\n\nEmail: fasika394@gmail.com\nPhone: 0906437297',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Email',
          onPress: () => Linking.openURL('mailto:fasika394@gmail.com'),
        },
        {
          text: 'Call Us',
          onPress: () => Linking.openURL('tel:0906437297'),
        },
      ]
    );
  };

  const handleContactUs = () => {
    Alert.alert(
      'Contact Details',
      'Direct Support Contact:\n\nPhone: 0906437297\nEmail: fasika394@gmail.com',
      [
        { text: 'Close', style: 'cancel' },
        {
          text: 'Call Phone',
          onPress: () => Linking.openURL('tel:0906437297'),
        },
        {
          text: 'Email',
          onPress: () => Linking.openURL('mailto:fasika394@gmail.com'),
        },
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your privacy is essential. We collect minimal usage metrics to improve department recommendations. No personal data is shared with third parties.'
    );
  };

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => router.replace('/'),
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background || '#F8FAFC' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={24} color="#0F172A" />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Settings Group */}
        <View style={styles.cardGroup}>
          {/* Dark Mode */}
          <View style={styles.settingItem}>
            <View style={styles.leftContent}>
              <Ionicons name="moon-outline" size={22} color="#0F172A" />
              <Text style={styles.settingLabel}>Dark mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#CBD5E1', true: '#1D4ED8' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Language Selector */}
          <TouchableOpacity
            style={styles.settingItem}
            activeOpacity={0.7}
            onPress={() => setLangModalVisible(true)}
          >
            <View style={styles.leftContent}>
              <Ionicons name="globe-outline" size={22} color="#0F172A" />
              <Text style={styles.settingLabel}>Language</Text>
            </View>
            <View style={styles.dropdownBadge}>
              <Text style={styles.dropdownText}>{selectedLanguage}</Text>
              <Ionicons name="chevron-down" size={16} color="#64748B" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Notifications */}
          <View style={styles.settingItem}>
            <View style={styles.leftContent}>
              <Ionicons name="notifications-outline" size={22} color="#0F172A" />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#CBD5E1', true: '#1D4ED8' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Contact Us */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={handleContactUs}>
            <View style={styles.leftContent}>
              <Ionicons name="call-outline" size={22} color="#0F172A" />
              <Text style={styles.settingLabel}>Contact Us</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Feedback */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={handleFeedback}>
            <View style={styles.leftContent}>
              <Ionicons name="chatbox-ellipses-outline" size={22} color="#0F172A" />
              <Text style={styles.settingLabel}>Feedback</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* About */}
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={handleAbout}>
            <View style={styles.leftContent}>
              <Ionicons name="information-circle-outline" size={22} color="#0F172A" />
              <Text style={styles.settingLabel}>About</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.settingItem}
            activeOpacity={0.7}
            onPress={handlePrivacyPolicy}
          >
            <View style={styles.leftContent}>
              <Ionicons name="shield-checkmark-outline" size={22} color="#0F172A" />
              <Text style={styles.settingLabel}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} activeOpacity={0.7} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal visible={langModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setLangModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.languageOption}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setLangModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    selectedLanguage === lang && styles.selectedLanguageText,
                  ]}
                >
                  {lang}
                </Text>
                {selectedLanguage === lang && (
                  <Ionicons name="checkmark" size={20} color="#1D4ED8" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Syne_700Bold',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  cardGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginTop: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  settingLabel: {
    fontSize: 15,
    fontFamily: 'Syne_600SemiBold',
    color: '#0F172A',
  },
  dropdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dropdownText: {
    fontSize: 13,
    fontFamily: 'Syne_500Medium',
    color: '#475569',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 52,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutText: {
    fontSize: 15,
    fontFamily: 'Syne_700Bold',
    color: '#DC2626',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Syne_700Bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  languageOptionText: {
    fontSize: 15,
    fontFamily: 'Syne_500Medium',
    color: '#334155',
  },
  selectedLanguageText: {
    fontFamily: 'Syne_700Bold',
    color: '#1D4ED8',
  },
});