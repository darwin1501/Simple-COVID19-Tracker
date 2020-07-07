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

		getPopulationsAndInfected(todaysData);
		
});


const todaysDetailedCase = ((today,  yesterday) =>{

		//format numbers
		const todayCasesFormated = new Intl.NumberFormat().format(today.todayCases);

		const yesterdayCasesFormated = new Intl.NumberFormat().format(yesterday.todayCases);

		console.log(`Todays total case at ${today.country}: ${todayCasesFormated}`);

		console.log(`Yesterdays total case at ${yesterday.country}: ${yesterdayCasesFormated}`);

		//get active case and its percentage

		let addedCase = today.todayCases - yesterday.todayCases;

		const divided = addedCase / today.todayCases;

		let totalPercentage = divided * 100;

		let label = '';

		//condition to display correct value

		if(today.todayCases > yesterday.todayCases){

			 label = 'increase';

		}else if(today.todayCases < yesterday.todayCases){

			label = 'decrease';

		}else if (today.todayCases == 0 && yesterday.todayCases == 0){

			label = ' ';
		}

		if(addedCase === 0 && today.todayCases === 0){

			addedCase = 0;

			totalPercentage = 0;

			label = ' ';

		}else if(addedCase === 0 || today.todayCases === 0){

			addedCase = 0;

			totalPercentage = 100;

			label = 'decrease';

		}else if(addedCase < 0){

			addedCase = Math.abs(addedCase);

			totalPercentage = Math.abs(totalPercentage);

			label = 'decrease';

		}

		console.log(`New Cases Added today at ${today.country}: ${addedCase} | ${totalPercentage.toFixed(2)}% ${label}`);

});


const getTodaysRecoveries = ((today, yesterday) =>{

		const todaysRecoveriesFormated = new Intl.NumberFormat().format(today.todayRecovered);

		const yesterdayRecoveriesFormated = new Intl.NumberFormat().format(yesterday.todayRecovered);

		console.log(`Todays recovery at ${today.country}: ${todaysRecoveriesFormated}`);

		console.log(`Yesterdays recovery at ${yesterday.country}: ${yesterdayRecoveriesFormated}`);

		// const todaysDeathsFormated = new Intl.NumberFormat().format(today.todayDeaths);

		// const yesterdayDeathsFormated = new Intl.NumberFormat().format(yesterday.todayDeaths);

		//get todays recoveries and its percentage

		let newRecoveries = today.todayRecovered - yesterday.todayRecovered;

		const divided = newRecoveries / today.todayCases;

		let totalPercentage = divided * 100;

		let label = '';

		//condition to display correct value

		if(today.todayRecovered > yesterday.todayRecovered){

			 label = 'increase';

		}else if(today.todayRecovered < yesterday.todayRecovered){

			label = 'decrease';

		}else if (today.todayRecovered == 0 && yesterday.todayRecovered == 0){

			label = ' ';
		}

		if(newRecoveries === 0 && today.todayRecovered === 0){

			newRecoveries = 0;

			totalPercentage = 0;

			label = ' ';

		}else if(newRecoveries === 0 || today.todayRecovered === 0){

			newRecoveries = 0;

			totalPercentage = 100;

			label = 'decrease';

		}else if(newRecoveries < 0){

			newRecoveries = Math.abs(newRecoveries);

			newRecoveries = new Intl.NumberFormat().format(newRecoveries);

			totalPercentage = Math.abs(totalPercentage);

			label = 'decrease';

		}

		console.log(`New Recovery Added today at ${today.country}: ${newRecoveries} | ${totalPercentage.toFixed(2)}% ${label}`);
});



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





