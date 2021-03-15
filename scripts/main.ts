/// <reference path="./game.ts" />
/// <reference path="./activity.ts" />
/// <reference path="./politics.ts" />

async function main() {
	var gameobj = new game.Game(document, 10000);
	await gameobj.loadData();
	gameobj.law = gameobj.lawlib[0];
	gameobj.makeLawPage();
	gameobj.makePersonPage();
}

window.onload = main;
