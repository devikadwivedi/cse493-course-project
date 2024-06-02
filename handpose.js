let video;
let poseNet;
let currentPoses;
let poseNetModelReady = false;
let invertNose = true;
let currX = null;
let currY = null;

let cursorX;
let cursorY;


function updateCursor(){
  if (useMouse){
    cursorX = mouseX;
    cursorY = mouseY;
  } else {
    cursorX = noseX();
    cursorY = noseY();
  }
}

function handPoseSetup() {
  // ml5js PoseNet initialization
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, onPoseNetModelReady); //call onPoseNetModelReady when ready
  poseNet.on('pose', onPoseDetected); // call onPoseDetected when pose detected
}


function onPoseNetModelReady() {
  //print("The PoseNet model is ready...");
  poseNetModelReady = true;
}

function onPoseDetected(poses) {
  currentPoses = poses;
}

function noseX() {
    let ret = null;
    if(!poseNetModelReady){
    print("Waiting for PoseNet model to load...", width/2, height/2);
    } else if (currentPoses && currentPoses[0]){
      ret = currentPoses[0].pose.rightWrist.x;
      ret = invertNose ? (width - ret) : ret;
    }
    currX = ret ? ret : currX;
    return currX;
}

function noseY() {
    let ret = null;
    if(!poseNetModelReady){
    print("Waiting for PoseNet model to load...", width/2, height/2);
    } else if (currentPoses && currentPoses[0]){
      ret = currentPoses[0].pose.rightWrist.y;
    }
    currY = ret ? ret : currY;
    return currY;
}


