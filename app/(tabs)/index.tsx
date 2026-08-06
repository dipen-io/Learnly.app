import { BannerCarousel } from '@/src/features/home/banner-carousel';
import { CategoryPillList } from '@/src/features/home/category-pill-list';
import { ContinueLearning } from '@/src/features/home/continue-learning';
import { FeaturedCourses } from '@/src/features/home/featured-courses';
import { HomeHeader } from '@/src/features/home/home-header';
import { RecommendedCourses } from '@/src/features/home/recommended-courses';
import { TrendingCourses } from '@/src/features/home/trending-courses';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {

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

      {/* 4. Continue Learning Card (Dynamic - shows up if user is taking a course) */}
      <ContinueLearning />

      {/* 5. Featured course */}
      <FeaturedCourses />

      {/* 6. Recommended Course Section */}
      <RecommendedCourses />

      {/* 7. Trending Course Section */}
      <TrendingCourses />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 5 },
});
