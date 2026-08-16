// src/features/home/recommended-course.tsx

import { useTheme } from '@/constants/theme';
import { SectionHeader } from '@/src/components/section-header';
import React from 'react';
import { FlatList, View } from 'react-native';
// import { CourseCard } from '@/src/components/course/course-card';
import { CourseCard } from '@/src/components/course/course-card';
import { Shimmer } from '@/src/components/shimmer';
import { useRouter } from 'expo-router';
import { useRecommendedCourses } from './use-home-sections';

export function RecommendedCourses() {
    const router = useRouter();
    const { colors, spacing, radii } = useTheme();
    const { data: courses, isLoading, isError } = useRecommendedCourses();

    if (isError) return null;
    if (!isLoading && (!courses || courses.length === 0)) return null;

    return (
        <View style={{ marginBottom: spacing.lg }}>
            <SectionHeader
                title="Recommended for You"
                subtitle="Based on your interests"
                actionLabel="See All"
                onActionPress={() => router.push('/explore?filter=recommended')}
            />

            {isLoading ? (
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: spacing.md }}
                    data={[1, 2, 3]}
                    keyExtractor={(i) => `rec-skeleton-${i}`}
                    ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
                    renderItem={() => (
                        <View style={{ width: 220 }}>
                            <Shimmer width={220} height={140} borderRadius={radii.lg} />
                            <Shimmer width={160} height={14} borderRadius={radii.sm} style={{ marginTop: 8 }} />
                            <Shimmer width={100} height={12} borderRadius={radii.sm} style={{ marginTop: 6 }} />
                        </View>
                    )}
                />
            ) : (
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: spacing.md }}
                    data={courses}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
                    renderItem={({ item }) => (
                        <View style={{ width: 220 }}>
                            <CourseCard course={item} size='md' />
                        </View>
                    )}
                />
            )}
        </View>
    );
}