import CreateTaskModal from "@/components/todo/create-task-modal";
import AppInitializerProvider from "@/providers/app-initializer";
import { ApplicationProvider } from "@ui-kitten/components";
import { Stack } from "expo-router";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import * as eva from '@eva-design/eva';
import { store as reduxStore } from "@/lib/shared/state/store";
import useSetting from "@/lib/shared/features/settings/hooks/useSetting";

function StateInner() {
  const [darkTheme] = useSetting<boolean>("darkTheme");
  return <ApplicationProvider {...eva} theme={darkTheme ? eva.dark : eva.light}>
    <AppInitializerProvider>
      <CreateTaskModal />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AppInitializerProvider>
  </ApplicationProvider >
}

export default function RootLayout() {

  return <ReduxProvider store={reduxStore}>
    <StateInner />
  </ReduxProvider>

}
