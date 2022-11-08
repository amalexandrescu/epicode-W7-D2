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
// newSearchButtonContainer.innerHTML = `<button type="button" class="btn btn-primary">Search</button>`;
newSearchButtonContainer.innerHTML = `<div class="input-group mb-3">
<input type="text" class="form-control" placeholder="Type what kind of image you want to display" aria-label="Recipient's username" aria-describedby="button-addon2">
<div class="input-group-append">
  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
</div>
</div>`;

jumbotronToAppend.appendChild(newSearchButtonContainer);

`<div class="input-group mb-3">
  <input type="text" placeholder="Recipient's username">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
  </div>
</div>`;

const viewButtonList = document.querySelectorAll(
  "div.card-body div.btn-group button:first-child"
);

for (let btn of viewButtonList) {
  // console.log(btn);
  btn.setAttribute("data-toggle", "modal");
  btn.setAttribute("data-target", "#staticBackdrop");

  // const modalBody = document.querySelector("div.modal-body");
  // modalBody.innerText = `${btn}`;
}

const searchButton = document.querySelector("#button-addon2");
const input = document.querySelector("input");

searchButton.addEventListener("click", () => {
  let currentSearch = input.value;
  if (currentSearch != "") {
    console.log(currentSearch);
    cardList = document.querySelectorAll(".card");
    let howManyPhotos = cardList.length;

    fetch(
      `https://api.pexels.com/v1/search?query=[${currentSearch}]&per_page=${howManyPhotos}`,
      options
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        let photosArr = result.photos;
        alert(`${photosArr.length} photos loaded`);
        console.log(result.photos);
        //put the code for changing the photos in the cards

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
      });
  }

  input.value = "";
});

const loadImagesButton = document.querySelector("#load-images");
const secondaryLoadButton = document.querySelector("#secondary-load");

const smallTagList = document.querySelectorAll("div.card-body small");

let cardList = document.querySelectorAll(".card");
console.log(cardList.length);

loadImagesButton.addEventListener("click", () => {
  cardList = document.querySelectorAll(".card");
  let howManyPhotos = cardList.length;

  fetch(
    `https://api.pexels.com/v1/search?query=[Dogs]&per_page=${howManyPhotos}`,
    options
  )
    .then((response) => {
      // console.log("json", response);
      return response.json();
      // console.log(response.photos);
    })
    .then((result) => {
      let photosArr = result.photos;
      console.log(result.photos.url);

      alert(`${photosArr.length} photos loaded`);

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
    });
});

secondaryLoadButton.addEventListener("click", () => {
  cardList = document.querySelectorAll(".card");
  let howManyPhotos = cardList.length;

  fetch(
    `https://api.pexels.com/v1/search?query=[Rabbits]&per_page=${howManyPhotos}`,
    options
  )
    .then((response) => response.json())
    .then((result) => {
      let photosArr = result.photos;

      alert(`${photosArr.length} photos loaded`);

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
    });
});

const editButtonList = document.querySelectorAll(
  "div.card-body div.btn-group button:nth-child(2)"
);

for (let btn of editButtonList) {
  btn.innerText = "Hide";
  btn.addEventListener("click", () => {
    let closestCardContainer = btn.closest("div.card");
    let imageCard = closestCardContainer.querySelector("img");
    // console.log(closest);
    // let cardParent =
    //   btn.parentElement.parentElement.parentElement.parentElement.parentElement
    //     .parentElement;
    // console.log(cardParent);
    // if (cardParent.querySelector("svg")) {
    //   cardParent.querySelector("svg").remove();
    // } else if (cardParent.querySelector("img")) {
    //   cardParent.querySelector("img").remove();
    // }
    imageCard.classList.toggle("visibility");
  });
}
