import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from './icon';
import useTheme from '../store/useTheme';

const StreamCards = () => {
  const router = useRouter();
  const { colors, spacing } = useTheme();

  const navigateToDepartments = (streamType, streamTitle) => {
    router.push({
      pathname: '/department',
      params: { stream: streamType, title: streamTitle },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors?.textPrimary || '#0F172A' }]}>
        Select Your Stream
      </Text>

      <View style={styles.cardRow}>
        
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#EFF6FF', borderColor: '#3B82F6' }]}
        
          onPress={() => navigateToDepartments('natural', 'Natural Science')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#3B82F6' }]}>
            <Icon name="flask-outline" color="#FFFFFF" size={24} />
          </View>
          <Text style={styles.cardTitle}>Natural Science</Text>
          <Text style={styles.cardSubtitle}>Engineering, IT, Medicine & Tech</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#FDF2F8', borderColor: '#EC4899' }]}
          activeOpacity={0.8}
          onPress={() => navigateToDepartments('social', 'Social Science')}
        >
          <View style={[styles.iconWrapper, { backgroundColor: '#EC4899' }]}>
            <Icon name="book-outline" color="#FFFFFF" size={24} />
          </View>
          <Text style={styles.cardTitle}>Social Science</Text>
          <Text style={styles.cardSubtitle}>Law, Business, Economics & Arts</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
});

export default StreamCards;