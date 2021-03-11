/// <reference path="./activity.ts" />
/// <reference path="./politics.ts" />

fetch("json/report1.json")
.then(result => result.json())
.then(result => {
	let act = new activity.ReportActivity(result);
	console.log(act);
	document.getElementById("frame").appendChild(act.page(document));
});
