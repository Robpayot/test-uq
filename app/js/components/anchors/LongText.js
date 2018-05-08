// import ResizeManager from '../managers/ResizeManager'
import Anchor from '../Anchor'

export default class LongText extends Anchor {

	constructor(obj) {
		super(obj)

		this.type = 'long text'

		this.ui.text = this.el.querySelector('.long-text__inner')

	}

	handleRaf() {

		console.log(-this.scrollTarget, this.startFix, this.startEnd)

		// update text

		// // --> percent Deplacement de l'image
		const percent = (-this.scrollTarget + this.startFix) / this.elOffsetHeight

		console.log(percent)

		this.ui.text.style.left = `${percent}%`

	}

}
