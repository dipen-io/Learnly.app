import { useTheme } from '@/constants/theme';
import { ThemeRefreshControl } from '@/src/components/themed-refresh-control';
import { BannerCarousel } from '@/src/features/home/banner-carousel';
import { CategoryPillList } from '@/src/features/home/category-pill-list';
import { ContinueLearning } from '@/src/features/home/continue-learning';
import { FeaturedCourses } from '@/src/features/home/featured-courses';
import { HomeHeader } from '@/src/features/home/home-header';
import { RecommendedCourses } from '@/src/features/home/recommended-courses';
import { TrendingCourses } from '@/src/features/home/trending-courses';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await queryClient.invalidateQueries({
      queryKey: ['banners'],
      exact: false,
    });
    await queryClient.invalidateQueries({
      queryKey: ['progress'],
      exact: false,
    });
    await queryClient.invalidateQueries({
      queryKey: ['featured'],
      exact: false,
    });
    await queryClient.invalidateQueries({
      queryKey: ['recommended'],
      exact: false,
    });
    await queryClient.invalidateQueries({
      queryKey: ['trending'],
      exact: false,
    });
    await new Promise((r) => setTimeout(r, 600));

    setRefreshing(false);
  }, [queryClient])

  return (
    <ScrollView style={[styles.container]}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <ThemeRefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        // <FancyRefreshControl
        //   refreshing={refreshing}
        //   onRefresh={onRefresh}
        // />
      }
    >

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
