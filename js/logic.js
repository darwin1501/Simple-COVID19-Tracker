//today's data case per country
const covid19Data1 = 'https://disease.sh/v3/covid-19/countries?yesterday=false&allowNull=false';
//yesterday's data case per country
const covid19Data2 = 'https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=false';
//global data today
const covid19GlobalData1 = 'https://disease.sh/v3/covid-19/all?yesterday=false&allowNull=false';
//global data yesterday
const covid19GlobalData2 = 'https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=false';


async function getData(){

    let todaysData = await fetch(covid19Data1);

    let yesterdaysData = await fetch(covid19Data2);

    let globalTodayData = await fetch(covid19GlobalData1);

    let globalYesterdayData = await fetch(covid19GlobalData2);

    let responseArray = [todaysData, yesterdaysData]

  if((todaysData.ok && yesterdaysData.ok) && (globalTodayData.ok && globalYesterdayData.ok)){

  	let newData = await todaysData.json() 

    let oldData = await yesterdaysData.json();

    let globalNewData = await globalTodayData.json();

    let globalOldData =  await globalYesterdayData.json();
   
   //clear session storage
    sessionStorage.clear()
    //store in session
    sessionStorage.newData = JSON.stringify(newData);

    sessionStorage.oldData = JSON.stringify(oldData);

    sessionStorage.globalNewData = JSON.stringify(globalNewData);

    sessionStorage.globalOldData = JSON.stringify(globalOldData);

	generateOption(newData);

	distributeData();

  }else{

    // console.log("HTTP-Error: " + response.status);
    console.log('load error')

  }

  return responseArray;

}

getData();

