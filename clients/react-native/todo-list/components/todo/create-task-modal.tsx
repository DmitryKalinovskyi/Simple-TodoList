import { closeCreateTaskModal, apiCreateTask } from "@/lib/shared/features/todo/state/tasksSlice";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Button, Card, Datepicker, Input, Modal, Text } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

export default function CreateTaskModal() {
	const dispatch = useDispatch();
	const visible = useSelector((state: TodoListRootState) => state.tasks.isCreateTaskModalOpen);

	const [formFields, setFormFields] = useState<{
		name: string,
		deadline?: Date,
		categoryId?: number
	}>({
		name: "",
	});

	const onCreate = () => {
		if (formFields.name) {
			dispatch(apiCreateTask({
				id: Math.floor(Math.random() * 1000000),
				name: formFields.name,
				isCompleted: false,
				deadline: formFields.deadline?.toISOString(),
				categoryId: formFields.categoryId
			}));

			setFormFields({ name: "" });
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
				<Input value={formFields.name}
					onChangeText={(name) => setFormFields({...formFields, name})}
					placeholder="Enter task name..." />
					
				<Datepicker date={formFields.deadline}
					placeholder=" Choose deadline..."
					onSelect={(deadline) => setFormFields({...formFields, deadline})} />
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