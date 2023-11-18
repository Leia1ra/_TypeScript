document.addEventListener('DOMContentLoaded', function () {
    let login = document.getElementById("login") as HTMLFormElement;
    login.addEventListener('submit',function (event){
        const color:string = 'red';

        let id= document.getElementById("id") as HTMLInputElement;
        let pw = document.getElementById("pw") as HTMLInputElement;
        let errCnt = 0;
        if(id.value == null || id.value == ""){
            let style = id.style;
            style.border = `2px solid ${color}`;
            ++errCnt;
        }
        if(pw.value == null || pw.value == ""){
            let style = pw.style;
            style.border = `2px solid ${color}`;
            ++errCnt;
        }

        if(errCnt === 0){
            // 추후 검증 절차 추가
            alert("로그인 성공");
        } else {
            event.preventDefault();
        }
    });
})