// let activeUser;

function loadAccountPage(){
    console.log("loading Account Page");
    window.location.href = "index.html";
}

function logOut(){
    console.log("logged out account");
    window.location.href = "login.html";
}

function login(){
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    sendHttpRequest('POST', '/api/login', {username, password}, function (status, response) {
        
        if(status === 200){
            
            console.log(status);
            console.log(response);
            console.log(JSON.stringify(response));
            console.log("User's Name is: " + response.name);
        
            let userAttempt = {username: username, password: password};
            JSON.stringify(userAttempt);

            sessionStorage.setItem('loggedInUser', JSON.stringify(response));
            window.location.href = "index.html";
          
        }else{
            console.log('invalid login');document.getElementById("message").innerHTML = "Incorrect Username/Password,<br> Please Try again.";
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


function welcome() {
    
    let activeUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    document.getElementById('uName').innerHTML = " " + activeUser.username;
    console.log("Hello, " + activeUser.username);
}


function printUsersPosts (){

    welcome(); //Displays Username in header
    let owner = JSON.parse(sessionStorage.getItem('loggedInUser'));
    sendHttpRequest('GET', `/api/getPosts/ownerId/${owner.id}`, null, function (status, response) {
        
        if(status === 200 ){
            console.log(status);
            console.log(response);

            for (let i=0; response.length; i++ ){
                let div = document.createElement("div");
                div.setAttribute('class', 'usersposts');
                div.id = `${response[i].id}`;
               

                div.innerHTML = `
                <h3 class="title">${response[i].title}</h3>
                <p class="description">${response[i].content}</p>
                <p class="infoBar">
                <i>Date: </i>${response[i].date}&emsp;&emsp;
                <i>Dept: </i>${response[i].department}&emsp;&emsp;
                <input type="button" class="${response[i].id}" onclick="likePost(this.className)" value="&#128077;"> 
                <i>Likes: </i>${response[i].rating}&emsp;&emsp;
                <button type="text" class="${response[i].id}" onclick="deletePost(this.className)"> Delete post</button>   
                </p>`; 

                document.body.appendChild(div);
            }

        }else{
            console.log(status);
        }
    })   
}



// On Landing page to show all posts
function printAllPosts (){
    let author = JSON.parse(sessionStorage.getItem('loggedInUser'));
    sendHttpRequest('GET', '/api/getPosts', null, function (status, response) {
        // sessionStorage.setItem('activeUsersPosts', JSON.stringify(response));
        
        console.log(status);
        // 
        // && loggedInUser.username == response.author
        if(status === 200 ){
            console.log(status);
            console.log(response);

            for (let i=0; response.length; i++ ){
                let div = document.createElement("div");
                div.setAttribute('class', 'usersposts');
                div.id = `${response[i].id}`;
               

                div.innerHTML = `
                <h3 class="title">${response[i].title}</h3>
                <p class="description">${response[i].content}</p>
                <p class="infoBar">
                <i>Date: </i>${response[i].date}&emsp;&emsp;
                <i>Dept: </i>${response[i].department}&emsp;&emsp;
                <input type="button" class="${response[i].id}" onclick="likePost(this.className)" value="&#128077;"> 
                <i>Likes: </i>${response[i].rating}&emsp;&emsp;
                <button type="text" class="${response[i].id}" onclick="deletePost(this.className)"> Delete post</button>   
                </p>`; 

                document.body.appendChild(div);
            }

        }else{
            console.log(status);
        }
    })   
}


function deletePost(postId){
    console.log(postId[0]) // Logs postId to console

    document.getElementById(postId).innerHTML = "<p class='deletedPost'>This post has been Deleted.</p>";

    // TODO: Failed to construct URL, Invalid URL at sendHttpRequest (http.js:86)
    sendHttpRequest('DELETE', postId[0], function (status, response) {
        if(status === 200 ){    
            console.log(status);
            console.log(response);
            console.log("Post Deleted.");

            document.getElementById(postId).innerHTML = "<p class='deletedPost'>This post has been Deleted.</p>";
        }else {
            console.log("Post unable to be deleted.")
        }
    })
}

function likePost(postId){

    console.log(postId[0])
    sendHttpRequest('GET', `/api/getPost/${postId[0]}`, null , function (status, response) {
        if (status === 200){
            console.log(status);
            console.log(response);

            rating = response.rating;
            rating += 1;

            // So Far only receiving rating from Get request above, but unable to PUT below.
            ////////////////////////////////////////////////////// Reprints Usersposts div with green like button
            let likedPost = document.getElementById(postId);
            var newPost = document.createElement("div");
            newPost.setAttribute('class', 'usersposts');
            newPost.setAttribute('id', `${response.id}`);

            newPost = `
            <h3 class="title">${response.title}</h3>
            <p class="description">${response.content}</p>
            <p class="infoBar">
            <i>Date: </i>${response.date}&emsp;&emsp;
            <i>Dept: </i>${response.department}&emsp;&emsp;
            <input style="background-color: green;" type="button" class="${response.id}" onclick="unlikePost(this.className)" value="&#128077;"> 
            <i>Likes: </i>${response.rating}&emsp;&emsp;
            <button type="text" class="${response.id}" onclick="deletePost(this.className)"> Delete post</button>   
            </p>`; 

            likedPost.innerHTML = newPost;
            
            ////////////////////////////////////////////////////////////
            // receives postId from Get response above.
            console.log(response.id)
            pId = response.id
            // TODO Error 400 
            sendHttpRequest('PUT', `/api/updateRating/${pId}`, {rating: rating} , function (status, response) {
                if (status === 200){
                    console.log(status);
                    console.log(response);

                    let likedPost = document.getElementById(postId);
                    var newPost = document.createElement("div");
                    newPost.setAttribute('class', 'usersposts');
                    newPost.setAttribute('id', `${response[i].id}`);

                    newPost.innerHTML = `
                    <h3 class="title">${response[i].title}</h3>
                    <p class="description">${response[i].content}</p>
                    <p class="infoBar">
                    <i>Date: </i>${response[i].date}&emsp;&emsp;
                    <i>Dept: </i>${response[i].department}&emsp;&emsp;
                    <input style="backgroundColor:green;" type="button" class="${response[i].id}" onclick="unlikePost(this.className)" value="&#128077;"> 
                    <i>Likes: </i>${response[i].rating}&emsp;&emsp;
                    <button type="text" class="${response[i].id}" onclick="deletePost(this.className)"> Delete post</button>   
                    </p>`; 
                    
                    likedPost.innerHTML = newPost;
                } else {
                    console.log('vote not recognized');
                }
            })
        } else{
            console.log(status);
        }
    })
    
}

function unlikePost(postId){

    sendHttpRequest('GET', `/api/getPost/${postId[0]}`, null , function (status, response) {
        if (status === 200){
            console.log(status);
            console.log(response);

            rating = response.rating;
            rating += 1;


            let likedPost = document.getElementById(postId);
            var newPost = document.createElement("div");
            newPost.setAttribute('class', 'usersposts');
            newPost.setAttribute('id', `${response.id}`);

            newPost = `
            <h3 class="title">${response.title}</h3>
            <p class="description">${response.content}</p>
            <p class="infoBar">
            <i>Date: </i>${response.date}&emsp;&emsp;
            <i>Dept: </i>${response.department}&emsp;&emsp;
            <input style="background-color: (rgb(239, 239, 239);" type="button" class="${response.id}" onclick="likePost(this.className)" value="&#128077;"> 
            <i>Likes: </i>${response.rating}&emsp;&emsp;
            <button type="text" class="${response.id}" onclick="deletePost(this.className)"> Delete post</button>   
            </p>`; 
            
            likedPost.innerHTML = newPost;
            postId = response.id

            sendHttpRequest('PUT', `/api/updateRating/${postId[0]}`, {rating: rating} , function (status, response) {
                if (status === 200){
                    console.log(status);
                    console.log(response);

                    let likedPost = document.getElementById(`${response.id}`);
                    let newPost = document.createElement("div");
                    newPost.setAttribute('class', 'usersposts');
                    newPost.setAttribute('id', `${response[i].id}`);

                    newPost.innerHTML = `
                    <h3 class="title">${response[i].title}</h3>
                    <p class="description">${response[i].content}</p>
                    <p class="infoBar">
                    <i>Date: </i>${response[i].date}&emsp;&emsp;
                    <i>Dept: </i>${response[i].department}&emsp;&emsp;
                    <input style="backgroundColor: default;" type="button" class="${response[i].id}" onclick="unlikePost(this.className)" value="&#128077;"> 
                    <i>Likes: </i>${response[i].rating}&emsp;&emsp;
                    <button type="text" class="${response[i].id}" onclick="deletePost(this.className})"> Delete post</button>   
                    </p>`; 
                        
                    likedPost.innerHTML = newPost;
                        
                } else {
                    console.log('vote not recognized'); 
                }
            })
        } else{
            console.log(status);
        }
    })
}

function submitPost(){
    let username, password;
    let owner = JSON.parse(sessionStorage.getItem('loggedInUser'));
    var postInfo = {ownerId: 100, title: document.getElementById('title').value, content: document.getElementById('feedback').value, rating: 0,  department: document.getElementById('departmentDropdown').value, date: new Date()};
    sendHttpRequest('POST', '/api/addPost', postInfo, function (status, response) {
        if(status === 200 && owner != null){
            console.log(status);
            console.log(response);
            console.log("User's Name is: " + response.name);
        
            let userAttempt = {username: username, password: password};
            JSON.stringify(userAttempt);

            // if(userAttempt === response.)
            sessionStorage.setItem('loggedInUser', JSON.stringify(response));
            window.location.href = "landingPage.html";
            // activeUser = sessionStorage.getItem('loggedInUser');
        }else{
            console.log('bad response or not logged in');
            loadLoginPage(); 
        }
    })
    console.log("postInfo" + JSON.stringify(postInfo));
}

function filterPosts(){
    var feed = document.getElementById('feed');
    while(feed.firstChild){
        feed.removeChild(feed.firstChild);
    }
    printAllPosts();
}

// let activeUser;


function loadAccountPage(){
    console.log("loading Account Page");
    window.location.href = "index.html";
}

function logOut(){
    console.log("logged out account");
    alert('You have successfully logged out');
    window.location.href = "login.html";
}

function createPostPage(){
    console.log("loading create Post Page");
    window.location.href = "createPost.html";
}

function loadLandingPage(){
    window.location.href = "landingPage.html"
}

function loadLoginPage() {
    window.location.href = "login.html"
}


function welcome() {
    let activeUser = sessionStorage.getItem('loggedInUser');
    document.getElementById('name').innerHTML() = activeUser.username;
}

function checkLoginStatus() {
    let owner = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (owner == null){
        console.log("not logged in");
        window.location.href = "login.html";
    }
}

function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    console.log(username + "," + password);

    if (username == '' || password == ''){
        alert("Incorrect Username/Password, Please Try again.");
    } else{
        sendHttpRequest('POST', '/api/login', {username, password}, function (status, r) {
            let response = JSON.parse(r);
        if(status === 200){
            console.log(status);
            console.log(response);
            console.log("User's Name is: " + response.name);
        
            let userAttempt = {username: username, password: password};
            JSON.stringify(userAttempt);

            // if(userAttempt === response.)
            sessionStorage.setItem('loggedInUser', JSON.stringify(response));
            window.location.href = "index.html";
            // activeUser = sessionStorage.getItem('loggedInUser');
        }else{
            console.log('invalid login');
            document.getElementsByTagName("span").value = "Incorrect Username/Password,<br> Please Try again.";
        }
    })
    document.getElementsByTagName("span").value = "Incorrect Username/Password,<br> Please Try again.";
    }
}

// On Landing page to show all posts
function printAllPosts(){
    let owner = JSON.parse(sessionStorage.getItem('loggedInUser'));
    let args = new Object;
    let user = {};
    if (document.getElementById('filter').value == "Vote"){
        args.sortBy = "rating";
        args.sortOrder = "descending";
    } else {
        args.sortBy = "date";
        args.sortOrder = "descending";
    }
    
    sendHttpRequest('GET', '/api/getPosts', args, function (status, response) {
        console.log(status);

        if(status === 200 && owner != null){
            console.log(status);
            console.log(response.author);
            
            var departmentFilter = document.getElementById('departmentDropdown').value;

            if (departmentFilter == 'all'){
                console.log('all posts printed');
                for (let i=0; response.length; i++ ){
                var div = document.createElement("div");
                div.setAttribute('class', 'usersposts');
                
                div.innerHTML = `
                    <h3>${response[i].title}</h3>
                    <p>${response[i].content}</p><br>
                    <p>
                        ${response[i].date.slice(0,10)}&emsp;&emsp;
                        // <i>Dept: </i>${response[i].department}&emsp;&emsp;
                        <input type="button" id=${i} onclick="likePost(this.id)" value="&#128077;">&emsp;
                        <i>Likes: </i>${response[i].rating}&emsp;&emsp;  
                    </p>`; 
                document.getElementById('feed').appendChild(div);
                }
            } else {
                for (let i=0;response.length;i++){
                    var div = document.createElement("div");
                    div.setAttribute('class', 'usersposts');
                    console.log(response);

                    if (response[i].department === departmentFilter){
                        div.innerHTML = `
                            <h3>${response[i].title}</h3>
                            <p>${response[i].content}</p><br>
                            <p>
                                ${response[i].date}&emsp;&emsp;
                                // <i>Dept: </i>${response[i].department}&emsp;&emsp;
                                <input type="button" id=${i} onclick="likePost(this.id)" value="&#128077;">&emsp;
                                <i>Likes: </i>${response[i].rating}&emsp;&emsp;  
                            </p>`; 
                        document.getElementById('feed').appendChild(div);
                    }
                }
            }
        }else{
            console.log('bad response or not logged in');
            loadLoginPage();    
        }
    })   
}


function printUsersPosts (){
    let owner = JSON.parse(sessionStorage.getItem('loggedInUser'));
    sendHttpRequest('GET', `/api/getPosts/ownerId/${owner.id}`, null, function (status, response) {
        // sessionStorage.setItem('activeUsersPosts', JSON.stringify(response));
        
        console.log(status);
        // 
        // && loggedInUser.username == response.author
        if(status === 200 ){
            
            console.log(status);
            console.log(response.author);

            for (let i=0; response.length; i++){
                var div = document.createElement("div");
                div.setAttribute('class', 'usersposts');
                
                div.innerHTML = `
                    <h3>${response[i].title}</h3>
                    <p>${response[i].content}</p><br>
                    <p>
                        ${response[i].date}&emsp;&emsp;
                        // <i>Dept: </i>${response[i].null}&emsp;&emsp;
                        <input type="button" id=${i} onclick="likePost(this.id)" value="&#128077;">&emsp;
                        <i>Likes: </i>${response[i].rating}&emsp;&emsp;

                        <button type="text" id="${i}" onclick="deletePost(this.id)"> Delete</button>   
                    </p>`; 
                document.body.appendChild(div);
            }
        }else{
            console.log('oops');
        }
    })   
}

// delete post= param id
function deletePost(clickedButton){
    let number = clickedButton;
    let post = document.getElementsByClassName("usersposts");
    let deletedDiv;
    
    deletedDiv = post[number];

    deletedDiv.innerHTML= `<p> This post has been Deleted </p>`;
}

// .updateRating/{id}
function likePost(buttonPressed){
    let owner = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(owner);
    sendHttpRequest('GET', `/api/getPosts/ownerId/${owner.id}`, null, function (status, response) {
        // sessionStorage.setItem('activeUsersPosts', JSON.stringify(response));
        
        loggedInUser = sessionStorage.getItem('loggedInUser');
        console.log(status);
        console.log(loggedInUser);

        if(status === 200 && loggedInUser.username == response.author){
            
        console.log(status);
        console.log(response);

        let number = buttonPressed;
        let post = document.getElementsByClassName("usersposts");
        let likedPost;
        
        likedPost = post[number];
        likedPost.innerHTML= `
        <h3>${response[number].title}</h3>
        <p>${response[number].content}</p><br>
        <p>
        ${response[number].date}&emsp;&emsp;
        // <i>Dept: </i>${response[number].department}&emsp;&emsp;
        <input style="background-color: green;" type="button" id=${number} onclick="unlikePost(this.id)" value="&#128077;">&emsp;
        <i>Likes: </i>${response[number].rating + 1}&emsp;&emsp;
        <button type="text" id="${number}" onclick="deletePost(this.id)"> Delete</button> 
        </p>`;

        console.log(`${likedPost}`);
        }else {
            console.log('Not Logged');
        }
    })
    // likedPost.getElementsByTagName('input').style.backgroundColor = "green"; 
}

function unlikePost(buttonPressed){

    sendHttpRequest('GET', '/api/getPosts', {author: "test"}, function (status, response) {
        // sessionStorage.setItem('activeUsersPosts', JSON.stringify(response));
        
        loggedInUser = sessionStorage.getItem('loggedInUser');
        console.log(status);
        console.log(loggedInUser);

        if(status === 200 && loggedInUser.username == response.author){
            console.log(status);
            console.log(response);

        let number = buttonPressed;
        let post = document.getElementsByClassName("usersposts");
        let likedPost;
    
        
        likedPost = post[number];
        likedPost.innerHTML= `
        <h3>${response[number].title}</h3>
        <p>${response[number].content}</p><br>
        <p>
        ${response[number].date}&emsp;&emsp;
        // <i>Dept: </i>${response[number].department}&emsp;&emsp;
        <input style="background-color: default;" type="button" id=${number} onclick="likePost(this.id)" value="&#128077;">&emsp;
        <i>Likes: </i>${response[number].rating}&emsp;&emsp;

        <button type="text" id="${number}" onclick="deletePost(this.id)"> Delete</button>
            
        </p>`;
        console.log(`${likedPost}`);
        } else {
            console.log("unable");
        }
    })
}


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
