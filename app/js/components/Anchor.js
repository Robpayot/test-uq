import EmitterManager from '../managers/EmitterManager'
import { SCROLL_UPDATE, WINDOW_RESIZE } from '../utils/events'
import { getOffsetTop } from '../utils/dom'
import Device from '../utils/device'
import ViewportObserver from '../observers/ViewportObserver'
import { ticker } from 'pixi.js'

export default class Anchor {

	constructor(obj) {

		this.bind()

		// UI
		this.el = obj.el
		this.id = obj.index

		this.isIntersecting = false
		this.scrollTarget = 0

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

		let onListener = method === false ? 'removeListener' : 'on'

		EmitterManager[onListener](SCROLL_UPDATE, Device.touch ? this.handleScrollUpdateTouch : this.handleScrollUpdate)
		EmitterManager[onListener](WINDOW_RESIZE, this.handleResize)

	}

	handleScrollUpdate() {
		// round
		// console.log('scroll update')

	}

	setUnits() {

		this.elOffsetHeight = this.el.offsetHeight

		// Clean transformations
		this.el.style.transform = ''
		this.startFix = getOffsetTop(this.el) // not working if element already transformedY
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
