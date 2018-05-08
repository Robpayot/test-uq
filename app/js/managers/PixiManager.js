import Device from '../utils/device'
import { loader } from 'pixi.js'

class PixiManager {

	constructor() {

	}

	load(obj, callback) {

		// static assets
		if (Device.touch === true) {
			this.videoHome = [{ type: 'video/mp4', src: `${global.PATH}videos/home-mobile.mp4` }]
		} else {
			this.videoHome = [{ type: 'video/webm', src: `${global.PATH}videos/home.webm`}, { type: 'video/mp4', src: `${global.PATH}videos/home.mp4` }]
		}

		this.videoMovement = [{ type: 'video/webm', src: `${global.PATH}videos/movement.webm`}, { type: 'video/mp4', src: `${global.PATH}videos/movement.mp4` }]
		this.water = `${global.PATH}images/textures/water.jpg`
		this.noise = `${global.PATH}images/textures/noise.jpg`

		this.els = obj.els

		// Load dynamics textures

		for (let i = 0; i < this.els.length; i++) {
			let imgToLoads = this.els[i].querySelectorAll('img')
			this.els[i].setAttribute('data-index', i)

			for (let y = 0; y < imgToLoads.length; y++) {

				loader.add(`img_${i}_${y}`, imgToLoads[y].src)
			}

		}

		// Load static textures (noise...)
		loader.add('water', this.water)
		loader.add('noise', this.noise)

		loader.load(callback)

		// this.setFilters()

	}

	// setFilters() {

	// 	this.destrSprite = Sprite.fromImage(this.noise)
	// 	this.destrFilter = new filters.DisplacementFilter(this.destrSprite)
	// }

}


export default new PixiManager()
