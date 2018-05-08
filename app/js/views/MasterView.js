import Scroller from '../components/Scroller'

export default class MasterView {

	constructor() {

		this.el = document.getElementById('main')

		this.ui = {
			anchors: this.el.querySelectorAll('.anchors')
		}

		// Init modules
		this.scroller = new Scroller(this.el)

	}

}
