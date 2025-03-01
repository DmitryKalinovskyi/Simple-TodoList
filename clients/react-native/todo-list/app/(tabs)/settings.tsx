import StyledSwitch from "@/components/shared/styled-switch";
import TestCheck from "@/components/test-check";
import { getEnumKeys } from "@/lib/shared/extension/getEnumKeys";
import useSettings from "@/lib/shared/features/settings/hooks/useSettings";
import { SettingsCollection } from "@/lib/shared/features/settings/SettingsCollection";
import { StorageType } from "@/lib/shared/features/settings/StorageType";
import { CheckBox, IndexPath, Layout, List, ListItem, Select, SelectItem, Toggle } from "@ui-kitten/components";
import { useEffect } from "react";
import { Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsTab() {
    const [settings, setSetting] = useSettings();

    const handleSettingChange = (key: keyof SettingsCollection, value: SettingsCollection[keyof SettingsCollection]) => {
        setSetting(key, value);
    }

    const storageTypeSelectValues = getEnumKeys(StorageType);
    const selectedStorageIndex = storageTypeSelectValues.indexOf(settings.storageType);

    return <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1 }}>
            <ListItem title={"Storage Type"} disabled accessoryRight={() =>
                <Select value={settings.storageType} style={{ width: 160 }}
                    selectedIndex={new IndexPath(selectedStorageIndex)}
                    // i think that is incorrect typing inside ui kitten library, how index path can be array, when is not mutltiple select?
                    // value based select would be better here
                    // @ts-ignore
                    onSelect={(indexPath: IndexPath) => handleSettingChange("storageType", storageTypeSelectValues[indexPath.row])}
                >
                    {getEnumKeys(StorageType).map((value, index) =>
                        <SelectItem title={value} key={index} />
                    )}
                </Select>} />

            <ListItem title={"Display completed"} disabled accessoryRight={() =>
                <StyledSwitch
                    checked={settings.displayCompleted}
                    onPress={() => handleSettingChange("displayCompleted", !settings.displayCompleted)} />} />

            <ListItem title={"Dark theme"} disabled accessoryRight={() =>
                <StyledSwitch
                    checked={settings.darkTheme}
                    onPress={() => handleSettingChange("darkTheme", !settings.darkTheme)} />} />

            <ListItem title={"Enable live updates"} disabled accessoryRight={() =>
                <StyledSwitch
                    checked={settings.enableLiveUpdates}
                    onPress={() => handleSettingChange("enableLiveUpdates", !settings.enableLiveUpdates)} />} />
           <TestCheck/>
            {/* <ListItem title={"Dark theme"} disabled accessoryRight={() =>
                <ColorPicker color={settings.primaryColor}
                sliderComponent={(props: SliderProps) => <SliderComponent {...props}/>}
                    onColorSelected={(color) => setSetting("primaryColor", color)} />} /> */}
            {/* <ListItem title={"DisplayCompleted"} accessoryRight={() =>
            <Toggle onChange={(checked) => setSetting("displayCompleted", checked)} />} /> */}
        </Layout>
    </SafeAreaView>
}

