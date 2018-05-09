import Section from '../Section'
import SplitText from '../../vendor/SplitText'
import { TimelineMax } from 'gsap'

export default class BigText extends Section {

	constructor(obj) {
		super(obj)

		this.type = 'big text'

		this.ui.inner = this.el.querySelector('.big-text__inner')

		this.splits = []

		for (let i = 0; i < this.ui.inner.children.length; i++) {

			this.ui.inner.children[i]

			this.splits.push(new SplitText(this.ui.inner.children[i], {type:'chars'}))
		}

	}

	transitionIn() {

		const tl = new TimelineMax()
		tl.staggerFromTo(this.splits[0].chars, 0.8, {y: '50%', opacity: 0}, {y: '0%', opacity: 1, ease: window.Expo.easeOut}, 0.023)
		tl.staggerFromTo(this.splits[1].chars, 0.8, {y: '50%', opacity: 0}, {y: '0%', opacity: 1, ease: window.Expo.easeOut}, 0.023, 0.5)
	}

}
