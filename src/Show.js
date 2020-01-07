import Data from "./Data.js";

class Show {
  constructor() {
    this.randomImgEl = document.querySelector(".random-dog__wrapper-image");
    //this.breedImgEl = document.querySelector(".breed-dog__wrapper-image");
    this.randomDogName = document.querySelector(
      ".random-dog__description-name"
    );
    this.spinnerEl = document.querySelector(
      ".random-dog__wrapper-lds-dual-ring"
    );
    this.nextRandomImage = document.querySelector(
      ".random-dog__description-next-image"
    );

    this.nextBreedImage = document.querySelector(
      ".breed-dog__description-next-image"
    );
    this.tilesEl = document.querySelector(".tiles");
    this.breedName = null;
    this.breedType = null;

    this.data = new Data();
  }

  showLoading() {
    this.spinnerEl.classList.add("random-dog__wrapper-lds-dual-ring--visible");
    //this.imgEl.classList.add("featured-dog img--hide");
  }

  hideLoading() {
    this.spinnerEl.classList.remove(
      "random-dog__wrapper-lds-dual-ring--visible"
    );
  }

  showImageWhenReady(img) {
    this.randomImgEl.style.backgroundImage = `url('${img}')`;
    this.randomDogName.innerHTML = `Here you can see ${this.data.extractBreedName(
      img
    )}`;
    this.hideLoading();
  }

  showBreedImageWhenReady(img) {
    console.log(img);
    this.randomImgEl.style.backgroundImage = `url('${img}')`;
    this.randomDogName.innerHTML = `Here you can see ${this.breedName}`;

    this.hideLoading();
  }

  refreshRandomImage() {
    this.data.getRandomImage().then(img => {
      this.showImageWhenReady(img);
      this.randomDogName.innerHTML = `Here you can see ${this.data.extractBreedName(
        img
      )}`;
      //this.data.randomImageTable.push(img);
    });
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
      console.log(type);
      window.scrollTo(0, 0);
      this.showLoading();

      this.data
        .getRandomImageByBreed(type)
        .then(img => this.showImageWhenReady(img));
    });

    tile.appendChild(tileContent);
    this.tilesEl.appendChild(tile);
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
      .getRandomImageByBreed(this.breedType)
      .then(img => this.showBreedImageWhenReady(img));
    this.showLoading();
  }
}
export default Show;
