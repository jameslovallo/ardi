import ardi, { html, svg } from '/js/ardi.js'

ardi({
	component: 'to-do',

	props: {
		name: [String, 'To Do'],
		addtasklabel: [String, 'Add a task'],
		donelabel: [String, 'Complete'],
		todolabel: [String, 'Pending'],
	},

	data: {
		tasks: [
			{ task: 'Do the laundry', starred: false, completed: false },
			{ task: 'Vacuum', starred: false, completed: false },
			{ task: 'Wash the dog', starred: true, completed: false },
		],
	},

	addTask() {
		this.data.tasks.push({
			task: this.refs.task.value,
			starred: this.refs.starred.checked,
		})
		this.refs.task.value = ''
		this.refs.starred.checked = false
	},

	template() {
		const todo = this.data.tasks
			.filter((t) => !t.completed)
			.sort((a, b) => Number(b.starred) - Number(a.starred))
		const done = this.data.tasks
			.filter((t) => t.completed)
			.sort((a, b) => Number(b.starred) - Number(a.starred))
		return html`
			<h2>${this.name}</h2>

			<div part="add">
				<input
					ref="task"
					part="add-task"
					placeholder=${this.addtasklabel}
					@keydown=${(e) => e.key === 'Enter' && this.addTask()}
				/>
				<input ref="starred" part="star" type="checkbox" />
			</div>

			${Object.keys(todo).length
				? html`<h3>${this.todolabel}</h3>
						<ul part="task-list">
							${todo.map(
								(task) => html.for(task)`
									<li part="task">
										<label>
											<input
												type="checkbox"
												part="task-completed"
												@input=${() => {
													task.completed = !task.completed
												}}
											/>
											${task.task}
										</label>
										<div part="task-actions">
											<input
												type="checkbox"
												part="star"
												checked=${task.starred || null}
												@input=${() => (task.starred = !task.starred)}
											/>
											<button part="delete" @click=${() => {
												const index = this.data.tasks.indexOf(task)
												delete this.data.tasks[index]
											}}>
												${this.icons.delete}
											</button>
										</div>
									</li>
								`
							)}
						</ul>`
				: ''}
			${Object.keys(done).length
				? html`<h3>${this.donelabel}</h3>
						<ul part="task-list">
							${done.map(
								(task) => html.for(task)`
									<li part="task">
										<label>
											<input
												type="checkbox"
												part="task-completed"
												checked
												@input=${() => {
													task.completed = !task.completed
												}}
											/>
											${task.task}
										</label>
										<div part="task-actions">
											<input
												type="checkbox"
												part="star"
												checked=${task.starred || null}
												@input=${() => (task.starred = !task.starred)}
											/>
											<button part="delete" @click=${() => {
												const index = this.data.tasks.indexOf(task)
												delete this.data.tasks[index]
											}}>
												${this.icons.delete}
											</button>
										</div>
									</li>
								`
							)}
						</ul>`
				: ''}

			<style>
				:host {
					display: grid;
					gap: 1rem;
					width: 300px;
				}
				:host > * {
					margin: 0;
				}
				[type='checkbox'] {
					height: 1rem;
					margin: 0;
					width: 1rem;
				}
				button {
					background: none;
					border: none;
					display: block;
					padding: 0;
				}
				svg {
					display: block;
					fill: currentcolor;
					height: 1.25rem;
					width: 1.25rem;
				}
				[part='add-task'] {
					border: 1px solid rgba(155, 155, 155, 0.5);
					font-size: 1rem;
					padding: 4px 8px;
				}
				[part='star'] {
					appearance: none;
					color: #f9a825;
					font-size: 1.5rem;
					line-height: 1rem;
				}
				[part='star']:before {
					content: '☆';
				}
				[part='star']:checked:before {
					content: '★';
				}
				[part='task-list'] {
					border: 1px solid rgba(155, 155, 155, 0.5);
					border-radius: 8px;
					list-style: none;
					padding: 0;
				}
				label,
				[part='add'],
				[part='task'],
				[part='task-actions'] {
					align-items: center;
					display: flex;
					gap: 8px;
				}
				[part='task'] {
					padding: 8px;
				}
				[part='task']:not(:last-child) {
					border-bottom: 1px solid rgba(155, 155, 155, 0.5);
				}
				label {
					flex-grow: 1;
				}
				[part='delete'] {
					color: #c62828;
				}
			</style>
		`
	},

	icons: {
		delete: svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>`,
	},
})
