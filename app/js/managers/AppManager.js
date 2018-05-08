// import EmitterManager from './EmitterManager'
// import Loader from '../components/Loader'

class AppManager {

	constructor() {

	}

	start() {

		console.log('start')

		// No routes, only one view

		this.currentPage = new MasterView()

	}

}

export default new AppManager()
