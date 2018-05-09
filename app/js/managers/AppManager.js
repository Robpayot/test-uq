import MasterView from '../views/MasterView'
import SplitText from '../vendor/SplitText'

class AppManager {

	constructor() {

		this.bind()

		console.log(SplitText)

	}

	bind() {
		this.start = this.start.bind(this)
	}

	start() {

		// No routes, only one view

		this.currentPage = new MasterView()

	}

}

export default new AppManager()
