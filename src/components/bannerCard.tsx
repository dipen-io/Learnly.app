import { radii, spacing, useTheme } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Shimmer } from "./shimmer";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SIDE_INSET = spacing.lg;

const BANNER_WIDTH = SCREEN_WIDTH - SIDE_INSET * 2;
const BANNER_HEIGHT = 150;

interface BannerCardProps {
    imageUrl: string;
    title: string;
    subtitle?: string;
    bgColor?: string;
    textColor?: string;
    cta?: {
        label: string;
        action: {
            type: string;
            value: string;
        };
    };
}

export function BannerCard({
    imageUrl,
    title,
    subtitle,
    bgColor,
    textColor,
    cta,
}: BannerCardProps) {
    const router = useRouter();
    const { colors } = useTheme();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handlePress = () => {
        if (!cta?.action) return;

        const { type, value } = cta.action;

        switch (type) {
            case 'screen':
                router.push(value as any);
                break;
            case 'deeplink':
                // handle deeplink
                break;
            case 'external_url':
                // Linking.openURL(value);
                break;
            case 'tab':
                // switch tab
                break;
            default:
                break;
        }
    };

    return (
        <Pressable onPress={handlePress}>
            <View
                style={[
                    styles.container,
                    { backgroundColor: bgColor || colors.surface },
                ]}
            >
                {/* Image */}
                <View style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT }}>
                    {!imageLoaded && (
                        <View style={StyleSheet.absoluteFill}>
                            <Shimmer
                                width={BANNER_WIDTH}
                                height={BANNER_HEIGHT}
                                borderRadius={radii.md}
                            />
                        </View>
                    )}

                    <Image
                        source={{ uri: imageUrl }}
                        style={[
                            styles.image,
                            { opacity: imageLoaded ? 1 : 0 },
                        ]}
                        resizeMode="cover"
                        onLoadEnd={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                    />
                </View>

                {/* Text overlay */}
                <View style={styles.textOverlay}>
                    <Text
                        style={[
                            styles.title,
                            { color: textColor || colors.textInverse },
                        ]}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>
                    {subtitle && (
                        <Text
                            style={[
                                styles.subtitle,
                                { color: textColor || colors.textInverse },
                            ]}
                            numberOfLines={2}
                        >
                            {subtitle}
                        </Text>
                    )}
                    {cta && (
                        <Text
                            style={[
                                styles.cta,
                                { color: textColor || colors.textInverse },
                            ]}
                        >
                            {cta.label} →
                        </Text>
                    )}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,
        borderRadius: radii.md,
        overflow: 'hidden',
    },
    image: {
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,
        borderRadius: radii.md,
    },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.md,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 13,
        marginTop: 4,
        opacity: 0.9,
    },
    cta: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 8,
    },
});