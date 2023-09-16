const router = require('express').Router();
const fs = require('fs');
const util = require('util')
const readFromFile = util.promisify(fs.readFile)
const uniqid = require('uniqid'); 

// GET Route for retrieving all the feedback
router.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))//changed this to db.json
);
//post route
router.post('/',(req, res) => {
  req.body.id = uniqid()
  readFromFile('./db/db.json').then(data => {
    const notesData = JSON.parse(data)
    notesData.push(req.body)
    fs.writeFile('db/db.json', JSON.stringify(notesData), (error) => {
      if(error){
        throw error
      }
      res.json(notesData)
    })
  }) 

})
router.delete('/:id',(req,res) =>{
  //get rid of note by id
  readFromFile('./db/db.json').then(data => {
    const deleteData = JSON.parse(data)
    const newNotes = deleteData.filter((note)=> note.id !== req.params.id)
    fs.writeFile('db/db.json', JSON.stringify(newNotes), (error) => {
      if(error){
        throw error
      }
      res.json(newNotes)
    })
  })
})

module.exports = router;
