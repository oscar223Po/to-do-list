import { TextField } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';

type EditableSpanPropsType = {
	title: string;
	onChange: (newTitle: string) => void; // Added the onChange prop to the type definition
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
	console.log("EditableSpan is Called");

	const [editMode, setEditMode] = useState(false);
	const [title, setTitle] = useState(props.title); // Initialize title with the prop value

	const activateEditMode = () => {
		setEditMode(true);
	};

	const activateViewMode = () => {
		setEditMode(false);
		props.onChange(title); // Invoke the onChange prop with the updated title
	};

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.currentTarget.value);

	return editMode ? (
		<TextField size="small" variant="outlined" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
	) : (
		<span onDoubleClick={activateEditMode}>{props.title}</span>
	);
});
