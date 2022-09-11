import loader from 'https://cdn.skypack.dev/@monaco-editor/loader@1.3.2'
import { debounce } from 'https://cdn.skypack.dev/debounce@1.2.1'

const playground = document.getElementById('playground')
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

fetch(`/ardi/components/${component || 'helloWorld'}.js`)
	.then((res) => res.text())
	.then((file) => {
		loader.init().then((monaco) => {
			const editor = monaco.editor.create(playground, {
				automaticLayout: true,
				fontSize: '12px',
				language: 'html',
				lineNumbers: 'off',
				minimap: {
					enabled: false,
				},
				roundedSelection: true,
				scrollBeyondLastLine: false,
				theme: 'vs-dark',
				value: [
					markup(),
					`\n<script type=module>`,
					"import ardi from '//unpkg.com/ardi'",
					file.trim().replace('export default ', '\nardi(') + ')',
					`</script>`,
				].join('\n'),
			})

			const setPreview = () => {
				preview.srcdoc = '<style>:root{font-family: sans-serif}</style>' + editor.getValue()
			}

			setPreview()
			editor.onDidChangeModelContent(debounce(setPreview, 1000))
		})
	})
