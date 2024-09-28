// mail dunder@dunder.com
// psw dunder

const striveUrl = "https://striveschool-api.herokuapp.com/api/product/";
const striveAuthorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY3YjRmZDVkMGU4ODAwMTViMzZlYTYiLCJpYXQiOjE3Mjc1MDk3NTcsImV4cCI6MTcyODcxOTM1N30.AbcoiybIdkr0JAIOuzXDyo6QcrvcryHXC9pM_w4s1sI";

class NewProduct {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const getData = function () {
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
      console.log(data);
    })
    .catch((err) => {
      alert("ERROR: " + err);
    });
};

const form = document.getElementById("formProducts");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name");
  const description = document.getElementById("description");
  const supplier = document.getElementById("supplier");
  const image = document.getElementById("image");
  const price = document.getElementById("price");

  const productInsered = new NewProduct(name.value, description.value, supplier.value, image.value, price.value);

  fetch(striveUrl, {
    method: "POST",
    headers: {
      Authorization: striveAuthorization,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productInsered)
  })
    .then((response) => {
      console.log(response);

      if (!response.ok) {
        throw new Error("Errore in fase di POST");
      }
      return response.json();
    })
    .then((data) => {
      alert("inserimento completato");
      console.log(data);
    })
    .catch((err) => {
      alert("ERRORE: " + err);
    });
});

getData();
