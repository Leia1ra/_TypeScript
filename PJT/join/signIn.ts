enum errType {
    unfilled = '미입력된 양식이 존재합니다.',
    existID = '존재하는 아이디 입니다.',
    pwCheck = '입력된 비밀번호와 확인번호가 일치하지 않습니다.',
    pwStrength = '6-15자리, 특수문자, 대소문자, 숫자를 최소 2가지를 조합하여 비밀번호를 입력하세요',
    capsLock = 'CapsLock이 켜져있습니다.',
    numCheck = '숫자만 입력해 주세요'

}
enum condition {
    default='1px solid #ddd',
    err = '2px solid red',
    focus = '2px solid #1ebee6'
}
function validationCheck(element:HTMLInputElement, reg:RegExp, errMsgbox?:HTMLDivElement, errMsg?:string ) : boolean {
    let result : boolean = false;
    element.addEventListener("focusout", function () {
        if(!reg.test(this.value)){
            this.style.border = condition.err;
            errMsgbox.innerHTML = `올바른 ${errMsg} 양식이 아닙니다.`;
            errMsgbox.style.display = 'block';
            result = false;
        } else {
            this.style.border = condition.default;
            errMsgbox.innerHTML = '';
            errMsgbox.style.display = 'none';
            result = true;
        }
    })
    element.addEventListener("focusin", function () {
        this.style.border = condition.focus;
    })
    return result;
}


function telCheck(element:HTMLInputElement, telBox:HTMLDivElement) {
    let isNum = /^\d+$/;
    element.addEventListener('keydown', function (event) {
        if((!isNum.test(event.key) && event.key !== 'Backspace') || (element.value.length > 3 && event.key !== 'Backspace')){
            telBox.style.border = condition.err;
            event.preventDefault();
        } else {
            telBox.style.border = condition.focus;
        }
    })
    element.addEventListener("focusout", function () {
        telBox.style.border = condition.default;
    })
}

