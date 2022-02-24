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