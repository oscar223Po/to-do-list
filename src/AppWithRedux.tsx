import React, { useCallback } from 'react';
import './App.css';
import { TodoList, TaskType } from './TodoList';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolist-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "completed" | "active";

export type ToDoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	console.log("AppWithRedux is Called");

	const dispatch = useDispatch();
	const todolists = useSelector<AppRootState, Array<ToDoListType>>(state => state.todolists)
	// Inside of App - World with Arrays, Functions and Ui
	// useState === Hook
	// Метод Filter пропускает только то, что его удовлетворяет! Не меняя масив создает другой!
	const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
		dispatch(changeTodolistFilterAC(value, todolistId));
	}, [dispatch]);

	const removeTodolist = useCallback(function (todolistId: string) {
		const action = removeTodolistAC(todolistId);
		dispatch(action)
	}, [dispatch]);

	const changeTodolistTitle = useCallback(function (id: string, newTitle: string) {
		dispatch(changeTodolistTitleAC(id, newTitle));
	}, [dispatch]);

	const addToDoList = useCallback(function (title: string) {
		const action = addTodolistAC(title);
		dispatch(action)
	}, [dispatch]);

	return (
		<div className="app">
			<AppBar position="static">
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<div className="main">
				<Grid>
					<AddItemForm addItem={addToDoList} />
				</Grid>
				<Grid className="items" spacing={3}>
					{
						todolists.map((tl) => {
							return <Grid item>
								<Paper style={{ padding: "10px" }}>
									<TodoList
										title={tl.title}
										key={tl.id}
										id={tl.id}
										changeFilter={changeFilter}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							</Grid>
						})
					}
				</Grid>
			</div>
		</div>
	);
}

export default AppWithRedux;