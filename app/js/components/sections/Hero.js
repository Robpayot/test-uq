import Section from '../Section'
import Device from '../../utils/device'

export default class Hero extends Section {

	constructor(obj) {
		super(obj)

		this.type = 'hero'

		this.ui.img = this.el.querySelector('img.fit')

	}

	initInstagram() {
		return false
	}

	handleScrollUpdate(scrollTarget) {

		if (this.isInViewport === false) return false

		super.handleScrollUpdate(scrollTarget)


		if (Device.size !== 'mobile') {

			// stay fix

			this.el.style.transform = `translate3d(0, ${-scrollTarget}px, 0)`

			// --> percent Deplacement de l'image
			const percent = (-scrollTarget + this.startFix) / this.elOffsetHeight

			this.el.style.opacity = `${1 - percent}`

			const scale = 0.2 // + 0.2

			this.ui.img.style.transform = `scale(${1 + scale * percent}, ${1 + scale * percent})` // /!\ a bit laggy with big image
		}

	}

}
