import Data from "./Data.js";

class Show {
  constructor() {
    this.randomImg = document.querySelector(".featured-dog__wrapper-image");
    this.dogName = document.querySelector(".featured-dog__description-name");
    this.spinner = document.querySelector(".featured-dog__wrapper-spinner");
    this.nextBreedImage = document.querySelector(
      ".featured-dog__description-btn-next-breed-image"
    );
    this.previousBreedImage = document.querySelector(
      ".featured-dog__description-btn-previous-breed-image"
    );
    this.tiles = document.querySelector(".tiles");
    this.breedType = null;
    this.index = 0;
    this.data = new Data();
  }

  showLoading() {
    this.spinner.classList.add("featured-dog__wrapper-spinner--visible");
  }
  hideLoading() {
    this.spinner.classList.remove("featured-dog__wrapper-spinner--visible");
  }

  showImageWhenReady(img) {
    this.randomImg.style.backgroundImage = `url('${img}')`;
    this.dogName.innerHTML = `Here you can see ${this.data.extractBreedName(
      img
    )}`;
    this.hideLoading();
  }

  refreshRandomImage() {
    this.data.getRandomImage().then(img => {
      this.showImageWhenReady(img);
      this.dogName.innerHTML = `Here you can see ${this.data.extractBreedName(
        img
      )}`;
    });
    this.nextBreedImage.classList.remove(
      "featured-dog__description-btn-next-breed-image--visible"
    );
    this.previousBreedImage.classList.remove(
      "featured-dog__description-btn-previous-breed-image--visible"
    );
    this.showLoading();
  }

  addBreedList(breed, subBreed) {
    let name;
    let type;

    if (typeof subBreed === "undefined") {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBreed}`;
      type = `${breed}/${subBreed}`;
    }

    const tile = document.createElement("div");
    tile.classList.add("tiles__tile");

    const tileContent = document.createElement("div");
    tileContent.classList.add("tiles__tile-content");
    tile.appendChild(tileContent);
    this.tiles.appendChild(tile);

    tileContent.innerText = name;
    tileContent.addEventListener("click", () => {
      this.breedType = type;
      this.addBreedName(name);
      this.data
        .getRandomImageListByBreed(type)
        .then(images => this.showImageWhenReady(images[0]));
    });
  }

  addBreedName(name) {
    this.index = 0;
    this.nextBreedImage.innerHTML = `Next ${name} image`;
    this.previousBreedImage.innerHTML = `Previous ${name} image`;
    this.nextBreedImage.classList.add(
      "featured-dog__description-btn-next-breed-image--visible"
    );
    this.previousBreedImage.classList.add(
      "featured-dog__description-btn-previous-breed-image--visible"
    );
    window.scrollTo(0, 0);
    this.showLoading();
  }

  showAllBreeds() {
    this.data.listBreeds().then(breeds => {
      for (const breed in breeds) {
        //wszystkie rasy
        if (breeds[breed].length === 0) {
          //jeśli nie ma podras
          this.addBreedList(breed);
        } else {
          for (const subBreed of breeds[breed]) {
            //jeśli są podrasy, breeds[breed] to tabel z podrasami
            this.addBreedList(breed, subBreed);
          }
        }
      }
    });
  }

  refreshBreedImage() {
    this.data
      .getRandomImageListByBreed(this.breedType)
      .then(
        images => (
          this.index < images.length - 1
            ? this.index++
            : (this.index = images.length - 1),
          this.showImageWhenReady(images[this.index])
        )
      );
    this.showLoading();
  }

  refreshPreviousBreedImage() {
    this.data
      .getRandomImageListByBreed(this.breedType)
      .then(
        images => (
          this.index > 0 ? this.index-- : (this.index = 0),
          this.showImageWhenReady(images[this.index])
        )
      );

    this.showLoading();
  }
}
export default Show;
