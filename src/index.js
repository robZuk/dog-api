import "./sass/style.scss";
import Show from "./Show.js";
import Data from "./Data";

const nextRandomImage = document.querySelector(
  ".random-dog__description-next-image"
);

const nextBreedImage = document.querySelector(
  ".breed-dog__description-next-image"
);
//const dogName = document.querySelector("random-dog__description-name");

const show = new Show();
const data = new Data();

//data.getBreedName();
//data.getBreedName();

data.getRandomImage().then(img => show.showImageWhenReady(img));

nextRandomImage.addEventListener("click", () => show.refreshRandomImage());
nextBreedImage.addEventListener("click", () => show.refreshBreedImage());
// data.listBreeds();
show.showAllBreeds();

// previousImage.addEventListener("click", () =>
//   console.log(`prev`, data.randomImageTable)
// );

//console.log({ dataUrl });
// data.extractBreedName(data.getData());

// class Doggo {
//   constructor() {
//     this.apiUrl = "https://dog.ceo/api";
//     this.imgEl = document.querySelector(".featured-dog img");
//     this.backgroundEl = document.querySelector(".featured-dog__background");
//     this.tilesEl = document.querySelector(".tiles");
//     this.spinnerEl = document.querySelector(".lds-dual-ring");
//     this.nextRandomImage = document.querySelector(".featured-dog__next-image");
//     this.nextBreedImage = document.querySelector(".featured-dog__breed-image");
//     this.breedName = null;
//     this.breedType = null;

//     this.init();
//   }

//   showLoading() {
//     this.spinnerEl.classList.add("lds-dual-ring--visible");
//   }

//   hideLoading() {
//     this.spinnerEl.classList.remove("lds-dual-ring--visible");
//   }

//   listBreeds() {
//     return fetch(`${this.apiUrl}/breeds/list/all`)
//       .then(resp => resp.json())
//       .then(data => data.message);
//   }

//   getRandomImage() {
//     return fetch(`${this.apiUrl}/breeds/image/random`)
//       .then(resp => resp.json())
//       .then(data => data.message);
//   }

//   getRandomImageByBreed(breed) {
//     return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
//       .then(resp => resp.json())
//       .then(data => data.message);
//   }

//   refreshRandomImage() {
//     this.showLoading();
//     this.getRandomImage().then(img => this.showImageWhenReady(img));
//     //this.showLoading();
//   }

//   refreshBreedImage() {
//     this.getRandomImageByBreed(this.breedType).then(img =>
//       this.showImageWhenReady(img)
//     );
//     this.showLoading();
//   }
//   init() {
//     this.showLoading();
//     this.getRandomImage().then(img => this.showImageWhenReady(img));
//     this.showAllBreeds();
//     this.nextRandomImage.addEventListener("click", () =>
//       this.refreshRandomImage()
//     );
//     this.nextBreedImage.addEventListener("click", () => {
//       this.refreshBreedImage();
//     });
//   }

//   showImageWhenReady(image) {
//     console.log(image);
//     //funkcje stosujemy przy wywołanu losowego obrazka oraz obrazka z wskazanej rasy
//     this.imgEl.setAttribute("src", image);
//     this.backgroundEl.style.background = `url("${image}")`;
//     this.hideLoading();
//   }

//   addBreed(breed, subBreed) {
//     let name;
//     let type;

//     if (typeof subBreed === "undefined") {
//       name = breed;
//       type = breed;
//     } else {
//       name = `${breed} ${subBreed}`;
//       type = `${breed}/${subBreed}`;
//     }

//     const tile = document.createElement("div");
//     tile.classList.add("tiles__tile");

//     const tileContent = document.createElement("div");
//     tileContent.classList.add("tiles__tile-content");

//     tileContent.innerText = name;
//     tileContent.addEventListener("click", () => {
//       this.breedName = name;
//       this.breedType = type;
//       this.nextBreedImage.innerHTML = `Next ${name} image`;

//       window.scrollTo(0, 0);
//       this.showLoading();

//       this.getRandomImageByBreed(type).then((
//         img //type jest jednoczłonowy lub dwuczłonowy
//       ) => this.showImageWhenReady(img));
//     });

//     tile.appendChild(tileContent);
//     this.tilesEl.appendChild(tile);
//   }

//   showAllBreeds() {
//     this.listBreeds().then(breeds => {
//       for (const breed in breeds) {
//         if (breeds[breed].length === 0) {
//           this.addBreed(breed);
//         } else {
//           for (const subBreed of breeds[breed]) {
//             this.addBreed(breed, subBreed);
//           }
//         }
//       }
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   new Doggo();
// });

// import "../sass/style.scss";
// class Doggo {
//   constructor() {
//     this.apiUrl = "https://dog.ceo/api";
//     this.imgEl = document.querySelector(".featured-dog img");
//     this.backgroundEl = document.querySelector(".featured-dog__background");
//     this.init();
//   }
//   listBreeds() {
//     return fetch(`${this.apiUrl}/breeds/list/all`)
//       .then(resp => resp.json())
//       .then(data => data.message);
//   }
//   //listBreeds().then(breeds => console.log(breeds));

//   getRandomImage() {
//     return fetch(`${this.apiUrl}/breeds/image/random`)
//       .then(resp => resp.json())
//       .then(data => data.message);
//   }
//   // const imgTag = document.querySelector("img");

//   // getRandomImage().then(imageSrc => imgTag.setAttribute("src", imageSrc));

//   getRandomImageByBread(breed) {
//     return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
//       .then(resp => resp.json())
//       .then(data => data.message);
//   }

//   init() {
//     this.getRandomImage().then(src => {
//       this.imgEl.setAttribute("src", src);
//       this.backgroundEl.style.background = `url("${src}")`;
//     });
//     this.showAllBreeds();
//   }

//   showAllBreeds() {
//     this.listBreeds().then(breeds => {
//       for (const breed in breeds) {
//         if (breeds[breed].length === 0) {
//           console.log(breed);
//         } else {
//           for (const subBreed of breeds[breed]) {
//             console.log(`${breed}/${subBreed}`);
//           }
//         }
//       }
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", () => new Doggo());
