import { v1 } from "uuid"
import { FilterValuesType, ToDoListType } from "../AppWithRedux"

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST'
	title: string
	todolistId: string
}

export type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}

export type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const initialState: Array<ToDoListType> = [];

export const todolistReducer = (state: Array<ToDoListType> = initialState, action: ActionsType): Array<ToDoListType> => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			return state.filter(tl => tl.id !== action.id)
		}
		case "ADD-TODOLIST": {
			return [{
				id: action.todolistId,
				title: action.title,
				filter: "all"
			}, ...state]
		}
		case "CHANGE-TODOLIST-TITLE": {
			const todolist = state.find(tl => tl.id === action.id);
			if (todolist) {
				todolist.title = action.title;
			}
			return [...state]
		}
		case "CHANGE-TODOLIST-FILTER": {
			let todolist = state.find(tl => tl.id === action.id);
			if (todolist) {
				todolist.filter = action.filter;
			}
			return [...state]
		}
			default:
				return state;
			// throw new Error("I can`t got it")
	}
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title, todolistId: v1() }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id }
}