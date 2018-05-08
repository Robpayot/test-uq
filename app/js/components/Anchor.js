import EmitterManager from '../managers/EmitterManager'
import { SCROLL_UPDATE, WINDOW_RESIZE } from '../utils/events'
import { getOffsetTop } from '../utils/dom'
import ResizeManager from '../managers/ResizeManager'
import ViewportObserver from '../observers/ViewportObserver'
import { ticker } from 'pixi.js'

export default class Anchor {

	constructor(obj) {

		this.bind()

		// UI
		this.el = obj.el
		this.id = obj.index

		this.ui = {}

		this.isIntersecting = false
		this.scrollTarget = 0

		// init Instagram
		this.initInstagram()

		// setUnits
		this.setUnits()

		ViewportObserver.observe(this.el, this.handleIntersection)

		this.events(true)
	}

	bind() {
		this.handleIntersection = this.handleIntersection.bind(this)
		this.handleScrollUpdate = this.handleScrollUpdate.bind(this)
		this.handleResize = this.handleResize.bind(this)

		if (this.handleRaf instanceof Function) {
			this.handleRaf = this.handleRaf.bind(this)
		}

	}

	handleIntersection(entry) {

		this.isIntersecting = entry.isIntersecting

		if (this.isIntersecting) {

			this.el.classList.add('is-visible')

			if (this.handleRaf instanceof Function) {
				ticker.shared.add(this.handleRaf)
			}

		} else {

			this.el.classList.remove('is-visible')

			if (this.handleRaf instanceof Function) {
				ticker.shared.remove(this.handleRaf)
			}

		}
	}

	events(method) {

		const onListener = method === false ? 'removeListener' : 'on'

		EmitterManager[onListener](SCROLL_UPDATE, this.handleScrollUpdate)
		EmitterManager[onListener](WINDOW_RESIZE, this.handleResize)

	}

	initInstagram() {

		const img = new Image()
		img.src = global.instagram[this.id - 1].images.standard_resolution.url
		img.classList.add('anchor__bkg')
		img.classList.add('fit')

		this.el.appendChild(img)

	}

	handleScrollUpdate() {

		// // add transi-in at 30% top of the section
		// // if (this.hasAppeared !== true) {
		// if (-scrollTarget + ResizeManager.height > this.startFix + ResizeManager.height * 0.3) {
		// 	this.el.classList.add('transi-in')
		// 	this.hasAppeared = true
		// } else {
		// 	this.el.classList.remove('transi-in')
		// }
		// // }

	}

	handleRaf() {

		if (-global.scrollTarget + ResizeManager.height > this.startFix + ResizeManager.height * 0.3) {
			this.el.classList.add('transi-in')
			this.hasAppeared = true
		} else {
			this.el.classList.remove('transi-in')
		}
	}

	setUnits() {

		this.elOffsetHeight = this.el.offsetHeight

		// Clean transformations
		this.el.style.transform = ''
		this.startFix = getOffsetTop(this.el)
		this.startEnd = this.startFix + this.elOffsetHeight

	}

	handleResize() {

		this.isResizing = true

		this.setUnits()
	}

	destroy() {
		this.events(false)

	}
}
