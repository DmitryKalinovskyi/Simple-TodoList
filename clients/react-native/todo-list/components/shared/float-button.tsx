import { Button } from "@ui-kitten/components";
import { ComponentProps } from "react";
import { ViewStyle, StyleSheet } from "react-native";

interface FloatButtonProps extends ComponentProps<typeof Button>{
    attached: "bottom"
}

export default function FloatButton({attached, style, ...rest}: FloatButtonProps){
    const floatStyle: ViewStyle = attached === 'bottom' ? styles.floating : {};

    return <Button
    {...rest} // Spread all button props
    style={[floatStyle, style]} // Merge custom floating styles with user-provided styles
  />
}

const styles = StyleSheet.create({
    floating: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });