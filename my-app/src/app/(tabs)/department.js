import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from 'convex/react';

import { api } from '../../../convex/_generated/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import useTheme from '../../store/useTheme';

export default function DepartmentScreen() {
  const router = useRouter();
  const theme = useTheme() || {};
  const colors = theme.colors || {};

  const [selectedStream, setSelectedStream] = useState('All');
  const streams = ['All', 'Natural Science', 'Social Science'];

  // Query Convex with selected stream filter
  const departments = useQuery(api.departments.getDepartments, {
    stream: selectedStream === 'All' ? undefined : selectedStream,
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background || '#F8FAFC' }]}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="grid-outline" size={20} color="#0F172A" />
          <Text style={styles.headerTitle}>Departments</Text>
        </View>
      </View>

      {/* Stream Tabs */}
      <View style={styles.streamFilterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.streamList}>
          {streams.map((stream) => {
            const isActive = selectedStream === stream;
            return (
              <TouchableOpacity
                key={stream}
                activeOpacity={0.8}
                style={[
                  styles.streamChip,
                  isActive && styles.activeStreamChip,
                ]}
                onPress={() => setSelectedStream(stream)}
              >
                <Text
                  style={[
                    styles.streamChipText,
                    isActive && styles.activeStreamChipText,
                  ]}
                >
                  {stream}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Department Cards List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {departments === undefined ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#1D4ED8" />
            <Text style={styles.loadingText}>Loading departments...</Text>
          </View>
        ) : departments.length === 0 ? (
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No departments found for "{selectedStream}".</Text>
          </View>
        ) : (
          departments.map((dept) => (
            <TouchableOpacity
              key={dept._id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() =>
                router.push({
                  pathname: '/departmentDetail',
                  params: { id: dept._id },
                })
              }
            >
              <View style={styles.cardHeader}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{dept.code || 'DEPT'}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
              </View>

              <Text style={styles.deptName}>{dept.name}</Text>
              <Text style={styles.streamText}>{dept.stream}</Text>

              <View style={styles.cardFooter}>
                <View style={styles.infoPill}>
                  <Text style={styles.infoLabel}>GPA: </Text>
                  <Text style={styles.infoValue}>{dept.requiredGPA ?? 'N/A'}</Text>
                </View>
                <View style={styles.infoPill}>
                  <Text style={styles.infoLabel}>Duration: </Text>
                  <Text style={styles.infoValue}>{dept.duration || 'N/A'}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
    gap: 12,
  },
  backButton: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: { fontSize: 20, fontFamily: 'Syne_700Bold', color: '#0F172A' },
  streamFilterContainer: { marginVertical: 8 },
  streamList: { paddingHorizontal: 16, gap: 8 },
  streamChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeStreamChip: { backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' },
  streamChipText: { fontSize: 13, fontFamily: 'Syne_600SemiBold', color: '#64748B' },
  activeStreamChipText: { color: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 90, paddingTop: 8 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { fontSize: 12, fontFamily: 'Syne_700Bold', color: '#1D4ED8' },
  deptName: { fontSize: 18, fontFamily: 'Syne_700Bold', color: '#0F172A' },
  streamText: { fontSize: 13, fontFamily: 'Syne_400Regular', color: '#64748B', marginTop: 2 },
  cardFooter: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  infoPill: { flexDirection: 'row', alignItems: 'center' },
  infoLabel: { fontSize: 12, fontFamily: 'Syne_500Medium', color: '#64748B' },
  infoValue: { fontSize: 12, fontFamily: 'Syne_700Bold', color: '#0F172A' },
  centerContainer: { paddingVertical: 40, alignItems: 'center' },
  loadingText: { marginTop: 8, fontSize: 13, color: '#64748B', fontFamily: 'Syne_500Medium' },
  emptyText: { fontSize: 14, fontFamily: 'Syne_500Medium', color: '#64748B' },
});