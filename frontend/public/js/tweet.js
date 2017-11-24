const loadTweets = (tweets) => {
  let output = ''
  output += `
  <div class="col-sm-4">
    <div class="card">
      <div class="card-block">
        <h4 class="card-title">${tweets.user}</h4>
        <p class="card-text">${tweets.tweet}</p>
        <p class="card-text"><small class="text-muted">Posted on ${tweets.created_at}</small></p>
        <form onclick="deleteTweet(${tweets.id})">
          <input type="button" class="btn btn-danger btn-sm" value="Delete tweets">
        </form>
        <form>
          <input type="text"  name="text" id="tweet-${tweets.id}" placeholder="New text">
          <input onclick="updateTweet(${tweets.id})" type="button" class="btn btn-info btn-sm" value="Update tweet">
        </form>
      </div>
    </div>
  </div>`;
  return output
}

const renderPage = () => {
  const tweetID = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/tweets/${tweetID}`)
  xhr.send()
  xhr.onload = function(){
    if(this.status == 200){
      const container = document.getElementById("cards-container")
      container.innerHTML = loadTweets(JSON.parse(this.responseText))
    }
  }
}

renderPage()

const deleteTweet = (tweetID) => {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/tweets/${tweetID}`)
  xhr.send()
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.location = "/";
    }
  }
}

const updateTweet = (tweetID) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/tweets/${tweetID}`)
  const newText = document.getElementById(`tweet-${tweetID}`).value
  xhr.send(JSON.stringify({tweet: newText}))
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      renderPage()
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert('New text missing')
    }
  }
}
