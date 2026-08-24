import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeroCard from '../../components/heroCard';
import StreamCards from '../../components/streamCard';
import PopularDepartments from '../../components/popularDepartments';
import TopUniversities from '../../components/topUniversty';
import useTheme from '../../store/useTheme';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background || '#F8FAFC' }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <HeroCard searchText={searchText} setSearchText={setSearchText} />
        <StreamCards />
        <PopularDepartments />
        <TopUniversities />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
});

export default Home;