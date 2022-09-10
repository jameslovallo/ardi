import { debounce } from 'https://cdn.skypack.dev/debounce@1.2.1'

const htmlEl = document.getElementById('html')
const jsEl = document.getElementById('js')
const preview = document.getElementById('preview')
const component = new URLSearchParams(location.search).get('component')

const markup = () => {
	if (component) {
		let markup = document.getElementById(component).innerHTML.split('\n')
		markup.shift()
		markup.pop()
		const whitespace = markup[0].match(/\t/g)
		return markup
			.map((line) => {
				whitespace.forEach(() => (line = line.replace('\t', '')))
				return line
			})
			.join('\n')
	} else return `<hello-world name="kind human"></hello-world>`
}

const coreConfig = {
	indentWithTabs: true,
	lineWrapping: true,
	lineNumbers: true,
	scrollbarStyle: 'native',
	tabSize: 2,
	theme: 'onedark',
}

fetch(`/ardi/components/${component || 'helloWorld'}.js`)
	.then((res) => res.text())
	.then((file) => {
		const htmlEditor = CodeMirror(htmlEl, {
			...coreConfig,
			mode: 'xml',
			value: markup(),
		})

		const jsEditor = CodeMirror(jsEl, {
			...coreConfig,
			mode: 'javascript',
			value: file.replace('export default ', ''),
		})

		const setPreview = () => {
			preview.srcdoc = /* html */ `
				<script type="module">
					import ardi from '/ardi/assets/ardi-min.js';
					ardi(${jsEditor.getValue()})
				</script>
				<style>body{font-family: sans-serif}</style>
				${htmlEditor.getValue()}
			`
		}

		setPreview()
		;[htmlEl, jsEl].forEach((editor) => {
			editor.addEventListener('keydown', debounce(setPreview, 1000))
		})
	})
