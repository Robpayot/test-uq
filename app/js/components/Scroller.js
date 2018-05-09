import EmitterManager from '../managers/EmitterManager'
import { SCROLL_UPDATE, WINDOW_RESIZE } from '../utils/events'
import ResizeManager from '../managers/ResizeManager'
import { ticker } from 'pixi.js'

export const scrollingElement = document.scrollingElement || document.documentElement

export default class Scroller {

	constructor(el) {

		this.el = el

		// UI
		this.ui = {
			sections: [... this.el.querySelectorAll('.section')]
		}

		this.bind()

		this.scrollTarget = -scrollingElement.scrollTop
		this.scrollTargetSmooth = -scrollingElement.scrollTop
		this.previousScrollTarget = -scrollingElement.scrollTop

		// need to wait all image loaded if Services
		this.setUnits()

		// events
		this.events(true)

	}

	bind() {
		this.handleScroll = this.handleScroll.bind(this)
		this.handleResize = this.handleResize.bind(this)
		this.handleRaf = this.handleRaf.bind(this)
		this.handleScrollUpdate = this.handleScrollUpdate.bind(this)
	}

	events(method) {

		const onListener = method === false ? 'removeListener' : 'on'
		const evListener = method === false ? 'removeEventListener' : 'addEventListener'

		document[evListener]('scroll', this.handleScroll)

		EmitterManager[onListener](SCROLL_UPDATE, this.handleScrollUpdate)
		EmitterManager[onListener](WINDOW_RESIZE, this.handleResize)


	}

	createScroll(height) {

		// create div with full content height
		const div = document.createElement('div')
		div.className = 'scroller'
		document.body.appendChild(div)
		div.style.height = `${height}px`
	}

	handleScroll() {

		// On scroll

		this.previousScrollTarget = this.scrollTarget
		this.scrollTarget = -scrollingElement.scrollTop

		// Listen the handleRaf only when scrolling

		if (this.isScrollTicking !== true) {

			ticker.shared.add(this.handleRaf)
			this.isScrollTicking = true
		}
	}

	handleRaf() {

		// Use Raf to have a smooth deceleration

		// Smooth scrollTarget
		this.scrollTargetSmooth += (this.scrollTarget - this.scrollTargetSmooth) * 0.1
		this.scrollTargetSmooth = Math.round(this.scrollTargetSmooth * 10) / 10

		if (this.scrollTargetSmooth !== this.prevTargetYSmooth) {

			EmitterManager.emit(SCROLL_UPDATE, this.scrollTargetSmooth) // This event is called only if you scroll, it's stop if you don't

		} else if (this.isScrollTicking === true) {

			EmitterManager.emit(SCROLL_UPDATE, this.scrollTargetSmooth)

			ticker.shared.remove(this.handleRaf)

			this.isScrollTicking = false
		}

		this.prevTargetYSmooth = this.scrollTargetSmooth

	}

	handleScrollUpdate(scrollTarget) {

		// Apply translation on the main content
		// only when scrolling

		this.el.style.transform = `translate3d(0, ${scrollTarget}px, 0)`
	}



	setUnits() {

		this.sectionsOffsetsHeight = this.ui.sections.map(section => section.offsetHeight)

		let totalHeight = 0

		for (let i = 0; i < this.ui.sections.length; i++) {

			// calcul Body height
			totalHeight += this.sectionsOffsetsHeight[i]

		}

		this.limit = -totalHeight + ResizeManager.height

		this.createScroll(totalHeight)

	}

	handleResize() {

	}

	destroy() {
		this.events(false)
	}
}
