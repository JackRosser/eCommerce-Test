const section = document.getElementById("deletebox");
const myMain = document.querySelector("main");

const striveUrl = "https://striveschool-api.herokuapp.com/api/product/";
const striveAuthorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY3YjRmZDVkMGU4ODAwMTViMzZlYTYiLCJpYXQiOjE3Mjc1MDk3NTcsImV4cCI6MTcyODcxOTM1N30.AbcoiybIdkr0JAIOuzXDyo6QcrvcryHXC9pM_w4s1sI";

fetch(striveUrl, {
  method: "GET",
  headers: {
    Authorization: striveAuthorization
  }
})
  .then((action) => {
    if (!action.ok) {
      throw new Error("Problema di chiamata");
    }
    return action.json();
  })
  .then((data) => {
    section.innerHTML = "";
    console.log(data);

    data.forEach((element) => {
      const box = document.createElement("div");
      box.className = `d-flex align-items-center py-1 px-3`;
      const deleteBtnId = `${element.name.replace(/\s+/g, "")}${element._id}`; // rimuove gli spazi dal name
      box.innerHTML = `<h5 class="m-0 flex-grow-1">${element.name}</h5>
<button class="p-1 me-2 bg-transparent"><i class="infotext bi bi-info-circle-fill text-primary fs-5" data-bs-toggle="modal" data-bs-target="#${element._id}"></i></button>
<button id="${deleteBtnId}" class="p-1 bg-transparent"><i class="deletetext bi bi-trash-fill text-danger fs-5"></i></button>`;
      section.appendChild(box);

      // CREAZIONE MODALE INFO
      let modalBox = document.createElement("aside");
      modalBox.className = `modal fade`;
      modalBox.id = element._id;
      modalBox.tabindex = "-1";
      modalBox["aria-labelledby"] = "exampleModalLabel";
      modalBox["aria-hidden"] = "true";
      modalBox.innerHTML = `<div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">${element.name}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"><h5>Description</h5>
            <p>${element.description}</p></div>
            <div class="modal-body"><h5>Supplier</h5>
            <p>${element.brand}</p></div>
            <div class="modal-body"><h5>Price</h5>
            <p>${element.price} $</p></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>`;
      myMain.appendChild(modalBox);

      document.getElementById(deleteBtnId).addEventListener("click", function () {
        fetch(striveUrl + "/" + element._id, {
          method: "DELETE",
          headers: {
            Authorization: striveAuthorization
          }
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Errore nella cancellazione");
            }
            alert("PRODOTTO ELIMINATO");
            // Rimuovi l'elemento dalla lista dopo la cancellazione
            box.remove();
            modalBox.remove(); // rimuovi anche il modale associato
          })
          .catch((err) => {
            alert("ERRORE: " + err);
          });
      });
    });
  })
  .catch((err) => {
    alert("ERROR: " + err);
  });

/*       <div class="modal fade" id="info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div> */
