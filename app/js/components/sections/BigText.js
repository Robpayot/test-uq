import Section from '../Section'

export default class BigText extends Section {

	constructor(obj) {
		super(obj)

		this.type = 'big text'

		this.ui.text = this.el.querySelectorAll('.long-text__inner')

	}

	transitionIn() {
		console.log('ok')
	}

}
