import Scroller from '../components/Scroller'
import Anchor from '../components/Anchor'

export default class MasterView {

	constructor() {

		this.el = document.getElementById('main')

		this.ui = {
			anchors: this.el.querySelectorAll('.anchor')
		}

		// Init modules

		this.scroller = new Scroller(this.el)

		this.ui.anchors.forEach((el, index) => {

			new Anchor({ el, index })
		})

	}

}
