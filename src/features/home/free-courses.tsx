// src/features/home/free-courses.tsx

import { useTheme } from "@/constants/theme";
import { FreeCourseCard } from "@/src/components/course/free-course-card";
import { SectionHeader } from "@/src/components/section-header";
import { Shimmer } from "@/src/components/shimmer";
import React from "react";
import { FlatList, View } from "react-native";
import { useFreeCourses } from "./use-home-sections";

export function FreeCourses() {
    const { colors, fontSizes, radii, spacing } = useTheme();
    const { data: courses, isError, isLoading } = useFreeCourses();

    if (isError) return null;
    if (!isLoading && (!courses || courses.length === 0)) return null;

    return (
        <View style={{ marginBottom: spacing.lg }}>
            <SectionHeader
                title="Free Courses"
                subtitle="Start learning at no cost"
            // actionLabel="See All"
            // onActionPress={() => router.push('/explore?price=free')}
            />

            {isLoading ? (
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: spacing.md }}
                    data={[1, 2, 3]}
                    keyExtractor={(i) => `free-skeleton-${i}`}
                    renderItem={() => (
                        <View style={{ marginRight: spacing.md }}>
                            <Shimmer width={160} height={160} borderRadius={radii.lg} />
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
                    renderItem={({ item }) => <FreeCourseCard course={item} />}
                />
            )}
        </View>
    )

}
