
//global charts

 var doughnutOne = document.getElementById('case-today-chart');
 var doughnutOneConfig = new Chart(doughnutOne, {
    type: 'doughnut',
    data: {
        labels: ['data-1', 'data-2', 'data-3'],
        datasets: [{
            label: '# of data',
            data: [0, 0, 0],
            backgroundColor: ['rgba(0, 230, 118, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255,99,132,1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: true,
        cutoutPercentage: 50 
    }
});

 var pie = document.getElementById('population-chart');
 var pieConfig = new Chart(pie, {
    type: 'pie',
    data: {
        labels: ['data-1', 'data-2'],
        datasets: [{
            label: '# of data',
            data: [0, 0],
            backgroundColor: ['rgba(154, 153, 254, 1)', 'rgba(255, 206, 89, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: true,
        cutoutPercentage: 0 
    }
});

 var doughnutTwo = document.getElementById('case-summary');
 var doughnutTwoConfig = new Chart(doughnutTwo, {
    type: 'doughnut',
    data: {
        labels: ['data-1', 'data-2', 'data-3'],
        datasets: [{
            label: '# of data',
            data: [0, 0, 0],
            backgroundColor: ['rgba(0, 230, 118, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255,99,132,1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: true,
        cutoutPercentage: 50 // Add to prevent default behaviour of full-width/height 
    }
});

var doughnutContainer = document.getElementsByClassName('doughnut-chart-container');

var pieContainer = document.getElementsByClassName('pie-chart-container');
//hide all chart while waiting the data
doughnutContainer[0].classList.add('hidden');

doughnutContainer[1].classList.add('hidden');

pieContainer[0].classList.add('hidden');

//check theme
const themeChecker = (()=>{

if(localStorage.getItem('darkmode') === 'on'){

	const value = document.getElementById("darkmode-btn").value
    //card
    const cards = document.getElementsByClassName('card');
    //html
    const html = document.querySelector('html');
    //body
    const body = document.querySelector('body');
    //header
    const headerTxt = document.getElementsByClassName('header-txt');

    const subTxt = document.getElementsByClassName('sub-txt');

    const txtLink = document.getElementsByClassName('txt-link');

    const controlLbl = document.getElementsByClassName('control-lbl');

    const selection = document.getElementById('selection');
    //labels in chart
    const chartLbl = document.getElementsByClassName('chart-lbl');

    const footerTxt = document.querySelector('h3');

    const footerBrd = document.querySelector('footer');

    const divider = document.getElementsByClassName('divider');

    const dividerSm = document.getElementsByClassName('divider-sm');

    const footerBtn = document.getElementsByClassName('footer-btn');

    const subDataLbl = document.getElementsByClassName('sub-data-lbl');

    const dataTxt = document.getElementsByClassName('data-txt');

    const label = document.getElementsByClassName('label');

	document.getElementById("darkmode-btn").click();

	localStorage.setItem('darkmode', 'on');

    // console.log(`darkmode ${localStorage.getItem('darkmode')}`);

    document.getElementById("darkmode-btn").value = 'off';
    //loop all cards 
    for (let cardCount = 0; cardCount < cards.length; cardCount++) {
    	// console.log(cards[cardCount]);
    	cards[cardCount].classList.remove('card-lht');

    	cards[cardCount].classList.add('card-drk');
    };

    html.classList.add('html-bg-drk');

    html.classList.remove('html-bg-lht');

    body.classList.add('body-bg-drk');

    body.classList.remove('body-bg-lht');

    headerTxt[0].classList.add('header-txt-drk');

    headerTxt[0].classList.remove('header-txt-lht');

    subTxt[0].classList.add('sub-txt-drk');

    subTxt[0].classList.remove('sub-txt-lht');

    subTxt[1].classList.add('sub-txt-drk');

    subTxt[1].classList.remove('sub-txt-lht');

    txtLink[0].classList.add('txt-link-drk');

    txtLink[0].classList.remove('txt-link-lht');

    txtLink[1].classList.add('txt-link-drk');

    txtLink[1].classList.remove('txt-link-lht');

    controlLbl[0].classList.add('control-lbl-drk');

    controlLbl[0].classList.remove('control-lbl-lht');

    selection.classList.add('selection-drk');

    selection.classList.remove('selection-lht');

    divider[0].classList.add('divider-drk');

    divider[0].classList.remove('divider-lht');

    footerBtn[0].classList.add('footer-btn-drk');

    footerBtn[0].classList.remove('footer-btn-lht');
    //loop all small label
    for (let smallLblCount = 0; smallLblCount < label.length; smallLblCount++) {
    	    label[smallLblCount].classList.add('label-drk');

   			label[smallLblCount].classList.remove('label-lht');
    };
    //loop all data-txt 
    for (let dataTxtCount = 0; dataTxtCount < dataTxt.length; dataTxtCount++) {
    	// console.log(cards[cardCount]);
    	dataTxt[dataTxtCount].classList.remove('data-txt-lht');

    	dataTxt[dataTxtCount].classList.add('data-txt-drk');
    };
    //loop all sub label
    for (let subLblCount = 0; subLblCount < subDataLbl.length; subLblCount++) {
    	// console.log(cards[cardCount]);
    	subDataLbl[subLblCount].classList.add('subdata-lbl-drk');

    	subDataLbl[subLblCount].classList.remove('subdata-lbl-lht');
    };
    //loop all small divisions 
    for (let dividerSmCount = 0; dividerSmCount < dividerSm.length; dividerSmCount++) {
    	// console.log(cards[cardCount]);
    	dividerSm[dividerSmCount].classList.remove('divider-sm-lht');

    	dividerSm[dividerSmCount].classList.add('divider-sm-drk');
    };
	//loop all chart-lbl
    for (let lblCount = 0; lblCount < chartLbl.length; lblCount++) {
    	// console.log(cards[cardCount]);
    	chartLbl[lblCount].classList.remove('chart-lbl-lht');

    	chartLbl[lblCount].classList.add('chart-lbl-drk');
    };

    footerTxt.classList.add('footer-txt-drk');

    footerTxt.classList.remove('footer-txt-lht');

    footerBrd.classList.add('footer-drk');

    footerBrd.classList.remove('footer-lht');

	}
})

const body = document.querySelector('body');

body.addEventListener("load", themeChecker());

// add ms to request url to force browser to get new request and to avoid caching of data
const miliSeconds = Date.now()
//get API request
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
//today's data case per country
const covid19Data1 = `https://disease.sh/v3/covid-19/countries?yesterday=false&allowNull=false?rnd=${miliSeconds}`;
//yesterday's data case per country
const covid19Data2 = `https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=false?rnd=${miliSeconds}`;
//global data today
const covid19GlobalData1 = `https://disease.sh/v3/covid-19/all?yesterday=false&allowNull=false?rnd=${miliSeconds}`;
//global data yesterday
const covid19GlobalData2 = `https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=false?rnd=${miliSeconds}`;

//for testing purposes

// //today's data case per country
// const covid19Data1 = `https://disease.sh/v3/covid-19/countries?yesterday=false&allowNull=false`;
// //yesterday's data case per country
// const covid19Data2 = `https://disease.sh/v3/covid-19/countries?yesterday=true&allowNull=false`;
// //global data today
// const covid19GlobalData1 = `https://disease.sh/v3/covid-19/all?yesterday=false&allowNull=false`;
// //global data yesterday
// const covid19GlobalData2 = `https://disease.sh/v3/covid-19/all?yesterday=true&allowNull=false`;


const subDataContainer = document.getElementsByClassName('sub-data-container');

const loading = document.getElementsByClassName('loading');

    //show all loading the loading animation
	for (let element = 0; element < loading.length; element++) {

		loading[element].classList.add('is-loading');

	};

//hide all elements while processing the data
for (let element = 0; element < subDataContainer.length; element++) {

		subDataContainer[element].classList.add('hidden');

	};

  const getData = (()=>{

    const newDataParsed = JSON.parse(sessionStorage.localNewCase);

    const oldDataParsed = JSON.parse(sessionStorage.localOldCase);

    const globalNewDataParsed = JSON.parse(sessionStorage.globalNewCase);

    const globalOldDataParsed = JSON.parse(sessionStorage.globalOldCase);

    // console.log(JSON.parse(sessionStorage.localNewCase));
    // console.log(JSON.parse(sessionStorage.localOldCase));
    // console.log(JSON.parse(sessionStorage.globalNewCase));
    // console.log(JSON.parse(sessionStorage.globalOldCase));

    getDetailedCase(newDataParsed, oldDataParsed, globalNewDataParsed, globalOldDataParsed);

})

// async funtion
    async function doCORSRequest(options) {

    var localNewCase = await options.url;
    var localOldCase = await options.url2;
    var globalOldCase = await options.url3;
    var globalNewCase = await options.url4;

        var CORS = await cors_api_url;

    const localNewCaseReq = new XMLHttpRequest();
    const localOldCaseReq = new XMLHttpRequest();
    const globalNewCaseReq = new XMLHttpRequest();
    const globalOldCaseReq = new XMLHttpRequest();


    //start loading animation here

    localNewCaseReq.open(options.method, CORS + localNewCase);

    localNewCaseReq.onload = localNewCaseReq.onerror  = function() {

      sessionStorage.localNewCase = localNewCaseReq.responseText

      generateOption(localNewCaseReq.responseText)

      // -2nd Start---------------------------------------------------------
          localOldCaseReq.open(options.method, CORS + localOldCase);

          localOldCaseReq.onload = localOldCaseReq.onerror  = function() {

          sessionStorage.localOldCase = localOldCaseReq.responseText;

              // -3rd Start---------------------------------------------------------
              globalNewCaseReq.open(options.method, CORS + globalNewCase);

              globalNewCaseReq.onload = globalNewCaseReq.onerror  = function() {

              sessionStorage.globalNewCase = globalNewCaseReq.responseText;

                  // -4th Start---------------------------------------------------------
                  globalOldCaseReq.open(options.method, CORS + globalOldCase);

                  globalOldCaseReq.onload = globalOldCaseReq.onerror  = function() {

                  //stop loading animation here

                  //get all elements

                    const loading = document.getElementsByClassName('loading');

                     const selection = document.getElementsByClassName('selection-container');

                     const todayChart = document.getElementById('case-today-chart');

                     const populationChart = document.getElementById('population-chart');

                     const caseSummaryChart = document.getElementById('case-summary');

                     const subDataContainer = document.getElementsByClassName('sub-data-container');

                    selection[0].classList.remove('hidden');

                    todayChart.classList.remove("hidden");

                    populationChart.classList.remove("hidden");

                    caseSummaryChart.classList.remove("hidden");


                    //hide all loading animation
                    for (let element = 0; element < loading.length; element++) {

                        loading[element].classList.remove('is-loading');

                        loading[element].classList.add('hidden');

                    };

                    for (let element = 0; element < subDataContainer.length; element++) {

                        subDataContainer[element].classList.remove('hidden');

                    };

                  sessionStorage.globalOldCase = globalOldCaseReq.responseText;

                 //run function
                  getData();

                };

                  globalOldCaseReq.send();
                  // -4th End---------------------------------------------------------

                  // getData();
            };

              globalNewCaseReq.send();
          // -3rd End---------------------------------------------------------
        };

        localOldCaseReq.send();
      // -2nd End---------------------------------------------------------
    };

    localNewCaseReq.send();    
  }
    

doCORSRequest({
        method: 'GET',
        url: covid19Data1,
        url2: covid19Data2,
        url3: covid19GlobalData1,
        url4: covid19GlobalData2,
      });






// async function getData(){

// 	const loading = document.getElementsByClassName('loading');

// 	const selection = document.getElementsByClassName('selection-container');

// 	const todayChart = document.getElementById('case-today-chart');

// 	const populationChart = document.getElementById('population-chart');

// 	const caseSummaryChart = document.getElementById('case-summary');

// 	const subDataContainer = document.getElementsByClassName('sub-data-container');

//     let todaysData = await fetch(covid19Data1);

//     let yesterdaysData = await fetch(covid19Data2);

//     let globalTodayData = await fetch(covid19GlobalData1);

//     let globalYesterdayData = await fetch(covid19GlobalData2);

//   if((todaysData.ok && yesterdaysData.ok) && (globalTodayData.ok && globalYesterdayData.ok)){

//   	let newData = await todaysData.json() 

//     let oldData = await yesterdaysData.json();

//     let globalNewData = await globalTodayData.json();

//     let globalOldData =  await globalYesterdayData.json();
//     //clear session storage
//     sessionStorage.clear();
//     //store in session
//     sessionStorage.newData = JSON.stringify(newData);

//     sessionStorage.oldData = JSON.stringify(oldData);

//     sessionStorage.globalNewData = JSON.stringify(globalNewData);

//     sessionStorage.globalOldData = JSON.stringify(globalOldData);

//     selection[0].classList.remove('hidden');

//     todayChart.classList.remove("hidden");

// 	populationChart.classList.remove("hidden");

// 	caseSummaryChart.classList.remove("hidden");



// 	//hide all loading animation
// 	for (let element = 0; element < loading.length; element++) {

// 		loading[element].classList.remove('is-loading');

// 		loading[element].classList.add('hidden');

// 	};

// 	for (let element = 0; element < subDataContainer.length; element++) {

// 		subDataContainer[element].classList.remove('hidden');

// 	};

// 	generateOption(newData);

// 	distributeData();

//   }else{

//     // console.log("HTTP-Error: " + response.status);

//   }

//   // return responseArray;

// }

// getData();



const generateOption = ((data) => {

    let parsedData = JSON.parse(data);

	const select = document.getElementById('selection');

	for (let i = 0; i < parsedData.length; i++) {

		const country = parsedData[i].country;

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

	const bgColor = ['rgba(255, 206, 86, 1)', 'rgba(0, 230, 118, 1)', 'rgba(255,99,132, 1'];

	const borderColor = ['rgba(255, 206, 86, 1)', 'rgba(0, 230, 118, 1)', 'rgba(255,99,132,1)'];

	const labels = ['Active Case', 'Recovery', 'Deaths'];

	const elementId = 'case-today-chart';		
	//req. type, data{labels, datasets{ data, bg-color}}, 
	//destroy chart
	doughnutContainer[0].classList.remove('hidden');

	doughnutOneChart(type, labels, dataArray, bgColor, elementId, borderColor)
});

//prepare data in population details chart
const population = ((array) =>{

	const dataArray = array

	const type = 'pie';

	const bgColor = ['rgba(154, 153, 254, 1)', 'rgba(255, 206, 89, 1)'];

	const borderColor = ['rgba(154, 153, 254, 1)', 'rgba(255, 206, 89, 1)'];

	const labels = ['uninfected', 'infected'];

	const elementId = 'population-chart';

	//req. type, data{labels, datasets{ data, bg-color}}, 

	pieContainer[0].classList.remove('hidden');

	pieChart(type, labels, dataArray, bgColor, elementId, borderColor);
})

//prepare data in population details chart
const caseSummary = ((array) =>{

	const dataArray = array

	const type = 'doughnut';

	const bgColor = ['rgba(255, 206, 86, 1)', 'rgba(0, 230, 118, 1)', 'rgba(255,99,132, 1)'];

	const borderColor = ['rgba(255, 206, 86, 1)', 'rgba(0, 230, 118, 1)', 'rgba(255,99,132, 1)'];

	const labels = ['Active Case', 'Recovery', 'Deaths'];

	const elementId = 'case-summary';

	//req. type, data{labels, datasets{ data, bg-color}},

	doughnutContainer[1].classList.remove('hidden');

	doughnutTwoChart(type, labels, dataArray, bgColor, elementId, borderColor);
})

//laberl color options
const ligthModeLblColor = (()=>{
    const labelColor = '#595959';

    return labelColor
});

const darkModeLblColor = (()=>{
    const labelColor = 'white';

    return labelColor
})

//reusable chart function
let doughnutOneChart = ((type, labels, data, bgColor, id, borderColor)=>{
		//chart config
		//doughnut chart
	doughnutOneConfig.destroy();

	 // chart = document.getElementById(id);
	//destroy chart
	  doughnutOneConfig = new Chart(doughnutOne, {
	    type: type,
	    data: {
	        labels: labels,
	        datasets: [{
	            label: '# of data',
	            data: data,
	            backgroundColor: bgColor,
	            borderColor: borderColor,
	            borderWidth: 2,
	        }]
	    },
	    options: {
	    	legend: {
       			position: 'top',
        		labels: {
          		fontColor: ligthModeLblColor(),
          		fontFamily: '"Courier New", Courier, monospace',
          		// fontSize: '12',
        		}
      		},
	        responsive: true, // Instruct chart js to respond nicely.
	        maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
	    }
	});
	//update chart
	doughnutOneConfig.update();
});

let pieChart = ((type, labels, data, bgColor, id, borderColor)=>{
		//chart config
		//doughnut chart
	pieConfig.destroy();

	 // chart = document.getElementById(id);
	//destroy chart
	  pieConfig = new Chart(pie, {
	    type: type,
	    data: {
	        labels: labels,
	        datasets: [{
	            label: '# of data',
	            data: data,
	            backgroundColor: bgColor,
	            borderColor: borderColor,
	            borderWidth: 2,
	        }]
	    },
	    options: {
	    	legend: {
       			position: 'top',
        		labels: {
          		fontColor: ligthModeLblColor(),
          		fontFamily: '"Courier New", Courier, monospace',
          		// fontSize: '12',
        		}
      		},
	        responsive: true, // Instruct chart js to respond nicely.
	        maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
	    }
	});
	//update chart
	pieConfig.update();	
});

let doughnutTwoChart = ((type, labels, data, bgColor, id, borderColor)=>{
		//chart config
		//doughnut chart
	doughnutTwoConfig.destroy();

	 // chart = document.getElementById(id);
	//destroy chart
	  doughnutTwoConfig = new Chart(doughnutTwo, {
	    type: type,
	    data: {
	        labels: labels,
	        datasets: [{
	            label: '# of data',
	            data: data,
	            backgroundColor: bgColor,
	            borderColor: borderColor,
	            borderWidth: 2,
	        }]
	    },
	    options: {
	    	legend: {
       			position: 'top',
        		labels: {
          		fontColor: ligthModeLblColor(),
          		fontFamily: '"Courier New", Courier, monospace',
          		// fontSize: '12',
        		}
      		},
	        responsive: true, // Instruct chart js to respond nicely.
	        maintainAspectRatio: true, // Add to prevent default behaviour of full-width/height
	    }
	});
	//update chart
	doughnutTwoConfig.update();
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

		let getSecondsAPI = updateTimeToday.getSeconds();

		const getMinutesToday = dateToday.getMinutes();
		// subtract minutes to get the last update time of data
		let getMinDif = getMinutesAPI - getMinutesToday;

		let time = getMinDif;

		let timelbl = 'minutes';

		if(getMinDif < 0){

			getMinDif = Math.abs(getMinDif);

			if(getMinDif === 1){

				time = getMinDif;

				timelbl = 'minute';

			}else{

			time = getMinDif;

			timelbl = 'minutes';

			}

		}else if(getMinDif === 1){

			timelbl = 'minute';

			time = getMinDif;

		}else if(getMinDif > 1){

			timelbl = 'minutes';

			time = getMinDif;

		}else if(getMinDif === 0){

			if(getSecondsAPI === 1){

				timelbl = 'second';

				time = getSecondsAPI;
			}else {

				timelbl = 'seconds';

				time = getSecondsAPI;

			}
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

		//formula in geting percetages
		const dividedInfection = infected / population ;

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

		populationTxt.innerHTML = `${populationFormated}`;

		unInfectedTxt.innerHTML = `${safePopulationFormated} (${unInfectedPc}%)`;

		infectedTxt.innerHTML = `${infectedFormated} (${infectedPc}%)`;

		return dataArray
});

//get total active case, recovery, and deaths
const getOverallDetailedCase = ((data, country) =>{

        const getTotalCase = data.cases

		const getActiveCase = data.active;

		const getRecovered = data.recovered;

		const getDeaths = data.deaths;

		const dataArray = [getActiveCase, getRecovered, getDeaths];
		//format number
		const activeCaseFormated = new Intl.NumberFormat().format(getActiveCase);

		const recoveredFormated = new Intl.NumberFormat().format(getRecovered);

		const deathsFormated = new Intl.NumberFormat().format(getDeaths);

		const casesFormated = new Intl.NumberFormat().format(getTotalCase);

		const totalCaseLbl = document.getElementById('total-case');

		const activeCaseLbl = document.getElementById('total-active-case-data');

		const recoveredLbl = document.getElementById('total-recovery-data');

		const deathsLbl = document.getElementById('total-deaths-data');

        const activeLblPc = document.getElementById('active-pc');

        const recoveryLblPc = document.getElementById('recovery-pc');

        const deathsLblPc = document.getElementById('deaths-pc');

		// console.log(`${country} || Active: ${getActiveCase} | Recovered: ${getRecovered} | Deaths ${getDeaths}`);

        //get percentage
        const divActive =  getActiveCase / getTotalCase;

        const divRecovered =  getRecovered / getTotalCase;

        const divDeaths =  getDeaths / getTotalCase;

        const getActivePc = divActive * 100;

        const getRecoveredPc = divRecovered * 100;

        const getDeathsPc = divDeaths * 100;

        activeLblPc.innerHTML = `(${getActivePc.toFixed(2)}%)`;

        recoveryLblPc.innerHTML = `(${getRecoveredPc.toFixed(2)}%)`;

        deathsLblPc.innerHTML = `(${getDeathsPc.toFixed(2)}%)`;

		totalCaseLbl.innerHTML = casesFormated;

		activeCaseLbl.innerHTML = activeCaseFormated;

		recoveredLbl.innerHTML = recoveredFormated;

		deathsLbl.innerHTML = deathsFormated;

		return dataArray
});

//get test conducted and critical
const getTestAndCritical = ((data, country) =>{

		const getTest = data.tests;

		const getCritical = data.critical;

		const totalPopulation = data.population;

		//formula in geting percetages

		const testDivided = getTest / totalPopulation ;

		const testPercent = testDivided * 100;
		//format numbers
		const testFormated = new Intl.NumberFormat().format(getTest);

		const criticalFormated = new Intl.NumberFormat().format(getCritical);

		const totalPopulationFormated = new Intl.NumberFormat().format(totalPopulation);

		const testPercentFormated = new Intl.NumberFormat().format(testPercent.toFixed(2));

		const getTestFormated = new Intl.NumberFormat().format(getTest);

		const criticalLbl = document.getElementById('critical');

		const testConductedLbl = document.getElementById('test-conducted');

		criticalLbl.innerHTML = `${criticalFormated}`;

		testConductedLbl.innerHTML = `${getTestFormated}(${testPercentFormated}%)`;

		// console.log(`${country} || Test Conducted: ${getTest} | Critical: ${getCritical}`);
})
//toogle option
document.getElementById("darkmode-btn").addEventListener("click", function(){
  // console.log('hello world');
    const value = document.getElementById("darkmode-btn").value
    //card
    const cards = document.getElementsByClassName('card');
    //html
    const html = document.querySelector('html');
    //body
    const body = document.querySelector('body');
    //header
    const headerTxt = document.getElementsByClassName('header-txt');

    const subTxt = document.getElementsByClassName('sub-txt');

    const txtLink = document.getElementsByClassName('txt-link');

    const controlLbl = document.getElementsByClassName('control-lbl');

    const selection = document.getElementById('selection');
    //labels in chart
    const chartLbl = document.getElementsByClassName('chart-lbl');

    const footerTxt = document.querySelector('h3');

    const footerBrd = document.querySelector('footer');

    const divider = document.getElementsByClassName('divider');

    const dividerSm = document.getElementsByClassName('divider-sm');

    const footerBtn = document.getElementsByClassName('footer-btn');

    const subDataLbl = document.getElementsByClassName('sub-data-lbl');

    const dataTxt = document.getElementsByClassName('data-txt');

    const label = document.getElementsByClassName('label');


  // console.log(value);

  if(value === 'off'){
    //when darkmode off
    localStorage.setItem('darkmode', 'off');

    console.log(`darkmode ${localStorage.getItem('darkmode')}`);

	document.getElementById("darkmode-btn").value = 'on';
    //loop all cards 
    for (let cardCount = 0; cardCount < cards.length; cardCount++) {
    	// console.log(cards[cardCount]);
    	cards[cardCount].classList.add('card-lht');

    	cards[cardCount].classList.remove('card-drk');
    };

    html.classList.add('html-bg-lht');

    html.classList.remove('html-bg-drk');

    body.classList.add('body-bg-lht');

    body.classList.remove('body-bg-drk');

    headerTxt[0].classList.add('header-txt-lht');

    headerTxt[0].classList.remove('header-txt-drk');

    subTxt[0].classList.add('sub-txt-lht');

    subTxt[0].classList.remove('sub-txt-drk');

    subTxt[1].classList.add('sub-txt-lht');

    subTxt[1].classList.remove('sub-txt-drk');

    txtLink[0].classList.add('txt-link-lht');

    txtLink[0].classList.remove('txt-link-drk');

    txtLink[1].classList.add('txt-link-lht');

    txtLink[1].classList.remove('txt-link-drk');

    controlLbl[0].classList.add('control-lbl-lht');

    controlLbl[0].classList.remove('control-lbl-drk');

    selection.classList.add('selection-lht');

    selection.classList.remove('selection-drk');

    divider[0].classList.add('divider-lht');

    divider[0].classList.remove('divider-drk');

    footerBtn[0].classList.add('footer-btn-lht');

    footerBtn[0].classList.remove('footer-btn-drk');
    //loop all small label
    for (let smallLblCount = 0; smallLblCount < label.length; smallLblCount++) {
    	    label[smallLblCount].classList.add('label-lht');

   			label[smallLblCount].classList.remove('label-drk');
    };
    //loop all data-txt 
    for (let dataTxtCount = 0; dataTxtCount < dataTxt.length; dataTxtCount++) {
    	// console.log(cards[cardCount]);
    	dataTxt[dataTxtCount].classList.remove('data-txt-drk');

    	dataTxt[dataTxtCount].classList.add('data-txt-lht');
    };
    //loop all small divisions 
    for (let dividerSmCount = 0; dividerSmCount < dividerSm.length; dividerSmCount++) {
    	// console.log(cards[cardCount]);
    	dividerSm[dividerSmCount].classList.remove('divider-sm-drk');

    	dividerSm[dividerSmCount].classList.add('divider-sm-lht');
    };
    //loop all sub label
    for (let subLblCount = 0; subLblCount < subDataLbl.length; subLblCount++) {
    	// console.log(cards[cardCount]);
    	subDataLbl[subLblCount].classList.add('subdata-lbl-lht');

    	subDataLbl[subLblCount].classList.remove('subdata-lbl-drk');
    };

    //loop all chart-lbl 
    for (let lblCount = 0; lblCount < chartLbl.length; lblCount++) {
    	// console.log(cards[cardCount]);
    	chartLbl[lblCount].classList.add('chart-lbl-lht');

    	chartLbl[lblCount].classList.remove('chart-lbl-drk');
    };

    footerTxt.classList.add('footer-txt-lht');

    footerTxt.classList.remove('footer-txt-drk');

    footerBrd.classList.add('footer-lht');

    footerBrd.classList.remove('footer-drk');

    // console.log(value);

  }else if(value === 'on'){
    //when darkmode on
    localStorage.setItem('darkmode', 'on');

    console.log(`darkmode ${localStorage.getItem('darkmode')}`);

    document.getElementById("darkmode-btn").value = 'off';
    //loop all cards 
    for (let cardCount = 0; cardCount < cards.length; cardCount++) {
    	// console.log(cards[cardCount]);
    	cards[cardCount].classList.remove('card-lht');

    	cards[cardCount].classList.add('card-drk');
    };

    html.classList.add('html-bg-drk');

    html.classList.remove('html-bg-lht');

    body.classList.add('body-bg-drk');

    body.classList.remove('body-bg-lht');

    headerTxt[0].classList.add('header-txt-drk');

    headerTxt[0].classList.remove('header-txt-lht');

    subTxt[0].classList.add('sub-txt-drk');

    subTxt[0].classList.remove('sub-txt-lht');

    subTxt[1].classList.add('sub-txt-drk');

    subTxt[1].classList.remove('sub-txt-lht');

    txtLink[0].classList.add('txt-link-drk');

    txtLink[0].classList.remove('txt-link-lht');

    txtLink[1].classList.add('txt-link-drk');

    txtLink[1].classList.remove('txt-link-lht');

    controlLbl[0].classList.add('control-lbl-drk');

    controlLbl[0].classList.remove('control-lbl-lht');

    selection.classList.add('selection-drk');

    selection.classList.remove('selection-lht');

    divider[0].classList.add('divider-drk');

    divider[0].classList.remove('divider-lht');

    footerBtn[0].classList.add('footer-btn-drk');

    footerBtn[0].classList.remove('footer-btn-lht');
    //loop all small label
    for (let smallLblCount = 0; smallLblCount < label.length; smallLblCount++) {
    	    label[smallLblCount].classList.add('label-drk');

   			label[smallLblCount].classList.remove('label-lht');
    };
    //loop all data-txt 
    for (let dataTxtCount = 0; dataTxtCount < dataTxt.length; dataTxtCount++) {
    	// console.log(cards[cardCount]);
    	dataTxt[dataTxtCount].classList.remove('data-txt-lht');

    	dataTxt[dataTxtCount].classList.add('data-txt-drk');
    };
    //loop all sub label
    for (let subLblCount = 0; subLblCount < subDataLbl.length; subLblCount++) {
    	// console.log(cards[cardCount]);
    	subDataLbl[subLblCount].classList.add('subdata-lbl-drk');

    	subDataLbl[subLblCount].classList.remove('subdata-lbl-lht');
    };
    //loop all small divisions 
    for (let dividerSmCount = 0; dividerSmCount < dividerSm.length; dividerSmCount++) {
    	// console.log(cards[cardCount]);
    	dividerSm[dividerSmCount].classList.remove('divider-sm-lht');

    	dividerSm[dividerSmCount].classList.add('divider-sm-drk');
    };
	//loop all chart-lbl
    for (let lblCount = 0; lblCount < chartLbl.length; lblCount++) {
    	// console.log(cards[cardCount]);
    	chartLbl[lblCount].classList.remove('chart-lbl-lht');

    	chartLbl[lblCount].classList.add('chart-lbl-drk');
    };

    footerTxt.classList.add('footer-txt-drk');

    footerTxt.classList.remove('footer-txt-lht');

    footerBrd.classList.add('footer-drk');

    footerBrd.classList.remove('footer-lht');
    // console.log(value);
  }
});




