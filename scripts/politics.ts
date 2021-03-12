namespace pol {
	export class Law {
		name: string;
		text: string;
		money: number;
		
		constructor(obj: object) {
			Object.assign(this, obj);
		}
		
		passing(): boolean {
			return this.opinion.gov > 0.5;
		}
	}
	
	export class Report {
		text: string[];
		scores: number[];
		
		supportingLaw: string | Law;
		
		constructor(obj: object) {
			Object.assign(this, obj);
		}
		
		link(lawlib: Law[]) {
			if (typeof(supportingLaw) == "string") {
				for (Law law of lawlib) {
					if (law.name == supportingLaw) {
						supportingLaw = law;
						return;
					}
				}
			}
		}
		
		
	}
}
