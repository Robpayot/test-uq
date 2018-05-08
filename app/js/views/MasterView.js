import Scroller from '../components/Scroller'
// anchors
import Anchor from '../components/Anchor'
import Hero from '../components/anchors/Hero'

export default class MasterView {

	constructor() {

		this.el = document.getElementById('main')

		this.ui = {
			anchors: this.el.querySelectorAll('.anchor')
		}

		// Init modules

		this.scroller = new Scroller(this.el)

		this.ui.anchors.forEach((el, index) => {

			if (el.classList.contains('hero') === true) {
				new Hero({ el, index })
			} else {
				new Anchor({ el, index })
			}

		})

	}

}
