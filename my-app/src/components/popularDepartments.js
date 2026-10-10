import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from './icon';
import useTheme from '../store/useTheme';

const POPULAR_DEPARTMENTS = [
  { id: '1', name: 'Software Engineering', code: 'SE', stream: 'natural', rating: '> 3.7' },
  { id: '2', name: 'Medicine', code: 'MED', stream: 'natural', rating: '> 3.8' },
  { id: '3', name: 'Accounting & Finance', code: 'A&F', stream: 'social', rating: '> 3.5' },
  { id: '4', name: 'Civil Engineering', code: 'CE', stream: 'natural', rating: '> 2.8' },
  { id: '5', name: 'Law', code: 'LAW', stream: 'social', rating: '> 3.6' },
];

const PopularDepartments = () => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors?.textPrimary || '#0F172A' }]}>
        Popular Departments
      </Text>

      <FlatList
        data={POPULAR_DEPARTMENTS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors?.cardBg || '#FFFFFF' }]}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/department', params: { stream: item.stream } })}
          >
            <View style={styles.badgeRow}>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>{item.code}</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Icon name="star" size={12} color="#F59E0B" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>

            <Text style={[styles.deptName, { color: colors?.textPrimary || '#0F172A' }]} numberOfLines={2}>
              {item.name}
            </Text>
            
            <Text style={styles.streamText}>
              {item.stream === 'natural' ? 'Natural Science' : 'Social Science'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 24 },
  title: { fontSize: 18, fontWeight: '700', paddingHorizontal: 16, marginBottom: 12 },
  list: { paddingHorizontal: 16, gap: 12 },
  card: {
    width: 160,
    padding: 14,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  codeBadge: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  codeText: { fontSize: 11, fontWeight: '800', color: '#2563EB' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  deptName: { fontSize: 14, fontWeight: '700', height: 38 },
  streamText: { fontSize: 11, color: '#94A3B8', marginTop: 4 },
});

export default PopularDepartments;