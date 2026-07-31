import { Image } from 'expo-image';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Fonts } from '@/constants/theme';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';

const courses = [
  {
    id: 1,
    title: 'HTML & CSS',
    subtitle: 'Learn the fundamentals of web design',
  },
  {
    id: 2,
    title: 'JavaScript',
    subtitle: 'Master modern JavaScript from scratch',
  },
  {
    id: 3,
    title: 'React',
    subtitle: 'Build interactive web applications',
  },
  {
    id: 4,
    title: 'React Native',
    subtitle: 'Create Android & iOS apps',
  },
  {
    id: 5,
    title: 'Node.js',
    subtitle: 'Build backend APIs and servers',
  },
  {
    id: 6,
    title: 'Python',
    subtitle: 'Programming for beginners and professionals',
  },
];

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/explore-intro.jpg')}
        style={styles.header}
        contentFit="cover"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={{ fontFamily: Fonts.rounded, color: '#4927F5' }}
          >
            Explore Courses
          </ThemedText>
        </ThemedView>

        {courses.map((course) => (
          <View key={course.id} style={styles.card}>
            <Image source={require('@/assets/images/learn.png')}
              style={styles.image}
              contentFit="cover" />
            <View style={styles.content}>
              <ThemedText type="subtitle" style={styles.courseTitle}>
                {course.title}
              </ThemedText>
              <ThemedText>{course.subtitle}</ThemedText>
            </View>
          </View>

        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30
  },
  titleContainer: {
    marginBottom: 16,
    padding: 7,
    borderRadius: 5,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },

  content: {
    padding: 10,
    flex: 1,
  },

  courseTitle: {
    marginBottom: 6,
    fontFamily: Fonts.rounded,
  },

  header: {
    width: '100%',
    height: 220,
  },
});
