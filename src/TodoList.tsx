import React, { useCallback } from 'react'
import { FilterValuesType } from './AppWithRedux'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { addTasksAC } from './state/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import Task from './Task';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type PropsType = {
	id: string
	title: string
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
}

export const TodoList = React.memo(function (props: PropsType) {
	console.log("TodoList is Called");
	const dispatch = useDispatch();

	const onAllClickHandler = useCallback(() => { props.changeFilter("all", props.id) }, [props.changeFilter, props.id]);
	const onActiveClickHandler = useCallback(() => { props.changeFilter("active", props.id) }, [props.changeFilter, props.id]);
	const onCompletedClickHandler = useCallback(() => { props.changeFilter("completed", props.id) }, [props.changeFilter, props.id]);

	const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id])

	let allTodolistTasks = tasks;
	let tasksForTodolist = allTodolistTasks;
	if (props.filter === "completed") {
		tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
	}
	if (props.filter === "active") {
		tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
	}

	const removeTodolist = useCallback(function () {
		props.removeTodolist(props.id);
	}, [props.id]);

	const changeTodolistTitle = useCallback(function (newTitle: string) {
		props.changeTodolistTitle(props.id, newTitle)
	}, [props.id, props.changeTodolistTitle]);

	return (
		<div className="todolist">
			<h2 className="todolist-top">
				<EditableSpan title={props.title} onChange={changeTodolistTitle} />
				<IconButton aria-label="delete" onClick={removeTodolist}>
					<DeleteIcon />
				</IconButton>
			</h2>
			<AddItemForm addItem={(title) => {
				dispatch(addTasksAC(title, props.id));
			}} />
			<div className="todolist-items">
				{
					tasksForTodolist.map(t => <Task
						task={t}
						todolistId={props.id}
						key={t.id}
					/>
					) // Map: Method of Array
				}
			</div>
			<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
				<Button size="small" variant={props.filter === "all" ? "contained" : "outlined"} onClick={onAllClickHandler}>All</Button>
				<Button size="small" color="success" variant={props.filter === "active" ? "contained" : "outlined"} onClick={onActiveClickHandler}>Active</Button>
				<Button size="small" color="error" variant={props.filter === "completed" ? "contained" : "outlined"} onClick={onCompletedClickHandler}>Completed</Button>
			</div>
		</div>
	)
});
