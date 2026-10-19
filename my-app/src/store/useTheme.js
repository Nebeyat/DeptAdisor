import { create } from 'zustand';

const lightTheme = {
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  cardBg: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  accentPrimary: '#1D4ED8',
  border: '#E2E8F0',
  error: '#DC2626',
};

const darkTheme = {
  background: '#0F172A',
  cardBackground: '#1E293B',
  cardBg: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  accentPrimary: '#3B82F6',
  border: '#334155',
  error: '#EF4444',
};

const fontSize = {
  xs: 12,
  sm: 14,
  body: 15,
  header: 22,
  title: 28,
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const useTheme = create((set) => ({
  isDarkMode: false,
  colors: lightTheme,
  fontSize: fontSize,
  spacing: spacing,
  toggleTheme: () =>
    set((state) => {
      const nextMode = !state.isDarkMode;
      return {
        isDarkMode: nextMode,
        colors: nextMode ? darkTheme : lightTheme,
      };
    }),
}));

export default useTheme;