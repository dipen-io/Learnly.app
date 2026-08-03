// src/components/gated-pressable.tsx

import { Pressable, PressableProps } from "react-native";
import { useGatedAction } from "../hooks/use-gated-action";

type GatedPressableProps = Omit<PressableProps, 'onPress'> & {
    onPress: () => void | Promise<void>;
};

export function GatedPressable({ onPress, ...rest }: GatedPressableProps) {
    const { guard } = useGatedAction();

    return <Pressable {...rest} onPress={() => guard(onPress)} />
}