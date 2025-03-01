import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab, Icon } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import SettingsTab from "./settings";
import TodoTab from ".";

const { Navigator, Screen } = createBottomTabNavigator();

function BottomTabBar(props: BottomTabBarProps) {
  return <BottomNavigation
    selectedIndex={props.state.index}
    onSelect={index => props.navigation.navigate(props.state.routeNames[index])}>
    <BottomNavigationTab title='Home' icon={(p) => <Icon name={"home-outline"} {...p} />} />
    <BottomNavigationTab title='Settings' icon={(p) => <Icon name="settings-2-outline" {...p} />} />
  </BottomNavigation>
}

export default function TabLayout() {
  return <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='index' component={TodoTab} options={{
      headerShown: false,
    }} />
    <Screen name='settings' component={SettingsTab} options={{
      headerShown: false, 
    }} />
  </Navigator>
  //   return <Tabs>
  //   <Tabs.Screen name="index"
  //     options={{
  //       title: "Tasks",
  //       tabBarIcon: ({color}) => <AntDesign name={"home"} size={28} color={color}/>
  //     }
  //   }
  //   />
  //   <Tabs.Screen name="settings"
  //     options={{
  //       title: "Settings",
  //       tabBarIcon: ({color}) => <AntDesign name={"setting"} size={28} color={color}/>
  //     }}
  //   />
  // </Tabs>
}