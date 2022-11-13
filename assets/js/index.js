var body = document.querySelector('body');
var header = document.querySelector('header');
var toggle = document.querySelector('.toggle');
let scrollpos = window.scrollY;
const header_height = header.offsetHeight;

const add_class_on_scroll = () => header.classList.add("scrolled");
const remove_class_on_scroll = () => header.classList.remove("scrolled");

toggle.addEventListener("click", () => {
  body.classList.toggle('oh');
  header.classList.toggle('active');
})


window.addEventListener('scroll', function () {
  scrollpos = window.scrollY;

  if (scrollpos >= header_height) { add_class_on_scroll() }
  else { remove_class_on_scroll() }

})


function vdoPlay(videoID) {
  const video = document.querySelector(videoID);
  let playState = null;

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (!entry.isIntersecting) {
              video.pause();
              playState = false;

          } else {
              video.play();
              playState = true;
          }
      });
  }, { rootMargin: '-40%' });

  observer.observe(video);

  const onVisibilityChange = () => {
      if (document.hidden || !playState) {
          video.pause();
      } else {
          video.play();
      }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
}


// Toggle this boolean to hide/show the original video alongside the canvas version of the video.
var hideOrig = true;

// draws the current frame from the video, then sets a timeout to do it again (roughly 30 FPS).
var drawFrame = function(v,c) {
  if (v.paused || v.ended) return false;
  var w = v.videoWidth;
  var h = v.videoHeight;
  c.canvas.width = w;
  c.canvas.height = h;
  c.drawImage(v,0,0,w,h);
  v.timeout = setTimeout(drawFrame, 30, v,c);
}

// creates a canvas element, inserts it, and begins drawing video frames
document.querySelectorAll('[data-replace-video-with-canvas]').forEach(function(v) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  v.parentNode.appendChild(canvas);
  if (hideOrig) v.classList.add('shy');

  drawFrame(v,ctx);

  v.addEventListener('playing', function() {
    if (typeof v.timeout === 'number') clearTimeout(v.timeout);
    drawFrame(this,ctx);
  });
});