import ResizeManager from '../../managers/ResizeManager'
import Anchor from '../Anchor'

export default class LongText extends Anchor {

	constructor(obj) {
		super(obj)

		this.type = 'long text'

		this.ui.text = this.el.querySelector('.long-text__inner')

		this.maxW = this.ui.text.offsetWidth - ResizeManager.width

	}

	handleScrollUpdate(scrollTarget) {

		if (this.isInViewport === false) return false

		super.handleScrollUpdate(scrollTarget)

		// update text
		// since apparition
		// const percent = (-scrollTarget + ResizeManager.height - this.startFix ) / (this.elOffsetHeight * 2)

		// this.ui.text.style.left = `-${percent * this.maxW}px`

	}

}
