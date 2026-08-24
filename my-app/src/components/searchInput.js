import React from 'react';
import { StyleSheet, View, Alert, TextInput } from 'react-native';
import useTheme from '../store/useTheme';
import Icon from './icon';

const SearchInput = ({ value, onChangeText, placeholder = 'Search...' }) => {
  const { colors, fontSize, spacing } = useTheme();
  const styles = createStyles(colors, fontSize, spacing);

  const searchTopic = () => {
    if (value && value.trim().length > 0) {
        Alert.alert('Search', `You searched for: ${value}`);
      } else {
        Alert.alert('Search', 'Please enter text to search.');
      }
  };

  return (
    <View style={styles.container}>
      <Icon
        name="search-outline"
        color={colors.textSecondary}
        size={18}
        action={searchTopic}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors?.textSecondary || '#94A3B8'}
        style={[
          styles.input,
          {
            color: colors?.textPrimary || '#0F172A',
            fontSize: fontSize?.body || 15,
          },
        ]}
        
      />
    </View>
  );
};

const createStyles = (colors, fontSize, spacing) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#FFFFFF',
      borderRadius: spacing.m ,
      paddingHorizontal: spacing.s ,
      height: 48,
      gap: 10,
      width: '100%',
    },
    input: {
      flex: 1,
      height: '100%',
      textAlign: 'left',
      paddingVertical: 0,
    },
  });

export default SearchInput;