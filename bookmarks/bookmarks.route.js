const bmRoute = require('express').Router();
const jsonParse = require('express').json();
const store = require('../src/store');
const uuid = require('uuid');


bmRoute.route('/')
  .get((req,res)=>{
    res.status(200)
      .json(store);

  })
  .post(jsonParse,(req,res)=>{
    let {title, content} = req.body;
    if(!title || !content)
      return res.status(400).json({error:'Please include a title and content'});
    let newitem = {
      id:uuid(),
      title,
      content
    };
    store.push(newitem);
    res.status(201)
      .location(`/bookmarks/${newitem.id}`)
      .json(newitem);
  });
bmRoute.route('/:id')
  .get((req,res)=>{//returns a single book
    let { id } = req.params;
    console.log(id);
    let book = store.find((book)=>{
      return book.id === id;
    });
    if(book !== undefined){
      res.status(200).json(book);
    }else{
      res.status(404).json({error:'book not found'});
    }
  })
  .delete((req,res)=>{
    let { id } = req.params;
    let book = store.find((book)=>{
      return book.id === id;
    });
    if(book !==undefined){
      store.splice(store.indexOf(book),1);
      res.status(204).end();
    }
    else
      res.status(404).json({error:'book not found'});
  });

module.exports = bmRoute;