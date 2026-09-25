(function () {

  const character = document.createElement('div');
  const container = document.createElement('div');
  const chatbox = document.createElement('span');

  container.appendChild(character);
  container.appendChild(chatbox);
  document.body.appendChild(container);

  const defaultConfig = {
    characterX: 10,
    characterY: 100,
    characterWidth: 200,
    characterURL: 'https://s1.imagehub.cc/images/2026/09/25/c7ba7d48838fde81e9bd0712e75d404e.png',

    chatboxWidth: 200,
    chatboxBorderRadius: 20,

    speakInterval: 5000,

    midnightG: ['Why don&#146;t you sleep? Is there anything annoying you?', 'Go to sleep right now!', 'What are you doing in such a deep night?'],
    morningG: ['Good morning!', 'You wake up so early!'],
    noonG: ['Have you ever eaten yet?', 'What do you think of the meal just now'],
    afternoonG: ['Take a rest and begin to work again!', 'Good afternoon!', 'Did you have a good rest?'],
    eveningG: ['Good evening visitor!', "It is evening now"],
    nightG: ['You work so hard! Why not take a rest sometime', 'How many stars can you see in the sky?'],

    catchedWords: ['Hey! Put me down!', 'What are you doing!!!'],
    boring: ['What are you doing here?', 'Is it a good day today?', 'Have you finished your work?', 'I feel so cryogenic~']
  }

  const config = Object.assign(
    {},
    defaultConfig,
    window.myConfig
  );

  let originalX = config.characterX;
  let originalY = window.innerHeight - config.characterWidth - config.characterY;
  let cX, cY, oX, oY, pX, pY, tX, tY;
  let isMoving = false;
  let springT, animationT, animationI, fadeOutT, speakT;


  function init() {
    container.style.cssText = `
      width: ${config.characterWidth}px;
      height: ${config.characterWidth}px;
      position: fixed;
      left: ${originalX}px;
      top: ${originalY}px;
      z-index: 999;
      transform: translate(0, 0);
      transition: 0.0s;
    `;

    character.style.cssText = `
      background-image: url("${config.characterURL}");
      background-size: cover;
      background-position: 0 0;
      width: 100%;
      height: 100%;
      position: absolute;
    `;

    chatbox.style.cssText = `
      width: ${config.chatboxWidth}px;
      box-shadow: 
        inset 2px -2px 3px -2px rgba(255, 255, 255, 0.9),
        inset -2px 2px 3px -2px rgba(255, 255, 255, 0.9),
        inset 4px -4px 5px -4px rgba(255, 255, 255, 0.5),
        inset -4px 4px 5px -4px rgba(255, 255, 255, 0.5),
        inset 0 0 5px rgba(0, 0, 0, 0.5),
        2px 2px 4px rgba(0, 0, 0, 0.3);
      opacity: 0.0;
      text-align: center;
      color: white;
      text-shadow: 0 0 5px black;
      position: absolute;
      bottom: ${config.characterWidth}px;
      border-radius: ${config.chatboxBorderRadius}px;
      transition: 0.5s;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    `;
    chatbox.innerHTML = 'This is a test.A very very long sentence is here';
    greeting();
  }

  function startMoving(e) {
    e.preventDefault();
    isMoving = true;
    clearTimeout(springT);
    clearTimeout(fadeOutT);
    clearTimeout(speakT);
    catched();
    container.style.transition = '0.0s';
    if (e.type === 'mousedown') {
      oX = e.offsetX;
      oY = e.offsetY;
    } else if (e.type === 'touchstart') {
      const rect = container.getBoundingClientRect();
      oX = e.touches[0].clientX - rect.left;
      oY = e.touches[0].clientY - rect.top;
    }
    animationI = setInterval(playAnimation, 200);
  }

  function moving(e) {
    if (!isMoving) return;
    e.preventDefault();
    if (e.type === 'mousemove') {
      cX = e.clientX;
      cY = e.clientY;
    } else if (e.type === 'touchmove') {
      cX = e.touches[0].clientX;
      cY = e.touches[0].clientY;
    }

    pX = cX - oX;
    pY = cY - oY;
    tX = pX - originalX;
    tY = pY - originalY;

    container.style.transform = `translate(${tX}px, ${tY}px)`;
  }

  function endMoving(e) {
    if (!isMoving) return;
    e.preventDefault();
    fadeOut();
    clearInterval(animationI);
    clearTimeout(animationT);
    character.style.backgroundPosition = `-${3 * config.characterWidth}px`;
    isMoving = false;
    container.style.transition = '0.15s';
    spring();
  }

  function spring() {
    tX *= -0.8;
    tY *= -0.8;
    if (Math.abs(tX) <= 5 && Math.abs(tY) <= 5) {
      clearTimeout(springT);
      character.style.backgroundPosition = '0 0';
      speakT = setTimeout(speak, Math.random() * 3000 + config.speakInterval);
      tX = tY = 0;
    } else {
      springT = setTimeout(spring, 150);
    }
    container.style.transform = `translate(${tX}px, ${tY}px)`;
  }

  function reposition() {
    originalX = config.characterX;
    originalY = window.innerHeight - config.characterWidth - config.characterY;

    container.style.left = `${originalX}px`;
    container.style.top = `${originalY}px`;
  }

  function playAnimation() {
    character.style.backgroundPosition = `-${config.characterWidth}px, 0`;
    animationT = setTimeout(() => {
      character.style.backgroundPosition = `-${2 * config.characterWidth}px 0`;
    }, 100);
  }

  function fadeIn() {
    chatbox.style.opacity = '1.0';
  }

  function fadeOut() {
    chatbox.style.opacity = '0.0';
  }

  function greeting() {
    chatbox.style.opacity = '1.0';

    const hour = new Date().getHours();
    let randomNum;
    if (hour >= 0 && hour < 5) {
      randomNum = Math.floor(Math.random() * config.midnightG.length);
      chatbox.innerHTML = `${config.midnightG[randomNum]}`;
    } else if (hour >= 5 && hour < 11) {
      randomNum = Math.floor(Math.random() * config.morningG.length);
      chatbox.innerHTML = `${config.morningG[randomNum]}`;
    } else if (hour >= 11 && hour < 14) {
      randomNum = Math.floor(Math.random() * config.noonG.length);
      chatbox.innerHTML = `${config.noonG[randomNum]}`;
    } else if (hour >= 14 && hour < 17) {
      randomNum = Math.floor(Math.random() * config.afternoonG.length);
      chatbox.innerHTML = `${config.afternoonG[randomNum]}`;
    } else if (hour >= 17 && hour < 20) {
      randomNum = Math.floor(Math.random() * config.eveningG.length);
      chatbox.innerHTML = `${config.eveningG[randomNum]}`;
    } else if (hour >= 20 && hour < 24) {
      randomNum = Math.floor(Math.random() * config.nightG.length);
      chatbox.innerHTML = `${config.nightG[randomNum]}`;
    }

    fadeOutT = setTimeout(fadeOut, 3000);
    speakT = setTimeout(speak, 3000 * Math.random() + config.speakInterval);
  }

  function speak() {
    fadeIn();
    clearTimeout(fadeOutT);
    clearTimeout(speakT);
    let randomNum = Math.floor(Math.random() * config.boring.length);
    chatbox.innerHTML = `${config.boring[randomNum]}`;
    fadeOutT = setTimeout(fadeOut, 3000);
    speakT = setTimeout(speak, Math.random() * 3000 + config.speakInterval);
  }

  function catched() {
    clearTimeout(fadeOutT);
    clearTimeout(speakT);
    fadeIn();
    const randomNum = Math.floor(Math.random() * config.catchedWords.length);
    chatbox.innerHTML = `${config.catchedWords[randomNum]}`;
    speakT = setTimeout(speak, 3000 * Math.random() + config.speakInterval);
    fadeOutT = setTimeout(fadeOut, 3000);
  }

  window.addEventListener('resize', reposition);

  container.addEventListener('mousedown', startMoving);
  container.addEventListener('touchstart', startMoving, { passive: false });

  document.addEventListener('mousemove', moving);
  document.addEventListener('touchmove', moving, { passive: false });

  document.addEventListener('mouseup', endMoving);
  document.addEventListener('touchend', endMoving, { passive: false });

  init();

})();