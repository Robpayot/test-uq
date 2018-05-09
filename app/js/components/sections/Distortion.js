import Section from '../Section'
import ResizeManager from '../../managers/ResizeManager'
import LoadManager from '../../managers/LoadManager'
// PIXI v4
import { autoDetectRenderer, Container, Sprite, WRAP_MODES, filters } from 'pixi.js'

export default class Distortion extends Section {

	constructor(obj) {
		super(obj)

		this.type = 'distortion'

		this.resources = LoadManager.pixiResources

		this.slideIndex = 0
		this.timeDelay = 1

		// Create a Pixi renderer and define size
		this.renderer = autoDetectRenderer(this.el.offsetWidth, this.el.offsetHeight)
		this.renderer.plugins.interaction.destroy()
		this.stage = new Container()

		this.el.appendChild(this.renderer.view)

		this.ratio = this.el.offsetWidth / this.el.offsetHeight


		// Create a noise Sprite of distortion
		this.noiseSprite = this.setImage(this.resources['noise'].texture)
		// repeat sprite
		this.noiseSprite.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT

		// Create a sprite to display
		this.sprite = this.setImage(this.resources['background'].texture)

		// this.noiseSprite.initX = this.noiseSprite.x

		// Set up Displacement filter
		this.setFilter()
	}

	enable() {

		if (this.isEnabled === true) {
			return false
		}

		this.stage.filters = [this.filter]

		this.filter.enabled = true

		this.isEnabled = true
	}

	disable() {
		if (this.isEnabled === false) {
			return false
		}

		this.stage.filters = []

		this.filter.enabled = false

		this.isEnabled = false
	}

	setImage(img) {

		let sprite = new Sprite(img)
		// center cover
		this.centerImage(sprite)

		this.stage.addChild(sprite)

		return sprite
	}

	setFilter() {

		// Create DisplacementFilter for Distortion
		this.filter = new filters.DisplacementFilter(this.noiseSprite)
		// this.filter.enabled = false
		this.filter.resolution = 0.75

		this.scaleMax = 100
		this.offsetSpeed = 2

		let max = Math.max(this.renderer.view.offsetWidth, this.renderer.view.offsetHeight)
		this.filter.initScale = max / this.filter.uniforms.mapSampler.width // get original width

		this.noiseSprite.scale.x = this.filter.initScale
		this.noiseSprite.scale.y = this.filter.initScale

		this.filter.scale.x = 0
		this.filter.scale.y = 0

		this.stage.filters = [this.filter]

	}

	centerImage(sprite) {
		// center cover
		sprite.anchor.set(0.5, 0.5)

		sprite.x = this.renderer.view.offsetWidth / 2
		sprite.y = this.renderer.view.offsetHeight / 2

		const ratio = sprite.width / sprite.height

		// Cover aspect
		if (this.ratio < ratio) {
			sprite.height = this.renderer.view.offsetHeight
			sprite.width = this.renderer.view.offsetHeight * ratio
		} else {
			sprite.width = this.renderer.view.offsetWidth
			sprite.height = this.renderer.view.offsetWidth / ratio
		}

		sprite.width *= 1.1 // rab
		sprite.height *= 1.1 // rab

		sprite.initScale = { x: sprite.scale.x, y: sprite.scale.y }

	}

	handleRaf() {

		super.handleRaf()

		this.renderer.render(this.stage)

		// this.noiseSprite.x += this.offsetSpeed

	}

	handleScrollUpdate(scrollTarget) {

		if (this.isInViewport === false) return false

		super.handleScrollUpdate(scrollTarget)
		this.scrollTarget = scrollTarget

		// update filter scale from apparition
		const percent = (-scrollTarget + ResizeManager.height - this.startFix ) / (this.elOffsetHeight * 2)

		this.filter.scale.x = percent * this.scaleMax
		this.filter.scale.y = percent * this.scaleMax

	}

	handleResize() {

		super.handleResize()
		const width = this.el.offsetWidth
		const height = this.el.offsetHeight

		// Resize renderer
		this.renderer.resize(width, height)

		// Resize sprites
		this.ratio = width / height

		this.centerImage(this.sprite)

		this.noiseSprite.initX = this.noiseSprite.x

	}

	destroy() {
		this.events(false)

		// Clean Pixi, need to clean Sprite ?
		this.stage.destroy(true, true, true)
		this.renderer.destroy(true)
	}
}
