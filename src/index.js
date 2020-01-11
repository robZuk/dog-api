import "./sass/style.scss";
import Show from "./Show.js";
import Data from "./Data";

const nextRandomImage = document.querySelector(
  ".featured-dog__description-next-btn-random-image"
);

const nextBreedImage = document.querySelector(
  ".featured-dog__description-next-btn-breed-image"
);

const previousBreedImage = document.querySelector(
  ".featured-dog__description-previous-btn-breed-image"
);

const show = new Show();
const data = new Data();

data.getRandomImage().then(img => show.showImageWhenReady(img));

nextRandomImage.addEventListener("click", () => show.refreshRandomImage());

nextBreedImage.addEventListener("click", () => show.refreshBreedImage());
previousBreedImage.addEventListener("click", () =>
  show.refreshPreviousBreedImage()
);
show.showAllBreeds();
