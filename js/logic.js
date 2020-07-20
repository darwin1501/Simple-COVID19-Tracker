//today's data case per country
const covid19Data1 = 'https://disease.sh/v3/covid-19/countries?yesterday=false&allowNull=false';
//yesterday's data case per country
const covid19Data2 = 'https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=false';
//global data today
const covid19GlobalData1 = 'https://disease.sh/v3/covid-19/all?yesterday=false&allowNull=false';
//global data yesterday
const covid19GlobalData2 = 'https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=false';


const selection = document.getElementsByClassName('selection-container');

const todayChart = document.getElementById('case-today-chart');

const populationChart = document.getElementById('population-chart');

const caseSummaryChart = document.getElementById('case-summary');

const subDataContainer = document.getElementsByClassName('sub-data-container');

//hide all elements that is not ready
selection[0].classList.add("hidden");

todayChart.classList.add("hidden");

populationChart.classList.add("hidden");

caseSummaryChart.classList.add("hidden");

for (let element = 0; element < subDataContainer.length; element++) {

		subDataContainer[element].classList.add('hidden');

	};




async function getData(){

	const loading = document.getElementsByClassName('loading');

	const selection = document.getElementsByClassName('selection-container');

	const todayChart = document.getElementById('case-today-chart');

	const populationChart = document.getElementById('population-chart');

	const caseSummaryChart = document.getElementById('case-summary');

	const subDataContainer = document.getElementsByClassName('sub-data-container');

    let todaysData = await fetch(covid19Data1);

    let yesterdaysData = await fetch(covid19Data2);

    let globalTodayData = await fetch(covid19GlobalData1);

    let globalYesterdayData = await fetch(covid19GlobalData2);

    // let responseArray = [todaysData, yesterdaysData]

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

    selection[0].classList.remove('hidden');

    todayChart.classList.remove("hidden");

	populationChart.classList.remove("hidden");

	caseSummaryChart.classList.remove("hidden");

	//hide all loading element
	for (let element = 0; element < loading.length; element++) {

		loading[element].classList.add('hidden');

	};

	for (let element = 0; element < subDataContainer.length; element++) {

		subDataContainer[element].classList.remove('hidden');

	};

	generateOption(newData);

	distributeData();

  }else{

    // console.log("HTTP-Error: " + response.status);

  }

  // return responseArray;

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

		const activeCase = todaysActiveCase(todaysData, yesterdaysData, selectedCountry);

		const recoveries = getTodaysRecoveries(todaysData, yesterdaysData, selectedCountry);

		const deaths = getTodaysDeaths(todaysData, yesterdaysData, selectedCountry);

		const populationDetails = getPopulationsAndInfected(todaysData);

		const summaryOfCase = getOverallDetailedCase(todaysData, selectedCountry); 

		//set id for two different doughnut chart

		getTestAndCritical(todaysData, selectedCountry);
		//predare data in charts
		caseToday(activeCase, recoveries, deaths);
		//predare data in charts
		population(populationDetails);
		//predare data in charts
		caseSummary(summaryOfCase);

		
});

//prepare data in new case update today chart
const caseToday = ((data1, data2, data3,)=>{

	const dataArray = [];
	
	dataArray.push(data1, data2, data3);

	// console.log(`Case Today: ${dataArray}`);

	const type = 'doughnut';

	const bgColor = ['rgba(255, 206, 86, 1)', 'rgba(0, 230, 118, 1)', 'rgba(255,99,132,1)'];

	const labels = ['Active Case', 'Recovery', 'Deaths'];

	const elementId = 'case-today-chart';		
	//req. type, data{labels, datasets{ data, bg-color}}, 
	generateChart(type, labels, dataArray, bgColor, elementId)


});

//prepare data in population details chart
const population = ((array) =>{

	const dataArray = array

	const type = 'pie';

	const bgColor = ['rgba(154, 153, 254, 1)', 'rgba(255, 206, 89, 1)'];

	const labels = ['uninfected', 'infected'];

	const elementId = 'population-chart';

	//req. type, data{labels, datasets{ data, bg-color}}, 
	generateChart(type, labels, dataArray, bgColor, elementId);

})

//prepare data in population details chart
const caseSummary = ((array) =>{

	const dataArray = array

	const type = 'doughnut';

	const bgColor = ['rgba(255, 206, 86, 1)', 'rgba(0, 230, 118, 1)', 'rgba(255,99,132,1)'];

	const labels = ['Active Case', 'Recovery', 'Deaths'];

	const elementId = 'case-summary';

	//req. type, data{labels, datasets{ data, bg-color}}, 
	generateChart(type, labels, dataArray, bgColor, elementId);

})



