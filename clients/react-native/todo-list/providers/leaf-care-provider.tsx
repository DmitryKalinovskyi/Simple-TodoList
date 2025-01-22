import Logo from "@/assets/logo";
import { TodoListRootState } from "@/lib/shared/state/store";
import { useTheme } from "@ui-kitten/components";
import { useEffect } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";

interface LeafCareProviderProps {
    children: JSX.Element | JSX.Element[]
}

export function LeafCareProvider(props: LeafCareProviderProps) {
    const theme = useTheme();
    const isApplicationLoaded = useSelector((state: TodoListRootState) => state.shared.isApplicationLoaded);


    // freeze for few seconds display logo and leave.
    if (!isApplicationLoaded) {
        return <View style={{ backgroundColor: theme["background-basic-color-1"], flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Logo fill={"none"} stroke={theme["color-primary-active"]} />
        </View>
    }

    return props.children;
}