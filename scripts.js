// let activeUser;

function loadAccountPage(){
    console.log("loading Account Page");
    window.location.href = "index.html";
}

function logOut(){
    console.log("logged out account");
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

function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    sendHttpRequest('POST', '/api/login', {username, password}, function (status, response) {
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

// On Landing page to show all posts
function printAllPosts(){
    let owner = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log('owner:' + owner);
    sendHttpRequest('GET', '/api/getPosts', null, function (status, response) {
        console.log(status);

        if(status === 200 && owner != null){
            console.log(status);
            console.log(response.author);
            // TODO: filters, all departments is default and by date is default

            // for loop nested inside filters once filter is applied
            for (let i=0; response.length; i++ ){
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
        // 
        // 
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