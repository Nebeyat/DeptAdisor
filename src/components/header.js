import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import useTheme from '../store/useTheme';

const Header = ({header}) => {
    const { colors, fontSize, spacing } = useTheme();
    const styles = createStyles(colors, fontSize, spacing);
    
    return (
        <Text style ={styles.headerText}>
          {header}  
        </Text>
    );
}

const createStyles = (colors, fontSize, spacing) => StyleSheet.create({
    headerText: {
        fontFamily: 'Syne_800ExtraBold',
        fontSize: fontSize.header,
        marginLeft: spacing.x,
        color: colors.textPrimary,
        fontWeight:'600'
    }
});

export default Header;
