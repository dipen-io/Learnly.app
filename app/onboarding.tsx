import { useOnboarding } from '@/src/context/onboarding-context';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get('window');

const onboardingData = [
    {
        id: 1,
        title: "Master New Skills",
        description: 'Learn top-tier courses from industry experts at your own pace.',
        image: require('../assets/images/skill-intro.jpg'),
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
    const { completeOnboarding } = useOnboarding();

    const handleNext = async () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            await completeOnboarding();
            router.replace('/(tabs)/');
        }
    };

    const item = onboardingData[currentIndex];

    return (
        <SafeAreaView style={styles.container}>
            {/* Skip Button */}
            <TouchableOpacity
                style={styles.skipButton}
                onPress={async () => {
                    await completeOnboarding();
                    router.replace('/(tabs)/');
                }}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Image / Illustration Area */}
            <View style={styles.imageContainer}>
                <Image
                    source={item.image}
                    style={styles.imageStyle}
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        // paddingHorizontal: 24,
        // paddingTop: 50,
    },
    skipButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 20,
        backgroundColor: '#27D3F5',
        marginTop: 10,
        marginRight: 10,
    },
    skipText: { fontSize: 16, color: '#FFFFFF', fontWeight: '500' },

    imageContainer: {
        width: '100%',
        flex: 1,
        marginTop: 10,
        // height: '55%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    imagePlaceholder: { width: width * 0.75, height: height * 0.35, backgroundColor: '#F1F3F5', borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    placeholderText: { color: '#ADB5BD', fontWeight: '600' },
    footerContainer: {
        flex: 0.4,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingBottom: 40
    },
    textContainer: { alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#0D6EFD', marginBottom: 12, textAlign: 'center' },
    description: { fontSize: 15, color: '#6C757D', textAlign: 'center', lineHeight: 22 },
    paginationRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#DEE2E6' },
    activeDot: { width: 24, backgroundColor: '#0D6EFD' },
    button: {
        backgroundColor: '#0D6EFD', paddingVertical: 16, borderRadius: 14, alignItems: 'center',
        marginHorizontal: 20,
    },
    buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    }
});
