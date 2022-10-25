checkUserSession();

const login_btn = document.querySelector(".login_btn");
const alert_wrong_aut = document.querySelector(".alert-danger");

const data = [{u: "Z2VwcmFu", p: "Njc3NzY2"}, {u: "Y2lwYQ==", p: "NjY3Nzc2Ng=="}]

//btoa();

function loginToSystem() {
    let inputname  = document.querySelector(".username").value;
    let inputpassword = document.querySelector(".password").value;
    let userInSeesion = data.find(e => e.u === btoa(inputname) && e.p === btoa(inputpassword));
    
    if (userInSeesion && btoa(inputname) == userInSeesion.u & btoa(inputpassword) == userInSeesion.p){
        sessionStorage.setItem("AuthenticationState", "Authenticated");
        sessionStorage.setItem("AuthenticationExpires", addHours(24));
        window.open('index.html','_self');
    } else {
        alert_wrong_aut.classList.remove("d-none");
    }
}

function addHours(h, date = new Date()) {
    date.setTime(date.getTime() + h * 60 * 60 * 1000);
    return date;
}

function checkUserSession(){
    if (sessionStorage.getItem('AuthenticationState') === null) {
        //window.open("login.html", "_self");
    }
    //Is their authentication token still valid?
    else if (new Date() > new Date(sessionStorage.getItem('AuthenticationExpires'))) {
        //window.open("login.html", "_self");
    }
    else {
        window.open("index.html", "_self");
    }
}