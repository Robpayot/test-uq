import EmitterManager from './EmitterManager'

import { loader as pixiLoader } from 'pixi.js'

import noise from '../../images/noise.jpg'
import hero from '../../images/hero.jpg'

class LoadManager {

	constructor() {

	}

	load() {
		// Load Insta
		const url = 'http://uqstaging.com/instagram/' // /!\ you need to remove add blockers

		this.loadJSON(url)
	}

	loadJSON(url) {


		// is loading

		const xmlhttp = new XMLHttpRequest()

		// Load JSON
		xmlhttp.onreadystatechange = () => {
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				this.instagram = JSON.parse(xmlhttp.responseText).data

				// Load Pixi
				this.loadPIXI()

			}
		}
		xmlhttp.open('GET', url, true)
		xmlhttp.send()
	}

	loadPIXI() {

		this.hero = hero
		this.noise = noise

		// Load static textures (noise...)
		pixiLoader.add('hero', this.hero)
		pixiLoader.add('noise', this.noise)

		pixiLoader.load((loader, resources) => {

			this.pixiResources = resources

			EmitterManager.emit('LOADED')
		})

	}

}

export default new LoadManager()
