showFunction();
// make a constructor
function Book(name, author, type) {
	this.name = name;
	this.author = author;
	this.type = type
}

// display constructor
function Display() {

}

// add methods to display prototype
Display.prototype.add = function (book) {

	let html = `<button type="button" id="delButton" class="btn btn-warning btn-sm">Delete</button>`
	let lib = localStorage.getItem("librr");
	if (lib == null) {
		libObj = [];
	}
	else {
		libObj = JSON.parse(lib); 
	}
	libObj.push([book.name, book.author, book.type,html]);
	localStorage.setItem("librr", JSON.stringify(libObj));

	showFunction();
}
Display.prototype.clear = function () {
	let Libraryform = document.getElementById('Libraryform');
	Libraryform.reset();
}
Display.prototype.validate = function (book) {
	if (book.name.length > 2 && book.author.length > 2 && book.type!=null)
		return true;
	return false;

}
Display.prototype.show = function (type, showMessage) {
	let k = document.getElementById("message");
	k.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
	<strong>Message: </strong> ${showMessage}!
	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`

	setTimeout(() => {
		k.innerHTML = "";
	}, 4000);
}

// Add submit event listener
// eventlistener 1st-type 2nd-function
let Libraryform = document.getElementById('Libraryform');
Libraryform.addEventListener('submit', addthebook);


// forms reload itself after getting submit by default
// to prevent it use preventDefault
function addthebook(e) {
	console.log("This is add book");

	let name = document.getElementById('inputBook').value;
	let author = document.getElementById('inputAuthor').value;
	let type;

	let Fiction = document.getElementById('Fiction');
	let Poetry = document.getElementById('Poetry');
	let Programming = document.getElementById('Programming');

	if (Fiction.checked) {
		type = Fiction.value;
	}
	else if (Poetry.checked) {
		type = Poetry.value;
	}
	if (Programming.checked) {
		type = Programming.value;
	}

	let book = new Book(name, author, type);
	console.log(book);
	e.preventDefault();

	let display = new Display();
	if (display.validate(book)) {
		display.add(book);
		display.clear();
		display.show('success', 'your book has been added successfully');
	}
	else {
		display.show('danger', `you can't add this book`);
	}
}

function showFunction() {
	let lib = localStorage.getItem("librr");
	if (lib == null) {
		libObj = [];
	}
	else {
		libObj = JSON.parse(lib); // takes value from localstorage in string form and convert it to array form 
	}

	let p = "";
	libObj.forEach(function(element,index) {
		console.log(element);
		p+=`<tr>
				<th scope="row">${index+1}</th>
				<td>${element[0]}</td>
				<td>${element[1]}</td>
				<td>${element[2]}</td>
				<td id=${index} onclick="delFunction(this.id)">${element[3]}</td>
			</tr>`
	});
	let libElem = document.getElementById('tablebody');
    libElem.innerHTML = p;
}

// ADDING EVENT LISTENER TO THE BUTTON
function delFunction(index){
	let confirms = confirm("are you sure?");
	if(confirms==true){
		let lib = localStorage.getItem("librr");
		if (lib == null) {
			libObj = [];
		}
		else {
			libObj = JSON.parse(lib); 
		}
		// splice- 1st from which index 2nd to how many elements
		libObj.splice(index,1);
		localStorage.setItem("librr", JSON.stringify(libObj));
	}
	showFunction();
}    

let search = document.getElementById('srchbtn');
search.addEventListener('input',searchFunction);

function searchFunction(){
	let target = document.getElementById("tablebody").getElementsByTagName("tr");
	let inputVal = search.value.toLowerCase().split(" ").join("");
	console.log(inputVal);

	Array.from(target).forEach(function (element,index) {
		console.log(element,index);
		let first = element.getElementsByTagName('td')[0].innerText.toLowerCase();
		let second = element.getElementsByTagName('td')[1].innerText.toLowerCase();
		let third = element.getElementsByTagName('td')[2].innerText.toLowerCase();
		console.log(first,second,third);
		if (inputVal.length>0)
		{
			console.log(element.getElementsByTagName('td')[0].style.font);
			if(first.includes(inputVal)){
				element.getElementsByTagName('td')[0].style.color = 'red';
			}
			else{
				element.getElementsByTagName('td')[0].style.color = 'white';
			}
			if(second.includes(inputVal)){
				element.getElementsByTagName('td')[1].style.color = 'blue';
			}
			else{
				element.getElementsByTagName('td')[1].style.color = 'white';
			}
			if(third.includes(inputVal)){
				element.getElementsByTagName('td')[2].style.color = 'pink';
			}
			else{
				element.getElementsByTagName('td')[2].style.color = 'white';
			}
			if(first.includes(inputVal) || second.includes(inputVal) || third.includes(inputVal)){
				element.style.display = "table-row";
			}
			else{
				element.style.display = "none";
			}
		}
		else{
			showFunction();
		}
	});
}
