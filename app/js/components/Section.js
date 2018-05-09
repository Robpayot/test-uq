import { SCROLL_UPDATE, WINDOW_RESIZE } from '../utils/events'
import { getOffsetTop } from '../utils/dom'
import EmitterManager from '../managers/EmitterManager'
import ResizeManager from '../managers/ResizeManager'
import LoadManager from '../managers/LoadManager'
import ViewportObserver from '../observers/ViewportObserver'
import { ticker } from 'pixi.js'


export default class Section {

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
			this.isInViewport = true

			if (this.handleRaf instanceof Function) {
				// Listen this raf only if in viewport, constantly
				ticker.shared.add(this.handleRaf)
			}

			if (this.enable instanceof Function) {
				// Listen  for distortion
				this.enable()
			}

			if (this.tl) {
				// Listen gsap TimelineMax if any
				this.tl.play()
			}

		} else {

			this.el.classList.remove('is-visible')
			this.isInViewport = false

			if (this.handleRaf instanceof Function) {
				ticker.shared.remove(this.handleRaf)
			}

			if (this.disable instanceof Function) {
				// Listen  for distortion
				this.disable()
			}

			if (this.tl) {
				// Listen gsap TimelineMax if any
				this.tl.pause()
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
		img.src = LoadManager.instagram[this.id - 1].images.standard_resolution.url
		img.classList.add('section__bkg')
		img.classList.add('fit')

		this.el.appendChild(img)

	}

	handleScrollUpdate(scrollTarget) {

		// Listen only when scrolling, if it's stop, no listening

		if (this.isInViewport === false) return false
		// Check if is in viewport

		// add transi-in at 30% top of the section
		if (-scrollTarget + ResizeManager.height > this.startFix + ResizeManager.height * 0.3) {
			this.el.classList.add('transi-in')

			if (this.transitionIn instanceof Function && this.isTransiIn !== true) {
				// Listen if there is a JS transition in on the section
				this.transitionIn()
			}

			this.isTransiIn = true

		} else {
			this.el.classList.remove('transi-in')
			this.isTransiIn = false
		}

	}

	handleRaf() {
		// Listen only if it's in viewport, constantly
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
