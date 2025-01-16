import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout(){
    return <Tabs>
    <Tabs.Screen name="index"
      options={{
        title: "Tasks",
        tabBarIcon: ({color}) => <AntDesign name={"home"} size={28} color={color}/>
      }
    }
    />
    <Tabs.Screen name="settings"
      options={{
        title: "Settings",
        tabBarIcon: ({color}) => <AntDesign name={"setting"} size={28} color={color}/>
      }}
    />
  </Tabs>
}