import { useTheme } from '@/constants/theme';
import { BannerCarousel } from '@/src/features/home/banner-carousel';
import { CategoryPillList } from '@/src/features/home/category-pill-list';
import { HomeHeader } from '@/src/features/home/home-header';
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container]}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}>

      {/* 1. Header Section */}
      <HomeHeader />

      {/* 2. Banner carousel  */}
      <BannerCarousel />

      {/* 3. Category Pill List  */}
      <CategoryPillList />

      {/* 2. Search Bar Trigger (Navigates to search tab on press) */}
      {/* <TouchableOpacity
        style={styles.searchBar}
        // onPress={() => router.push('/(tabs)/search')}
        onPress={() => router.push('/explore')}
        activeOpacity={0.8}
      >
        <Text style={styles.searchText}>Search for courses, skills...</Text>
      </TouchableOpacity> */}

      {/* 3. Continue Learning Card (Dynamic - shows up if user is taking a course) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <TouchableOpacity
          style={styles.resumeCard}
          // onPress={() => router.push('/course/lessons/1')} // Navigate to lesson player
          onPress={() => router.push('/explore')} // Navigate to lesson player
        >
          <View style={styles.resumeInfo}>
            <Text style={styles.courseTag}>CHAPTER 3</Text>
            <Text style={styles.resumeCourseTitle}>Advanced Full-Stack Architectures</Text>
            {/* Simple Progress Bar */}
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% Completed</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 4. Categories Horizontal Scroll */}
      <View style={styles.categoriesContainer}>
        {['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science'].map((category, index) => (
          <TouchableOpacity key={index} style={[styles.categoryChip, index === 0 && styles.activeChip]}>
            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 5. Popular Courses Section (Horizontal List) */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Most Popular</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>

        {/* Horizontal FlatList for course cards */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3]} // Mock data array
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseCard}
              // onPress={() => router.push(`/course/${item}`)}
              onPress={() => router.push(`/explore`)}
            >
              <View style={styles.courseThumbnailPlaceholder}>
                <Image
                  source={require('../../assets/images/learn.png')}
                  style={styles.courseThumbnailImage}
                  contentFit="cover"
                />
              </View>

              <Text style={styles.cardTitle} numberOfLines={2}>
                Mastering Modern Web & System Design
              </Text>
              <Text style={styles.cardInstructor}>John Doe</Text>
              <Text style={styles.cardPrice}>$49.99</Text>
            </TouchableOpacity>
          )}
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 5 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  // welcomeText: { fontSize: 14, color: '#6C757D', marginTop: 12 },
  usernameText: { fontSize: 20, fontWeight: 'bold', color: '#212529', paddingLeft: 4 },
  avatarContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E9ECEF', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontWeight: 'bold', color: '#495057' },

  searchBar: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#DEE2E6', marginBottom: 20 },
  searchText: { color: '#ADB5BD' },

  sectionContainer: { marginBottom: 24 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#212529', marginBottom: 12 },

  resumeCard: { backgroundColor: '#1A1D20', borderRadius: 16, padding: 16 },
  resumeInfo: {},
  courseTag: { color: '#4CC9F0', fontSize: 11, fontWeight: 'bold', marginBottom: 4 },
  resumeCourseTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  progressBarBackground: { height: 6, backgroundColor: '#343A40', borderRadius: 3, marginBottom: 6 },
  progressBarFill: { height: '100%', backgroundColor: '#4CC9F0', borderRadius: 3 },
  progressText: { color: '#ADB5BD', fontSize: 11 },

  categoriesContainer: { flexDirection: 'row', marginBottom: 24, gap: 8 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#E9ECEF', borderRadius: 20, height: 36 },
  activeChip: { backgroundColor: '#0D6EFD' },
  categoryText: { color: '#495057', fontWeight: '500' },
  activeCategoryText: { color: '#FFFFFF' },

  courseCard: { width: 200, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, marginRight: 14, borderWidth: 1, borderColor: '#E9ECEF' },
  courseThumbnailPlaceholder: {
    width: '100%',
    height: 110,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    backgroundColor: '#CED4DA',
  },
  courseThumbnailImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#212529', marginBottom: 4 },
  cardInstructor: { fontSize: 12, color: '#6C757D', marginBottom: 6 },
  cardPrice: { fontSize: 14, fontWeight: 'bold', color: '#0D6EFD' },
  seeAllText: { color: '#0D6EFD', fontWeight: '600' },
});
