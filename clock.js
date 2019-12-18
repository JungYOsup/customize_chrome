const clock = document.querySelector(".js-clock");

const getClock = () => {
  const date = new Date();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  const year = date.getFullYear(); // 나중에 배치시킬거임

  clock.innerText = `${
    hour >= 12 // 12 or 24 여기 조건문을 수정좀 해야겠다.
      ? `오후${hour - 12 > 0 ? hour - 12 : `0${hour - 12}`}`
      : `오전${hour - 12 > 0 ? `0${hour}` : hour}`
  }:${minute < 10 ? `0${minute}` : minute}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

function init() {
  setInterval(getClock, 1000);
} // 변수로 받을경우 이름이 같으므로 충돌이 발생

init();