const distributeData = (() => {

	const newDataParsed = JSON.parse( sessionStorage.newData );

	const oldDataParsed = JSON.parse( sessionStorage.oldData );

	const globalNewDataParsed = JSON.parse( sessionStorage.globalNewData );

	const globalOldDataParsed = JSON.parse( sessionStorage.globalOldData );

	getDetailedCase(newDataParsed, oldDataParsed, globalNewDataParsed, globalOldDataParsed);
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
const getDetailedCase = ((newData, oldData, globalNewData, globalOldData) => {


		let selectedCountry = document.getElementById('selection').value;

		let todaysData;

		let yesterdaysData;

		if(selectedCountry === 'global'){

			todaysData = globalNewData;

			yesterdaysData = globalOldData;

		}else{

			todaysData = newData.find(data => data.country === selectedCountry);

			yesterdaysData = oldData.find(data => data.country === selectedCountry);

		}
		//dougnut chart 1
		const activeCase = todaysActiveCase(todaysData, yesterdaysData, selectedCountry);
		//dougnut chart 1
		const recoveries = getTodaysRecoveries(todaysData, yesterdaysData, selectedCountry);
		//dougnut chart 1
		const deaths = getTodaysDeaths(todaysData, yesterdaysData, selectedCountry);
		//pie chart 2
		getPopulationsAndInfected(todaysData);
		//dougnut chart 3
		getOverallDetailedCase(todaysData, selectedCountry);
		//card 1 and 2
		getTestAndCritical(todaysData, selectedCountry);

		caseToday(activeCase, recoveries, deaths);
		
});

//prepare data in case today chart
const caseToday = ((data1, data2, data3)=>{

	//convert it to number

	const dataArray = [];
	
	dataArray.push(data1, data2, data3);

	console.log(`Case Today: ${dataArray}`);

	const type = 'doughnut';

	const bgColor = ['rgba(255, 206, 86, 1)', 'rgba(0, 230, 118, 1)', 'rgba(255,99,132,1)'];

	const labels = ['Active Case', 'Recovery', 'Deaths'];
		
	//req. type, data{labels, datasets{ data, bg-color}}, 

	generateChart(type, labels, dataArray, bgColor)


});

//charts config.
const generateChart = ((type, labels, data, bgColor)=>{
		//chart config
		//doughnut chart
	const doughnut = document.getElementById('doughnut');
	const doughnutConfig = new Chart(doughnut, {
	    type: type,
	    data: {
	        labels: labels,
	        datasets: [{
	            label: '# of data',
	            data: data,
	            backgroundColor: bgColor,
	            borderWidth: 1
	        }]
	    },
	    options: {
	        responsive: true, // Instruct chart js to respond nicely.
	        maintainAspectRatio: true,
	        cutoutPercentage: 50 // Add to prevent default behaviour of full-width/height 
	    }
	});

	doughnutConfig.update();
		//update chart
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
			//convert negative number into positive
			newCount = Math.abs(newCount);

			totalPercentage = Math.abs(totalPercentage);

			label = 'decrease';

		}

		return console.log(`${dataText} at ${country}: ${newCount} | ${totalPercentage.toFixed(2)}% ${label}`);
})
//Active Case
const todaysActiveCase = ((today, yesterday, country) =>{

		//format numbers
		const todayCasesFormated = new Intl.NumberFormat().format(today.todayCases);
		//format numbers
		const yesterdayCasesFormated = new Intl.NumberFormat().format(yesterday.todayCases);

		const todayCases = today.todayCases;

		const yesterdayCases = yesterday.todayCases;


		//Get the last update time of the data

		//milisecond
		const ms = today.updated;

		//convert milisecond of APIdata to date
		const updateTimeToday = new Date(ms);

		const dateToday = new Date();

		const getMinutesAPI = updateTimeToday.getMinutes();

		const getSecondsAPI = updateTimeToday.getSeconds();

		const getMinutesToday = dateToday.getMinutes();
		// subtract minutes to get the last update time of data
		let getMinDif = getMinutesAPI - getMinutesToday;

		let time;

		let timelbl;

		if(getMinDif < 0){

			getMinDif = Math.abs(getMinDif);

			if(getMinDif === 1){

				timelbl = 'minute';
			}

			time = getMinDif;

			timelbl = 'minutes';

		}else if(getMinDif === 1){

			timelbl = 'minute';

			time = getMinDif;

		}else if(getMinDif === 0){

			timelbl = 'seconds';

			time = getSecondsAPI;

		}else if(getSecondsAPI === 1){

			timelbl = 'second';

			time = getSecondsAPI;
		}

		console.log(`Todays total case at ${country}: ${todayCasesFormated}`);

		console.log(`Yesterdays total case at ${country}: ${yesterdayCasesFormated}`);

		const updateTime = document.getElementById('updateTime');

		// console.log(`Data Updated ${time} ${timelbl} ago`);

		updateTime.innerHTML = `Data Updated ${time} ${timelbl} ago`;

		//comparison
		const dataText = 'Active Case';

		// todays count, yesterday count, datatest, country;
		getPercentages(todayCases, yesterdayCases, dataText, country);

		return todayCases;

		// data to be return => type, labels, data, bgColor
		//return array
		

});


const getTodaysRecoveries = ((today, yesterday, country) =>{

		const todaysRecoveriesFormated = new Intl.NumberFormat().format(today.todayRecovered);

		const yesterdayRecoveriesFormated = new Intl.NumberFormat().format(yesterday.todayRecovered);

		const todaysRecoveries = today.todayRecovered;

		const yesterdaysRecoveries = yesterday.todayRecovered;

		console.log(`Todays recovery at ${country}: ${todaysRecoveriesFormated}`);

		console.log(`Yesterdays recovery at ${country}: ${yesterdayRecoveriesFormated}`);
		//comparison
		const dataText = 'Recovery';
		// todays count, yesterday count, datatest, country;
		getPercentages(todaysRecoveries, yesterdaysRecoveries, dataText, country);

		return todaysRecoveries

});

const getTodaysDeaths = ((today, yesterday, country) =>{

		const todayDeathsFormated = new Intl.NumberFormat().format(today.todayDeaths);

		const yesterdayDeathsFormated = new Intl.NumberFormat().format(yesterday.todayDeaths);

		const todayDeaths = today.todayDeaths;

		const yesterdayDeaths = yesterday.todayDeaths;

		console.log(`Todays deaths at ${country}: ${todayDeathsFormated}`);

		console.log(`Yesterdays deaths at ${country}: ${yesterdayDeathsFormated}`);
		//comparison
		const dataText = 'Deaths';

		getPercentages(todayDeaths, yesterdayDeaths, dataText, country);

		return todayDeaths;
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

		//return array

});

//get total active case, recovery, and deaths
const getOverallDetailedCase = ((data, country) =>{

		const getActiveCase = data.active;

		const getRecovered = data.recovered;

		const getDeaths = data.deaths;

		console.log(`${country} || Active: ${getActiveCase} | Recovered: ${getRecovered} | Deaths ${getDeaths}`);

		//return array

});

//get test conducted and critical
const getTestAndCritical = ((data, country) =>{

		const getTest = data.tests;

		const getCritical = data.critical;

		console.log(`${country} || Test Conducted: ${getTest} | Critical: ${getCritical}`);
})




