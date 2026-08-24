import { create } from 'zustand'; // <--- MUST use named import { create }
import { themes } from '../utils/colors';
import { FontSize, spacing } from '../utils/spacing';

const useTheme = create((set) => ({
  themeMode: 'light',
  colors: themes.light,
  fontSize: FontSize.caption,
  spacing: spacing.sm,

  toggleTheme: () =>
    set((currentMode) => {
      if (currentMode.themeMode === 'dark') {
        return { themeMode: 'light', colors: themes.light };
      } else {
        return { themeMode: 'dark', colors: themes.dark };
      }
    }),
}));

export default useTheme;