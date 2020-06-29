
const covid19Api = 'https://disease.sh/v2/countries?yesterday=false&allowNull=false';

async function getData(){

	let response = await fetch(covid19Api);

	if (response.ok) { // if HTTP-status is 200-299

	  let json = await response.json();
	  //run generateOption
	  return json

	  // generateOption(json)
	  
	} else {
	  console.log("HTTP-Error: " + response.status)
	}
}

//run getData


const pendingData = Promise.resolve(getData()).then(function(data) {
	generateOption(data)
	generateData(data)
	}, function(data) {
		console.log('error');
	})
// Promise.resolve(getData()).then(function(data) {
// 	return data
// }, function(data) {
// 	console.log('error');
// })



// console.log(getData())
//creates country dropdown list in selection
const generateOption = ((data) => {

	const select = document.getElementById('selection');

	for (let i = 0; i < data.length; i++) {

		const country = data[i].country;

		const option = document.createElement('option');

		const txtCountry = document.createTextNode(country);

		option.setAttribute('value', country);

		option.appendChild(txtCountry);

		select.appendChild(option);

	};
})

const generateData = ((data) => {

		const selectedCountry = document.getElementById('selection').value

		// console.log(selectedCountry)

		const findCountryName = data.find(xyz => xyz.country === selectedCountry)

		console.log(findCountryName.cases)

		
})

// const rawData = ((data) => {
// 		return data
// })




// //ES6
// const findName = ((name) => {
// 	let data = json.find(xyz => xyz.fullname === name)
// 	return data
// })
// const result = findName('Jhon Doe');
// //destructuring objects
// const {fullname: name ,current_item: item} = result;

// console.log(`${name} has the ${item}`)



//display all recovery
// const displayData = ((json) => {
// 	const recovery = json;
// 	return console.log(`Total Recovery ${recovery}`)
// })
