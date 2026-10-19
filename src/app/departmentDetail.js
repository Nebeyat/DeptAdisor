import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from '../store/useTheme';

export default function DepartmentDetailScreen() {
  const router = useRouter();
  const { id, code } = useLocalSearchParams();
  const { isDarkMode } = useTheme();

  // Fetch departments list from Convex
  const departments = useQuery(api.departments.getDepartments);

  // Match selected department by Convex _id or code
  const department = departments?.find(
    (d) => d._id === id || d.id === id || d.code === code
  );

  const themeContainer = isDarkMode ? styles.darkContainer : styles.lightContainer;
  const themeCard = isDarkMode ? styles.darkCard : styles.lightCard;
  const themeTextPrimary = isDarkMode ? styles.darkTextPrimary : styles.lightTextPrimary;
  const themeTextSecondary = isDarkMode ? styles.darkTextSecondary : styles.lightTextSecondary;

  if (departments === undefined) {
    return (
      <SafeAreaView style={[styles.container, themeContainer, styles.center]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, themeTextSecondary]}>
          Loading department details...
        </Text>
      </SafeAreaView>
    );
  }

  if (!department) {
    return (
      <SafeAreaView style={[styles.container, themeContainer, styles.center]}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF3B30" />
        <Text style={[styles.errorTitle, themeTextPrimary]}>Department Not Found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, themeContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, themeTextPrimary]} numberOfLines={1}>
          {department.name}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Info Card */}
        <View style={[styles.card, themeCard]}>
          <View style={styles.badgeRow}>
            <View style={styles.codeBadge}>
              <Text style={styles.codeBadgeText}>{department.code}</Text>
            </View>
            <View style={styles.streamBadge}>
              <Text style={styles.streamBadgeText}>{department.stream}</Text>
            </View>
          </View>

          <Text style={[styles.title, themeTextPrimary]}>{department.name}</Text>
          <Text style={[styles.faculty, themeTextSecondary]}>{department.faculty}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={18} color="#007AFF" />
            <Text style={[styles.metaText, themeTextSecondary]}>
              Duration: <Text style={styles.boldText}>{department.duration}</Text>
            </Text>
          </View>
        </View>

        {/* Description Section */}
        <View style={[styles.card, themeCard]}>
          <Text style={[styles.sectionTitle, themeTextPrimary]}>Overview</Text>
          <Text style={[styles.descriptionText, themeTextSecondary]}>
            {department.description}
          </Text>
        </View>

        {/* Career Opportunities / Workplaces */}
        {department.workplaces && department.workplaces.length > 0 && (
          <View style={[styles.card, themeCard]}>
            <Text style={[styles.sectionTitle, themeTextPrimary]}>
              Career Opportunities & Workplaces
            </Text>
            {department.workplaces.map((workplace, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="briefcase-outline" size={18} color="#34C759" style={styles.listIcon} />
                <Text style={[styles.listText, themeTextSecondary]}>{workplace}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Recommended Universities */}
        {department.recommendedUniversities && department.recommendedUniversities.length > 0 && (
          <View style={[styles.card, themeCard]}>
            <Text style={[styles.sectionTitle, themeTextPrimary]}>
              Recommended Universities
            </Text>
            {department.recommendedUniversities.map((uni, index) => (
              <View key={index} style={styles.uniItem}>
                <Ionicons name="school-outline" size={20} color="#5856D6" style={styles.listIcon} />
                <View style={styles.uniTextContainer}>
                  <Text style={[styles.uniName, themeTextPrimary]}>{uni.name}</Text>
                  <Text style={[styles.uniLocation, themeTextSecondary]}>
                    {uni.location} • ({uni.code})
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#F2F2F7',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  lightCard: {
    backgroundColor: '#FFFFFF',
  },
  darkCard: {
    backgroundColor: '#1C1C1E',
  },
  lightTextPrimary: {
    color: '#000000',
  },
  darkTextPrimary: {
    color: '#FFFFFF',
  },
  lightTextSecondary: {
    color: '#6C6C70',
  },
  darkTextSecondary: {
    color: '#8E8E93',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  codeBadge: {
    backgroundColor: '#007AFF15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  codeBadgeText: {
    color: '#007AFF',
    fontWeight: '700',
    fontSize: 12,
  },
  streamBadge: {
    backgroundColor: '#34C75915',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  streamBadgeText: {
    color: '#34C759',
    fontWeight: '600',
    fontSize: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  faculty: {
    fontSize: 14,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
  },
  boldText: {
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listIcon: {
    marginRight: 10,
  },
  listText: {
    fontSize: 14,
    flex: 1,
  },
  uniItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  uniTextContainer: {
    flex: 1,
  },
  uniName: {
    fontSize: 15,
    fontWeight: '600',
  },
  uniLocation: {
    fontSize: 13,
    marginTop: 2,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});