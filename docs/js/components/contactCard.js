import ardi from '/js/ardi-min.js'

export default class contactCard extends ardi {
	setup() {
		this.shadow = true

		this.props = {
			email: String,
			name: String,
			phone: String,
			photo: String,
			position: String,
		}

		this.icons = {
			email: /* svg */ `
			<img
				src="https://s2.svgbox.net/materialui.svg?ic=alternate_email&color=C51162"
				width="32"
				height="32"
			>`,
			phone: /* svg */ `
			<img
				src="https://s2.svgbox.net/hero-outline.svg?ic=phone&color=C51162"
				width="32"
				height="32"
			>`,
		}
	}

	phoneEl() {
		return this.phone
			? /* html */ `
			<a
				@click="phoneClick"
				href="'tel:' + ${this.phone}.match(/[0-9]+/g).join('')}"
			>
				${this.icons.phone}
			</a>`
			: ''
	}

	emailEl() {
		return this.email
			? /* html */ `
			<a href="mailto:${this.email}">
				${this.icons.email}
			</a>`
			: ''
	}

	phoneClick(e) {
		e.preventDefault()
		const message = `Are you sure you want to call ${
			this.name.split(' ')[0]
		}? Did you already try text, chat or email?`
		let confirmed = confirm(message)
		if (confirmed) location = e.target.href
	}

	template() {
		return /* html */ `
		<img part="photo" src="${this.photo}">
		<div part="details">
			${this.name ? `<b>${this.name}</b>` : ''}
			${this.position ? `<small>${this.position}</small>` : ''}
		</div>
		<div part="contact">
			${this.phoneEl()}
			${this.emailEl()}
		</div>`
	}

	styles() {
		return /* css */ `
		:host {
			display: grid;
			align-items: center;
			grid-template-columns: 64px 1fr auto;
			max-width:400px;
			border: 1px solid rgba(125,125,125,.5);
			border-radius: .75rem;
			overflow: hidden;
		}
		[part=photo] {
			display: block;
			height: 64px;
			width: 64px;
			aspect-ratio: 1/1;
			object-fit: contain;
			object-position: center bottom;
		}
		[part=details] {
			display: flex;
			flex-direction: column;
			padding: .75rem;
		}
		[part=contact] {
			display: flex;
			gap: .75rem;
			padding-right: .75rem;
		}
		[part="contact"] a {
			display: block;
			text-decoration: none;
		}
		[part=contact] img {
			display: block;
			width: 20px;
			pointer-events: none;
		}`
	}
}
