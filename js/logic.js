
const covid19Api = 'https://disease.sh/v2/countries?yesterday=false&allowNull=false';

async function getData(){
    let response = await fetch(covid19Api);

  if(response.ok){
    let json = await response.json();
   
    // Pass data in another function

    //set it to sessions
    sessionStorage.data = JSON.stringify(json);

	generateOption(json)
	// sometime later
   
  }else{
    console.log("HTTP-Error: " + response.status);
  }

  return response;
}

getData();

async function viewData(){
	const json = await sessionStorage.data

	const dataParsed = JSON.parse( sessionStorage.data )

	generateData(dataParsed)
}


// //session store
// // Store
// sessionStorage.setItem("lastname", "Smith");
// // Retrieve
// document.getElementById("result").innerHTML = sessionStorage.getItem("lastname");





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
