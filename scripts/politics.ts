namespace pol {
	
	export interface Opinion {
		gov: number;
		public: number;
	}
	
	export class Law {
		title: string;
		text: string;
		money: number;
		co2: number;
		
		opinion: Opinion;
		
		reports: Report[];
		reportnames: string[];
		
		constructor(obj: object) {
			Object.assign(this, obj);
			this.reports = [];
		}
		
		link(reportlib: Report[]) {
			for (let repname of this.reportnames) {
				for (let report of reportlib) {
					if (report.path == repname) {
						this.reports.push(report);
					}
				}
			}
		}
		
		passing(): boolean {
			return this.opinion.gov > 0.5;
		}
	}
	
	export interface Modifier {
		change: (Opinion) => Opinion;
	}
	
	export class Report {
		path: string;
		title: string;
		text: string[];
		scores: number[];
		supportingLawName: string;
		
		constructor(obj: object) {
			Object.assign(this, obj);
		}
	}
	
	export class Bribe implements Modifier {
		amount: number;
		static voteprice: number = 100000;
		
		constructor(amount: number) {
			this.amount = amount;
		}
		
		change(opinion: Opinion): Opinion {
			let newop : Opinion = {
				gov: opinion.gov + this.amount / Bribe.voteprice,
				public: opinion.public - this.amount / Bribe.voteprice * 0.1
			};
			return newop;
		}
	}
	
	export class Lobbying implements Modifier {
		amount: number;
		static appealprice: number = 500000;
		
		constructor(amount: number) {
			this.amount = amount;
		}
		
		change(opinion: Opinion): Opinion {
			return {
				gov: opinion.gov + this.amount / Lobbying.appealprice,
				public: opinion.public + this.amount / Lobbying.appealprice
			};
		}
	}
	
	export class Person {
		name: string;
		opinion: Opinion;
		
		constructor(name: string) {
			this.name = name;
			this.opinion = {gov:0.5, public:0.5};
		}
		
		doAction(newop: Opinion) {
			let change = {
				gov: (newop.gov - 0.5) * 0.1,
				public: (newop.public - 0.5) * 0.1
			};
			this.opinion = {
				gov: this.opinion.gov + change.gov,
				public: this.opinion.public + change.public
			};
		}
	}
}
