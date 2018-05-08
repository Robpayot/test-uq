import '../scss/style.scss'

import AppManager from './managers/AppManager'

(() => {

	console.log('hello')
	// Load instagram pictures

	const xmlhttp = new XMLHttpRequest()
	const url = 'https://uqstaging.com/instagram/'

	xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			const myArr = JSON.parse(this.responseText)
			console.log(myArr)

			AppManager.start()

		}
	}
	xmlhttp.open('GET', url, true)
	xmlhttp.send()


})()
