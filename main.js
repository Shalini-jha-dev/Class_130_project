scoreRightwrist = 0,
scoreLeftwrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song = "" ;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet is Initialized");
}

function preload(){
    song = loadSound("music.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightwrist>0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY>0 && rightWristY<=100){
         document.getElementById("speed").innerHTML = "Speed = 0.5X";
         song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML = "Speed = 1X";
            song.rate(1);
           }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML = "Speed = 1.5X";
            song.rate(1.5);
           }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML = "Speed = 2X";
            song.rate(2);
           }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML = "Speed = 2.5X";
            song.rate(2.5);
           }
    }
    if(scoreLeftwrist>0.2){
        circle(leftWristX, leftWristY, 20);
    leftWristY_inNumber = Number(leftWristY);
    remove_Decimals = floor(leftWristY_inNumber);
    volume = remove_Decimals/500;
    //new_Volume = 1 - volume;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftwrist = "+scoreLeftwrist);

        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightwrist = "+scoreRightwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristX+" , leftWristY = "+leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        righttWristY = results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristX+" , rightWristY = "+rightWristY);

    }   
}
