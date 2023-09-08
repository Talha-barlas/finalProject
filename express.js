const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
app.use(cors());

const{createPool} = require('mysql')
const pool = createPool({
host: "localhost",
user:"root",
password:"password",
connectLimit: 100
})
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/about', (req, res) => {
    res.json('this is an about page!')
  })

app.get('/getlist', (req, res) => {
    pool.query('select*from students.registration',(err,response)=>{
      res.send(response)
    })
  })

app.post('/create', (req, res) => {
  console.log(req.body)
    pool.query(`insert into students.registration (name,age,gender,city) values('${req.body.username}',${req.body.age},'${req.body.gender[0]}','${req.body.city}')`,(err,response)=>{
        res.json(response)
        return res
      // res.json(response)
    })
  })
  app.post('/update', ( req, res) => {
    console.log(req.body)
      pool.query(`update students.registration set name='${req.body.name}', gender='${req.body.gender}' where id=${req.body.id}`,(err,response)=>{
        console.log(err)
        res.json(response)
      })
    })
    app.delete('/student/:id', (req, res) => {
      // reading isbn from the URL
      const id = req.params.id;
      pool.query(`delete from students.registration where id=${id}`,(err,response)=>{
        res.json(response)
      })
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})