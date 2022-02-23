<<<<<<< HEAD
function loadAccountPage(){
    console.log("loading Account Page");
    window.location.href = "index.html";
}

function logOut(){
    console.log("logged out account");
    window.location.href = "login.html";
}

function login(){
    sendHttpRequest('POST', '/api/login', {username: 'test', password: 'test12'}, function (status, response) {
        if(status === 200){
            console.log(status);
            console.log(response);
            console.log("User's Name is: " + response.name);
            sessionStorage.setItem('loggedInUser', JSON.stringify(response));
            window.location.href = "index.html";
        }else{
            console.log('invalid login');
        }
    })
}

function createPostPage(){
    console.log("loading create Post Page");
    window.location.href = "createPost.html";
}

function submitPost(){
    // TODO
}

function loadLandingPage(){
    window.location.href = "landingPage.html"
}

function loadLoginPage() {
    window.location.href = "login.html"
}


function upvote() {
    console.log("Upvote recognized")
}

function downvote() {
    console.log("downvote recognized")
}

function deletepost() {
    var postfeed = document.getElementsByClassName("postfeed");
    for (var i = 0; i < postfeed.length; i++) {
        postfeed[i].addEventListener('click', function () {
            this.parentNode.remove();
        });
    }
}

=======
function loadAccountPage(){
    console.log("loading Account Page");
    window.location.href = "index.html";
}

function logOut(){
    console.log("logged out account");
    window.location.href = "login.html";
}

function login(){
    sendHttpRequest('POST', '/api/login', {username: 'test', password: 'test12'}, function (status, response) {
        if(status === 200){
            console.log(status);
            console.log(response);
            console.log("User's Name is: " + response.name);
            sessionStorage.setItem('loggedInUser', JSON.stringify(response));
            window.location.href = "index.html";
        }else{
            console.log('invalid login');
        }
    })
}

function createPostPage(){
    console.log("loading create Post Page");
    window.location.href = "createPost.html";
}

function submitPost(){
    // TODO
}

function loadLandingPage(){
    window.location.href = "landingPage.html"
}

function loadLoginPage() {
    window.location.href = "login.html"
}


function upvote() {
    console.log("Upvote recognized")
}

function downvote() {
    console.log("downvote recognized")
}

function deletepost() {
    var postfeed = document.getElementsByClassName("postfeed");
    for (var i = 0; i < postfeed.length; i++) {
        postfeed[i].addEventListener('click', function () {
            this.parentNode.remove();
        });
    }
}

>>>>>>> josh-01
