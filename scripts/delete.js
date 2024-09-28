const section = document.getElementById("deletebox");

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

    data.forEach((element) => {
      const box = document.createElement("div");
      box.className = `d-flex align-items-center py-1 px-3`;
      box.innerHTML = `<h5 class="m-0 flex-grow-1">${element.name}</h5>
<button class="p-1 me-2 bg-transparent"><i class="infotext bi bi-info-circle-fill text-primary fs-5"></i></button>
<button class="p-1 bg-transparent"><i class="deletetext bi bi-trash-fill text-danger fs-5"></i></button>`;
      section.appendChild(box);
    });
  })
  .catch((err) => {
    alert("ERROR: " + err);
  });
