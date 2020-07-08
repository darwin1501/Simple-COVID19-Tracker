//today's data
const covid19Data1 = 'https://disease.sh/v3/covid-19/countries?yesterday=false&allowNull=false';
//yesterday's data
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

		const selectedCountry = document.getElementById('selection').value;

		const todaysData = newData.find(data => data.country === selectedCountry);

		const yesterdaysData = oldData.find(data => data.country === selectedCountry);
		
		todaysDetailedCase(todaysData, yesterdaysData);

		getTodaysRecoveries(todaysData, yesterdaysData);

		getTodaysDeaths(todaysData, yesterdaysData);

		getPopulationsAndInfected(todaysData);
		
});


const getPercentages = ((today, yesterday, dataText, country) =>{

		//get active case and its percentage 

		let newCount = today - yesterday;

		let divided = newCount / today;

		let totalPercentage = divided * 100;

		let label = '';

		//condition to display correct value

		if(today > yesterday){

			 label = 'increase';

		}else if(today < yesterday){

			label = 'decrease';

		}else if (today == 0 && yesterday == 0){

			label = ' ';
		}

		if(newCount === 0 && today === 0){

			newCount = 0;

			totalPercentage = 0;

			label = ' ';

		}else if(newCount === 0 || today === 0){

			newCount = 0;

			totalPercentage = 100;

			label = 'decrease';

		}else if(newCount < 0){

			newCount = Math.abs(newCount);

			totalPercentage = Math.abs(totalPercentage);

			label = 'decrease';

		}

		return console.log(`${dataText} at ${country}: ${newCount} | ${totalPercentage.toFixed(2)}% ${label}`);
})

const todaysDetailedCase = ((today,  yesterday) =>{

		//format numbers
		const todayCasesFormated = new Intl.NumberFormat().format(today.todayCases);
		//format numbers
		const yesterdayCasesFormated = new Intl.NumberFormat().format(yesterday.todayCases);

		const todayCases = today.todayCases;

		const yesterdayCases = yesterday.todayCases;

		console.log(`Todays total case at ${today.country}: ${todayCasesFormated}`);

		console.log(`Yesterdays total case at ${yesterday.country}: ${yesterdayCasesFormated}`);
		//comparison
		const dataText = 'Active Case';

		// todays count, yesterday count, datatest, country;
		getPercentages(todayCases, yesterdayCases, dataText, today.country);

});


const getTodaysRecoveries = ((today, yesterday) =>{

		const todaysRecoveriesFormated = new Intl.NumberFormat().format(today.todayRecovered);

		const yesterdayRecoveriesFormated = new Intl.NumberFormat().format(yesterday.todayRecovered);

		const todaysRecoveries = today.todayRecovered;

		const yesterdaysRecoveries = yesterday.todayRecovered;

		console.log(`Todays recovery at ${today.country}: ${todaysRecoveriesFormated}`);

		console.log(`Yesterdays recovery at ${yesterday.country}: ${yesterdayRecoveriesFormated}`);
		//comparison
		const dataText = 'Recovery';
		// todays count, yesterday count, datatest, country;
		getPercentages(todaysRecoveries, yesterdaysRecoveries, dataText, today.country);

});

const getTodaysDeaths = ((today, yesterday) =>{

		const todayDeathsFormated = new Intl.NumberFormat().format(today.todayDeaths);

		const yesterdayDeathsFormated = new Intl.NumberFormat().format(yesterday.todayDeaths);

		const todayDeaths = today.todayDeaths;

		const yesterdayDeaths = yesterday.todayDeaths;

		console.log(`Todays deaths at ${today.country}: ${todayDeathsFormated}`);

		console.log(`Yesterdays deaths at ${yesterday.country}: ${yesterdayDeathsFormated}`);
		//comparison
		const dataText = 'Deaths';

		getPercentages(todayDeaths, yesterdayDeaths, dataText, today.country);
})

const getPopulationsAndInfected = ((data) =>{

		const population = data.population;

		const infected = data.cases;

		const safePopulation = population - infected;

		//format numbers
		const populationFormated = new Intl.NumberFormat().format(population);

		const infectedFormated = new Intl.NumberFormat().format(infected);

		const safePopulationFormated = new Intl.NumberFormat().format(safePopulation);

		//get percentage of total infected in population
		const dividedInfection = infected / population ;
		//convert into percentage
		const infectedPercent = dividedInfection * 100;

		//get percentage of total not infected in population
		const dividedSafePopulation = safePopulation / population;
		//convert into percentage
		const safePopulationPercent = dividedSafePopulation * 100;

		console.log(`Total population: ${populationFormated}`);
		console.log(`Not infected ${safePopulationFormated} | infected: ${infectedFormated}`);
		console.log(`${safePopulationPercent.toFixed(2)}% of the population are safe.`);

		if(safePopulationPercent.toFixed(2) == 99.99){

		console.log(`${infectedPercent.toFixed(4)}% of the population are infected.`);

		}else{

		console.log(`${infectedPercent.toFixed(2)}% of the population are infected.`);
		}

})





