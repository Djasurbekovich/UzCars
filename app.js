let elCards = document.querySelector(".cards")
let elCorzinka = document.querySelector(".corzinka")
let elCorzinkaModal = document.querySelector(".korzinka__modal")


let corzinkaArr = []

function render(arr) {
    arr.forEach(el => {
        let html = `
        <div class="card" style="width: 18rem;">
        <img src=${el.image.img1} style="width: 18rem;height: 14rem; object-fit: cover"class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${el.name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <div class="d-flex align-items-center justify-content-between">
            <button id=${el.id} class="btn minus btn-danger w-25">-</button>
            <p class="m-0">${el.count}</p>
            <button id=${el.id} class="btn  plus btn-success w-25">+</button>
          </div>

          <button id=${el.id} class="btn corzinka mt-1 ${corzinkaArr.includes(el) ? "btn-success" : "btn-danger"} w-100">
          ${corzinkaArr.includes(el) ? "Saved" : "Save korzinka"}
          </button>
        </div>
      </div>
        `

        elCards.insertAdjacentHTML("beforeend", html)
    })
}

function renderCorzinka(arr) {
    arr.forEach(el => {
        let html = `
        <div class="card col-4" style="width: 18rem;">
        <img src=${el.image.img1} style="width: 18rem;height: 14rem; object-fit: cover"class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${el.name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <div class="d-flex align-items-center justify-content-between">
            <button id=${el.id} class="btn minus btn-danger w-25">-</button>
            <p class="m-0">${el.count}</p>
            <button id=${el.id} class="btn  plus btn-success w-25">+</button>
          </div>

          <button id=${el.id} class="btn corzinka mt-1 btn-danger w-100">Save Corzinka</button>
        </div>
      </div>
        `
        elCorzinkaModal.insertAdjacentHTML("beforeend", html)
    })
}

render(database)
renderCorzinka(corzinkaArr)

elCards.addEventListener("click", e => {
    if (e.target.matches(".plus")) {
        elCards.innerHTML = null
        let findObj = database.map(item => {
            if (item.id == e.target.id) {
                item.count += 1
                return item
            } else {
                return item
            }
        })
        render(findObj)
    } else if (e.target.matches(".minus")) {
        elCards.innerHTML = null
        let findObj = database.map(item => {
            if (item.id == e.target.id) {
                item.count <= 0 ? item.count = 0 : item.count -= 1
                return item
            } else {
                return item
            }
        })
        render(findObj)
    } else if (e.target.matches(".corzinka")) {
        elCorzinkaModal.innerHTML = null
        elCards.innerHTML = null
        let findCorzinka = database.find(el => el.id == e.target.id ? el : '')
        if (!corzinkaArr.includes(findCorzinka)) {
            corzinkaArr.push(findCorzinka)
        }else {
            let findEl = corzinkaArr.findIndex(item => item.id == e.target.id)
            corzinkaArr.splice(findEl, 1)

        }
        renderCorzinka(corzinkaArr)
        render(database)
    }
})

elCorzinkaModal.addEventListener("click", e => {
    e.preventDefault()
    elCorzinkaModal.innerHTML = null
    elCards.innerHTML = null
    if(e.target.matches(".corzinka")) {
        let newSortArr = corzinkaArr.filter(el => {
            if(el.id == e.target.id) {
                return el
            }
        })

        let findEl = corzinkaArr.findIndex(el => el.id == newSortArr[0].id)

        corzinkaArr.splice(findEl, 1)

        renderCorzinka(corzinkaArr)
        render(database)
    }
})
