let options = {
  method: "GET",
  headers: {
    Authorization: "563492ad6f91700001000001a9198ca3dfc744e0b885b7fd900bda8a", //use the apikey you have generated
  },
};

const jumbotronToAppend = document.querySelector(
  "section.jumbotron div.container"
);

const newSearchButtonContainer = document.createElement("div");
newSearchButtonContainer.innerHTML = `<div class="input-group mb-3">
<input type="text" class="form-control" placeholder="Type what kind of image you want to display" aria-label="Recipient's username" aria-describedby="button-addon2">
<div class="input-group-append">
  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
</div>
</div>`;

jumbotronToAppend.appendChild(newSearchButtonContainer);

const smallTagList = document.querySelectorAll("div.card-body small");

let cardList = document.querySelectorAll(".card");

const viewButtonList = document.querySelectorAll(
  "div.card-body div.btn-group button:first-child"
);

for (let btn of viewButtonList) {
  btn.setAttribute("data-toggle", "modal");
  btn.setAttribute("data-target", "#staticBackdrop");
}

let alertNode = document.querySelector(".alert");

const fetchFunction = (query) => {
  cardList = document.querySelectorAll(".card");
  let howManyPhotos = cardList.length;

  fetch(
    `https://api.pexels.com/v1/search?query=[${query}]&per_page=${howManyPhotos}`,
    options
  )
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      let photosArr = result.photos;
      console.log(result.photos.url);

      //setting a timer for the alert by removing d-none class before calling the timer
      //and then putting it back when the timer is out

      alertNode.innerText = `${photosArr.length} images loaded`;
      alertNode.classList.remove("d-none");
      setTimeout(() => {
        alertNode.classList.add("d-none");
      }, 5000);

      //checking if there is an svg and if so, create an img tag and then remove the svg
      //on the else statement, we don't have an svg, so we just create an img tag
      //the reason why we don't have an svg is because we have already removed them
      //by pressing one of the buttons on the page: load, secondary or search
      for (let i = 0; i < photosArr.length; i++) {
        let svgTag = cardList[i].querySelector("svg");
        if (svgTag) {
          smallTagList[i].innerText = photosArr[i].id;
          let parentNode = cardList[i];
          let newImgNode = document.createElement("div");
          newImgNode.innerHTML = `<img
        src="${photosArr[i].src.medium}"
        style="width: 100%; height: 225px; object-fit: cover;"
        class="card-img-top"
      />`;

          parentNode.insertBefore(newImgNode, svgTag);
          svgTag.remove();
        } else {
          smallTagList[i].innerText = photosArr[i].id;
          let parentNode = cardList[i];
          let imgTag = cardList[i].querySelector("img");
          imgTag.src = `${photosArr[i].src.medium}`;
        }

        //linking the view button from every card to the modal, so when you press view button
        //you put in the modal the image of the card
        //unless it it hidden and then a message appears in the modal

        viewButtonList[i].addEventListener("click", () => {
          const modalBody = document.querySelector("div.modal-body");
          modalBody.innerHTML = "";
          let closestCardContainer = viewButtonList[i].closest("div.card");
          let imageCard = closestCardContainer.querySelector("img");
          if (!imageCard.classList.contains("visibility")) {
            const newImageForModal = document.createElement("img");
            newImageForModal.src = `${photosArr[i].src.medium}`;
            newImageForModal.classList.add("modal-img");
            modalBody.appendChild(newImageForModal);
          } else {
            modalBody.innerText =
              "The image is not visible right now. If you want to be displayed in the modal, just close the modal and click on Hide button, then retry";
          }
        });
      }
    })
    .catch((err) => console.error(err));
};

//adding an event listener on search button

const searchButton = document.querySelector("#button-addon2");
const input = document.querySelector("input");

searchButton.addEventListener("click", () => {
  let currentSearch = input.value;
  if (currentSearch != "") {
    console.log(currentSearch);
    cardList = document.querySelectorAll(".card");
    let howManyPhotos = cardList.length;

    fetchFunction(currentSearch);
  }
  input.value = "";
});

//adding an event listener on loadImages button

const loadImagesButton = document.querySelector("#load-images");
loadImagesButton.addEventListener("click", () => {
  fetchFunction("dogs");
});

//adding an event listener on the secondary button

const secondaryLoadButton = document.querySelector("#secondary-load");
secondaryLoadButton.addEventListener("click", () => {
  fetchFunction("rabbit");
});

//Changing the edit buttons with "hide" buttons and
//and toggling the visibility class so the image can dissapear on click on hide button

const editButtonList = document.querySelectorAll(
  "div.card-body div.btn-group button:nth-child(2)"
);

for (let btn of editButtonList) {
  btn.innerText = "Hide";
  btn.addEventListener("click", () => {
    let closestCardContainer = btn.closest("div.card");
    let imageCard = closestCardContainer.querySelector("img");
    imageCard.classList.toggle("visibility");
  });
}

//Creating the carousel:

fetch(
  `https://api.pexels.com/v1/search?query=[Forest]&per_page=4&orientation=landscape`,
  options
)
  .then((response) => response.json())
  .then((result) => {
    const innerCarouselContainer = document.querySelector(".carousel-inner");
    let photosArr = result.photos;
    for (let i = 0; i < photosArr.length; i++) {
      innerCarouselContainer.innerHTML += `<div class="carousel-item ${
        i === 0 ? "active" : ""
      }">
      <img class="d-block w-100" src="${photosArr[i].src.large}" alt="" />
      </div>`;
    }
  })
  .catch((err) => console.error(err));
