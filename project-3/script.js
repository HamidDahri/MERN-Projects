// Get DOM elements
const video = document.getElementById('video');
const play =  document.getElementById('play');
const stop =  document.getElementById('stop');
const time =   document.getElementById('time');
const progress =  document.getElementById('progress');


// functions
// function to play pause video
  function playPauseVideo(){
    // checking video is paused of playing 
    if (video.paused ){
        video.play();
    } else {
        video.pause();
    }
  };

// update the play and pause button 
function updateIcon(){
   // if video is paused or playing 
    if(video.paused) {
     play.innerHTML = '<i class="fa fa-play fa-2x"></i>' ; 
    } else { 
        play.innerHTML =  '<i class="fa fa-pause fa-2x"></i>' ; 
    }  
     
};

// function to update the video progress bar 
function updateProgress(){

  // update progress bar value 
  progress.value = (video.currentTime / video.duration) * 100 ;
  // update time 
  let minutes =Math.floor(video.currentTime / 60 );
  //format mins to always be 2 digits
  if( minutes < 10 ){
      minutes = '0' + String(minutes);
  }
  // use current time to calculate the seconds 
  let seconds =Math.floor(video.currentTime % 60 );
  if (seconds <10 ){
      seconds = '0' + String(seconds);
  }
  // update the time 
  time.innerHTML = `${minutes}:${seconds}`
  console.log(minutes,seconds);
};
 //function to stop video playback
function stopVideo(){
    // reset the video time to zer0
   video.currentTime   = 0 ;
   video.pause();
};
// function to update the video progress bar 
function updateVideoProgress() {
    video.currentTime = (progress.value * video.duration) / 100 ;
};
// event listeners
// 1- Listen for click on video element 
video.addEventListener('click' , playPauseVideo)
// 2- Listen for pause button on video element
video.addEventListener('pause' , updateIcon)
// 3- Listen for play button on video element 
video.addEventListener('play' , updateIcon)
// 4- Listen for timeupdate event on video element 
video.addEventListener('timeupdate' , updateProgress)
// 5. listen for click event on play button
play.addEventListener('click' , playPauseVideo)
// 6. listen for click on stop button 
stop.addEventListener('click' , stopVideo)
// listen for change event on progress bar 
progress.addEventListener('change' , updateVideoProgress)