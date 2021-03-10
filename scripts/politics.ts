namespace politics {
	
	export class Opinion {
		dem: number;
		repub: number;
		constructor(dem: number, repub: number) {
			this.dem = dem;
			this.repub = repub;
		}
		sum(): number {
			return this.dem + this.repub;
		}
		mul(opinion: Opinion): Opinion {
			return new Opinion(this.dem * opinion.dem, this.repub * opinion.repub);
		}
	}
	
	export class Government {
		public: Opinion;
		gov: Opinion;
	}
	
	export class Opinable {
		public_opinion: Opinion;
		gov_opinion: Opinion;
		gov: Government;
		
		get_public_opinion(): Opinion {
			return this.public_opinion;
		}
		
		get_gov_opinion(): Opinion {
			return this.gov_opinion;
		}
		
		public_support(): Opinion {
			return this.get_public_opinion().mul(this.gov.public);
		}
		
		gov_support(): Opinion {
			return this.get_gov_opinion().mul(this.gov.gov);
		}
	}
	
	export class Law {
		name: string;
		text: string;
		co2: number;
		
		public_opinion: number;
		gov_opinion: number;
		
		constructor(obj: object) {
			Object.assign(this, obj);
		}
		
		passing(): boolean {
			// return this.public_support().sum() > 0.5
			// && this.gov_support().sum() > 0.5;
			return this.gov_opinion > 0.5;
		}
	}
	
	export class Person {
		name: string;
		public_opinion: number;
		gov_opinion: number;
	}
}