//reusable chart function
let generateChart = ((type, labels, data, bgColor, id)=>{
		//chart config
		//doughnut chart
	let chart = document.getElementById(id);
	let chartConfig = new Chart(chart, {
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
	        maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
	    }
	});
	//update chart
	chartConfig.update();
		
});


const getPercentages = ((today, yesterday, dataText, country, lblId) =>{

		//get active case and its percentage 

		let newCount = today - yesterday;

		let divided = newCount / today;

		let totalPercentage = divided * 100;

		let label = '';

		//condition to display correct value

		if(today > yesterday){

			 label = 'increase';

			 lblId.classList.add('green-txt');

			 lblId.classList.remove('red-txt');

		}else if(today < yesterday){

			label = 'decrease';

			lblId.classList.add('red-txt');

			lblId.classList.remove('green-txt');

		}else if (today == 0 && yesterday == 0){

			label = ' ';

			lblId.classList.remove('red-txt');

			lblId.classList.remove('green-txt');
		}

		if(newCount === 0 && today === 0){

			newCount = 0;

			totalPercentage = 0;

			label = ' ';

			lblId.classList.remove('red-txt');

			lblId.classList.remove('green-txt');

		}else if(newCount === 0 || today === 0){

			newCount = 0;

			totalPercentage = 100;

			label = 'decrease';

			lblId.classList.add('red-txt');
			
			lblId.classList.remove('green-txt');

		}else if(newCount < 0){
			//convert negative number into positive
			newCount = Math.abs(newCount);

			totalPercentage = Math.abs(totalPercentage);

			label = 'decrease';

			lblId.classList.add('red-txt');
			
			lblId.classList.remove('green-txt');

		}
		//format the percentage number
		const pcFormated = new Intl.NumberFormat().format(totalPercentage.toFixed(2));

		lblId.innerHTML = `(${pcFormated}% ${label})`;
})
//Active Case
const todaysActiveCase = ((today, yesterday, country) =>{

		//format numbers
		const todayCasesFormated = new Intl.NumberFormat().format(today.todayCases);
		//format numbers
		const yesterdayCasesFormated = new Intl.NumberFormat().format(yesterday.todayCases);

		const todayCases = today.todayCases;

		const yesterdayCases = yesterday.todayCases;

		//select element in html
		const lblId = document.getElementById('active-case-lbl');

		const dataId = document.getElementById('active-case-data');

		dataId.innerHTML = todayCasesFormated;

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

		let time = getMinDif;

		let timelbl = 'minutes';

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

		// console.log(`Todays total case at ${country}: ${todayCasesFormated}`);

		// console.log(`Yesterdays total case at ${country}: ${yesterdayCasesFormated}`);

		const updateTime = document.getElementById('updateTime');

		// console.log(`Data Updated ${time} ${timelbl} ago ${getMinDif}`);

		updateTime.innerHTML = `Data Updated ${time} ${timelbl} ago`;

		//comparison
		const dataText = 'Active Case';

		// todays count, yesterday count, datatest, country;
		getPercentages(todayCases, yesterdayCases, dataText, country, lblId);

		return todayCases;

		// data to be return => type, labels, data, bgColor
		//return array
		

});


const getTodaysRecoveries = ((today, yesterday, country) =>{

		const todaysRecoveriesFormated = new Intl.NumberFormat().format(today.todayRecovered);

		const yesterdayRecoveriesFormated = new Intl.NumberFormat().format(yesterday.todayRecovered);

		const todaysRecoveries = today.todayRecovered;

		const yesterdaysRecoveries = yesterday.todayRecovered;

		//select element in html
		const lblId = document.getElementById('recovery-lbl');

		const dataId = document.getElementById('recovery-data');

		dataId.innerHTML = todaysRecoveriesFormated;

		// console.log(`Todays recovery at ${country}: ${todaysRecoveriesFormated}`);

		// console.log(`Yesterdays recovery at ${country}: ${yesterdayRecoveriesFormated}`);
		//comparison
		const dataText = 'Recovery';
		// todays count, yesterday count, datatest, country;
		getPercentages(todaysRecoveries, yesterdaysRecoveries, dataText, country, lblId);

		return todaysRecoveries

});

