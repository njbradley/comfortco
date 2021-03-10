/// <reference path="./politics.ts" />

var obj: politics.Law = JSON.parse(`
{
	"name":"hello"
}
`);

console.log(obj)
console.log(JSON.stringify(obj));
var obj2 : politics.Law = new politics.Law(obj)
console.log(obj2.name);

async function main() {
	let data = await (await fetch('json/testlaw.json')).json();
	let law: politics.Law = new politics.Law(data);
	console.log(law);
}

main();
