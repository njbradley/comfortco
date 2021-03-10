var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var politics;
(function (politics) {
    class Opinion {
        constructor(dem, repub) {
            this.dem = dem;
            this.repub = repub;
        }
        sum() {
            return this.dem + this.repub;
        }
        mul(opinion) {
            return new Opinion(this.dem * opinion.dem, this.repub * opinion.repub);
        }
    }
    politics.Opinion = Opinion;
    class Government {
    }
    politics.Government = Government;
    class Opinable {
        get_public_opinion() {
            return this.public_opinion;
        }
        get_gov_opinion() {
            return this.gov_opinion;
        }
        public_support() {
            return this.get_public_opinion().mul(this.gov.public);
        }
        gov_support() {
            return this.get_gov_opinion().mul(this.gov.gov);
        }
    }
    politics.Opinable = Opinable;
    class Law {
        constructor(obj) {
            Object.assign(this, obj);
        }
        passing() {
            return this.public_opinion > 0.5 && this.gov_opinion > 0.5;
        }
    }
    politics.Law = Law;
    class Person {
    }
    politics.Person = Person;
})(politics || (politics = {}));
var obj = JSON.parse(`
{
	"name":"hello"
}
`);
console.log(obj);
console.log(JSON.stringify(obj));
var obj2 = new politics.Law(obj);
console.log(obj2.name);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (yield fetch('json/testlaw.json')).json();
        let law = new politics.Law(data);
        console.log(law);
    });
}
main();
//# sourceMappingURL=build.js.map