const getTodaysDeaths = ((today, yesterday, country) =>{

		const todayDeathsFormated = new Intl.NumberFormat().format(today.todayDeaths);

		const yesterdayDeathsFormated = new Intl.NumberFormat().format(yesterday.todayDeaths);

		const todayDeaths = today.todayDeaths;

		const yesterdayDeaths = yesterday.todayDeaths;

		//select element in html
		const lblId = document.getElementById('deaths-lbl');

		const dataId = document.getElementById('deaths-data');

		dataId.innerHTML = todayDeathsFormated;
		// console.log(`Todays deaths at ${country}: ${todayDeathsFormated}`);

		// console.log(`Yesterdays deaths at ${country}: ${yesterdayDeathsFormated}`);
		//comparison
		const dataText = 'Deaths';

		getPercentages(todayDeaths, yesterdayDeaths, dataText, country, lblId);

		return todayDeaths;
})

const getPopulationsAndInfected = ((data) =>{

		const population = data.population;

		const infected = data.cases;

		const safePopulation = population - infected;

		const dataArray = [safePopulation, infected];

		const populationTxt = document.getElementById('population-data');

		const unInfectedTxt = document.getElementById('uninfected-data');

		const infectedTxt = document.getElementById('infected-data');

		//format numbers

		//total population
		const populationFormated = new Intl.NumberFormat().format(population);
		//total infected
		const infectedFormated = new Intl.NumberFormat().format(infected);
		//total uninfected
		const safePopulationFormated = new Intl.NumberFormat().format(safePopulation);

		//get percentage of total infected in population
		const dividedInfection = infected / population ;
		//convert into percentage
		const infectedPercent = dividedInfection * 100;

		//get percentage of total not infected in population
		const dividedSafePopulation = safePopulation / population;
		//convert into percentage
		const safePopulationPercent = dividedSafePopulation * 100;

		// console.log(`Total population: ${populationFormated}`);
		// console.log(`Not infected ${safePopulationFormated} | infected: ${infectedFormated}`);
		// console.log(`${safePopulationPercent.toFixed(2)}% of the population are safe.`);

		let unInfectedPc = safePopulationPercent.toFixed(2)

		let infectedPc = infectedPercent.toFixed(2)

		if(safePopulationPercent.toFixed(2) == 100.00){

			unInfectedPc = safePopulationPercent.toFixed(4)

			infectedPc = infectedPercent.toFixed(4)

		}else if(safePopulationPercent.toFixed(2) == 99.99){

		// console.log(`${infectedPercent.toFixed(4)}% of the population are infected.`);

		infectedPc = infectedPercent.toFixed(4)

		}else{

		// console.log(`${infectedPercent.toFixed(2)}% of the population are infected.`);

		infectedPc = infectedPercent.toFixed(2)

		}

		populationTxt.innerHTML = `Total Population: ${populationFormated}`;

		unInfectedTxt.innerHTML = `${safePopulationFormated} (${unInfectedPc}%)`;

		infectedTxt.innerHTML = `${infectedFormated} (${infectedPc}%)`;

		return dataArray

});

//get total active case, recovery, and deaths
const getOverallDetailedCase = ((data, country) =>{

		const getActiveCase = data.active;

		const getRecovered = data.recovered;

		const getDeaths = data.deaths;

		const dataArray = [getActiveCase, getRecovered, getDeaths];

		const casesFormated = new Intl.NumberFormat().format(data.cases);

		const totalCaseLbl = document.getElementById('total-case');

		// console.log(`${country} || Active: ${getActiveCase} | Recovered: ${getRecovered} | Deaths ${getDeaths}`);

		totalCaseLbl.innerHTML = `Total Case: ${casesFormated}`;

		return dataArray

});

//get test conducted and critical
const getTestAndCritical = ((data, country) =>{

		const getTest = data.tests;

		const getCritical = data.critical;

		//format numbers

		const testFormated = new Intl.NumberFormat().format(getTest);

		const criticalFormated = new Intl.NumberFormat().format(getCritical);

		const criticalLbl = document.getElementById('critical');

		const testConductedLbl = document.getElementById('test-conducted');

		criticalLbl.innerHTML = `Critical: ${criticalFormated}`;

		testConductedLbl.innerHTML = `Test Conducted: ${testFormated}`;

		// console.log(`${country} || Test Conducted: ${getTest} | Critical: ${getCritical}`);
})




