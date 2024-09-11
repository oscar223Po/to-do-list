import { TasksStateType } from "../AppWithRedux";
import { addTasksAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer } from "./tasks-reducer";
import { addTodolistAC } from "./todolist-reducer";

test("correct task should be deleted from correct way", () => {
	const startState: TasksStateType = {
		"todolistId1": [
			{ id: "1", title: "CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "REACT", isDone: false },
		],
		"todolistId2": [
			{ id: "1", title: "bread", isDone: false },
			{ id: "2", title: "milk", isDone: true },
			{ id: "3", title: "tea", isDone: false },
		],
	};
	const actions = removeTasksAC("1", "todolistId2");
	const endState = tasksReducer(startState, actions);

	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(2);
	expect(endState["todolistId2"].every(t => t.id != "1")).toBeTruthy();
});

test("correct task should be added to correct way", () => {
	const startState: TasksStateType = {
		"todolistId1": [
			{ id: "1", title: "CSS", isDone: false },
			{ id: "2", title: "JS", isDone: true },
			{ id: "3", title: "REACT", isDone: false },
		],
		"todolistId2": [
			{ id: "1", title: "bread", isDone: false },
			{ id: "2", title: "milk", isDone: true },
			{ id: "3", title: "tea", isDone: false },
		],
	};
	const actions = addTasksAC("juice", "todolistId2");
	const endState = tasksReducer(startState, actions);

	expect(endState["todolistId1"].length).toBe(3);
	expect(endState["todolistId2"].length).toBe(4);
	expect(endState["todolistId2"][0].id).toBeDefined();
	expect(endState["todolistId2"][0].title).toBe("juice");
	expect(endState["todolistId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = changeTaskStatusAC('2', false, 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState["todolistId2"][1].isDone).toBeFalsy()
	expect(endState["todolistId1"][1].isDone).toBeTruthy()
});

test('title of specified task should be changed', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = changeTaskTitleAC('2', "Milkyway", "todolistId2");
	const endState = tasksReducer(startState, action);

	expect(endState["todolistId2"][1].title).toBe("Milkyway");
	expect(endState["todolistId1"][1].title).toBe("JS");
})

test('new property with new array should be added when new todolist is added', () => {
	const startState: TasksStateType = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isDone: false },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'React', isDone: false },
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isDone: false },
			{ id: '2', title: 'milk', isDone: true },
			{ id: '3', title: 'tea', isDone: false },
		],
	}

	const action = addTodolistAC('title no matter')

	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState);
	const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
	if (!newKey) {
		throw Error('new key should be added');
	};

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toStrictEqual([]);
})