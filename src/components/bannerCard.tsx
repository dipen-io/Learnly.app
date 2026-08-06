//src/components/bannerCard.tsx


import { radii, spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { Banner } from "../types/banner";
import { Shimmer } from "./shimmer";

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = spacing.sm;
const SIDE_INSET = spacing.lg;

const BANNER_WIDTH = SCREEN_WIDTH - SIDE_INSET * 2;
const BANNER_HEIGHT = 150;

// ─── Individual card with its own shimmer + image load state ───
export function BannerCard({ banner }: { banner: Banner }) {


    const router = useRouter();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handlePress = () => {
        switch (banner.linkType) {
            case 'course':
                router.push(`/course/${banner.linkValue}`);
                break;
            case 'category':
                router.push({
                    pathname: '/(tabs)/explore',
                    params: { category: banner.linkValue },
                });
                break;
            case 'url':
                break;
        }
    };

    return (
        <Pressable onPress={handlePress}>
            <View style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT }}>
                {/* Shimmer shows while image is loading */}
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
                    source={{ uri: banner.imageUrl }}
                    style={[
                        styles.banner,
                        { opacity: imageLoaded ? 1 : 0 },
                    ]}
                    resizeMode="cover"
                    onLoadStart={() => setImageLoaded(false)}
                    onLoadEnd={() => setImageLoaded(true)}
                    // Fallback if load fails
                    onError={() => setImageLoaded(true)}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    banner: {
        width: BANNER_WIDTH,
        height: BANNER_HEIGHT,
        borderRadius: radii.md,
    },
})