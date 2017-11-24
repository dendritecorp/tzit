const loadTweets = (tweets) => {
  let output = ''
  tweets.forEach(tweet => {
    output += `
    <div class="col-sm-4">
      <div class="card">
        <div class="card-block">
          <h4 class="card-title">${tweet.user}</h4>
          <a id="tweetArea" href="view/${tweet.id}"><p class="card-text">${tweet.tweet}</p></a>
          <p class="card-text"><small class="text-muted">Posted on ${tweet.created_at}</small></p>
          <form>
            <input onclick="deleteTweet(${tweet.id})" type="button" class="btn btn-danger btn-sm" value="Delete tweet">
          </form>
          <form>
            <input type="text"  name="text" id="tweet-${tweet.id}" placeholder="New text">
            <input onclick="updateTweet(${tweet.id})" type="button" class="btn btn-info btn-sm" value="Update tweet">
          </form>
        </div>
      </div>
    </div>`;
  })
  return output
}

const renderPage = () => {
  console.log('XMLHttpRequest renderPage')
  const randomNumber = Math.round(Math.random()*100000) + 1
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `/api/tweets`)
  xhr.send()
  xhr.onload = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
      const container = document.getElementById("cards-container")
      container.innerHTML = loadTweets(JSON.parse(this.responseText))
    }
  }
}

renderPage()

const createTweet = () => {
  const xhr = new XMLHttpRequest()
  const newUser = document.getElementById('ajax-user').value
  const newText = document.getElementById('ajax-textarea').value
  xhr.open('POST', '/api/tweets')
  xhr.send(JSON.stringify([{user: newUser, tweet: newText}]))
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      renderPage()
      document.getElementById('ajax-user').value = ''
      document.getElementById('ajax-textarea').value = ''
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert('User or tweet fields are empty')
    }
  }
}

const deleteTweet = (tweetID) => {
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/tweets/${tweetID}`)
  xhr.send()
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      renderPage()
    }
  }
}

const updateTweet = (tweetID) => {
  const xhr = new XMLHttpRequest();
  const newText = document.getElementById(`tweet-${tweetID}`).value
  xhr.open('PUT', `/api/tweets/${tweetID}`)
  xhr.send(JSON.stringify({tweet: newText}))
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      renderPage()
    } else if (xhr.readyState == 4 && xhr.status == 400) {
      alert('New text missing')
    }
  }
}
