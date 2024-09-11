import { v1 } from "uuid";
import { FilterValuesType, ToDoListType } from "../AppWithRedux";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistReducer } from "./todolist-reducer";

test("correct todolist should be removed", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: "What To Learn", filter: "all" },
		{ id: todolistId2, title: "What To Buy", filter: "all" },
	]

	const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

	expect(endState.length).toBe(1);
	expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	const newTodolistTitle = "New Todolist";

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: "What To Learn", filter: "all" },
		{ id: todolistId2, title: "What To Buy", filter: "all" },
	]

	const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

	expect(endState.length).toBe(3);
	expect(endState[0].title).toBe(newTodolistTitle);
	expect(endState[0].filter).toBe("all");
	expect(endState[0].id).toBeDefined();
});

test("correct todolist should change it`s name", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	const newTodolistTitle = "New Todolist";

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: "What To Learn", filter: "all" },
		{ id: todolistId2, title: "What To Buy", filter: "all" },
	]

	const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

	const endState = todolistReducer(startState, action)

	expect(endState[0].title).toBe("What To Learn");
	expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
	let todolistId1 = v1();
	let todolistId2 = v1();

	let newFilter: FilterValuesType = "completed";

	const startState: Array<ToDoListType> = [
		{ id: todolistId1, title: "What To Learn", filter: "all" },
		{ id: todolistId2, title: "What To Buy", filter: "all" },
	]

	const action = changeTodolistFilterAC(newFilter, todolistId2);

	const endState = todolistReducer(startState, action);

	expect(endState[0].filter).toBe("all");
	expect(endState[1].filter).toBe(newFilter);
});