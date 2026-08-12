/**
 * Lab Activity 3 — Kanban Board
 * Fill in the TODO sections. Keep UI updates flowing through render().
 */

const state = {
	tasks: [
		{ id: "t1", title: "Read the lab README", status: "todo" },
		{ id: "t2", title: "Implement render()", status: "doing" },
		{ id: "t3", title: "Demo add / move / edit / delete", status: "done" },
	],
};

const STATUSES = ["todo", "doing", "done"];

function uid() {
	return `t${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/**
 * Paint every task into the correct column from state.tasks.
 * Also update the count badges ([data-count="todo|doing|done"]).
 */

function render() {
	// TODO 1: for each status in STATUSES, clear [data-column-body="{status}"]
	STATUSES.forEach((status) => {
		const columnBody = document.querySelector(`[data-column-body="${status}"]`);
		columnBody.innerHTML = "";
	});

	// TODO 2: loop state.tasks — create a .card with:
	//         - <h3> task.title
	//         - .card-actions with buttons:
	//             Move → To Do   data-action="move" data-id data-status="todo"
	//             Move → Doing  data-action="move" data-id data-status="doing"
	//             Move → Done   data-action="move" data-id data-status="done"
	//             Edit          data-action="edit" data-id
	//             Delete        data-action="delete" data-id
	//         append card into the matching column body
	STATUSES.forEach((status) => {
		const columnBody = document.querySelector(`[data-column-body="${status}"]`);
		state.tasks
			.filter((task) => task.status === status)
			.forEach((task) => {
				const card = document.createElement("div");
				card.className = "card";
				card.textContent = `
					<h3>${task.title}</h3>
					<div class="card-actions">
						<button data-action="move" data-id="${task.id}" data-status="todo">Move → To Do</button>
						<button data-action="move" data-id="${task.id}" data-status="doing">Move → Doing</button>
						<button data-action="move" data-id="${task.id}" data-status="done">Move → Done</button>
						<button data-action="edit" data-id="${task.id}">Edit</button>
						<button data-action="delete" data-id="${task.id}">Delete</button>
					</div>
				`;
				columnBody.appendChild(card);
			});
	});

	// TODO 3: if a column has no cards, show <p class="empty">No tasks</p>
	STATUSES.forEach((status) => {
		const columnBody = document.querySelector(`[data-column-body="${status}"]`);
		if (columnBody.children.length === 0) {
			const emptyMessage = document.createElement("p");
			emptyMessage.className = "empty";
			emptyMessage.textContent = "No tasks";
			columnBody.appendChild(emptyMessage);
		}
	// TODO 4: set each [data-count] text to how many tasks have that status
		const countBadge = document.querySelector(`[data-count="${status}"]`);
		countBadge.textContent = state.tasks.filter((task) => task.status === status).length;
	});


}
function addTask(title) {
	// TODO: push { id: uid(), title, status: "todo" } onto state.tasks
	console.warn("addTask() not implemented yet", title);
	state.tasks.push({ id: uid(), title, status: "todo" });
}

function moveTask(id, status) {
	// TODO: find task by id; if found and status is in STATUSES, set task.status
	console.warn("moveTask() not implemented yet", id, status);
	const task = state.tasks.find((t) => t.id === id);
	if (task && STATUSES.includes(status)) {
		task.status = status;
	}
}

function editTask(id, title) {
	// TODO: if title is non-empty, update that task's title
	console.warn("editTask() not implemented yet", id, title);
	const task = state.tasks.find((t) => t.id === id);
	if (task && title) {
		task.title = title;
	}
}

function deleteTask(id) {
	// TODO: confirm("Delete this task?"); if OK, filter it out of state.tasks
	console.warn("deleteTask() not implemented yet", id);
	const taskIndex = state.tasks.findIndex((t) => t.id === id);
	if (taskIndex !== -1 && confirm("Delete this task?")) {
		state.tasks.splice(taskIndex, 1);
	}
}

function init() {
	const form = document.querySelector("#task-form");
	const board = document.querySelector("#board");

	form?.addEventListener("submit", (e) => {
		e.preventDefault(); // keep the page from reloading
		const input = document.querySelector("#task-title");
		const title = input?.value.trim();
		if (!title) return;
		// TODO: addTask(title); input.value = ""; render();
		addTask(title);
		input.value = "";
		render();
	});

	// Event delegation: one listener handles all card buttons
	board?.addEventListener("click", (e) => {
		const btn = e.target.closest("button[data-action]");
		if (!btn) return;

		const { action, id, status } = btn.dataset;

		// TODO: switch on action:
		//   "move"   → moveTask(id, status); render();
		//   "edit"   → ask for a new title with prompt(), then editTask + render
		//   "delete" → deleteTask(id); render();
		switch (action) {
			case "move":
				moveTask(id, status);
				render();
				break;
			case "edit":
				const newTitle = prompt("Enter new title:", task.title);
				if (newTitle !== null && newTitle.trim() !== "") {
					editTask(task.id, newTitle.trim());
				}
				break;
			case "delete":
				deleteTask(id);
				render();
				break;
		}

	});

	render();
}

document.addEventListener("DOMContentLoaded", init);
