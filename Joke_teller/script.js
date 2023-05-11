// https://www.voicerss.org/api/
// https://sv443.net/jokeapi/v2/

const audioElement = document.getElementById("audio");
const button = document.querySelector("#button");

function tellMe(joke) {
  console.log("tellMe: ", joke);
  VoiceRSS.speech({
    key: config.apiKey,

    src: `${joke}`,
    hl: "en-us",
    v: "Mary",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//Get Jokes from JokeApi
async function getJokes() {
  let joke = "";
  const BASE_URL =
    "https://v2.jokeapi.dev/joke/Programming,Dark,Pun,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = `${data.joke}`;
    }
    tellMe(joke);
    toggleBtn();
  } catch (e) {
    console.log("Error", error);
  }
}

//disable/enable btn
function toggleBtn() {
  button.disabled = !button.disabled;
}

//EventListeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleBtn);
