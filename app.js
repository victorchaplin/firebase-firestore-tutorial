db.collection('cafes').get().then((cafes) => {
  cafes.docs.forEach((document) => {
    console.log(document.data())
  });
})