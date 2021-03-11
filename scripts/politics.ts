namespace politics {
	
	export class Opinion {
		public: number;
		gov: number;
	}
	
	export class Law {
		name: string;
		text: string;
		money: number;
		
		opinion: Opinion;
		
		constructor(obj: object) {
			Object.assign(this, obj);
		}
		
		passing(): boolean {
			// return this.public_support().sum() > 0.5
			// && this.gov_support().sum() > 0.5;
			return this.opinion.gov > 0.5;
		}
	}
	
	export class Person {
		name: string;
		opinion: Opinion;
	}
}
