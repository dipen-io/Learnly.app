// app/(tabs)/explore.tsx

import { useTheme } from '@/constants/theme';
import { exploreCategories } from '@/src/data/dummy-explore';
import { CategoryGrid } from '@/src/features/explore/category-grid';
import { FilterChipBar } from '@/src/features/explore/filter-chip-bar';
import { SearchHeader } from '@/src/features/explore/search-header';
import { Category } from '@/src/types/category';
import { ExploreFilters } from '@/src/types/filter';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();

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
      <SearchHeader
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={() => {

        }}
      />
      <CategoryGrid onSelectCategory={function (category: Category): void {
        throw new Error('Function not implemented.');
      }} />

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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
