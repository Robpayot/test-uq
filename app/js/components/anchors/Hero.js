import Anchor from '../Anchor'

export default class Hero extends Anchor {

	constructor(obj) {
		super(obj)

		this.type = 'hero'

		this.ui.img = this.el.querySelector('img.fit')

	}

	initInstagram() {
		return false
	}

	handleRaf() {

		super.handleRaf()

		// stay fix
		if (-global.scrollTarget < this.elOffsetHeight) {

			this.el.style.transform = `translate3d(0, ${-global.scrollTarget}px, 0)`

			// // --> percent Deplacement de l'image
			const percent = (-global.scrollTarget + this.startFix) / this.elOffsetHeight
			this.el.style.opacity = `${1 - percent}`


			const scale = 0.3 // + 0.3

			this.ui.img.style.transform = `scale(${1 + scale * percent}, ${1 + scale * percent})` // /!\ a bit laggy with big image

		}

	}

}
