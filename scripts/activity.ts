namespace activity {
	class Activity {
		page: (Document) => Element;
	}
	
	export class ReportActivity extends Activity {
		text: string[];
		scores: number[];
		
		totalScore: number;
		constructor(obj: object) {
			super();
			Object.assign(this, obj);
			this.totalScore = 0;
		}
		
		page = (basedoc: Document) => {
			let basediv = basedoc.createElement("div");
			basediv.style.cssText +=
			"background-image: url(\"images/texteditor.png\"); padding: 15%; padding-top: 100px; width: 500px;  background-size: cover;";
			let score = basedoc.createElement("p");
			basediv.appendChild(score);
			for (let i = 0; i < this.text.length; i ++) {
				let p = basedoc.createElement("span");
				p.innerText = this.text[i];
				p.style.cssText += "border: 3px solid rgb(200,200,200); margin: 10px; line-height: 2; font-size: 18px;"
				p.onclick = () => {
					if (p.innerText == "...") {
						p.innerText = this.text[i];
						this.totalScore += this.scores[i];
					} else {
						this.totalScore -= this.scores[i];
						p.innerText = "...";
					}
					score.innerText = "Score: " + this.totalScore;
				}
				basediv.appendChild(p);
				this.totalScore += this.scores[i];
			}
			score.innerText = "Score: " + this.totalScore;
			return basediv;
		}
	}
}

			
