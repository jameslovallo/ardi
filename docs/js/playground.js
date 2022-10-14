import loader from 'https://cdn.skypack.dev/@monaco-editor/loader@1.3.2'
import { debounce } from 'https://cdn.skypack.dev/debounce@1.2.1'
import colorize from '/js/colorize.js'

const playground = document.getElementById('playground')
const preview = document.getElementById('preview')
const component =
	new URLSearchParams(location.search).get('component') || 'helloWorld'

let markup

switch (component) {
	case 'counter':
		markup = `<h2>Demo 1</h2>
<counter-demo></counter-demo>

<h2>Demo 2</h2>
<counter-demo count="-3" step="3"></counter-demo>`
		break

	case 'contactCard':
		markup = `<h2>Demo 1</h2>
<contact-demo
	name="Fatimah Maimunah"
	position="Chief Executive Officer"
	phone="1234567890"
	email="#"
	photo="/img/fatimah.png"
></contact-demo>

<h2>Demo 2</h2>
<contact-demo
	name="Ashley Fox"
	position="Chief Technical Officer"
	email="#"
	photo="/img/ashley.png"
></contact-demo>`
		break

	case 'decoration':
		markup = `<h2>Demo 1</h2>
<decoration-demo label="Ribbon" type="ribbon">
	<div class="demo-card"></div>
</decoration-demo>

<h2>Demo 2</h2>
<decoration-demo href="https://google.com" label="Link Ribbon" type="ribbon">
	<div class="demo-card"></div>
</decoration-demo>

<h2>Demo 3</h2>
<decoration-demo background="#e53935" label="3" type="badge">
	<div class="demo-card"></div>
</decoration-demo>

<h2>Demo 4</h2>
<decoration-demo background="#e53935" class="styled-badge" label="123" type="badge">
	<div class="demo-card"></div>
</decoration-demo>

<style>
	.styled-badge::part(badge) {
		border-radius: 0;
		border-bottom-left-radius: 8px;
		border-top-right-radius: 8px;
		right: 0;
		top: 0;
	}
	decoration-demo {
		max-width: 400px;
	}
	.demo-card {
		border: 1px solid rgba(125, 125, 125, 0.5);
		border-radius: 8px;
		height: 80px;
	}
</style>`
		break

	case 'gauge':
		markup = `<h2>Demo 1</h2>
<gauge-demo
	label="MPH"
	max="120"
	min="0"
	step="10"
	value="90"
></gauge-demo>

<h2>Demo 2</h2>
<gauge-demo
	label="RPM"
	max="7000"
	min="0"
	step="1000"
	value="3000"
	style="--needle: limegreen"
></gauge-demo>`
		break

	case 'keyboard':
		markup = `<h2>Demo 1</h2>
<keyboard-demo
	octaves="2"
	start="3"
></keyboard-demo>

<h2>Demo 2</h2>
<keyboard-demo
	instrument="sitar"
	octaves="6"
	start="2"
></keyboard-demo>`
		break

	case 'todo':
		markup = `<todo-demo></todo-demo>`
		break

	case 'weather':
		markup = `<h2>Demo 1</h2>
<weather-demo
	lat="42.375"
	lon="-83"
	place="Detroit"
	unit="f">
</weather-demo>

<h2>Demo 2</h2>
<weather-demo
 label="Voraussage"
 lat="52.52"
 locale="de"
 lon="13.41"
 place="Berlin">
</weather-demo>`
		break

	case 'youtubeLite':
		markup = `<h2>Demo 1</h2>
<youtube-demo vid="O30_s0DKlDk" style="max-width: 500px"></youtube-demo>`
		break

	case 'helloJsx':
		markup = `<hello-world></hello-world>

<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type=text/babel data-type=module>
	import ardi, {html} from '//cdn.skypack.dev/ardi'
	import React from "//cdn.skypack.dev/jsx-dom"
	
	ardi({
		component: 'hello-world',

		props: {
			bg: [String, '#def'],
			color: [String, '#000'],
			image: [String, '/img/kenobi.svg'],
			name: [String, 'there'],
		},

		render() {
			this.shadowRoot.appendChild(this.template())
		},

		template() {
			const { wrapper, image, message } = this.styles()
			return (
				<div style={wrapper}>
					{this.image && <img src={this.image} style={image} />}
					{this.name && (
						<h2 style={message}>
							<i style={message.arrow}></i>
							Hello {this.name}!
						</h2>
					)}
				</div>
			)
		},
		
		styles() {
			return {
				wrapper: {
					'align-items': 'flex-end',
					display: 'flex',
					gap: '1rem',
				},
				image: {
					height: '128px',
					width: '128px',
				},
				message: {
					background: this.bg,
					'border-radius': '1rem',
					color: this.color,
					margin: '.15em 0',
					padding: '1rem',
					position: 'relative',
					arrow: {
						background: this.bg,
						bottom: '1.33rem',
						display: 'block',
						height: '1rem',
						left: '-.33rem',
						position: 'absolute',
						transform: 'rotate(45deg)',
						width: '1rem',
					},
				},
			}
		}
	})
</script>`
		break

	default:
		markup = `<hello-world name="there" color="#000" bg="#def"></hello-world>`
}

fetch(`/js/components/${component}.js`)
	.then((res) => res.text())
	.then((file) => {
		const scriptTag = `<script type=module>
${file.trim().replace('export default ', '')}
</script>\n`

		loader.init().then((monaco) => {
			const editor = monaco.editor.create(playground, {
				automaticLayout: true,
				fontSize: '13px',
				language: 'html',
				lineNumbers: 'off',
				minimap: {
					enabled: false,
				},
				roundedSelection: true,
				scrollBeyondLastLine: false,
				tabSize: 2,
				theme: 'vs-dark',
				value: `
${markup}\n
${component === 'helloJsx' ? '' : scriptTag}
`,
			})

			const setPreview = () => {
				preview.srcdoc =
					'<style>:root{font-family: sans-serif; padding: 8px;}</style>' +
					editor.getValue()
			}

			setPreview()
			setTimeout(() => colorize(playground), 500)

			editor.onDidChangeModelContent(
				debounce(() => {
					setPreview()
					colorize(playground)
				}, 500)
			)

			editor.onMouseUp(() => {
				debounce(colorize(playground), 500)
			})

			editor.onDidScrollChange(() => {
				debounce(colorize(playground), 500)
			})

			editor.onDidChangeCursorSelection(() => {
				debounce(colorize(playground), 500)
			})
		})
	})
