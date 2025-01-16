import { getEnumKeys } from "@/lib/shared/extension/getEnumKeys";
import useSettings from "@/lib/shared/features/settings/hooks/useSettings";
import { StorageType } from "@/lib/shared/features/settings/state/settingsSlice";
import { IndexPath, List, ListItem, Select, SelectItem, Toggle } from "@ui-kitten/components";
import { View } from "react-native";

export default function SettingsTab() {
    const [settings, setSetting] = useSettings();

    const storageTypeSelectValues = getEnumKeys(StorageType);
    const selectedStorageIndex = storageTypeSelectValues.indexOf(settings.storageType); 

    return <View>
        <ListItem title={"Storage Type"} disabled accessoryRight={() =>
            <Select value={settings.storageType} style={{width: 160}}
            selectedIndex={new IndexPath(selectedStorageIndex)}
            // i think that is incorrect typing inside ui kitten library, how index path can be array, when is not mutltiple select?
            // value based select would be better here
            // @ts-ignore
            onSelect={(indexPath: IndexPath) => setSetting("storageType", storageTypeSelectValues[indexPath.row])}
            >
                {getEnumKeys(StorageType).map((value, index) => 
                    <SelectItem title={value}/>
                )}
            </Select>}/>

        <ListItem title={"Display Completed"} disabled accessoryRight={() =>
            <Toggle checked={settings.displayCompleted}
                onChange={(checked) => setSetting("displayCompleted", checked)} />} />

        <ListItem title={"Dark theme"} disabled accessoryRight={() =>
            <Toggle checked={settings.darkTheme}
                onChange={(checked) => setSetting("darkTheme", checked)} />} />
        {/* <ListItem title={"DisplayCompleted"} accessoryRight={() =>
            <Toggle onChange={(checked) => setSetting("displayCompleted", checked)} />} /> */}
    </View>
}