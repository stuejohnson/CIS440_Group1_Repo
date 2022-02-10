function loadAccountPage(){
    console.log("loading Account Page");
    window.location.href = "index.html";
}

function logOut(){
    console.log("logged out account");
    //TODO
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
    for (var i=0; i <postfeed.length; i++) {
        postfeed[i].addEventListener('click', function() {
            this.parentNode.remove();
        });
    }