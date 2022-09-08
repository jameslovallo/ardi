const phoneIcon = /* svg */ `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`

const emailIcon = /* svg */ `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`

export default {
	component: 'staff-card',
	shadow: true,
	props() {
		return {
			name: String,
			position: String,
			photo: String,
			phone: this.phoneLink,
			email: this.emailLink,
		}
	},
	phoneLink(phone) {
		if (phone) {
			const url = 'tel:' + phone.match(/[0-9]+/g).join('')
			return /* html */ `
					<a href="${url}" title="${phone}" @click="phoneClick">
						${phoneIcon}
					</a>
				`
		} else return ''
	},
	emailLink(email) {
		if (email) {
			return /* html */ `
					<a href="mailto:${email}" title="${email}">
						${emailIcon}
					</a>
				`
		} else return ''
	},
	phoneClick(e) {
		e.preventDefault()
		const message = `Are you sure you want to call ${this.name}? Did you already try text, chat or email?`
		let confirmed = confirm(message)
		if (confirmed) location = e.target.href
	},
	template() {
		return /* html */ `
				<img part="photo" src="${this.photo}">
				<div part="details">
					<b>${this.name}</b>
					<small>${this.position}</small>
				</div>
				<div part="contact">
					<span part="phone">${this.phone}</span>
					<span part="email">${this.email}</span>
				</div>
			`
	},
	styles() {
		return /* css */ `
				:host {
					display: grid;
					align-items: center;
					grid-template-columns: 64px 1fr auto;
					max-width:400px;
					border: 1px solid #ccc;
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
					display: block;
					width: 20px;
					pointer-events: none;
				}
			`
	},
}
