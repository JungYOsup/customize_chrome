const nameForm = document.querySelector(".js-name-form");
const nameDiv = document.querySelector(".js-name-div");
const nameInput = document.querySelector(".js-name-input");

const addressForm = document.querySelector(".js-address-form");
const addressDiv = document.querySelector(".js-address-div");
const addressInput = document.querySelector(".js-address-input");

const clock = document.querySelector(".js-clock");
const clockDiv = document.querySelector(".js-clock-div");
const clockgreetings = document.querySelector(".js-clock-greetings");

const dailyForm = document.querySelector(".js-daily-form");
const dailyInput = document.querySelector(".js-daily-input");
const dailyUl = document.querySelector(".js-daily-ul");

const SHOWING = "showing";
const DISMISS = "dismiss";

const ADDRESSINDEX = "address";
const NAMEINDEX = "name";
const DAILYINDEX = "daily";

let textarray = [];

const getName = event => {
  event.preventDefault(); //기본적으로 form에서 onSubmit()을 통해 submit 하면 이벤트 완료 후 refresh가 됩니다. 하지만 리액트로 만드는 SPA앱에서는 원하는 이벤트가 아니죠. 그래서 event.preventDefault() 를 활용하여 추가로 이벤트를 전파하지 않고 취소할 수 있습니다.
  const inputValue = nameInput.value;
  saveName(inputValue);
  nameForm.classList.add(DISMISS);
  addresshandleSubmit();
};

const getAddress = event => {
  const getName = localStorage.getItem(NAMEINDEX);
  const getAddress = localStorage.getItem(ADDRESSINDEX);

  if (getName !== null && getAddress !== null) {
    nameForm.classList.add(DISMISS);
    clockhandleSubmit();
    paintingDaily();
  } else {
    event.preventDefault();
    const address = addressInput.value;
    saveAddress(address);
    addressForm.classList.remove(SHOWING);
    addressForm.classList.add(DISMISS);
    clockhandleSubmit();
    paintingDaily();
  }
};

const getClock = (hour, minute, seconds, year) => {
  clock.innerText = `${
    hour >= 12 // 12 or 24 여기 조건문을 수정좀 해야겠다.
      ? `오후${hour - 12 > 0 ? hour - 12 : `0${hour - 12}`}`
      : `오전${hour - 12 > 0 ? `0${hour}` : hour}`
  }:${minute < 10 ? `0${minute}` : minute}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  let greetings = "";

  if (hour < 12) {
    greetings = "morning";
  } else if (hour > 12 && hour < 17) {
    greetings = "afternoon";
  } else {
    greetings = "evening";
  }

  const name = localStorage.getItem("name");
  clockgreetings.textContent = `Good ${greetings}, ${name}`;
};

const getDate = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  const year = date.getFullYear(); // 나중에 배치시킬거임
  getClock(hour, minute, seconds, year);
};

const saveName = name => {
  localStorage.setItem(NAMEINDEX, name);
};

const saveAddress = address => {
  localStorage.setItem(ADDRESSINDEX, address);
};
const saveDaily = () => {
  localStorage.setItem(DAILYINDEX, JSON.stringify(textarray));
};

const deleteDaily = event => {
  const delbtn = event.target;
  const li = delbtn.parentNode;

  dailyUl.removeChild(li);

  const cleanToDos = textarray.filter(toDo => {
    return toDo.id !== parseInt(li.id); //node의 id는 String이므로 parseInt로 바꿔줌
  });

  textarray = cleanToDos;
  saveDaily();
};

const paintingAddress = () => {
  addressForm.classList.remove(DISMISS);
  addressForm.classList.add(SHOWING);
  const name = localStorage.getItem("name");
  const nameh1 = document.createElement("h1");
  nameh1.textContent = `What's your email,${name}`;
  addressInput.before(nameh1);
};

const paintingClock = () => {
  clockDiv.classList.remove(DISMISS);
  clockDiv.classList.add(SHOWING);
  dailyForm.classList.remove(DISMISS);
  dailyForm.classList.add(SHOWING);
  getDate();
  setInterval(getDate, 1000);
};

const getValue = event => {
  event.preventDefault();
  const dailyvalue = dailyInput.value;
  getDaily(dailyvalue);
};

const getDaily = text => {
  if (textarray.length > 1) {
    alert("일정을 2개 이상 하실수 없습니다. 기존의 일정을 지워주세요");
  } else {
    const dailyLi = document.createElement("li");
    const deleteBtn = document.createElement("button");
    //form 테그안에서 button은 submit 역할을 하기 때문에 그런거 아닐까?
    //맞다 form테그안에서 button은 submit 역할을 하기 때문이다 !!
    //그렇다면 해결방법은 2가지일것이다
    //첫째, form밖으로 버튼을 빼던가
    //둘째, form안에서도 버튼이 submit 역할을 못하게 하거나
    //나는 두번재 방법을 적용해보았다.
    deleteBtn.addEventListener("click", deleteDaily);

    const newid = textarray.length;
    deleteBtn.type = "button"; //버튼의 그냥 만들경우 type의 default 값이 submit이기 때문에 이것을 submit이 아닌 button의 역할로 바꿔줌
    dailyLi.innerText = text;
    deleteBtn.innerText = "X";
    dailyUl.appendChild(dailyLi);
    dailyLi.appendChild(deleteBtn);
    dailyLi.id = newid + 1;

    const dailyObj = {
      id: newid + 1,
      text: text
    };

    textarray.push(dailyObj);

    saveDaily();
  }
};

const deleteText = () => {};

const paintingDaily = () => {
  const dailyToDos = localStorage.getItem(DAILYINDEX);
  dailyUl.classList.remove(DISMISS);
  if (dailyToDos !== null) {
    const paresedToDos = JSON.parse(dailyToDos); //daulyToDos가 배열이기 때문에 paresedToDos도 자연적으로 타입이 배열이 된다.
    //자바스크립트의 특징중 하나

    paresedToDos.forEach(toDo => {
      getDaily(toDo.text);
      dailyhandleSubmit();
    });
  } else {
    dailyhandleSubmit();
  }
};

const namehandleSubmit = () => {
  nameForm.addEventListener("submit", getName);
};

const addresshandleSubmit = () => {
  paintingAddress();
  addressForm.addEventListener("submit", getAddress);
};

const clockhandleSubmit = () => {
  paintingClock();
};

const dailyhandleSubmit = () => {
  dailyForm.addEventListener("submit", getValue);
};

function init() {
  const nameValue = localStorage.getItem(NAMEINDEX);
  const addressValue = localStorage.getItem(ADDRESSINDEX);

  if (nameValue !== null && addressValue !== null) {
    getAddress();
  } else {
    namehandleSubmit();
  }
}

init();

//값이 있을때는 첫번째페이지가 아닌 세번째 페이지로 가야한다. //해결
//두번째는 ul태그때문에 html 위치가 위로가는 현상 고치고//해결
// Daily의 갯수를 5개로 이하로 지정해놓고, 늘리고 싶으면 지우고 늘리라는 표시 //해결
// 전체적인 CSS 해놓고
// 날짜에 따른 배경화면 변경
// 시간 조절 12시일때 아닐때
