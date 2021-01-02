import game, { handleUserAction } from './gameState';
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";


async function init() {
  console.log("starting game");
  initButtons(handleUserAction);

  let nexTimeToTick = Date.now();

  function nextAnimationTime() {
    const now = Date.now();

    if (nexTimeToTick <= now) {
      game.tick();
      nexTimeToTick = now + TICK_RATE;
    }

    requestAnimationFrame(nextAnimationTime);
  }

  requestAnimationFrame(nextAnimationTime); // it can also be called by nextAnimationTime();
}

init();
