// src/features/explore/filter-chip-bar.tsx
//
// Controlled component — filters + onChange come from the parent
// (explore-screen.tsx), same pattern as CategoryGrid. This component
// only manages its OWN transient UI state (which option-picker modal is
// currently open), never the actual filter values.

import { Fonts, radii, spacing, useTheme } from '@/constants/theme';
import type {
    ExploreFilters
} from '@/src/types/filter';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type FilterKey = 'difficulty' | 'duration' | 'price' | 'minRating';

type ChipConfig = {
    key: FilterKey;
    label: string;
    options: { value: string | number; label: string }[];
};

const CHIP_CONFIGS: ChipConfig[] = [
    {
        key: 'difficulty',
        label: 'Level',
        options: [
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
        ],
    },
    {
        key: 'duration',
        label: 'Duration',
        options: [
            { value: 'short', label: '< 5 hrs' },
            { value: 'medium', label: '5-20 hrs' },
            { value: 'long', label: '20+ hrs' },
        ],
    },
    {
        key: 'price',
        label: 'Price',
        options: [
            { value: 'free', label: 'Free' },
            { value: 'paid', label: 'Paid' },
            { value: 'on_sale', label: 'On Sale' },
        ],
    },
    {
        key: 'minRating',
        label: 'Rating',
        options: [
            { value: 4.5, label: '4.5 & up' },
            { value: 4.0, label: '4.0 & up' },
            { value: 3.5, label: '3.5 & up' },
        ],
    },
];

type FilterChipBarProps = {
    filters: ExploreFilters;
    onChange: (filters: ExploreFilters) => void;
};

export function FilterChipBar({ filters, onChange }: FilterChipBarProps) {
    const { colors } = useTheme();
    const [openKey, setOpenKey] = useState<FilterKey | null>(null);

    const openConfig = CHIP_CONFIGS.find((c) => c.key === openKey);

    const handleSelect = (key: FilterKey, value: string | number) => {
        onChange({ ...filters, [key]: value });
        setOpenKey(null);
    };

    const handleClear = (key: FilterKey) => {
        const next = { ...filters };
        delete next[key];
        onChange(next);
    };

    return (
        <>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.row}
            >
                {CHIP_CONFIGS.map((config) => {
                    const activeValue = filters[config.key];
                    const activeOption = config.options.find(
                        (o) => o.value === activeValue
                    );
                    const isActive = !!activeOption;

                    return (
                        <Pressable
                            key={config.key}
                            onPress={() =>
                                isActive ? handleClear(config.key) : setOpenKey(config.key)
                            }
                            style={[
                                styles.chip,
                                {
                                    borderColor: isActive ? colors.primary : colors.border,
                                    backgroundColor: isActive ? colors.primary : 'transparent',
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    { color: isActive ? colors.buttonText ?? '#fff' : colors.text },
                                ]}
                            >
                                {activeOption ? activeOption.label : config.label}
                            </Text>
                            <Ionicons
                                name={isActive ? 'close' : 'chevron-down'}
                                size={14}
                                color={isActive ? colors.buttonText ?? '#fff' : colors.textMuted}
                                style={{ marginLeft: 3 }}
                            />
                        </Pressable>
                    );
                })}
            </ScrollView>

            <Modal
                visible={!!openConfig}
                transparent
                animationType="fade"
                onRequestClose={() => setOpenKey(null)}
            >
                <Pressable
                    style={styles.backdrop}
                    onPress={() => setOpenKey(null)}
                >
                    <View style={[styles.sheet, { backgroundColor: colors.background }]}>
                        <Text style={[styles.sheetTitle, { color: colors.text }]}>
                            {openConfig?.label}
                        </Text>
                        {openConfig?.options.map((option) => (
                            <Pressable
                                key={option.value}
                                style={styles.option}
                                onPress={() => handleSelect(openConfig.key, option.value)}
                            >
                                <Text style={[styles.optionText, { color: colors.text }]}>
                                    {option.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
        // marginTop: spacing.lg
        marginBottom: spacing.lg
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.xs + 3,
        paddingHorizontal: 12,
        borderRadius: radii.md ?? 9999,
        borderWidth: 1,
    },
    chipText: {
        fontFamily: Fonts.bodyMedium,
        fontSize: 13,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    sheet: {
        borderTopLeftRadius: radii.lg,
        borderTopRightRadius: radii.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.xxl,
        paddingHorizontal: spacing.lg,
    },
    sheetTitle: {
        fontFamily: Fonts.bodySemiBold,
        fontSize: 16,
        marginBottom: spacing.md,
    },
    option: {
        paddingVertical: spacing.sm,
    },
    optionText: {
        fontFamily: Fonts.body,
        fontSize: 15,
    },
});
