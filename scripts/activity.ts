/// <reference path="./politics.ts" />

namespace act {
	export interface Activity {
		page: (Document) => Element;
	}
	
	export class ReportActivity implements Activity, pol.Modifier {
		report: pol.Report;
		
		totalScore: number;
		constructor(report: pol.Report) {
			this.report = report;
			this.totalScore = 0;
		}
		
		page = (basedoc: Document) => {
			let basediv = basedoc.createElement("div");
			basediv.style.cssText +=
			"background-image: url(\"images/texteditor.png\"); padding: 15%; padding-top: 100px; width: 500px;  background-size: cover;";
			let score = basedoc.createElement("p");
			basediv.appendChild(score);
			for (let i = 0; i < this.report.text.length; i ++) {
				let p = basedoc.createElement("span");
				p.innerText = this.report.text[i];
				p.style.cssText += "border: 3px solid rgb(200,200,200); margin: 10px; line-height: 2; font-size: 18px;"
				p.onclick = () => {
					if (p.innerText == "...") {
						p.innerText = this.report.text[i];
						this.totalScore += this.report.scores[i];
					} else {
						this.totalScore -= this.report.scores[i];
						p.innerText = "...";
					}
					score.innerText = "Score: " + this.totalScore;
				}
				basediv.appendChild(p);
				this.totalScore += this.report.scores[i];
			}
			score.innerText = "Score: " + this.totalScore;
			return basediv;
		}
		
		change (opinion: pol.Opinion): pol.Opinion {
			let changeval = this.totalScore / 100.0;
			let newop: pol.Opinion = {
				gov: opinion.gov += changeval,
				public: opinion.public += changeval
			}
			return newop;
		}
	}
	
	export class LawActivity implements Activity {
		law: pol.Law;
		loadActivity: (Activity) => void;
		
		constructor(law: pol.Law, loadActivity) {
			this.law = law;
			this.loadActivity = loadActivity;
		}
		
		page(basedoc: Document): Element {
			let basediv = basedoc.createElement("div");
			
			let bribeButton = basedoc.createElement("button");
			bribeButton.innerText = "bribe";
			
			return basediv;
		}
	}
	
	export class BribeActivity implements Activity {
		bribe: pol.Bribe;
		startop: pol.Opinion;
		amountP: HTMLElement;
		newopP: HTMLElement;
		
		constructor(startop: pol.Opinion) {
			this.bribe = new pol.Bribe(0);
			this.startop = startop;
		}
		
		page(basedoc: Document): Element {
			let basediv = basedoc.createElement("div");
			
			this.amountP = basedoc.createElement("p");
			basediv.appendChild(this.amountP);
			
			let upButton = basedoc.createElement("button");
			upButton.onclick = () => {this.bribe.amount += 1000; this.update(); };
			upButton.innerText = "^";
			basediv.appendChild(upButton);
			
			let downButton = basedoc.createElement("button");
			downButton.onclick = () => {this.bribe.amount -= 1000; this.update(); };
			downButton.innerText = "v";
			basediv.appendChild(downButton);
			
			this.newopP = basedoc.createElement("p");
			basediv.appendChild(this.newopP);
			
			this.update();
			return basediv;
		}
		
		update(): void {
			this.amountP.innerText = "Amount: " + this.bribe.amount;
			let result = this.bribe.change(this.startop);
			this.newopP.innerText =
			"Current Votes: " + Math.round(result.gov * 100) + "/100\n"
			+ "Public Opinion: " + Math.round(result.public * 100) + "%";
		}
	}
	
	export class LobbyingActivity implements Activity {
		lobbying: pol.Lobbying;
		startop: pol.Opinion;
		amountP: HTMLElement;
		newopP: HTMLElement;
		
		constructor(startop: pol.Opinion) {
			this.lobbying = new pol.Lobbying(0);
			this.startop = startop;
		}
		
		page(basedoc: Document): Element {
			let basediv = basedoc.createElement("div");
			
			this.amountP = basedoc.createElement("p");
			basediv.appendChild(this.amountP);
			
			let upButton = basedoc.createElement("button");
			upButton.onclick = () => {this.lobbying.amount += 1000; this.update(); };
			upButton.innerText = "^";
			basediv.appendChild(upButton);
			
			let downButton = basedoc.createElement("button");
			downButton.onclick = () => {this.lobbying.amount -= 1000; this.update(); };
			downButton.innerText = "v";
			basediv.appendChild(downButton);
			
			this.newopP = basedoc.createElement("p");
			basediv.appendChild(this.newopP);
			
			this.update();
			return basediv;
		}
		
		update(): void {
			this.amountP.innerText = "Amount: " + this.lobbying.amount;
			let result = this.lobbying.change(this.startop);
			this.newopP.innerText =
			"Current Votes: " + Math.round(result.gov * 100) + "/100\n"
			+ "Public Opinion: " + Math.round(result.public * 100) + "%";
		}
	}
	
	export class CropActivity implements Activity {
		imgpath: string;
		caption: string;
		xdim: number;
		ydim: number;
		x1: number;
		x2: number;
		y1: number;
		y2: number;
		
		cx1: number;
		cy1: number;
		cx2: number;
		cy2: number;
		rect: Element;
		
		constructor(obj: object) {
			Object.assign(this, obj);
		}
		
		page = (basedoc: Document) => {
			// let img = basedoc.createElement("image");
			// img.src = this.imgpath;
			// let svg = basedoc.createElement("svg");
			// svg.height = this.ydim;
			// svg.width = this.xdim;
			// img.appendChild(svg);
			// rect = basedoc.createElement("rect");
			// rect.x = 0;
			// rect.y = 0;
			// rect.width = xdim;
			// rect.height = ydim;
			// return img;
			return null;
		}
	}
}

			
