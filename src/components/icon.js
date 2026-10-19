import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../store/useTheme";

const Icon = ({ name, action }) => {
    const { colors, spacing } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, padding: spacing.s }]}>
            <Ionicons name={name} size={24} color={colors.textPrimary} onPress={action} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    }
});

export default Icon;