let video;
let poseNet;
let currentPoses;
let poseNetModelReady = false;
// let invertNose = true;
function noseTrackingSetup() {

  // ml5js PoseNet initialization
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, onPoseNetModelReady); //call onPoseNetModelReady when ready
  poseNet.on('pose', onPoseDetected); // call onPoseDetected when pose detected
}

/**
 * Callback function called by ml5.js PoseNet when the PoseNet model is ready
 * Will be called once and only once
 */
function onPoseNetModelReady() {
  print("The PoseNet model is ready...");
  poseNetModelReady = true;
}

/**
 * Callback function called by ml5.js PosetNet when a pose has been detected 
 */
function onPoseDetected(poses) {
  currentPoses = poses;
}

//noseX returns the X position of one of the noses in the computer's vision
function noseX() {
    let ret = null;
    if(!poseNetModelReady){
    print("Waiting for PoseNet model to load...", width/2, height/2);
    } else if (currentPoses && currentPoses[0]){
      ret = currentPoses[0].pose.nose.x;
      ret = invertNose ? (width - ret) : ret;
    }
    return ret;
}

function draw() {
  background(100);
  
  if(!poseNetModelReady){
    textSize(32);
    textAlign(CENTER);
    fill(255);
    noStroke();
    print("Waiting for PoseNet model to load...", width/2, height/2);
  } else {
    print(noseX());
  }
}
