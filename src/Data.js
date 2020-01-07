class Data {
  constructor() {
    this.apiUrl = "https://dog.ceo/api";
    this.spinnerEl = document.querySelector(".lds-dual-ring");
  }

  getRandomImage = async () => {
    try {
      const response = await fetch(`${this.apiUrl}/breeds/image/random`);
      const data = await response.json();
      const dataMessage = data.message;
      return dataMessage;
    } catch (err) {}
  };

  extractBreedName(data) {
    let regex = /https:\/\/images\.dog\.ceo\/breeds\/(\w+-?\w+)\//;
    let breed = regex.exec(data);
    return breed[1];
  }

  listBreeds = async () => {
    try {
      const response = await fetch(`${this.apiUrl}/breeds/list/all`);
      const data = await response.json();
      const list = data;
      //console.log(list.message);
      return list.message;
    } catch (err) {}
  };

  getRandomImageByBreed = async breedImg => {
    try {
      const response = await fetch(
        `${this.apiUrl}/breed/${breedImg}/images/random`
      );
      const data = await response.json();
      const breed = data.message;
      console.log(breed);
      return breed;
    } catch (err) {}
  };

  // getBreedName() {
  //   const dogName = this.getRandomImage().then(dataUrl =>
  //     this.extractBreedName(dataUrl)
  //   );
  //   return dogName;
  // }
}
export default Data;
