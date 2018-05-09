import Scroller from '../components/Scroller'
// sections
import Section from '../components/Section'
import Hero from '../components/sections/Hero'
import Distortion from '../components/sections/Distortion'
import LongText from '../components/sections/LongText'
import BigText from '../components/sections/BigText'
import Squares from '../components/sections/Squares'

export default class MasterView {

	constructor() {

		this.el = document.getElementById('main')

		this.ui = {
			sections: this.el.querySelectorAll('.section')
		}

		// Init modules

		this.scroller = new Scroller(this.el)

		this.ui.sections.forEach((el, index) => {

			if (el.classList.contains('hero') === true) {
				new Hero({ el, index })
			} else if (el.classList.contains('big-text') === true) {
				new BigText({ el, index })
			} else if (el.classList.contains('distortion') === true) {
				new Distortion({ el, index })
			} else if (el.classList.contains('squares') === true) {
				new Squares({ el, index })
			} else if (el.classList.contains('long-text') === true) {
				new LongText({ el, index })
			} else {
				new Section({ el, index })
			}

		})

		// Add transi In to first section after loaded

		this.ui.sections[0].classList.add('transi-in')

	}

}
