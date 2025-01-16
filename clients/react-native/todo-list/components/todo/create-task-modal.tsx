import { closeCreateTaskModal, createTask } from "@/lib/shared/features/todo/state/tasksSlice";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Button, Card, Input, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

export default function CreateTaskModal() {
	const dispatch = useDispatch();
	const visible = useSelector((state: TodoListRootState) => state.tasks.isCreateTaskModalOpen);
	const [text, setText] = useState('');

	const onCreate = () => {
		if (text) {
			dispatch(createTask({ name: text, isCompleted: false }));
			setText('');
			close();
		}
	}

	const close = () => {
		dispatch(closeCreateTaskModal());
	}

	return <Modal
		style={{ width: 300 }}
		visible={visible}
		backdropStyle={styles.backdrop}
		onBackdropPress={close}
	>
		<Card>
			<Text style={styles.modalTitle} category="h5">
				Create task
			</Text>
			<View style={styles.modalInputs}>
				<Input value={text} onChangeText={(t) => setText(t)} placeholder="Enter task name..." />
			</View>
			<View style={styles.buttonGroup}>
				<Button appearance="outline" onPress={close}>
					Close
				</Button>
				<Button onPress={onCreate}>
					Create
				</Button>
			</View>
		</Card>
	</Modal>
}

const styles = StyleSheet.create({
	container: {
		minHeight: 192,
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	buttonGroup: {
		marginTop: 12,
		flexDirection: "row",
		gap: 10,
		justifyContent: "flex-end"
	},
	modalInputs: {
		gap: 10,
	},
	modalTitle: {
		marginBottom: 12
	}
});