import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from './theme';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

let toastRef = null;

const show = (messageOrOptions, typeOrDuration, durationArg) => {
  let message, type, duration;

  // Handle react-native-toast-message style API: Toast.show({ type, text1, ... })
  if (messageOrOptions && typeof messageOrOptions === 'object') {
    message = messageOrOptions.text1 || messageOrOptions.text2 || messageOrOptions.message || 'Notification';
    type = messageOrOptions.type || 'info';
    duration = messageOrOptions.visibilityTime || 1500;
  } else {
    // Handle our API: Toast.show('message', 'success', 3000)
    message = messageOrOptions;
    type = typeOrDuration || 'info';
    duration = durationArg || 1500;
  }

  toastRef?.push(message, type, duration);
};

export default function Toast() {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
    const { colors } = useTheme();

  const translateY = useRef(new Animated.Value(-150)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toastRef = {
      push: (message, type, duration) => {
        setQueue((q) => [...q, { id: Date.now() + Math.random(), message, type, duration }]);
      },
    };
    return () => { toastRef = null; };
  }, []);

  useEffect(() => {
    if (current || queue.length === 0) return;
    setCurrent(queue[0]);
    setQueue((q) => q.slice(1));
  }, [queue, current]);

  useEffect(() => {
    if (!current) return;

    translateY.setValue(-150);
    opacity.setValue(0);

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(hide, current.duration);
    return () => clearTimeout(timer);
  }, [current]);

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setCurrent(null));
  }, []);

  if (!current) return null;

  const style = config[current.type] || config.info;

  // Safety guard: ensure message is always a string
  const displayMessage =
    typeof current.message === 'string'
      ? current.message
      : JSON.stringify(current.message);

  return (
    <Animated.View
      style={[s.container, { transform: [{ translateY }], opacity }]}
      pointerEvents="none"
    >
      <View style={[s.toast, { backgroundColor: colors.background, borderLeftColor: style.border }]}>
        <Text style={[s.icon, { color: style.border }]}>{style.icon}</Text>
        <Text style={[s.message, { color: colors.textMuted }]}>{displayMessage}</Text>
      </View>
    </Animated.View>
  );
}

Toast.show = show;

const config = {
  success: { bg: '#10B981', border: '#10B981', icon: '✓', text: '#065F46' },
  error:   { bg: '#FEF2F2', border: '#EF4444', icon: '✕', text: '#991B1B' },
  info:    { bg: '#EFF6FF', border: '#3B82F6', icon: 'ℹ', text: '#1E40AF' },
  warning: { bg: '#FFFBEB', border: '#F59E0B', icon: '!', text: '#92400E' },
};

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
    paddingTop: (StatusBar.currentHeight || 0) + 12,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 32,
    maxWidth: 400,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  icon: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 12,
    width: 22,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    flex: 1,
  },
});
