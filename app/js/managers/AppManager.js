import MasterView from '../views/MasterView'

class AppManager {

	constructor() {

		this.bind()

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
