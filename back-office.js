/*  verifico che nella barra di ricerca del browser ci sia oppure no un id */

const presenceId = new URLSearchParams(location.search);
const eventId = presenceId.get("eventId");

console.log(eventId);

/*  filtro  */

/* Genero card con modalità POST perchè non c'è eventId nella barra url */

const formPointer = document.getElementById("post");
formPointer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("invio i dati all'API");

  const inputName = document.getElementById("name");
  const inputDescription = document.getElementById("description");
  const inputBrand = document.getElementById("brand");
  const inputSrc = document.getElementById("imgUrl");
  const inputPrice = document.getElementById("price");

  const newEvent = {
    name: inputName.value,
    description: inputDescription.value,
    brand: inputBrand.value,
    price: inputPrice.value,
    imageUrl: inputSrc.value,
  };

  console.log("Ecco l'oggetto che manderò alle API", newEvent);

  /*  filtro per tipo di operazione */

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(newEvent),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmUyZTEzOWM0MzAwMTg4MTQ1OTgiLCJpYXQiOjE2OTcxODUzMjcsImV4cCI6MTY5ODM5NDkyN30.QTrwuACeiMH9JetBVYoDPT9LTME3Fl9rkNOkuuO2k6Y",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Item saved!");
        location.assign("shop-window.html");
      } else {
        throw new Error("Error in posting new item");
      }
    })
    .catch((err) => {
      alert("Error in posting new item");
    });
});

const reset = document.getElementById("reset");
reset.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.getElementById("name");
  name.value = "";
  const description = document.getElementById("description");
  description.value = "";
  const brand = document.getElementById("brand");
  brand.value = "";
  const imgUrl = document.getElementById("imgUrl");
  imgUrl.value = "";
  const price = document.getElementById("price");
  price.value = "";
});

const hide1 = document.getElementById("edit");
hide1.classList.add("d-none");
const hide2 = document.getElementById("delete");
hide2.classList.add("d-none");

const hide3 = document.getElementById("post");
const hide4 = document.getElementById("reset");


/* DANGER ZONEEEEE ATTENTION PLEASEEEEE */

const editActual = (ab) => {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
    method: "PUT",
    body: JSON.stringify(ab),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmUyZTEzOWM0MzAwMTg4MTQ1OTgiLCJpYXQiOjE2OTcxODUzMjcsImV4cCI6MTY5ODM5NDkyN30.QTrwuACeiMH9JetBVYoDPT9LTME3Fl9rkNOkuuO2k6Y",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Are you sure you wanna edit the item details?");
        location.assign("shop-window.html");
      } else {
        throw new Error("ERRORE NEL RECUPERO DETTAGLIO");
      }
    })

    .catch((err) => {
      console.log("errore", err);
    });
};

if (eventId) {
  hide1.classList.remove("d-none");
  hide2.classList.remove("d-none");

  hide3.classList.add("d-none");
  hide4.classList.add("d-none");

  const title = document.getElementById('title')
  title.innerText = 'EDIT ITEM'

  fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmUyZTEzOWM0MzAwMTg4MTQ1OTgiLCJpYXQiOjE2OTcxODUzMjcsImV4cCI6MTY5ODM5NDkyN30.QTrwuACeiMH9JetBVYoDPT9LTME3Fl9rkNOkuuO2k6Y",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Sever Error");
      }
    })
    .then((eventDetails) => {
      const inputName = document.getElementById("name");
      const inputDescription = document.getElementById("description");
      const inputBrand = document.getElementById("brand");
      const inputSrc = document.getElementById("imgUrl");
      const inputPrice = document.getElementById("price");

      inputName.value = eventDetails.name;
      inputDescription.value = eventDetails.description;
      inputBrand.value = eventDetails.brand;
      inputSrc.value = eventDetails.imageUrl;
      inputPrice.value = eventDetails.price;

      hide1.addEventListener("click", () => {
        const newObj = {
          name: inputName.value,
          description: inputDescription.value,
          brand: inputBrand.value,
          price: inputPrice.value,
          imageUrl: inputSrc.value,
        };
        editActual(newObj);
      });
    })

    .catch((err) => {
      alert("Error in posting new item");
    });

  /* ho trovato eventId nella barra url */

  const deletePointer = document.getElementById("delete");
  deletePointer.addEventListener("click", function (e) {
    e.preventDefault;
    alert("Are you sure you wanna delete the item from the store?");

    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmUyZTEzOWM0MzAwMTg4MTQ1OTgiLCJpYXQiOjE2OTcxODUzMjcsImV4cCI6MTY5ODM5NDkyN30.QTrwuACeiMH9JetBVYoDPT9LTME3Fl9rkNOkuuO2k6Y",
      },
    })
      .then((res) => {
        if (res.ok) {
          location.assign("shop-window.html");
        } else {
          alert("There's some Error");
          throw new Error("Errore while deleting");
        }
      })
      .catch((err) => {
        console.log("ERRORE!", err);
      });
  });
}
