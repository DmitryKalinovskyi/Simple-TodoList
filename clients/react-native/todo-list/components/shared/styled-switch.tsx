import { Toggle, useTheme } from "@ui-kitten/components";
import { ComponentProps } from "react";
import { Switch, StyleSheet, Platform, Pressable } from "react-native";

// interface SwitchProps extends ComponentProps<typeof Switch> {

// }

interface StyledSwitchProps {
    onPress: () => void,
    checked: boolean,
}

export default function StyledSwitch(props: StyledSwitchProps) {
    const theme = useTheme();

    // if (Platform.OS === 'web') {
    //     return <Toggle checked={props.checked} onPress={props.onPress}/>
    // }

    return <Pressable onPress={() => props.onPress()}>
        <Switch
            value={props.checked}
            // onTouchStart={() => {
            //     // props.onPress();
            //     // console.log("fdfd")
            // }}
            onChange={() => props.onPress()}
            style={{
                // backgroundColor:theme["border-basic-color-4"], 
                outlineColor: "white",
                // borderColor: theme["border-basic-color-4"],
                transform: [{ scale: 1.2 }]
            }}
            thumbColor={"white"} // Set thumb color based on switch state
            trackColor={{
                false: theme["background-basic-color-4"], // Color when switch is off
                true: theme["color-primary-active"], // Color when switch is on
            }}
        />
    </Pressable>
}

const styles = StyleSheet.create({
    switch: {

    }
})