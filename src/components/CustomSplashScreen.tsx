import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export default function CustomSplashScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/splash.png')}
                style={styles.image}
                contentFit="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        height: "100%"
    },
});