// app/(tabs)/explore.tsx

import { useTheme } from '@/constants/theme';
import { SearchHeader } from '@/src/features/explore/search-header';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useTheme();

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
