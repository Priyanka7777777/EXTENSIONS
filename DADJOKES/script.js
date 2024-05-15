document.getElementById("getJokeButton").addEventListener("click", function() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(jokeData => {
        const jokeText = jokeData.joke;
        const jokeElement = document.getElementById('jokeElement');
        jokeElement.innerHTML = jokeText;
    })
    .catch(error => {
        console.error('Error fetching joke:', error);
    });
});
