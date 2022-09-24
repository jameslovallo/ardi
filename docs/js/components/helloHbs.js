import handlebars from 'https://cdn.skypack.dev/handlebars@4.7.7'
import ardi from '/js/ardi.js'

ardi({
	component: 'hello-world',
	props: {
		bg: [String, '#def'],
		color: [String, '#000'],
		image: [String, '/img/kenobi.svg'],
		name: [String, 'there'],
	},
	render() {
		const hbs = handlebars.compile(this.template)
		this.shadowRoot.innerHTML = hbs(this) + this.css
	},
	template: `
		{{#if image}}
			<img part="image" src="{{image}}" />
		{{/if}}
		{{#if name}}
			<h2 part="message" style="--bg: {{bg}}; --color: {{color}}">
				Hello {{name}}!
			</h2>
		{{/if}}
	`,
	css: `
		<style>
			:host {
				align-items: flex-end;
				display: flex;
				gap: 1rem;
			}
			[part='image'] {
				height: 128px;
				width: 128px;
			}
			[part='message'] {
				background: var(--bg);
				border-radius: 1rem;
				color: var(--color);
				margin: 0.15em 0;
				padding: 1rem;
				position: relative;
			}
			[part='message']:before {
				background: var(--bg);
				bottom: 1.33rem;
				content: '';
				display: block;
				height: 1rem;
				left: -0.5rem;
				position: absolute;
				transform: rotate(45deg);
				width: 1rem;
			}
		</style>
	`,
})
