import React, { ChangeEvent, useCallback } from 'react'
import { TaskType } from './TodoList'
import { Checkbox, IconButton } from '@mui/material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { EditableSpan } from './EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import { changeTaskStatusAC, changeTaskTitleAC, removeTasksAC } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';

type TaskPropsType = {
	// changeTaskStatusAC: (id: string, isDone: boolean, todolistId: string) => void
	// changeTaskTitleAC: (taskId: string, newTaskTitle: string, todolistId: string) => void
	// removeTasksAC: (taskId: string, todolistId: string) => void
	task: TaskType
	todolistId: string
}

const Task = React.memo((props: TaskPropsType) => {
	const dispatch = useDispatch();
	const onRemoveHandler = () => dispatch(removeTasksAC(props.task.id, props.todolistId));
	const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked;
		dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId));
	};

	const onChangeTitleHandler = useCallback((newValue: string) => {
		dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
	}, [props.task.id, changeTaskTitleAC, props.todolistId]);

	return <div key={props.task.id} className={`todolist-item ${props.task.isDone ? "is-done" : ""}`}>
		<div className="todolist-item-main">
			<Checkbox icon={<BookmarkBorderIcon />} checkedIcon={<BookmarkIcon />} onChange={onChangeStatusHandler} checked={props.task.isDone} />
			<EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
		</div>
		<IconButton size="small" aria-label="delete" onClick={onRemoveHandler}>
			<DeleteIcon />
		</IconButton>
	</div>
});

export default Task