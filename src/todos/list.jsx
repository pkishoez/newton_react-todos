import React from "react";

export const TodoList = ({
	todos,
	toggleTodo,
	className,
	search,
}) => {
	return (
		<div className={className}>
			{todos.map((todo) => (
				<div
					className={
						"item " +
						todo.status
					}
					key={todo.id}
					style={{
						textDecoration:
							todo.status ===
							"COMPLETE"
								? "line-through"
								: "none",
					}}
					onClick={toggleTodo(
						todo.id
					)}
				>
					<span
						dangerouslySetInnerHTML={{
							__html: todo.text
								.split(
									search
								)
								.join(
									`<span style='color: yellow;'>${search}</span>`
								),
						}}
					></span>
				</div>
			))}
		</div>
	);
};
