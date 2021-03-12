/// <reference path="./politics.ts" />

namespace act {
	export class Activity {
		page: (Document) => Element;
	}
	
	export class ReportActivity extends Activity {
		report: pol.Report;
		
		totalScore: number;
		constructor(report: pol.Report) {
			super();
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
	}
	
	export class LawActivity extends Activity {
		law: pol.Law;
		
	}
	
	export class CropActivity extends Activity {
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
			super();
			Object.assign(this, obj);
		}
		
		page = (basedoc: Document) => {
			let img = basedoc.createElement("div");
			img.src = this.imgpath;
			let svg = basedoc.createElement("svg");
			svg.height = this.ydim;
			svg.width = this.xdim;
			img.appendChild(svg);
			rect = basedoc.createElement("rect");
			rect.x = 0;
			rect.y = 0;
			rect.width = xdim;
			rect.height = ydim;
			return img;
		}
	}
}

			
