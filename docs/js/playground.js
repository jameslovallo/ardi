import loader from 'https://cdn.skypack.dev/@monaco-editor/loader@1.3.2'
import { debounce } from 'https://cdn.skypack.dev/debounce@1.2.1'

const playground = document.getElementById('playground')
const preview = document.getElementById('preview')
const component = new URLSearchParams(location.search).get('component')

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
<contact-card
	name="Fatimah Maimunah"
	position="Chief Executive Officer"
	phone="1234567890"
	email="#"
	photo="https://bit.ly/3FIADMM"
></contact-card>

<h2>Demo 2</h2>
<contact-card
	name="Ashley Fox"
	position="Chief Technical Officer"
	email="#"
	photo="https://bit.ly/3FyBTSk"
></contact-card>`
		break

	case 'gauge':
		markup = `<gauge-demo
	label="MPH"
	max="120"
	min="0"
	step="10"
	value="90">
</gauge-demo>`
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

	default:
		markup = `<hello-world name="there" color="#000" bg="#def" ></hello-world>`
}

// const ext = component.includes('Jsx') ? 'jsx' : 'js'

fetch(`/js/components/${component || 'helloWorld'}.js`)
	.then((res) => res.text())
	.then((file) => {
		loader.init().then((monaco) => {
			const editor = monaco.editor.create(playground, {
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
<script type=module>\n
${file.trim().replace('export default ', '')}\n
customElements.define('${markup.match(/[a-z]+-[a-z]+/)[0]}', ${component})\n
</script>\n
`,
			})

			const setPreview = () => {
				preview.srcdoc = '<style>:root{font-family: sans-serif}</style>' + editor.getValue()
			}

			setPreview()
			editor.onDidChangeModelContent(debounce(setPreview, 1000))
		})
	})
