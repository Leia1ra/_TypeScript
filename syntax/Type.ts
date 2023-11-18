/* 타입 에너테이션(Type Annotation)
TypeScript 에서 변수나 인수 뒤에 : 타입과 같이 타입 어노테이션(Type Annotation)이라 불리는 정보를 붙여 변수나 인수에 저장할 값을 제한 가능
-> 변수 데이터 타입이 명확한 경우 등 일부 조건에서는 생략할 수도 있음
var 변수 : 타입 = 값
let 변수 : 타입 = 값
const 변수 : 타입 = 값
*/
console.log('\n타입 어노테이션 #############################################');
function sayHello(firstName : string) : void {
    console.log(`Hello ${firstName}`);
}

let firstName1 :string = 'LEE';
let firstName2 = 'KIM';
sayHello(firstName1);
sayHello(firstName2);




/* var, let, const 차이*/
console.log('\nvar, let, const 차이 ######################################');

function scopeTest(scope : boolean) : void {
    var x: number = 10;
    let y = 10;
    if(scope){
        // var로 정의된 경우, 변수의 스코프가 해당 변수를 포함하는 함수에서 까지 사용 가능
        var x: number = 20;

        // let으로 정의된 경우, 블록 스코프로 선언된 변수는 해당변수를 포함하는 블록 안에서만 사용 가능
        let y : number = 20;

        // const의 경우 let과 같은 스코프 규칙을 갖지만, 값을 재대입하면 에러 발생
        const num : number = 100;

        console.log(`x -> ${x} `); // 20
        console.log(`y -> ${y} `); // 20
    }
    console.log(`x -> ${x} `); // 20
    console.log(`y -> ${y} `); // 10
}
scopeTest(true);




/* 원시 타입*/
let age : number = 36;
let age2 = 36;
let isDone : boolean = false;
let isDone2 = false;
let color : string = '파랑';
let color2 = '파랑';




/* 배열 */
console.log('\n배열  #####################################################');
const array: string[] = ['a', 'b', 'c']
array.push('abc');

let a1 : Array<string> = ['a', 'b', 'c'];
let a2 : Array<string> = new Array('a', 'b', 'c');

const union : (string | number)[] = ['foo', 1, 'a', 2, 'b', 'c'] // union 타입
const tuple : [string, number, boolean] = ['foo', 1, true]; // 튜플

/* 객체 타입 */
console.log('\n객체 타입  #################################################');
// 객체(object)는 key, value를 이용한 데이터 형식 인스턴스
const user : {name : string, age ?: number} = {
    name : 'Hana',
    age : 36
}

function printName(obj : {firstName:string, lastName ?: string}) {
    // 객체타입은 일부 또는 모든 속성을 '?:'를 사용해 옵셔널(Optional, 선택 가능) 속성으로 지정할 수 있음
    // 옵셔널 속성으로 타입을 정의할 시, 해당 속성이 존재하지 않아도 문제없이 작동함
}
printName({firstName:'Hana'});
printName({firstName:'Hana', lastName:'LEE'});



/* any */
console.log('\nany  #####################################################');
// 모든 타입을 허용하는 타입 -> 특정한 값의 타입 체크 구조를 적용하고 싶지 않을때 사용
let anyUser :any = {firstName : 'Hana'};
// 다음 행의 코드는 모두 컴파일러 에러가 발생하지 않음
/*anyUser.hello();
anyUser();
anyUser.age=100;
anyUser='hello';
const n:number = anyUser;*/



/* 함수 */
// 1. 옵셔널 인수를 지정할 수 있음
// 2. 인수를 정의할 때 기본값을 지정할 수 있음
// 3. 인수의 반환값의 타입에 다양한 타입을 지정할 수 있음
console.log('\n함수  #####################################################');
function formatName(name : string):string{
    return `${name}님`
}
function fn(defaultArgs : string = 'user', formatter : (name : string) => string, optional ?: string) : string {
    let str : string = `${formatter(defaultArgs)} ${optional}`;
    console.log(str);
    return str;
}
// fn('hana');
fn('hana', formatName);
fn('hana', formatName, 'hello');

// 화살표 함수(ArrowFunction)의 경우는 다음과 같이 지정함
let sayHi = (name : string) : string => {
    return `Hi ${name}`;
}
sayHi('lee');

// 함수형 타입
function genBridInfo(name : string) : string[]{
    return name.split(',');
}

function singBirds(input : string, birdInfo : (x : string) => string[]):string {
    return birdInfo(input)[0] + ' 꽥';
}
console.log(singBirds('오리, 비둘기', genBridInfo));


/* 타입의 기능*/
/* 타입 추론*/
// 명시적인 변수의 초기화를 수행하면 '타입 추론'을 통해 자동적으로 타입이 결정된다
console.log('\n타입 추론 ##################################################');
const age3 = 10;
const user3 = {
    name : 'Hana',
    age : 36
}
function getUser() {
    return {
        name : 'Hana',
        age : 36
    }
}

const names = ['Hana', 'Lee', 'Kana'];
names.forEach(function (name) {
    console.log(name.toUpperCase());
})















