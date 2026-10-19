import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeroCard from '../../components/heroCard';
import StreamCards from '../../components/streamCard';
import PopularDepartments from '../../components/popularDepartments';
import TopUniversities from '../../components/topUniversty';
import useTheme from '../../store/useTheme';

const Home = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: colors.background }
      ]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <HeroCard />
        <StreamCards />
        <PopularDepartments />
        <TopUniversities />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  scrollContent: { 
    paddingBottom: 25, // Reduced from 80 to remove the empty space at the bottom
  },
});

export default Home;