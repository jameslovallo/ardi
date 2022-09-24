import loader from 'https://cdn.skypack.dev/@monaco-editor/loader@1.3.2'
import { debounce } from 'https://cdn.skypack.dev/debounce@1.2.1'

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

fetch(`/js/components/${component}.js`)
	.then((res) => res.text())
	.then((file) => {
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
<script type=module>
${file.trim().replace('export default ', '')}
</script>\n
`,
			})

			const setPreview = () => {
				preview.srcdoc =
					'<style>:root{font-family: sans-serif; padding: 8px;}</style>' +
					editor.getValue()
			}

			setPreview()
			editor.onDidChangeModelContent(debounce(setPreview, 1000))
		})
	})
