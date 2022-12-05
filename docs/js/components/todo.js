import ardi, { html } from '/js/ardi.js'

ardi({
	component: 'todo-demo',

	props: {
		addtasklabel: [String, 'Add a task'],
		donelabel: [String, 'Complete'],
		listLabel: [String, 'To Do'],
		todolabel: [String, 'Pending'],
	},

	state() {
		return {
			tasks: [
				{ task: 'Do the laundry', starred: false, completed: false },
				{ task: 'Vacuum', starred: false, completed: true },
				{ task: 'Wash the dog', starred: true, completed: false },
			],
		}
	},

	addTask() {
		this.state.tasks.push({
			task: this.refs.task.value,
			starred: this.refs.starred.checked,
		})
		this.refs.task.value = ''
		this.refs.starred.checked = false
	},

	template() {
		const lists = [
			{
				label: this.todolabel,
				tasks: this.state.tasks
					.filter((t) => !t.completed)
					.sort((a, b) => Number(b.starred) - Number(a.starred)),
			},
			{
				label: this.donelabel,
				tasks: this.state.tasks
					.filter((t) => t.completed)
					.sort((a, b) => Number(b.starred) - Number(a.starred)),
			},
		]

		return html`
			<h3>${this.listLabel}</h3>

			<div part="add">
				<input
					ref="task"
					part="add-task"
					placeholder=${this.addtasklabel}
					@keydown=${(e) => e.key === 'Enter' && this.addTask()}
				/>
				<input ref="starred" part="star" type="checkbox" />
			</div>

			${
				//prettier-ignore
				lists.map((list) => html.for(list)`
					${list.tasks.length
						? html`
							<h4>${list.label}</h4>
							<ul part="task-list">
								${list.tasks.map((task) => html.for(task)`
									<li part="task">
										<label>
											<input
												type="checkbox"
												part="task-completed"
												checked=${task.completed || null}
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
												const index = this.state.tasks.indexOf(task)
												delete this.state.tasks[index]
											}}>
												⨉
											</button>
										</div>
									</li>`
								)}
							</ul>
						`
						: ''
					}
				`
			)
			}

			<style>
				:host {
					display: grid;
					gap: 1rem;
				}
				:host > * {
					margin: 0;
				}
				[type='checkbox'] {
					height: 1rem;
					margin: 0;
					width: 1rem;
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
					color: #ffb300;
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
					gap: 12px;
				}
				[part='task'] {
					padding: 12px;
				}
				[part='task']:not(:last-child) {
					border-bottom: 1px solid rgba(155, 155, 155, 0.5);
				}
				label {
					flex-grow: 1;
				}
				[part='delete'] {
					background: none;
					border: none;
					color: #e53935;
					display: block;
					font-size: 1.25rem;
					line-height: 1rem;
					padding: 0;
				}
			</style>
		`
	},
})
