'use strict';

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// VoiceRSS speech function
function tellMe(joke) {
  console.log(joke);

  //   VoiceRSS speech parameters
  VoiceRSS.speech({
    key: '8d92fb47dacd4411a2d6f25b632c2560',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from Jokes Api
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist,explicit';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign one part or two part joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Passing jokes from jokes api to voiceRSS
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log('Error!', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
