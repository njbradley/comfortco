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
		ref: string;
		
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
		citation: string;
		
		constructor(obj: object) {
			Object.assign(this, obj);
		}
	}
	
	export class Bribe implements Modifier {
		amount: number;
		multiplier: number;
		static voteprice: number = 100000;
		
		constructor(amount: number) {
			this.amount = amount;
			this.multiplier = 1;
		}
		
		change(opinion: Opinion): Opinion {
			let amount = this.amount * this.multiplier;
			let newop : Opinion = {
				gov: opinion.gov + amount / Bribe.voteprice,
				public: opinion.public - amount / Bribe.voteprice * 0.1
			};
			return newop;
		}
	}
	
	export class Lobbying implements Modifier {
		amount: number;
		multiplier: number;
		static appealprice: number = 500000;
		
		constructor(amount: number) {
			this.amount = amount;
			this.multiplier = 1;
		}
		
		change(opinion: Opinion): Opinion {
			let amount = this.amount * this.multiplier;
			return {
				gov: opinion.gov + amount / Lobbying.appealprice,
				public: opinion.public + amount / Lobbying.appealprice * 5
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
