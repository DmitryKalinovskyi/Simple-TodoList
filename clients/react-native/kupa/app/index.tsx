import { store } from "@/state/store";
import { Provider } from "react-redux";
import App from "./app";

export default function Index() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}
