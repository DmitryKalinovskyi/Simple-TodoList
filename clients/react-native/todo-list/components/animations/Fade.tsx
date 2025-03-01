import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle, StyleProp } from "react-native";

interface FadeProps {
  visible: boolean; // Controls visibility of the content
  duration?: number; // Duration of the animation
  children: React.ReactNode; // Child components to render
  style?: StyleProp<ViewStyle>; // Optional styles for the animated view
}

const Fade: React.FC<FadeProps> = ({ visible, duration = 300, children, style }) => {
  const fadeAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0, // Fade in when visible is true, fade out when false
      duration,
      useNativeDriver: true, // Optimize for native thread
    }).start();
  }, [visible, duration]);

  // Optionally hide content when not visible
  const containerStyle = {
    opacity: fadeAnim,
    display: visible ? "flex" : "none",
  };

  return <Animated.View style={[style, containerStyle]}>{children}</Animated.View>;
};

export default Fade;
