function verify() {
	sendRequest(`${site}/users/${username}/projects.json?page=1`, "HEAD")
	.then((dictionary) => {
		console.log(dictionary)
		const jsonObject = JSON.parse(dictionary);
		
		if (jsonObject.status == 200) {
			const verification = {
				displayName: username,
				icon: null
			};	
			processVerification(verification);
		}
		else {
			processError(Error("Invalid User"));
		}
	})
	.catch((requestError) => {
		processError(requestError);
	});
}

function load() {
	let query = `${site}/users/${username}/projects.json?page=1`
	let query2 = `${site}/users/${username}.json`
	console.log(`Querying: ${query}`);
	console.log(`then Querying: ${query2}`);
	
	sendRequest(query, "GET")
	.then((json) => {
		sendRequest(query2)
		.then((userJSON) => {
			const user = JSON.parse(userJSON)
			const recentProjects = JSON.parse(json);
			
			var results = [];
			
			recentProjects.data.forEach(item => {
				let resultItem = null;
				resultItem = itemForData(item, user);
				
				if (resultItem != null) {	
					results.push(resultItem);
				}
			})
			// let item = recentProjects.data[0]
			// let resultItem = null;
			// resultItem = itemForData(item, user);
			// 
			// if (resultItem != null) {	
			// 	console.log("Result item is not null");
			// 	results.push(resultItem);
			// }
			
			console.log(results.length)
			processResults(results, true);
		})
		.catch((requestError) => {
			console.log("Failed processing HTML in Q2");
			processError(requestError);
		});
	})
	.catch((requestError) => {
		console.log("Failed requesting HTML in Q1");
		processError(requestError);
	});
}

function loadUser() {
	
}

function itemForData(item, user) {
	console.log("Constructing item creator identity")
	var identity = Identity.createWithName(`${username}`);
	identity.url = user["portfolio"]["artstation_url"];
	// identity.avatar = user["portfolio"]["medium_avatar_url"];
	
	console.log("Grabbing fields from item object");
	const uri = item["permalink"];
	let dateString = item["created_at"];
	let date = new Date(dateString);
	let title = item["title"];
	let content = "";
	
	// console.log(`uri: ${uri}`)
	// console.log(`dateString: ${dateString}`)
	// console.log(`date: ${date}`)
	// console.log(`title: ${title}`)
	
	var attachments = [];
	
	// CONSTRUCT ATTACHMENT HERE
	console.log("Constructing attachments");
	let thumbnailURL = item["cover"]["small_square_url"]
	
	console.log(`ThumbnailURL: ${thumbnailURL}`)
	const attachment = MediaAttachment.createWithUrl(thumbnailURL);
	attachment.mimeType = "image";
	
	attachments.push(attachment)
	
	// PUT IT ALL TOGETHER
	console.log("Putting it all together");
	const resultItem = Item.createWithUriDate(uri, date);
	resultItem.title = title;
	resultItem.body = content;
	resultItem.author = identity;
	resultItem.attachments = attachments;
	
	return resultItem;
}