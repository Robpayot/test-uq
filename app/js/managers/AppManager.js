import EmitterManager from './EmitterManager'
import ResizeManager from './ResizeManager'
import Device from '../utils/device'
import {WINDOW_RESIZE} from '../utils/events'
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

		// remove loader
		this.loader = document.querySelector('.loader')
		this.loader.classList.add('is-loaded')

		EmitterManager.on(WINDOW_RESIZE, this.handleResize)
		this.handleResize()

	}

	handleResize() {

		if (ResizeManager.width >= 1024) { // ?
			Device.size = 'desktop'
		}
		else if (ResizeManager.width > 768) {
			Device.size = 'tablet'
		}
		else {
			Device.size = 'mobile'
		}
	}

}

export default new AppManager()
