const renderList =(tweets) => {
    let output = ''
    tweets.forEach(tweet => {
        output += `
                <ul>
                    <li id=${tweet.id}>
                         <p>username: ${tweet.user}</p>
                        <p> tweet: ${tweet.tweet}</p>
                    </li>

                </ul>

                <form class="update" id=${tweet.id} >
                    <input type="text" name="user" placeholder="Username" id='user'>
                    <input type="text" name="tweet" placeholder="Tweet" id='tweet'>
                    <input type="button" value="Update" class="updates">
                </form>
                <form id=${tweet.id}>
                    <input type="submit" value="Delete" class='del'>
                </form>
            `;
    })
    return output
};
const GetTweets = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://local.tweeter.com:8888/api/tweets' , true);
    xhr.onload = function(){
        if(this.status == 200) {
            let tweets = JSON.parse(this.responseText);
            let userList = document.getElementById("container");
            let output = renderList(tweets);
            userList.innerHTML = output;

            let update = document.getElementsByClassName("updates");
            let del = document.getElementsByClassName("del");
            for (let i = 0; i < update.length; i++) {
                update[i].addEventListener('click', UpdateTweets);
                del[i].addEventListener('click', DelTweet);
            }

            let create = document.getElementById("create");
            create.addEventListener('click', Create);

        }
    };
    xhr.send()
};
GetTweets();

const Create = (e) => {
    e.preventDefault();
    let data = {};
    let user = document.getElementById('user').value;
    let tweet = document.getElementById('tweet').value;
    data.user = user;
    data.tweet = tweet;
    console.log(data);
    const xhr = new XMLHttpRequest();
    xhr.open('POST','http://local.tweeter.com:8888/api/tweets' , true);
    xhr.onload = function () {
        document.getElementById('user').value = '';
        document.getElementById('tweet').value = '';
        console.log(this.responseText);
        GetTweets();

    };
    xhr.send(JSON.stringify(data))

};

const UpdateTweets = (e) => {
    e.preventDefault();
    let data = {};
    let id = e.target.parentElement.id;
    let user = e.target.parentElement.querySelector('input[id="user"]').value;
    let tweet = e.target.parentElement.querySelector('input[id="tweet"]').value;
    data.user = user;
    data.tweet = tweet;
    console.log(data);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT',`http://local.tweeter.com:8888/api/tweets/${id}` , true);
    xhr.onload = function() {
        console.log(this.responseText);
        GetTweets()
    };
    xhr.send(JSON.stringify(data));
}
const DelTweet = (e) => {
    e.preventDefault();
    let id = e.target.parentElement.id;
    console.log(id);
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE',`http://local.tweeter.com:8888/api/tweets/${id}`, true);
    xhr.onload = function() {
        console.log(this.responseText);
        GetTweets()
    };
    xhr.send()
}