import CreateTaskModal from "@/components/todo/create-task-modal";
import AppInitializerProvider from "@/providers/app-initializer";
import { ApplicationProvider, IconRegistry, useTheme } from "@ui-kitten/components";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import * as eva from '@eva-design/eva';
import { store as reduxStore } from "@/lib/shared/state/store";
import useSetting from "@/lib/shared/features/settings/hooks/useSetting";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { leafCareTheme } from "@/assets/custom-theme";
import SubscriptionProvider from "@/providers/subscription-provider";
import { StatusBar } from "react-native";
import { LeafCareProvider } from "@/providers/leaf-care-provider";

function ThemeContexted() {
  const theme = useTheme();
  const [darkTheme] = useSetting<boolean>("darkTheme");

  return <>
    <StatusBar barStyle={darkTheme ? "light-content" : "dark-content"}
      backgroundColor={theme["background-basic-color-1"]} />
    <CreateTaskModal />
    <IconRegistry icons={EvaIconsPack} />
    <LeafCareProvider>
      <Stack screenOptions={{ navigationBarColor: theme["background-basic-color-1"] }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LeafCareProvider>
  </>
}

function StateContexted() {
  const [darkTheme] = useSetting<boolean>("darkTheme");
  return <ApplicationProvider {...eva} theme={{ ...(darkTheme ? eva.dark : eva.light), ...leafCareTheme }}>
    <ThemeProvider value={darkTheme ? DarkTheme : DefaultTheme}>
      <AppInitializerProvider>
        <SubscriptionProvider>
          <ThemeContexted />
        </SubscriptionProvider>
      </AppInitializerProvider>
    </ThemeProvider>
  </ApplicationProvider >
}

export default function RootLayout() {
  return <ReduxProvider store={reduxStore}>
    <StateContexted />
  </ReduxProvider>
}
