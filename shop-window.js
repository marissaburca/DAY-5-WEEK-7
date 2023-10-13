const renderEvents = function (arrayOfEvents) {
  const row = document.getElementById("cards-row");

  arrayOfEvents.forEach((event) => {
    const newCard = document.createElement("div");
    newCard.classList.add("col-8","col-sm-6","col-md-4","col-lg-4","col-xl-3","col-xxl-2");
    newCard.innerHTML = `
              <div class="card shadow p-2 mb-3 mx-0 bg-body-tertiary rounded" style=" height: 33rem">
                <img
                  src="${event.imageUrl}"
                  class="bd-placeholder-img card-img-top pb-0"
                />
                <div class="card-body d-flex flex-column justify-content-between">
                  <h5 class="card-title">${event.name}</h5>
                  <p class="card-text">${event.description}</p>
                  <p class="card-text">Brand: ${event.brand}</p>
                  <p class="card-text">Price: ${event.price}€</p>
                  <div
                    class="d-flex justify-content-center align-items-center">
                    <div class="btn-group">
                      <a
                        type="button"
                        href="back-office.html?eventId=${event._id}"
                        class="btn btn-sm btn-outline-warning mx-2">
                        Edit
                      </a>
                      <a
                        type="button"
                        href="details.html?eventId=${event._id}"
                        class="btn btn-sm btn-success">
                        More details
                      </a>
                    </div>
                  </div>  
              `;
    row.appendChild(newCard);
  });
};
const spinnerDisplay = () => {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("d-none");
};

const getShopWindow = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmUyZTEzOWM0MzAwMTg4MTQ1OTgiLCJpYXQiOjE2OTcxODUzMjcsImV4cCI6MTY5ODM5NDkyN30.QTrwuACeiMH9JetBVYoDPT9LTME3Fl9rkNOkuuO2k6Y",
    },
  })
    .then((res) => {
      spinnerDisplay();
      console.log(res);

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Sever Error");
      }
    })
    .then((events) => {
      console.log(events);
      renderEvents(events);
    })
    .catch((err) => {
      spinnerDisplay();
      alert("Error while contacting server", err);
    });
};

getShopWindow();
