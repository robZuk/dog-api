import Data from "./Data.js";

class Show {
  constructor() {
    this.randomImg = document.querySelector(".featured-dog__wrapper-image");
    this.dogName = document.querySelector(".featured-dog__description-name");
    this.spinner = document.querySelector(".featured-dog__wrapper-spinner");
    this.nextBreedImage = document.querySelector(
      ".featured-dog__description-next-btn-breed-image"
    );
    this.previousBreedImage = document.querySelector(
      ".featured-dog__description-previous-btn-breed-image"
    );
    this.tiles = document.querySelector(".tiles");
    this.breedName = null;
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

  showBreedImageWhenReady(img) {
    console.log(img);

    this.randomImg.style.backgroundImage = `url('${img}')`;
    this.dogName.innerHTML = `Here you can see ${this.breedName}`;

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
      "featured-dog__description-next-btn-breed-image--visible"
    );
    this.previousBreedImage.classList.remove(
      "featured-dog__description-previous-btn-breed-image--visible"
    );
    this.showLoading();
  }

  addBreed(breed, subBreed) {
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

    tileContent.innerText = name;
    tileContent.addEventListener("click", () => {
      this.breedName = name;
      this.breedType = type;
      this.nextBreedImage.innerHTML = `Next ${this.breedName} image`;
      this.previousBreedImage.innerHTML = `Previous ${this.breedName} image`;
      this.nextBreedImage.classList.add(
        "featured-dog__description-next-btn-breed-image--visible"
      );
      this.previousBreedImage.classList.add(
        "featured-dog__description-previous-btn-breed-image--visible"
      );
      window.scrollTo(0, 0);
      this.showLoading();

      // this.data
      //   .getRandomImageByBreed(type)
      //   .then(img => this.showImageWhenReady(img));

      this.data
        .getRandomImageListByBreed(type)
        .then(images => this.showImageWhenReady(images[0]));
    });

    tile.appendChild(tileContent);
    this.tiles.appendChild(tile);
  }

  showAllBreeds() {
    this.data.listBreeds().then(breeds => {
      for (const breed in breeds) {
        //wszystkie rasy
        if (breeds[breed].length === 0) {
          //jeśli nie ma podras
          this.addBreed(breed);
        } else {
          for (const subBreed of breeds[breed]) {
            //jeśli są podrasy, breeds[breed] to tabel z podrasami
            this.addBreed(breed, subBreed);
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
          this.showBreedImageWhenReady(images[this.index])
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
          this.showBreedImageWhenReady(images[this.index]),
          console.log(this.index)
        )
      );

    this.showLoading();
  }
}
export default Show;
