import { Text, View } from "react-native";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from "@ui-kitten/components";
import TodoScreen from "./(screens)/todo-screen";
import { Provider } from "react-redux";
import { store } from "@/lib/shared/state/store";
import AppInitializerProvider from "@/providers/app-initializer";
import CreateTaskModal from "@/components/todo/create-task-modal";

export default function Index() {
  // initialize all providers here
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppInitializerProvider>
          <CreateTaskModal />
          <TodoScreen />
        </AppInitializerProvider>
      </ApplicationProvider>
    </Provider>
  );
}
