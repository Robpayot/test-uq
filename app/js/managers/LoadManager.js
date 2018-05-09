import EmitterManager from './EmitterManager'
import json from '../../datas/instagram.json'

// console.log(json)

import { loader as pixiLoader } from 'pixi.js'

import noise from '../../images/noise.jpg'
import background from '../../images/abstract-4.jpg'

class LoadManager {

	constructor() {

	}

	load() {
		// Load Insta
		const url = 'http://uqstaging.com/instagram/' // /!\ you need to remove add blockers
		// Issue due to mixed content http https on my gh-page

		this.loadJSON(url)
	}

	loadJSON(url) {


		// is loading

		// Commented due to mixed content error on prod http / https

		// const xmlhttp = new XMLHttpRequest()

		// // Load JSON
		// xmlhttp.onreadystatechange = () => {
		// 	if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
		// 		this.instagram = JSON.parse(xmlhttp.responseText).data

		// 		// Load Pixi
		// 		this.loadPIXI()

		// 	}
		// }
		// xmlhttp.open('GET', url, true)
		// xmlhttp.send()
		this.url = url

		this.instagram = json.data
		// Load Pixi
		this.loadPIXI()

	}

	loadPIXI() {

		this.background = background
		this.noise = noise

		// Load static textures (noise...)
		pixiLoader.add('background', this.background)
		pixiLoader.add('noise', this.noise)

		pixiLoader.load((loader, resources) => {

			this.pixiResources = resources

			EmitterManager.emit('LOADED')
		})

	}

}

export default new LoadManager()
