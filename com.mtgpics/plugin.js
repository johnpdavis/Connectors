// function extractBackgroundImages() {
// 	let divs = document.querySelectorAll("div[style*='background: url']");
// 	let imageUrlsSuffixes = Array.from(divs).map(div => {
// 		let match = div.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
// 		return match ? match[1] : null;
// 	}).filter(url => url !== null);
// 	
// 	let imageUrlsSuffixes = Array.from(divs).map(div => {
// 		let match = div.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
// 		return match ? match[1] : null;
// 	}).filter(url => url !== null);
// 
// 	return imageUrls;
// }

function getImageDivs(html) {
	return Array.from(html.querySelectorAll("div[style*='background: url']"));
}

function getLastTwoPathComponents(urlString) {
	let match = urlString.match(/([^/]+\/[^/]+)\)$/); // Extracts last two components before closing )
	return match ? match[1] : null
}

function generateID(input) {
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16); // Shorten for a unique ID
}

function load() {
	let query = `${site}/art`
	console.log(`Querying: ${query}`)
	
	// fetch("http://mtgpics.com/art")
	//   .then(response => response.arrayBuffer())
	//   .then(buffer => {
	// 	let decoder = new TextDecoder("iso-8859-1");
	// 	let text = decoder.decode(buffer);
	// 	
	// 	console.log("Succeeded in getting HTML")	
	// 	processResults([]);
	//   })
	//   .catch(error => {
	// 	  console.log("Failed requesting HTML")	
	// 	  processError(requestError);
	//   });

	let extraHeaders = { "accept", "application/json" };

	sendRequest(query, "GET", null, extraHeaders)
	.then((html) => {
		// const itemDivs = getImageDivs(html);
		// 
		// const items = itemDivs.map(parentDiv => {
		// 	const urlSuffix = getLastTwoPathComponents(parentDiv.style.background);
		// 	const id = generateID(urlSuffix);
		// 	const attachmentURL = `${site}/pics/art/${urlSuffix}`;
		// 	
		// 	let uri = site;
		// 	let date = new Date();
		// 	
		// 	const resultItem = Item.createWithUriDate(uri, date);
		// 	
		// 	const attachment = MediaAttachment.createWithUrl(attachmentURL);
		// 	resultItem.attachments = [attachment];
		// 	
		// 	return resultItem
		// });
		// 
		// processResults(items);
	
		console.log("Succeeded in getting HTML")	
		processResults([]);
	})
	.catch(requestError => {
		console.log("Failed requesting HTML")	
		processError(requestError);
	});
}