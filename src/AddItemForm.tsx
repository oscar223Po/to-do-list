import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
	addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
	console.log("AddItemForm is Called");

	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [error, setError] = useState<string | null>(null);

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value);
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null);
		}
		if (e.charCode === 13) {
			props.addItem(newTaskTitle);
			setNewTaskTitle("");
		}
	};

	const addTask = () => {
		if (newTaskTitle.trim() !== "") {
			props.addItem(newTaskTitle.trim());
			setNewTaskTitle("");
		} else {
			setError("Title Is Required");
		}
	};

	return <div>
		<TextField
			id="outlined-basic"
			label="Your Task"
			size="small"
			variant="outlined"
			value={newTaskTitle}
			onChange={onNewTitleChangeHandler}
			onKeyPress={onKeyPressHandler}
			/* className={error ? "error" : ""}*/
			helperText={error}
			error={!!error}
		/>
		<IconButton onClick={addTask} type="button" color="success">
			<AddBox />
		</IconButton>
	</div>
});