import '../scss/style.scss'

import EmitterManager from './managers/EmitterManager'
import AppManager from './managers/AppManager'
import LoadManager from './managers/LoadManager'

(() => {

	// DOM ready

	EmitterManager.on('LOADED', AppManager.start)

	// Main loading
	LoadManager.load()


})()
