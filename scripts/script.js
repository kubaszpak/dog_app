// zmienna wykorzystywana do przerwania wyświetlania nowych zdjęć na stronie 
let intervalId = null;

// funkcja dostosowująca szerokość białego okręgu otaczającego logo, do jego wysokości
function changeCircleSize() {
    var cw = $('.circle').height();
    $('.circle').css({
        'width': cw + 'px'
    });
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function changeResponsive() {
    var x = document.getElementById("top-nav");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}

// wywołanie funkcji changeCircleSize w momencie załadowania strony i przy każdej zmianie rozmiaru okna
$(document).ready(changeCircleSize)
$(window).on('resize', changeCircleSize)

// funkcja wykorzystująca Dog API, żeby wydobyć link do losowego zdjęcia
const fetchRandomImage = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            // jeśli otrzymana odpowiedź jest poprawna to ustawia źródło tagu img na orzymany link
            if (data.status === "success")
                document.getElementById("dog-image").src = data.message;
        });
}

// funkcja uruchomiająca proces wydobywania nowego zdjęcia co 10 sekund, jest również wykorzystywana do odświeżenia aktualnie wyświetlanego zdjęcia
const startFetchingImages = () => {
    // odswiez obrazek
    fetchRandomImage();
    // jesli wykonywany jest proces odświeżający obrazek na nowy co 10 sekund to zatrzymaj go aby uniknac dwóch zmian pod rząd
    if (intervalId !== null)
        clearInterval(intervalId);
    // uruchom proces wydobywania nowego zdjęcia co 10 sekund
    intervalId = setInterval(fetchRandomImage, 10000);
}


// funkcja zatrzymująca proces pobierania nowych zdjęć
const stopFetchingImages = () => {
    clearInterval(intervalId);
    intervalId = null;
}

// funkcja przypominająca o powrocie do pracy, jeśli użytkownik zapatrzy się na zdjęcia na zbyt długo
const addReminderToWork = () => {
    setTimeout(() => {
        alert("Everybody knows that dogs are great and all, but maybe you shold go back to work, you've been sitting like this for over a minute now :)")
    }, 60000)
}

// funkcja wydobywująca listę wszystkich ras jakie są dostępne w bazie danych Dog API
const fetchBreedList = () => {
    document.getElementsByTagName("ul").innerHTML = "";
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            // jeśli otrzymana odpowiedź jest poprawna to ustawia tag ul, żeby wyświetlał pobraną listę
            if (data.status === "success") {
                for (var key of Object.keys(data.message)) {
                    document.getElementsByTagName("ul")[0].innerHTML +=
                        '<li>' + key + '</li>'
                }
            }
        });
}

// funkcja dodająca eventListenery do przycisków na stronie głównej
const addEventListeners = () => {
    document.getElementById("button-start").addEventListener("click", startFetchingImages);
    document.getElementById("button-stop").addEventListener("click", stopFetchingImages);

}