document.addEventListener('DOMContentLoaded', function () {
    let errCnt = 0;
    let errMsg = document.getElementById('err') as HTMLDivElement;
    /*inputs*/
    let id = document.getElementById('id') as HTMLInputElement;

    let pw = document.getElementById('pw') as HTMLInputElement;
    let pwRe = document.getElementById('pwRe') as HTMLInputElement;
    let meter = document.getElementById('meter') as HTMLProgressElement;

    let name = document.getElementById('name') as HTMLInputElement;
    let email = document.getElementById('email') as HTMLInputElement;
    let tel = document.getElementById('tel') as HTMLInputElement;
    let telNums0 = document.getElementsByClassName('tel-nums')[0] as HTMLSelectElement;
    let telNums1 = document.getElementsByClassName('tel-nums')[1] as HTMLInputElement;
    let telNums2 = document.getElementsByClassName('tel-nums')[2] as HTMLInputElement;
    let gender = document.getElementById('gender') as HTMLSelectElement;
    let birth = document.getElementById('birth') as HTMLInputElement;

    /* CapsLock검사 */
    document.addEventListener('keydown', function (event) {
        if (event.getModifierState('CapsLock')) {
            errMsg.innerHTML = errType.capsLock;
            errMsg.style.display = "block";
        } else {
            errMsg.innerHTML = "";
            errMsg.style.display = "none";
        }
    });

    /*유효성검사*/
    let idReg = /^[a-zA-Z]{1}[a-zA-Z0-9_]{6,12}$/;
    let idPassable = validationCheck(id, idReg, errMsg,"아이디"); /*아이디 유효성 검사*/

    /*비밀번호 강도 + 유효성 검사*/
    function pwStrengthCheck():boolean {
        let strength = 0;
        const pwReg:RegExp[] = [/* + 는 하나 이상 포함*/
            /[a-z]+/,
            /[A-Z]+/,
            /[0-9]+/,
            /[$@#&!]+/
        ];
        pwReg.forEach((value:RegExp, idx:number) => {
            // strength += value.test(pw.value) ? 1 : 0
            if(pw.value.length < 6){
                meter.style.setProperty("--progress", "red");
                strength = 1;
                // meter.style.backgroundColor = 'red';
            } else if(pw.value.length > 15) {
                meter.style.setProperty("--progress", "red");
                strength = 1;
                // meter.style.backgroundColor = 'red';
            } else {
                meter.style.backgroundColor = 'white';
                strength += value.test(pw.value) ? 1 : 0
            }
        })
        meter.value = strength;
        switch (strength) {
            case 1 :
                // meter.style.backgroundColor = 'red'
                meter.style.setProperty("--progress", "red");
                break
            case 2:
            case 3:
                // meter.style.backgroundColor = 'orange'
                meter.style.setProperty("--progress", "orange");
                break
            case 4:
                // meter.style.backgroundColor = 'green'
                meter.style.setProperty("--progress", "green");
                break
        }
        if(strength >= 2 ) { return true }
        else { return false }
    } /* 비밀번호 강도 검사 */
    function pwCheck(passable:boolean) {
        if(passable == undefined || !passable){
            errMsg.innerHTML = errType.pwStrength;
            errMsg.style.display = 'block';
        } else if(passable == undefined){
            pw.style.border = condition.focus;
        } else if(!passable){
            pw.style.border = condition.err;
        } else {
            errMsg.innerHTML = "";
            errMsg.style.display = 'none';
            pw.style.border = condition.focus;
        }
    }
    let passable : boolean;
    pw.addEventListener('focusin', function () {
        // errBuffer = errCnt;
        pw.addEventListener('keyup', function () {
            passable = pwStrengthCheck();
            console.log(passable);
            if(passable){
                pw.style.border = condition.focus;
            } else {
                pw.style.border = condition.err;
            }
        })
        pwCheck(passable)
    })
    pw.addEventListener('focusout', function () {
        pwCheck(passable);
        if(!passable){
            // ++errCnt;
            pw.style.border = condition.err;
        }
        else {
            pw.style.border = condition.default;
            // errCnt -= errBuffer;
            // errBuffer=0;
        }
    })

    let nameReg = /^[가-힣]{2,7}$/;
    let namePassable = validationCheck(name, nameReg, errMsg, "이름");/*이름 유효성 검사*/
    let emailReg = /^\w{4,14}[@][a-z]{3,10}[.][a-z]{2,3}([.][a-z]{2,3})?$/;
    let emailPassable = validationCheck(email, emailReg, errMsg, "이메일");/*이메일 유효성 검사*/

    /*전화 번호 입력 제한*/
    let telDiv = document.getElementById('tel-container') as HTMLDivElement;
    // telCheck(telNums1, telDiv);
    // telCheck(telNums2, telDiv);

    let isNum = /^\d+$/;
    telNums1.addEventListener('keydown', function (event) {
        console.log(telNums1.value.length)
        if((!isNum.test(event.key) && event.key !== 'Backspace') || (telNums1.value.length > 3 && event.key !== 'Backspace')){
            event.preventDefault();
        }
    })


    /* 사업자 */
    let business = document.getElementById('business') as HTMLInputElement;
    business.addEventListener('change', function () {
        let inputBox = document.getElementById('business-input');
        if(business.checked == true){
            document.getElementById('business-input').innerHTML = '비즈니스 사용자임';
        } else if(business.checked == false){
            inputBox.innerHTML = '';
        }
    })

    /* 서버접속전 점검 */
    let signIn = document.getElementById("signIn") as HTMLFormElement;
    signIn.addEventListener('submit', function (event) {
        /*ID*/
        if(!idPassable){
            id.style.border = condition.err;
            ++errCnt
        }

        /*PW*/
        if (!passable){
            pw.style.border = condition.err;
            errMsg.innerHTML = errType.pwStrength;
            ++errCnt
        } else if(pw.value !== pwRe.value){
            pw.value = "";
            pwRe.value = "";
            pwRe.style.border = condition.err;
            errMsg.innerHTML = errType.pwCheck;
            errMsg.style.display = "block";
            ++errCnt
        }

        /*Name*/
        if(!namePassable) {
            name.style.border = condition.err;
            ++errCnt;
        }

        /*Email*/
        if(!emailPassable){
            email.style.border = condition.err;
            ++errCnt;
        }

        /*Tel*/
        tel.value = `${telNums0.value}-${telNums1.value}-${telNums2.value}`;
        console.log(tel.value);
        if(telNums0.value === "" || telNums1.value === "" || telNums2.value === ""){
            document.getElementById('tel-container').style.border = condition.err;
            ++errCnt;
        }

        /*Personal*/
        if(birth.value == null || birth.value == ""){
            birth.style.border = condition.err;
            ++errCnt;
        }

        if(errCnt === 0){
            /* DB 조회 로직 추가 */

        } else {
            event.preventDefault();
        }
    });
})