
const covid19Data1 = 'https://disease.sh/v3/covid-19/countries?yesterday=false&allowNull=false';

const covid19Data2 = 'https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=false';


async function getData(){

    let todaysData = await fetch(covid19Data1);

    let yesterdaysData = await fetch(covid19Data2);

    let responseArray = [todaysData, yesterdaysData]

  if(todaysData.ok && yesterdaysData.ok ){

  	let newData = await todaysData.json() 

    let oldData = await yesterdaysData.json();
   
   //clear session storage
    sessionStorage.clear()

    //store in session
    sessionStorage.newData = JSON.stringify(newData);
    sessionStorage.oldData = JSON.stringify(oldData);

	generateOption(newData);

   
  }else{
    console.log("HTTP-Error: " + response.status);
  }

  return responseArray;
}

getData();


const distributeData = (() => {

	const newDataParsed = JSON.parse( sessionStorage.newData )
	const oldDataParsed = JSON.parse( sessionStorage.oldData )

	getDetailedCase(newDataParsed, oldDataParsed)
})




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

//detailed case today compared to yeterday
const getDetailedCase = ((newData, oldData) => {

		const selectedCountry = document.getElementById('selection').value

		const todaysData = newData.find(xyz => xyz.country === selectedCountry)

		const yesterdaysData = oldData.find(xyz => xyz.country === selectedCountry)
		//total case today
		// console.log(`Today Cases at ${todaysData.country} : ${todaysData.todayCases}`)
		// //total recovery today
		// console.log(`Todays Recovery at ${todaysData.country} : ${todaysData.todayRecovered}`)
		// //total deaths today
		// console.log(`Todays Death at ${todaysData.country}  : ${todaysData.todayDeaths}`)
		//total case
		console.log(`Todays total case at ${todaysData.country}: ${todaysData.cases}`)
		//yesterday
		console.log(`Yesterdays total case at ${yesterdaysData.country}: ${yesterdaysData.cases}`)
		
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
