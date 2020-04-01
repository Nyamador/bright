'use-strict';

const searchForm = document.querySelector('#search');
const searchScreen = document.querySelector('.search-screen');
const searchBar = document.querySelector('.search-bar');
const resultContainer = document.querySelector('.results-screen');
const loader = document.querySelector('.loader');
const countryFlag = document.querySelector('.country-flag');
const resetBtn = document.querySelector('#reset');
const modal = document.querySelector('#modal');
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector('#submit-btn');


function hide(element) {
    element.style.display = 'none';
}

function show(element) {
    element.style.display = 'block';
}



resetBtn.addEventListener('click', function (event) {
    hide(resultContainer);
    show(searchScreen);
    location.reload() //reload the window
});

String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

const breakTag = "<br>"
const esc_br = breakTag.escape();

searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); //Prevent the default behaviour of the form
    fetch(`https://corona.lmao.ninja/countries/${searchBar.value}`)
        .then(response => {
            submitButton.disabled = true;
            submitButton.textContent = 'Searching';
            hide(searchScreen); //Hide the search screen
            show(loader); // Show the loader
            return response.json()
        })
        .then(data => {
            console.log(data)
            hide(loader);
            const flag = document.createElement('img');
            flag.src = `${data.countryInfo.flag}`
            countryFlag.appendChild(flag);

            const country = document.createElement('h1');
            country.textContent = `${data.country}`
            country.style.padding = '8';
            resultContainer.appendChild(country);

            const latlong = document.createElement('p');
            latlong.textContent = `Latitude : ${data.countryInfo.lat} Longittude : ${data.countryInfo.long} `
            latlong.classList.add('col-12-12');
            latlong.classList.add('p-8');
            
            const caseTotal = document.createElement('strong');
            caseTotal.textContent = `Total Cases ${data.cases}<br>`;
            if ( caseTotal.textContent < 10 )
            {
                caseTotal.style.color = 'green';
            }
            else{
                caseTotal.style.color = 'red'
            }
            caseTotal.classList.add('col-12-12');
            caseTotal.classList.add('p-8');
            resultContainer.appendChild(caseTotal);

            
            const casesToday = document.createElement('strong');
            casesToday.textContent = `Cases Today : ${data.todayCases}`;
            casesToday.classList.add('col-12-12');
            casesToday.classList.add('p-8');
            resultContainer.appendChild(casesToday);

            const deathsToday = document.createElement('strong');
            deathsToday.textContent = `Deaths Today : ${data.todayDeaths}`;
            deathsToday.style.color = 'red';
            deathsToday.classList.add('col-12-12');
            deathsToday.classList.add('p-8');
            resultContainer.appendChild(deathsToday);

            const recovered = document.createElement('strong');
            recovered.textContent = `Recovered :  ${data.recovered}`;
            recovered.style.color = 'green';
            recovered.classList.add('col-12-12');
            recovered.classList.add('p-8');                        
            resultContainer.appendChild(recovered);  
            
            const activeCases = document.createElement('p');
            activeCases.textContent = `Active Cases : ${data.active}`;
            activeCases.style.color = 'black';
            activeCases.classList.add('col-12-12');
            activeCases.classList.add('p-8');        
            resultContainer.appendChild(activeCases); 
            
            const critical = document.createElement('strong');
            critical.textContent = `Critical Cases : ${data.critical}`;
            critical.style.color = 'red';
            critical.classList.add('col-12-12'); 
            critical.classList.add('p-8);    
            resultContainer.appendChild(critical);  
            
            const casesPerOneMillion = document.createElement('strong');
            casesPerOneMillion.textContent = `Cases Per Million : ${data.casesPerOneMillion}`;
            casesPerOneMillion.classList.add('p-8');
            casesPerOneMillion.classList.add('col-12-12');
            resultContainer.appendChild(casesPerOneMillion); 
            
            const deathsPerOneMillion = document.createElement('strong');
            deathsPerOneMillion.textContent = `Deaths Per Million : ${data.deathsPerOneMillion}`;
            deathsPerOneMillion.classList.add('p-8')
            deathsPerOneMillion.classList.add('col-12-12');
            resultContainer.appendChild(deathsPerOneMillion);              

            const lastUpdate = document.createElement('p');
            const readabledate = Date(`${data.updated}`);
            lastUpdate.textContent = `Last Updated : Date(${readabledate})`;
            lastUpdate..classList.add('p-8');
            lastUpdate.classList.add('col-12-12');
            resultContainer.appendChild(lastUpdate);             
            
            show(resultContainer); // This should be called last
        })
        .catch(err => {
            console.log(err)
            modal.classList.add('show-modal')
        })

})





closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

window.addEventListener("click", windowOnClick);



/* {
    country: "Israel",
    countryInfo: {
    _id: 376,
    iso2: "IL",
    iso3: "ISR",
    lat: 31.5,
    long: 34.75,
    flag: "https://raw.githubusercontent.com/NovelCOVID/API/master/assets/flags/il.png"
    },
    cases: 5358,
    todayCases: 663,
    deaths: 20,
    todayDeaths: 4,
    recovered: 224,
    active: 5114,
    critical: 117,
    casesPerOneMillion: 619,
    deathsPerOneMillion: 2,
    updated: 1585683936973
    } */
