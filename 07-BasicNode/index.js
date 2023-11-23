
/*
const fs=require("fs");
fs.readFile("input.txt", "utf-8", (err, fd)=>{
	if(err){

		console.log("There was an error: " + err);

	}else{

		console.log("This file says: \n" + fd);

	}

});

*/


const superheroes = require('superheroes');
const supervillains = require('supervillains');
const sw = require('star-wars-quotes')


console.log(sw())
console.log("OH NO!!! " + supervillains.random() + " is attacking the city!!!");
console.log("SAVE US " + superheroes.random() + " PLEASE!!!");