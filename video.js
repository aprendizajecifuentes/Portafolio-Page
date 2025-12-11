// Script opcional: puedes añadir interactividad
// Ejemplo: Pausar/Reproducir al hacer clic en el video
const video = document.getElementById("bg-video");

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});
