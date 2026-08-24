import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import Icon from './icon';
import SearchInput from './searchInput';
import useTheme from '../store/useTheme';

const HeroCard = ({ searchText, setSearchText }) => {
  const { themeMode, toggleTheme, spacing } = useTheme();
  const themeIconName = themeMode === 'light' ? 'moon-outline' : 'sunny-outline';
  const bgImage = {
    uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
  };
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={bgImage}
        style={styles.imageBackground}
        imageStyle={styles.bgImageStyle}
      >
        <LinearGradient
          colors={['rgba(10, 38, 71, 0.45)', 'rgba(10, 38, 71, 0.90)']}
          style={[styles.gradientOverlay, { padding: spacing?.m || 16 }]}
        >
          
          <View style={styles.topBar}>
            <View style={styles.homeBadge}>
              <Icon name="home-outline" color="#FFFFFF" size={22} />
              <Text style={styles.homeText}>Home</Text>
            </View>
            <Icon name={themeIconName} action={toggleTheme} color="#FFFFFF" size={22} />
          </View>

          
          <Text style={styles.bannerTitle}>
            {`Find Your Path:\nDept Advisor`}
          </Text>

          {/* Search Bar at Bottom */}
          <View style={styles.searchWrapper}>
            <SearchInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search..."
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  bgImageStyle: {
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  homeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  searchWrapper: {
    width: '100%',
  },
});

export default HeroCard;