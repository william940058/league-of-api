const express = require('express');
const app = express();
const port = 3000;
let fs = require('fs');

var cors = require('cors');
app.use(cors());

let resList = [];

app.post('/getUser/:userName', (req, res) => {
	let userName = req.params.userName;
	let nameList = {};
	nameList.name = userName;
	fs.access('res.json', (err) => {
		if (!err) {
			fs.readFile('res.json', (err, data) => {
			if (err) throw err;
				let newData = data.toString();
				let resList = JSON.parse(newData);
				resList.push(nameList);
				fs.writeFile('res.json', JSON.stringify(resList), err=>{
					if (err) throw err;
					    res.send(`${userName} is added.`);
					});
				});

				}
		else {
			resList.push(nameList);
			fs.writeFile('res.json', JSON.stringify(resList), err => {
				if (err) throw err;
					res.send(`${userName} is added.`);	   
				})	

				}

			})
});

app.put('/create/:userName/:startDate/:startTime/:numHour', (req, res) =>{
	let userName = req.params.userName;
	let startDate = req.params.startDate;
	let startTime = req.params.startTime;
	let numHour = req.params.numHour;
	fs.readFile('res.json', (err, data)=>{
		if (err) throw err;
		let newData = data.toString();
		let resList = JSON.parse(newData);
		for(let i = 0; i< resList.length; i++){
			if(userName == resList[i].name){
				resList[i].startDate = startDate;
				resList[i].startTime = startTime;
				resList[i].numHour = numHour;
			}
		}
		resList.sort((res1, res2)=> {
			if(res1.startDate >res2.startDate) return 1;
			if(res1.startDate < res2.startDate) return -1;


			if(res1.startTime > res2.startTime) return 1;
			if(res1.startTime < res2.startTime) return -1;
			
		});
		fs.writeFile('res.json', JSON.stringify(resList), err=>{
			if(err) throw err;
			res.send(`${userName}'s reservation has created!!!`);
		})
	});
});


app.put('/update/:userName/:startDate/:startTime/:numHour', (req, res) =>{
	let userName = req.params.userName;
	let startDate = req.params.startDate;
	let startTime = req.params.startTime;
	let numHour = req.params.numHour;
	fs.readFile('res.json', (err, data)=>{
		if (err) throw err;
		let newData = data.toString();
		let resList = JSON.parse(newData);
		for(let i = 0; i< resList.length; i++){
			if(userName == resList[i].name){
				resList[i].startDate = startDate;
				resList[i].startTime = startTime;
				resList[i].numHour = numHour;
			}
		}
		fs.readFileSync('res.json', (err, data)=>{
			if (err) throw err;
			let newData = data.toString();
			let resList = JSON.parse(newData);

		});
		resList.sort((res1, res2)=> {
			if(res1.startDate >res2.startDate) return 1;
			if(res1.startDate < res2.startDate) return -1;

			if(res1.startTime > res2.startTime) return 1;
			if(res1.startTime < res2.startTime) return -1;
			
		});
		fs.writeFile('res.json', JSON.stringify(resList), err=>{
			if(err) throw err;
			res.send(`${userName}'s reservation has created!!!`);
		})
	});
});
app.delete('/delete/:userName', (req, res)=>{
	let userName = req.params.userName;
	fs.readFile('res.json', (err, data)=>{
		if(err) throw err;
		let newData = data.toString();
		let resList = JSON.parse(newData);
		for(let i = 0; i< resList.length; i++){
			if(userName == resList[i].name){
				resList.splice(i, 1);
			}
		}
		
		fs.writeFile('res.json', JSON.stringify(resList), err=>{
			if(err) throw err;
			res.send(`${userName}'s reservation has deleted!!!`);
		});

	});
});

app.get('/retrieve/:userName', (req, res)=>{
	let userName = req.params.userName;
	fs.readFile('res.json', (err, data)=>{
		if (err) throw err;
		let newData = data.toString();
		let resList = JSON.parse(newData);
		for(let i = 0; i < resList.length; i++){
			if(userName == resList[i].name){
				let nameList = resList[i];
				res.send(nameList);
			}
		}
	})
})
app.get('/getRes', (req, res)=>{
	fs.readFile('res.json', (err, data)=>{
		if (err) throw err;
		let newData = data.toString();
		let resList = JSON.parse(newData);
		res.send(resList);
	})
})



app.listen(port,()=>{
	console.log(`Listening on port: ${port}`)
});

