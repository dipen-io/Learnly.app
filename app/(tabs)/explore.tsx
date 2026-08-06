// app/(tabs)/explore.tsx

import { spacing, useTheme } from '@/constants/theme';
import { curatedCollections, exploreCategories, newCourses } from '@/src/data/dummy-explore';
import { CategoryGrid } from '@/src/features/explore/category-grid';
import { CuratedCollections } from '@/src/features/explore/curated-collections';
import { FilterChipBar } from '@/src/features/explore/filter-chip-bar';
import { NewNoteworthy } from '@/src/features/explore/new-noteworthy';
import { SearchHeader } from '@/src/features/explore/search-header';
import { Category } from '@/src/types/category';
import { ExploreFilters } from '@/src/types/filter';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();
  const params = useLocalSearchParams();


  const activeCategory = params.category as string | undefined;

  // Simple local search filter
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return exploreCategories;
    const q = searchQuery.toLowerCase();
    return exploreCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* search bar header  */}
      <SearchHeader
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={() => {

        }}
      />

      {/* filter chip bar  */}
      <FilterChipBar filters={{
        category: undefined,
        search: undefined,
        sortBy: undefined,
        difficulty: undefined,
        duration: undefined,
        price: undefined,
        minRating: undefined
      }} onChange={function (filters: ExploreFilters): void {
        throw new Error('Function not implemented.');
      }} />

      {/* {activeCategory && (
        <View style={styles.filterChip}>
          <Text style={[styles.filterText, { color: colors.primary }]}>
            Showing: {activeCategory}
          </Text>
        </View>
      )} */}


      <CategoryGrid onSelectCategory={function (category: Category): void {
        throw new Error('Function not implemented.');
      }} />

      {/* <CuratedCollections /> */}
      <CuratedCollections collections={curatedCollections} />

      {/* new course  */}
      <NewNoteworthy courses={newCourses
      } />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  filterText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
