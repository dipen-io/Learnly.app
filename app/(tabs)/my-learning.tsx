// app/(tabs)/my-learning.tsx
import { useTheme } from "@/constants/theme";
import { useAuthStore } from "@/src/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

// ─── Dummy Data ─────────────────────────────────────────────────────────────

interface CourseProgress {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    totalLessons: number;
    completedLessons: number;
    lastAccessed: string;
    category: string;
}

const DUMMY_COURSES: CourseProgress[] = [
    {
        id: "1",
        title: "Complete React Native Bootcamp",
        instructor: "Sarah Johnson",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
        totalLessons: 42,
        completedLessons: 18,
        lastAccessed: "2 hours ago",
        category: "Development",
    },
    {
        id: "2",
        title: "UI/UX Design Masterclass",
        instructor: "Michael Chen",
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
        totalLessons: 28,
        completedLessons: 28,
        lastAccessed: "1 day ago",
        category: "Design",
    },
    {
        id: "3",
        title: "Node.js Backend Architecture",
        instructor: "David Miller",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
        totalLessons: 35,
        completedLessons: 5,
        lastAccessed: "3 days ago",
        category: "Backend",
    },
    {
        id: "4",
        title: "Flutter for Beginners",
        instructor: "Emma Wilson",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
        totalLessons: 20,
        completedLessons: 0,
        lastAccessed: "Just enrolled",
        category: "Mobile",
    },
];

// ─── Components ─────────────────────────────────────────────────────────────

function ProgressBar({
    progress,
    colors,
}: {
    progress: number;
    colors: any;
}) {
    return (
        <View style={styles.progressTrack}>
            <View
                style={[
                    styles.progressFill,
                    {
                        width: `${progress}%`,
                        backgroundColor: colors.primary,
                    },
                ]}
            />
        </View>
    );
}

function CourseCard({
    course,
    colors,
    onPress,
}: {
    course: CourseProgress;
    colors: any;
    onPress: () => void;
}) {
    const progress = Math.round((course.completedLessons / course.totalLessons) * 100);
    const isCompleted = progress === 100;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                },
            ]}
            onPress={onPress}
        >
            <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={[styles.badge, { backgroundColor: colors.primary + "20" }]}>
                        <Text style={[styles.badgeText, { color: colors.primary }]}>
                            {course.category}
                        </Text>
                    </View>
                    {isCompleted && (
                        <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                    )}
                </View>

                <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                    {course.title}
                </Text>

                <Text style={[styles.instructor, { color: colors.muted }]}>
                    {course.instructor}
                </Text>

                <View style={styles.progressSection}>
                    <ProgressBar progress={progress} colors={colors} />
                    <View style={styles.progressRow}>
                        <Text style={[styles.progressText, { color: colors.muted }]}>
                            {course.completedLessons} / {course.totalLessons} lessons
                        </Text>
                        <Text style={[styles.percentText, { color: colors.primary }]}>
                            {progress}%
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Ionicons name="time-outline" size={14} color={colors.muted} />
                    <Text style={[styles.lastAccessed, { color: colors.muted }]}>
                        {course.lastAccessed}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

function StatCard({
    icon,
    label,
    value,
    colors,
}: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
    colors: any;
}) {
    return (
        <View
            style={[
                styles.statCard,
                { backgroundColor: colors.card, borderColor: colors.border },
            ]}
        >
            <Ionicons name={icon} size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
            <Text style={[styles.statLabel, { color: colors.muted }]}>{label}</Text>
        </View>
    );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function MyLearning() {
    const { colors, fontSizes } = useTheme();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    const totalCourses = DUMMY_COURSES.length;
    const completedCourses = DUMMY_COURSES.filter(
        (c) => c.completedLessons === c.totalLessons
    ).length;
    const inProgress = totalCourses - completedCourses;
    const totalLessons = DUMMY_COURSES.reduce((acc, c) => acc + c.totalLessons, 0);
    const completedLessons = DUMMY_COURSES.reduce(
        (acc, c) => acc + c.completedLessons,
        0
    );
    const overallProgress = Math.round((completedLessons / totalLessons) * 100);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: colors.text, fontSize: fontSizes.xl }]}>
                    My Learning
                </Text>
                <Text style={[styles.headerSubtitle, { color: colors.foreground }]}>
                    {overallProgress}% overall progress
                </Text>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <StatCard
                    icon="book-outline"
                    label="Courses"
                    value={String(totalCourses)}
                    colors={colors}
                />
                <StatCard
                    icon="play-circle-outline"
                    label="In Progress"
                    value={String(inProgress)}
                    colors={colors}
                />
                <StatCard
                    icon="trophy-outline"
                    label="Completed"
                    value={String(completedCourses)}
                    colors={colors}
                />
            </View>

            {/* Section Title */}
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Continue Learning
                </Text>
                <Pressable>
                    <Text style={[styles.seeAll, { color: colors.primary }]}>
                        See All
                    </Text>
                </Pressable>
            </View>

            {/* Course List */}
            <FlatList
                data={DUMMY_COURSES}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <CourseCard
                        course={item}
                        colors={colors}
                        onPress={() => {
                            // TODO: Navigate to course player
                            console.log("Open course:", item.title);
                        }}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons
                            name="school-outline"
                            size={48}
                            color={colors.foreground}
                        />
                        <Text style={[styles.emptyText, { color: colors.foreground }]}>
                            No courses yet
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "700",
    },
    headerSubtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    statsRow: {
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        gap: 6,
    },
    statValue: {
        fontSize: 18,
        fontWeight: "700",
    },
    statLabel: {
        fontSize: 12,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    seeAll: {
        fontSize: 14,
        fontWeight: "500",
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 16,
    },
    card: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: "hidden",
        marginBottom: 12,
    },
    thumbnail: {
        width: "100%",
        height: 160,
        resizeMode: "cover",
    },
    cardContent: {
        padding: 16,
        gap: 8,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "600",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        lineHeight: 22,
    },
    instructor: {
        fontSize: 13,
    },
    progressSection: {
        gap: 6,
        marginTop: 4,
    },
    progressTrack: {
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 3,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 3,
    },
    progressRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    progressText: {
        fontSize: 12,
    },
    percentText: {
        fontSize: 12,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },
    lastAccessed: {
        fontSize: 12,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
        gap: 12,
    },
    emptyText: {
        fontSize: 16,
    },
});