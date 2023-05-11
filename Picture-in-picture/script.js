const videoElement = document.querySelector("#video");
const button = document.querySelector("#button");

//select media stream, pass to video element and play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (e) {}
}

button.addEventListener("click", async () => {
  button.disabled = true;
  //start picture in picture
  await videoElement.requestPictureInPicture();
  button.disabled = false;
});

selectMediaStream();
