// import ResizeManager from '../../managers/ResizeManager'
import Section from '../Section'
import { TimelineMax } from 'gsap'

export default class LongText extends Section {

	constructor(obj) {
		super(obj)

		this.type = 'long text'

		this.ui.text = this.el.querySelector('.long-text__inner')

		let dist = this.ui.text.children[0].offsetWidth

		this.tl = new TimelineMax({
			repeat: -1,
			paused: true
		})

		this.tl.to(this.ui.text, 8, { x: -dist, ease: window.Linear.easeNone })

	}

}
