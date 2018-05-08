class Loader {

	constructor() {

	}

	loadJSON(url, callback) {


		// is loading

		const xmlhttp = new XMLHttpRequest()

		xmlhttp.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				global.instagram = JSON.parse(this.responseText)

				callback()

			}
		}
		xmlhttp.open('GET', url, true)
		xmlhttp.send()
	}

}

export default new Loader()
