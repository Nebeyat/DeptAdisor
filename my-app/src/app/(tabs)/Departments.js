
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '../../components/icon';
import useTheme from '../../store/useTheme';
import { Data } from '../../data/data';

const Departments = () => {
  const router = useRouter();
  const { stream = 'natural', title = 'Departments' } = useLocalSearchParams();
  const { colors } = useTheme();

  // Get department list array based on selected stream ('natural' or 'social')
  const departmentList = Data[stream] || [];

  const renderDepartmentItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors?.cardBg || '#FFFFFF' }]}
      activeOpacity={0.7}
      onPress={() => {
        // Handle individual department tap if needed
      }}
    >
      <View style={styles.codeBadge}>
        <Text style={styles.codeText}>{item.code}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.deptName, { color: colors?.textPrimary || '#0F172A' }]}>
          {item.name}
        </Text>
        <Text style={styles.durationText}>Duration: {item.duration || 'N/A'}</Text>
      </View>

      <Icon name="chevron-forward-outline" color="#94A3B8" size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background || '#F8FAFC' }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back-outline" color="#0F172A" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* List of Departments */}
      <FlatList
        data={departmentList}
        keyExtractor={(item) => item.id}
        renderItem={renderDepartmentItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  codeBadge: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  codeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2563EB',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  deptName: {
    fontSize: 15,
    fontWeight: '600',
  },
  durationText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },
});

export default Departments;