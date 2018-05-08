// import ResizeManager from '../managers/ResizeManager'
import Anchor from '../Anchor'

export default class LongText extends Anchor {

	constructor(obj) {
		super(obj)

		this.type = 'long text'

		this.ui.text = this.el.querySelector('.long-text__inner')

	}

	handleScrollUpdate(scrollTarget) {

		if (this.isInViewport === false) return false

		super.handleScrollUpdate(scrollTarget)

		// update text

		// // --> percent Deplacement de l'image
		const percent = (-scrollTarget + this.startFix) / this.elOffsetHeight

		this.ui.text.style.left = `${percent}%`

	}

}
