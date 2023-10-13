
const presenceId = new URLSearchParams(location.search)
const eventId = presenceId.get('eventId')

console.log(eventId)



const generateItemDetails = function (event) {
    // prendo un riferimento alla row
    const row = document.getElementById('event-details')
    row.innerHTML = `
    <div class="col">
    <div class="card mb-4 shadow-sm">
      <img
        src="${event.imageUrl}"
        class="bd-placeholder-img card-img-top"
      />
      <div class="card-body text-center">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <p class="card-text">Brand: ${event.brand}</p>
        <p class="card-text"> Price: ${event.price}€</p>
        <a
      type="button"
      href="back-office.html?eventId=${event._id}"
      class="btn btn-sm btn-danger">
      Go to back-office section to edit item details
    </a>
        <div
          class="d-flex justify-content-center align-items-center">
        </div>
      </div>
      
      
    
    `
  }
  const getDetails = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product/" + eventId, {
        headers:{
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmUyZTEzOWM0MzAwMTg4MTQ1OTgiLCJpYXQiOjE2OTcxODUzMjcsImV4cCI6MTY5ODM5NDkyN30.QTrwuACeiMH9JetBVYoDPT9LTME3Fl9rkNOkuuO2k6Y"
        }
        })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nel caricamento dei dettagli')
        }
      })
      .then((eventData) => {
        generateItemDetails(eventData)
      })
      .catch((err) => console.log('ERRORE', err))
  }
  
  getDetails()