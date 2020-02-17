const cafeList = document.querySelector('#cafe-list')
const addCafeForm = document.querySelector('#add-cafe-form')

// create element and render cafe
function renderCafe(doc) {
  let li = document.createElement('li')
  let name = document.createElement('span')
  let city = document.createElement('span')
  let cross = document.createElement('div')

  li.setAttribute('data-id', doc.id)
  name.textContent = doc.data().name
  city.textContent = doc.data().city
  cross.textContent = 'x'

  li.appendChild(name)
  li.appendChild(city)
  li.appendChild(cross)

  cafeList.appendChild(li)

  // deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation()
    let id = e.target.parentElement.getAttribute('data-id')
    db.collection('cafes').doc(id).delete()
  })
}

// getting data
// querying: db.collection('cafes').where('city', '<', 'n').get()
// ordering: db.collection('cafes').orderBy('name').get()
db.collection('cafes').where('city', '==', 'Marioland').orderBy('name').get().then((cafes) => {
  cafes.docs.forEach((doc) => {
    renderCafe(doc)
  });
})

// saving data
addCafeForm.addEventListener('submit', (e) => {
  e.preventDefault()
  db.collection('cafes').add({
    name: addCafeForm.name.value,
    city: addCafeForm.city.value
  })

  addCafeForm.name.value = ''
  addCafeForm.city.value = ''
})