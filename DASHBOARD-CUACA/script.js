

const weatherAPI = "http://api.weatherapi.com/v1/current.json?key=75635d151a944b4787e135304261506&aqi=no";
const keyword = document.querySelector(".keyword");
const btnSearch = document.querySelector(".btn-search");

const weatherInfo = document.querySelector(".weather-info"); 

btnSearch.onclick = () => {
    if (!keyword.value) return alert("Masukkan nama kota terlebih dahulu!");

    fetch(`${weatherAPI}&q=${keyword.value}`)
        .then((res) => {
            if (!res.ok) throw new Error("Kota tidak ditemukan");
            return res.json();
        })
        .then((data) => {
            console.log(data);
            // Mengubah isi weather-info saja agar tombol search tidak hilang
            weatherInfo.innerHTML = showElement(data); 
        })
        .catch((err) => {
            alert(err.message);
        });
};

function showElement(data) {
    return `
        <h3 class="location">${data.location.name}, ${data.location.region}, ${data.location.country}</h3>
        <div class="box">
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" class="weather-icon">
            <h1 class="temp">${data.current.temp_c}°C</h1>
            <p>${data.location.localtime}</p>
            <p>${data.current.condition.text}</p>
        </div>
    `;
}