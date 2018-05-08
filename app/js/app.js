import '../scss/style.scss'

import AppManager from './managers/AppManager'

import Loader from './components/Loader'

(() => {

	// DOM ready

	// Load Insta
	const url = 'http://uqstaging.com/instagram/' // /!\ you need to remove add blockers

	Loader.loadJSON(url, AppManager.start)


})()
