function loadAccountPage(){
    console.log("loading Account Page");
    window.location.href = "index.html"
}

function loadLandingPage(){
    window.location.href = "landingPage.html"
}

function loadLoginPage() {
    window.location.href = "login.html"
}

function openCreateAccount(){
    var node = document.getElementById('createaccountborder')
    node.style.visibility = 'visible';
}

function closeCreateAccount(){
    var node = document.getElementById('createaccountborder')
    node.style.visibility = 'hidden';
}