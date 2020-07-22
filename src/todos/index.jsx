import React from "react";
import { TodoList } from "./list";
import {
	toggleTodo,
	filterTodos,
} from "./util";
import "./styles.scss";

let index = 4;
export class Todos extends React.Component {
	state = {
		todos: [
			{
				text: "Todo1",
				id: 1,
				status: "ACTIVE",
			},
			{
				text: "Todo2",
				id: 2,
				status: "COMPLETE",
			},
			{
				text: "Todo3",
				id: 3,
				status: "ACTIVE",
			},
		],
		filter: "ALL",
	};

	onInputChange = (e) => {
		if (e.key === "Enter") {
			const value =
				e.target.value;
			if (value.trim() !== "") {
				this.setState({
					todos: [
						{
							text: value,
							id: index++,
						},
						...this.state
							.todos,
					],
				});
				e.target.value = "";
			}
		}
	};

	//   Functionality
	applyFilter = (filter) => (ev) => {
		this.setState({ filter });
	};
	toggleTodo = (id) => (ev) => {
		this.setState({
			todos: toggleTodo(
				this.state.todos,
				id
			),
		});
	};
	getTodos = () => {
		return filterTodos(
			this.state.todos,
			this.state.filter
		);
	};

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
				{/* TodoList */}
				<TodoList
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
