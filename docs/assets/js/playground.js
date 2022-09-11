import loader from 'https://cdn.skypack.dev/@monaco-editor/loader@1.3.2'
import { debounce } from 'https://cdn.skypack.dev/debounce@1.2.1'

const playground = document.getElementById('playground')
const preview = document.getElementById('preview')
const component = new URLSearchParams(location.search).get('component')

const markup = () => {
	return component
		? document.getElementById(component).innerHTML
		: `\n<hello-world name="there" bg="#def" color="black"></hello-world>`
}

fetch(`/ardi/components/${component || 'helloWorld'}.js`)
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
				value: [
					markup(),
					`\n<script type=module>`,
					"import ardi from '//unpkg.com/ardi'",
					file.trim().replace('export default ', '\nardi(') + '\n)',
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
