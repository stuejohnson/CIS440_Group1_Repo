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



function printPost (response){

    sessionStorage.getItem("loggedInUser");


    let response1 = [   
        {
        author: "Test",
        subject: "I don't like this aspect of working", 
        description: "This is what I think we could do to improve the situation. First Off, I think things should start changing around here.",
        department: "IT",
        date: "16 Feb 2022",
        rating: 42},

        {
        author: "Test2",
        subject: "This is another Subject of complaint", 
        description: "This is what I think we could do to improve the situation. I think that this or that, or even this would improve the situation at hand.",
        department: "Marketing",
        date: "04 Jan 2022",
        rating: 29},
    ];

    for (let i=0; response1.length; i++ ){
        var div = document.createElement("div");
        div.setAttribute('class', 'usersposts');
        
        div.innerHTML = `
            <h3>${response1[i].subject}</h3>
            <p>${response1[i].description}</p><br>
            <p>
                ${response1[i].date}&emsp;&emsp;
                <i>Dept: </i>${response1[i].department}&emsp;&emsp;
                <input type="button" id=${i} onclick="likePost(this.id)" value="&#128077;">&emsp;
                <i>Likes: </i>${response1[i].rating}&emsp;&emsp;

                <button type="text" id="${i}" onclick="deletePost(this.id)"> Delete</button>   
            </p>`;

        
        
        document.body.appendChild(div);
}
}



function deletePost(clickedButton){
    let number = clickedButton;
    let post = document.getElementsByClassName("usersposts");
    let deletedDiv;
    
    deletedDiv = post[number];
    deletedDiv.innerHTML= `<p> This post has been Deleted </p>`;
}

function likePost(buttonPressed){

    let response1 = [   
        {
        author: "Test",
        subject: "I don't like this aspect of working", 
        description: "This is what I think we could do to improve the situation. First Off, I think things should start changing around here.",
        department: "IT",
        date: "16 Feb 2022",
        rating: 42},

        {
        author: "Test2",
        subject: "This is another Subject of complaint", 
        description: "This is what I think we could do to improve the situation. I think that this or that, or even this would improve the situation at hand.",
        department: "Marketing",
        date: "04 Jan 2022",
        rating: 29},
    ];


    let number = buttonPressed;
    let post = document.getElementsByClassName("usersposts");
    let likedPost;
 
    
    likedPost = post[number];
    likedPost.innerHTML= `
        <h3>${response1[number].subject}</h3>
        <p>${response1[number].description}</p><br>
        <p>
            ${response1[number].date}&emsp;&emsp;
            <i>Dept: </i>${response1[number].department}&emsp;&emsp;
            <input style="background-color: green;" type="button" id=${number} onclick="unlikePost(this.id)" value="&#128077;">&emsp;
            <i>Likes: </i>${response1[number].rating + 1}&emsp;&emsp;

            <button type="text" id="${number}" onclick="deletePost(this.id)"> Delete</button>
        
    </p>`;

    console.log(`${likedPost}`);
    
    // likedPost.getElementsByTagName('input').style.backgroundColor = "green";
    
}

function unlikePost(buttonPressed){

    let response1 = [   
        {
        author: "Test",
        subject: "I don't like this aspect of working", 
        description: "This is what I think we could do to improve the situation. First Off, I think things should start changing around here.",
        department: "IT",
        date: "16 Feb 2022",
        rating: 42},

        {
        author: "Test2",
        subject: "This is another Subject of complaint", 
        description: "This is what I think we could do to improve the situation. I think that this or that, or even this would improve the situation at hand.",
        department: "Marketing",
        date: "04 Jan 2022",
        rating: 29},
    ];


    let number = buttonPressed;
    let post = document.getElementsByClassName("usersposts");
    let likedPost;
 
    
    likedPost = post[number];
    likedPost.innerHTML= `
        <h3>${response1[number].subject}</h3>
        <p>${response1[number].description}</p><br>
        <p>
            ${response1[number].date}&emsp;&emsp;
            <i>Dept: </i>${response1[number].department}&emsp;&emsp;
            <input style="background-color: default;" type="button" id=${number} onclick="likePost(this.id)" value="&#128077;">&emsp;
            <i>Likes: </i>${response1[number].rating}&emsp;&emsp;

            <button type="text" id="${number}" onclick="deletePost(this.id)"> Delete</button>
        
    </p>`;

    console.log(`${likedPost}`);
}