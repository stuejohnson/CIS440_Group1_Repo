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
        
        sessionStorage.setItem('loggedInUser', JSON.stringify(response));
        if(status === 200){
            console.log(status);
            console.log(response);
            console.log("User's Name is: " + response.name);

            sessionStorage.setItem('loggedInUser', JSON.stringify(response));
            window.location.href = "index.html";
            console.log(sessionStorage.getItem(response.name));
            
        }else{
            console.log('invalid login');
            document.getElementById("loginStatus").innerHTML = "Incorrect Credientials, Please try again."
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

function deletePost(e) {

    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
    // e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);

    // var postfeed = document.getElementsByClassName("userPost");
    // for (var i = 0; i < postfeed.length; i++) {
    //     postfeed[i].addEventListener('click', function () {
    //         this.parentNode.remove();
    //     });
    // }
}

