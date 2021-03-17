/// <reference path="./activity.ts" />
/// <reference path="./politics.ts" />

namespace game {
	export class Game {
		activity: act.Activity;
		money: number;
		co2: number;
		doc: Document;
		
		lawlib: pol.Law[];
		reportlib: pol.Report[];
		
		law: pol.Law;
		person: pol.Person;
		actdiv: HTMLElement;
		actcontrolDiv: HTMLElement;
		endactButton: HTMLElement;
		
		constructor(doc: Document, money: number) {
			this.doc = doc;
			this.money = money;
			this.co2 = 1.5;
			this.lawlib = [];
			this.reportlib = [];
			
			this.person = new pol.Person("Marky Jamerson");
			
			this.actdiv = this.doc.getElementById("activity-div");
			this.endactButton = this.doc.getElementById("endact-button");
			this.actcontrolDiv = this.doc.getElementById("actcontrols-div");
			this.doc.getElementById("cancelact-button").onclick = () => {
				this.endact();
			};
			
			let passcheck: any = this.doc.getElementById("pass-checkbox")
			passcheck.onclick = () => {
				if (passcheck.checked) {
					this.law.opinion.gov += 0.01;
				} else {
					this.law.opinion.gov -= 0.01;
				}
				this.makeOpinionPage();
			};
			
			this.doc.getElementById("lawpage-continue").onclick = () => {
				let opinion = this.law.opinion;
				if (this.law.passing()) {
					this.money += this.law.money;
					this.co2 += this.law.co2;
				} else {
					opinion = {
						gov: 1 - opinion.gov,
						public: 1 - opinion.public
					}
				}
				
				this.person.doAction(opinion);
				this.lawlib.splice(0,1);
				this.law = this.lawlib[0];
				console.log(this.lawlib);
				
				this.makeLawPage();
				this.makePersonPage();
			};
			
			//this.doc.documentElement.style.setProperty("--display-help", "none");
			this.doc.getElementById("help-button").onclick = () => {
				if (this.doc.documentElement.style.getPropertyValue("--display-help") == "unset") {
					this.doc.documentElement.style.setProperty("--display-help", "none");
				} else {
					this.doc.documentElement.style.setProperty("--display-help", "unset");
				}
			};
		}
		
		async loadData(): Promise<void> {
			let reportfiles = await (await fetch("json/reports.json")).json();
			for (let filename of reportfiles) {
				let data = await (await fetch("json/reports/" + filename)).json();
				data.path = filename;
				let report = new pol.Report(data);
				this.reportlib.push(report);
			}
			
			let lawfiles = await (await fetch("json/laws.json")).json();
			for (let filename of lawfiles) {
				let data = await (await fetch("json/laws/" + filename)).json();
				let newlaw = new pol.Law(data);
				newlaw.link(this.reportlib);
				this.lawlib.push(newlaw);
			}
		}
		
		makeLawPage() {
			let basediv = this.doc.getElementById("lawpage-div");
			this.doc.getElementById("lawpage-title").innerText = this.law.title;
			this.doc.getElementById("lawpage-text").innerText = this.law.text;
			this.doc.getElementById("lawpage-money").innerText = "" + this.law.money;
			this.doc.getElementById("lawpage-co2").innerText = "" + this.law.co2;
			this.makeOpinionPage();
			let lawlink: any = this.doc.getElementById("lawpage-link")
			lawlink.href = this.law.ref;
			
			let checkbox: any = this.doc.getElementById("pass-checkbox")
			checkbox.checked = false;
			
			this.doc.getElementById("lawpage-bribe-button").onclick = () => {
				let activ = new act.BribeActivity(this.law.opinion);
				this.startact(activ);
				this.endactButton.onclick = () => {
					this.law.opinion = activ.bribe.change(this.law.opinion);
					this.money -= activ.bribe.amount;
					this.endact();
					this.makeOpinionPage();
					this.makePersonPage();
				};
			};
			
			this.doc.getElementById("lawpage-lobby-button").onclick = () => {
				let activ = new act.LobbyingActivity(this.law.opinion);
				this.startact(activ);
				this.endactButton.onclick = () => {
					this.law.opinion = activ.lobbying.change(this.law.opinion);
					this.money -= activ.lobbying.amount;
					this.endact();
					this.makeOpinionPage();
					this.makePersonPage();
				};
			};
			
			let reportsdiv = this.doc.getElementById("reports-div");
			reportsdiv.innerHTML = "";
			for (let report of this.law.reports) {
				let button = this.doc.createElement("button");
				button.innerText = "Report: " + report.title;
				button.onclick = () => {
					let activ = new act.ReportActivity(report);
					this.startact(activ);
					this.endactButton.onclick = () => {
						this.law.opinion = activ.change(this.law.opinion);
						this.endact();
						this.makeOpinionPage();
					};
				};
				reportsdiv.appendChild(button);
			}
			
			
		}
		
		makeOpinionPage() {
			this.doc.getElementById("lawop-gov").innerText = "" + Math.round(this.law.opinion.gov * 100);
			this.doc.getElementById("lawop-public").innerText = "" + Math.round(this.law.opinion.public * 100);
			if (this.law.passing()) {
				this.doc.getElementById("lawpage-continue").innerText = "Continue (Passing)";
			} else {
				this.doc.getElementById("lawpage-continue").innerText = "Continue (Not passing)";
			}
		}
		
		makePersonPage() {
			this.doc.getElementById("person-name").innerText = this.person.name;
			this.doc.getElementById("person-money").innerText = "" + this.money;
			this.doc.getElementById("person-co2").innerText = "" + this.co2
			this.doc.getElementById("personop-gov").innerText = "" + Math.round(this.person.opinion.gov * 100);
			this.doc.getElementById("personop-public").innerText = "" + Math.round(this.person.opinion.public * 100);
		}
		
		startact(activ: act.Activity) {
			this.activity = activ;
			this.actdiv.innerHTML = "";
			this.actdiv.appendChild(activ.page(this.doc));
			this.actcontrolDiv.style.display = "block";
		}
		
		endact() {
			this.activity = null;
			this.actdiv.innerHTML = "";
			this.actcontrolDiv.style.display = "none";
		}
		
	}
}
