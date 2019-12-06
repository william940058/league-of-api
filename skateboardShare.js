let request = new XMLHttpRequest();

function getUser(){
	let user = document.getElementById("userName").value;
	document.querySelector("#userMessage").innerHTML = "Add successfully!!";
	url = "http://127.0.0.1:3000/getUser/" + user
	request.open("POST", url, true);

	request.send();
}

function createUser(){
	document.querySelector("#createMessage").innerHTML = "Create successfully!!";
	let user = document.getElementById("user").value;
	let startdate = document.getElementById("startDate").value;
	let starttime = document.getElementById("startTime").value;
	let numhours = document.getElementById("numHours").value;
	let url = "http://127.0.0.1:3000/create/" + user + "/" + startdate + "/" + starttime + "/" + numhours;
	request.open("PUT", url, true);
	request.send();
}

function updateUser(){
	document.querySelector("#updateMessage").innerHTML = "Updatee successfully!!";
	let user = document.getElementById("user").value;
	let startdate = document.getElementById("startDate").value;
	let starttime = document.getElementById("startTime").value;
	let numhours = document.getElementById("numHours").value;
	let url = "http://127.0.0.1:3000/update/" + user + "/" + startdate + "/" + starttime + "/" + numhours;
	request.open("PUT", url, true);
	
	request.send();
}

function deleteUser(){
	document.querySelector("#deleteMessage").innerHTML = "Delete successfully!!";
	let name = document.querySelector("#deleteInfo").value;
	let url = "http://127.0.0.1:3000/delete/" + name
	request.open("DELETE", url, true);
	request.send();

}

function retrieveUser(){
	document.querySelector("#retrieveMessage").innerHTML = "Retrieve successfully!!";
	let user = document.getElementById("retrieveInfo").value;
	let url = "http://127.0.0.1:3000/retrieve/" + user
	let data;
	request.open("GET", url, true);
	request.onload = function() {
		data = JSON.parse(this.response);
		console.log(data);
		document.querySelector("#tableName1").innerHTML = data.name;
		document.querySelector("#tableDate1").innerHTML = data.startDate;
		document.querySelector("#tableTime1").innerHTML = data.startTime;
		document.querySelector("#tableHour1").innerHTML = data.numHour;

		
	}
	request.send();
}

function getRes(){
	document.querySelector("#getMessage").innerHTML = "Get successfully!!";
	let table = document.querySelector("#tab");
	for(let i = table.rows.length - 1; i > 0; i--)
	{
	    table.deleteRow(i);
	}
	let data;
	request.open("GET", "http://127.0.0.1:3000/getRes", true);
	request.onload = function() {
		data = JSON.parse(this.response);
		console.log(data);

		for(i = 0; i < data.length; i++){
			
				let body = document.querySelector("#tab");

				let row = body.insertRow();
				let cell = row.insertCell(0);
				let cell1 = row.insertCell(0);
				let cell2 = row.insertCell(0);
				let cell3 = row.insertCell(0);
			
				cell3.innerHTML = data[i].name;
				cell2.innerHTML = data[i].startDate;
				cell1.innerHTML = data[i].startTime;
				cell.innerHTML = data[i].numHour;

		}

		
	}
	request.send();
}