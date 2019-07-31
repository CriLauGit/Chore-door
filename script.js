let door1Image = document.getElementById('door1');
let door2Image = document.getElementById('door2');
let door3Image = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentStreakButton = document.getElementById('currentStreak');
let bestStreakButton = document.getElementById('bestStreak');
const botImageSrc = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachImageSrc = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceImageSrc = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorImage = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let openDoor1 = botImageSrc;
let openDoor2 = spaceImageSrc;
let openDoor3 = beachImageSrc;
let currentlyPlaying = true;
let currentStreak = 0;
let bestStreak = 0;

const isBot = (door) => {
  if(door.src === botImageSrc) {
    return true;
  }
  else {
    return false;
  }
}

const gameOver = (status) => {
  if(status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    currentStreak ++;
    if(currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }
  }
  else {
    startButton.innerHTML = 'You lose! Play again?';
    currentStreak = 0;
  }
  currentlyPlaying = false;
  currentStreakButton.innerHTML = currentStreak;
  bestStreakButton.innerHTML = bestStreak;
}

const playDoor = (door) => {
  numClosedDoors --;
  if(numClosedDoors === 0) {
    gameOver('win');
  }
  else if(isBot(door)) {
    gameOver('lose');
  }
}

function randomChoreDoorGenerator() {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if(choreDoor === 0) {
    openDoor1 = botImageSrc;
    openDoor2 = beachImageSrc;
    openDoor3 = spaceImageSrc;
  }
  else if(choreDoor === 1) {
    openDoor1 = beachImageSrc;
    openDoor2 = botImageSrc;
    openDoor3 = spaceImageSrc;
  }
  else {
    openDoor1 = spaceImageSrc;
    openDoor2 = beachImageSrc;
    openDoor3 = botImageSrc;
  }
}

const isClicked = (door) => {
  if(door.src === closedDoorImage) {
    return false;
  }
  else {
    return true;
  }
}

door1.onclick = () => {
  if(!isClicked(door1) && currentlyPlaying) {
  door1Image.src = openDoor1;
  playDoor(door1);
  }
}
door2.onclick = () => {
  if(!isClicked(door2) && currentlyPlaying) {
  door2Image.src = openDoor2;
  playDoor(door2);
  }
}
door3.onclick = () => {
  if(!isClicked(door3) && currentlyPlaying) {
  door3Image.src = openDoor3;
  playDoor(door3);
  }
}

const startRound = () => {
  door1Image.src = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
  door2Image.src = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
  door3Image.src = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';
  currentlyPlaying = true;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  randomChoreDoorGenerator();
}

startButton.onclick = () => {
  if(!currentlyPlaying) {
    startRound();
  }
}