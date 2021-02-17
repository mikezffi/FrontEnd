const pressPlay = document.querySelector('.pressPlay');
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let gamestate = false;

//Game Start Function
function handleKeyUp(event) {
   if (event.keyCode === 32) {
      if (gamestate == false) {
         pressPlay.style.left = -1000 + 'px';
         gamestate = true;
         createCactus();
      }
      if (!isJumping) {
         jump();  
      }
   }
}

function jump() {
   isJumping = true;

   let upInterval = setInterval(() => {
      if (position >= 150) {
         clearInterval(upInterval);

         //down
         let downInterval = setInterval(() => {
            if (position <= 0) {
               clearInterval(downInterval);
               isJumping = false;
            } else {
            position -= 20;
            dino.style.bottom = position + 'px';
            }
         }, 20);

      } else {
         //up
         position += 20;
         dino.style.bottom = position + 'px';
      }
   }, 20);
}

function createCactus() {
   const cactus = document.createElement('div');
   let cactusPosition = 1000;
   let randomTime = (Math.random() * 6000) + 100;

   cactus.classList.add('cactus');
   cactus.style.left = 1000 + 'px';
   background.appendChild(cactus);

   let leftInterval = setInterval(() => {
      if (cactusPosition < -60) {
         clearInterval(leftInterval);
         background.removeChild(cactus);
      } else if (cactusPosition > 0 && cactusPosition < 50 && position < 55) {
         //gameover
         gamestate = false;
         clearInterval(leftInterval);
         document.body.innerHTML = '<h1 class= "game-over">Fim de jogo</h1>';
      } else {
         cactusPosition -= 10;
         cactus.style.left = cactusPosition + 'px';
      }
   }, 20); 

   setTimeout(createCactus, randomTime);
}

document.addEventListener('keyup', handleKeyUp); //document.addEventListener('keyup', () => { console.log(); });
