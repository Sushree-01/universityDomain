const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');

const app=express();
const port=8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const connection=mysql.createConnection({
  host:'localhost',
  user:'your_username',
  password:'your_password',
  database:'university_db',
});

connection.connect();

app.post('/save-favourite',(req,res)=>{
  const {name,state,web_pages}=req.body;

  const sql='INSERT INTO favourites (name, state, web_pages) VALUES (?, ?, ?)';
  connection.query(sql,[name,state,web_pages],(err,result)=>{
    if (err){
      console.error('Error saving favourite:',err);
      res.status(500).json({error:'Internal Server Error'});
    } else {
      res.status(200).json({message:'Favourite saved successfully'});
    }
  });
});

app.get('/get-favourites',(req,res)=>{
  const sql='SELECT * FROM favourites';
  connection.query(sql,(err,result)=>{
    if (err){
      console.error('Error fetching favourites:',err);
      res.status(500).json({error:'Internal Server Error'});
    } else {
      res.status(200).json(result);
    }
  });
});

app.use(express.static('public'));
app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/favourites',(req,res)=>{
  res.sendFile(__dirname+'/public/favourites.html');
});

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});
