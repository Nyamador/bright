'use-strict';

const searchForm = document.querySelector('#search');
const searchScreen = document.querySelector('.search-screen');
const searchBar = document.querySelector('.search-bar');
const resultContainer = document.querySelector('.result');


function SearchByCountry(country){
}


searchForm.addEventListener('submit', function(event){
    event.preventDefault(); //Prevent the default behaviour of the form
    fetch(`https://corona.lmao.ninja/countries/${searchBar.value}`)
    .then( response => {
       return response.json()
    })
    .then( data => {
        console.log(data)
        resultContainer.append(`
        <p> Result : ${data.country} </p>
        
        <p> Cases : ${data.cases} </p>
        <p> Todays Cases : ${data.todayCases} </p>
        <p> Deaths : ${data.deaths} </p>
        <p> Todays Deaths : ${data.todayDeaths} </p>
        `);
        searchScreen.style.display = 'None';
        resultContainer.style.display = 'block';
    })
    .catch( err => {
        console.log(err)
    })    
    
})


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