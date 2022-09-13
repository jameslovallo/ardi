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
			email: /* svg */ `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>`,
			phone: /* svg */ `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"></path><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>`,
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
		[part=contact] svg {
			color: #D32F2F;
			display: block;
			width: 20px;
			pointer-events: none;
		}`
	}
}
