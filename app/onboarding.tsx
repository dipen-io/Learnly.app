import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const { width, height } = Dimensions.get('window');

const onboardingData = [
    {
        id: 1,
        title: "Master New Skills",
        description: 'Learn top-tier courses from industry experts at your own pace.',
        image: require('../assets/images/skill-intro.jpg'),
        // /home/dinesh/mob_dev/learnly/assets/images/skill-intro.jpg
    },
    {
        id: 2,
        title: 'Join Communities',
        description: 'Connect with fellow developers and learners, share ideas, and grow together.',
        image: require('../assets/images/community-intro.jpg'),
    },
    {
        id: 3,
        title: 'Explore & Build',
        description: 'Access a massive library of resources and start building your future today.',
        image: require('../assets/images/explore-intro.jpg'),
    },
]

export default function OnboardingScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const handleNext = async () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            try {
                await AsyncStorage.setItem('@has_seen_onboarding', 'true');
                router.replace('/(tabs)/home');
            } catch (error) {
                console.error('Failed to save onboardingstate', error);
            }
        }
    };

    const item = onboardingData[currentIndex];

    return (
        <View style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity
                style={styles.skipButton}
                onPress={async () => {
                    await AsyncStorage.setItem('@has_seen_onboarding', 'true');
                    router.replace('/(tabs)/home');
                }}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Image / Illustration Area */}
            <View style={styles.imageContainer}>
                <Image
                    source={item.image}
                    style={styles.imageStyle}
                    resizeMode="contain"
                />
            </View>

            {/* Content Area */}
            <View style={styles.footerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>

                {/* Pagination Dots */}
                <View style={styles.paginationRow}>
                    {onboardingData.map((_, index) => (
                        <View
                            key={index}
                            style={[styles.dot, currentIndex === index && styles.activeDot]}
                        />
                    ))}
                </View>

                {/* Next / Get Started Button */}
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>
                        {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 60 },
    skipButton: { alignSelf: 'flex-end', padding: 8 },
    skipText: { fontSize: 16, color: '#6C757D', fontWeight: '500' },
    imageContainer: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
    imagePlaceholder: { width: width * 0.75, height: height * 0.35, backgroundColor: '#F1F3F5', borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    placeholderText: { color: '#ADB5BD', fontWeight: '600' },
    footerContainer: { flex: 0.4, justifyContent: 'space-between', paddingBottom: 40 },
    textContainer: { alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#212529', marginBottom: 12, textAlign: 'center' },
    description: { fontSize: 15, color: '#6C757D', textAlign: 'center', lineHeight: 22 },
    paginationRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#DEE2E6' },
    activeDot: { width: 24, backgroundColor: '#0D6EFD' },
    button: { backgroundColor: '#0D6EFD', paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
    imageStyle: {
        width: width * 0.75,
        height: height * 0.35,
        borderRadius: 24,
    }
});