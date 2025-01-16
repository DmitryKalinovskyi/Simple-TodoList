import CreateTaskModal from "@/components/todo/create-task-modal"
import { View } from "react-native"

interface ModalProviderProps{
    children: JSX.Element| JSX.Element[]
}

export function ModalProvider(props: ModalProviderProps){
    return <View>
        <CreateTaskModal/>
        <View>
        {props.children}
        </View>
    </View>
}