const body = document.querySelector("body");
const IMG_NUMBER = 3;

const getImage = () => {
  const DateWeather = new Date();
  const month = DateWeather.getMonth() + 1;

  let weatherName = "";
  if (month > 2 && month < 6) {
    weatherName = "spring";
  } else if (month > 5 && month < 9) {
    weatherName = "summer";
  } else if (month > 9 && month < 12) {
    weatherName = "autumn";
  } else {
    weatherName = "winter";
  }

  const image = new Image();
  const imgNumber = Math.ceil(Math.random() * IMG_NUMBER);

  image.src = `img/${weatherName}${imgNumber}.jpg`;
  console.log(image.src);

  image.classList.add("bgImage");
  body.appendChild(image);
};

function init() {
  getImage();
}

init();
