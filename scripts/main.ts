/// <reference path="./game.ts" />

fetch("json/report2.json")
.then(result => result.json())
.then(result => {
	let act = new activity.ReportActivity(result);
	console.log(act);
	document.getElementById("frame").appendChild(act.page(document));
});
