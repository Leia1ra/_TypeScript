enum errType {
    unfilled = '미입력된 양식이 존재합니다.',
    existID = '존재하는 아이디 입니다.',
    pwCheck = '입력된 비밀번호와 확인번호가 일치하지 않습니다.',
    capsLock = 'CapsLock이 켜져있습니다.'
}
enum condition {
    default='1px solid black',
    err = '2px solid red',
    focus = '2px solid #1ebee6'
}
function validationCheck(element:HTMLInputElement, reg:RegExp, errMsg?:HTMLDivElement ) {
    element.addEventListener("focusout", function () {
        if(!reg.test(this.value)){
            this.style.border = condition.err;
            errMsg.innerHTML = '올바른 이름 양식이 아닙니다.';
            errMsg.style.display = 'block';
        } else {
            this.style.border = condition.default;
            errMsg.innerHTML = '';
            errMsg.style.display = 'none';
        }
    })
    element.addEventListener("focusin", function () {
        this.style.border = condition.focus;
    })
}

document.addEventListener('DOMContentLoaded', function () {
    let errCnt = 0;
    let errMsg = document.getElementById('err') as HTMLDivElement;
    /*inputs*/
    let id = document.getElementById('id') as HTMLInputElement;
    let pw = document.getElementById('pw') as HTMLInputElement;
    let pwRe = document.getElementById('pwRe') as HTMLInputElement;
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

    /* 유효성검사 */
    let idReg = /^[a-zA-Z]{1}[a-zA-Z0-9_]{6,12}$/;
    validationCheck(id, idReg, errMsg); /*아이디 유효성 검사*/
    /*비밀번호 */

    let nameReg = /^[가-힣]{2,7}$/;
    validationCheck(name, nameReg, errMsg);/*이름 유효성 검사*/
    let emailReg = /^\w{4,14}[@][a-z]{3,10}[.][a-z]{2,3}([.][a-z]{2,3})?$/;
    validationCheck(email, emailReg, errMsg);/*이메일 유효성 검사*/


    /* 사업자 */
    let business = document.getElementById('business') as HTMLInputElement;
    business.addEventListener('change', function (event) {
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
        if(id.value === ""){
            id.style.border = condition.err;
            ++errCnt
        }

        /*PW*/
        if(pw.value === ""){
            pw.style.border = condition.err;
            ++errCnt
        }
        if(pwRe.value === ""){
            pwRe.style.border = condition.err;
            ++errCnt
        }
        if(pw.value !== pwRe.value){
            pw.value = "";
            pwRe.value = "";
            errMsg.innerHTML = errType.pwCheck;
            errMsg.style.display = "block";
            ++errCnt
        }

        /*Name*/
        if(name.value == ""){
            name.style.border = condition.err;
            ++errCnt;
        }

        /*Email*/
        if(email.value == ""){
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

        } else {
            event.preventDefault();
        }
    });
})