import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors} from '../theme';

type Props = {
    title: string;
    onPress: () => void;
};

export default function HeaderButton({title, onPress}: Props) {
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({pressed}) => [styles.button, pressed && styles.pressed]}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: 6,
        justifyContent: 'center',
        marginRight: 12,
        minHeight: 44,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    pressed: {opacity: 0.75},
    text: {color: colors.primary, fontSize: 14, fontWeight: '600'},
});
