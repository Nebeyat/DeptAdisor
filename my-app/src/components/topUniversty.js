import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './icon';
import useTheme from '../store/useTheme';

const UNIVERSITIES = [
  { id: '1', name: 'Addis Ababa University', location: 'Addis Ababa', code: 'AAU', icon: 'school-outline' },
  { id: '2', name: 'Bahir Dar University', location: 'Bahir Dar', code: 'BDU', icon: 'school-outline' },
  { id: '3', name: 'Hawassa University', location: 'Hawassa', code: 'HU', icon: 'school-outline' },
  { id: '4', name: 'Jimma University', location: 'Jimma', code: 'JU', icon: 'school-outline' },
];

const TopUniversities = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors?.textPrimary || '#0F172A' }]}>
        Top Universities
      </Text>

      <View style={styles.list}>
        {UNIVERSITIES.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: colors?.cardBg || '#FFFFFF' }]}
            activeOpacity={0.7}
          >
            <View style={styles.iconBox}>
              <Icon name={item.icon} size={22} color="#2563EB" />
            </View>

            <View style={styles.info}>
              <Text style={[styles.uniName, { color: colors?.textPrimary || '#0F172A' }]}>
                {item.name}
              </Text>
              <View style={styles.locationRow}>
                <Icon name="location-outline" size={12} color="#64748B" />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
            </View>

            <View style={styles.codeTag}>
              <Text style={styles.codeText}>{item.code}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 24, paddingHorizontal: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  list: { gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1, marginLeft: 12 },
  uniName: { fontSize: 14, fontWeight: '600' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
  locationText: { fontSize: 12, color: '#64748B' },
  codeTag: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  codeText: { fontSize: 11, fontWeight: '700', color: '#475569' },
});

export default TopUniversities;