export default (c) => {
	c.querySelectorAll('.mtk1').forEach((el) => {
		if (el?.nextElementSibling?.innerText.startsWith('(')) {
			el.classList.remove('mtk1')
			el.classList.add('mtk14')
		}
	})
	c.querySelectorAll('.mtk8').forEach((el) => {
		if ('this' === el.innerText) {
			el.classList.remove('mtk8')
			el.classList.add('mtk12')
		} else if (
			[
				'as',
				'else if',
				'else',
				'export',
				'from',
				'if',
				'import',
				'return',
			].includes(el.innerText)
		) {
			el.classList.remove('mtk8')
			el.classList.add('mtk18')
		} else if (['null', 'undefined'].includes(el.innerText)) {
			el.classList.remove('mtk8')
			el.classList.add('mtk16')
		}
	})
	c.querySelectorAll('.mtk9').forEach((el) => {
		if ('=>' === el.innerText) {
			el.classList.remove('mtk9')
			el.classList.add('mtk18')
		}
	})
}
