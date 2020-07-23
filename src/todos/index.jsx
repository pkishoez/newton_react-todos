import React from "react";
import { TodoList } from "./list";
import {
	toggleTodo,
	filterTodos,
	deleteTodo,
	searchTodos,
} from "./util";
import "./styles.scss";

let index = 4;
export class Todos extends React.Component {
	state = {
		todos: [],
		filter: "ALL",
		search: "",
	};

	componentDidMount() {
		fetch(
			"http://localhost:2222/api/getTodos"
		)
			.then((d) => d.json())
			.then((d) => {
				this.setState({
					todos: d.data,
				});
			})
			.catch((err) => {
				console.log(
					"Error",
					err
				);
			});
	}

	onInputChange = (e) => {
		if (e.key === "Enter") {
			const value =
				e.target.value;
			if (value.trim() !== "") {
				const target = e.target;
				fetch(
					"http://localhost:2222/api/addTodo",
					{
						method: "POST",
						body: JSON.stringify(
							{
								text: value,
							}
						),
						headers: {
							"Content-Type":
								"application/json",
						},
					}
				)
					.then((d) =>
						d.json()
					)
					.then((d) => {
						this.setState({
							todos: [
								d.data,
								...this
									.state
									.todos,
							],
						});
						target.value =
							"";
					})
					.catch((err) => {
						// Ignore.
					});
			}
		}
	};

	//   Functionality
	applyFilter = (filter) => (ev) => {
		this.setState({ filter });
	};

	toggleTodo = (id) => (ev) => {
		fetch(
			"http://localhost:2222/api/toggleTodo",
			{
				method: "POST",
				body: JSON.stringify({
					todoid: id,
					status:
						this.state.todos.find(
							(todo) =>
								todo.id ===
								id
						)?.status ===
						"ACTIVE"
							? "COMPLETE"
							: "ACTIVE",
				}),
				headers: {
					"Content-Type":
						"application/json",
				},
			}
		)
			.then((d) => d.json())
			.then((d) => {
				this.setState({
					todos: d.data,
				});
			});
	};
	deleteTodo = (id) => (ev) => {
		this.setState({
			todos: deleteTodo(
				this.state.todos,
				id
			),
		});
	};
	getTodos = () => {
		return searchTodos(
			filterTodos(
				this.state.todos,
				this.state.filter
			),
			this.state.search
		);
	};
	componentDidCatch() {}

	//   render
	render() {
		return (
			<div className="todoswrapper">
				<h1 className="title">
					Todos
				</h1>
				{/* Input conponent to add todos */}
				<input
					placeholder="Enter a Todo Here"
					className="addTodoInput"
					type="text"
					onKeyDown={
						this
							.onInputChange
					}
				/>
				<input
					placeholder="Search Todo Here"
					className="addTodoInput"
					type="text"
					value={
						this.state
							.search
					}
					onChange={(e) =>
						this.setState({
							search:
								e.target
									.value,
						})
					}
				/>
				{/* TodoList */}
				<TodoList
					search={
						this.state
							.search
					}
					className="todolist"
					todos={this.getTodos()}
					toggleTodo={
						this.toggleTodo
					}
				/>
				{/* Filters */}
				<div className="filters">
					{[
						"ALL",
						"ACTIVE",
						"COMPLETE",
					].map((filter) => (
						<button
							key={filter}
							onClick={this.applyFilter(
								filter
							)}
						>
							{filter}
						</button>
					))}
				</div>
			</div>
		);
	}
}
