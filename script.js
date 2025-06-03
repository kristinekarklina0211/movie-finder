// Объявление переменных – ссылок на HTML элементы
const inputNode = document.querySelector(".js-movies__input"); // Поле ввода названия фильма
const searchBtnNode = document.querySelector(".js-movies__search-btn"); // Кнопка "Search"
const movieListNode = document.querySelector(".js-movie-list"); // Список фильмов

// Объявление основной переменной, которая содержит массив фильмов
let movies = [];

// ОСНОВНЫЕ ФУНКЦИИ ----------------------------------------------------------------

// 1. Пользователь ищет фильм
searchBtnNode.addEventListener("click", function() {
    // 1. Получаем значение из поля ввода
    const movieTitle = getMovieFromUser(); // Сохраняем введённое название фильма

    if (!movieTitle) { // Если название не введено — выходим из функции
        return;
    }

    // 2. Вызываем функцию поиска фильмов
    findMovie(movieTitle);

    // 3. Очищаем поле ввода
    clearInput();
})

// ПОДФУНКЦИИ ----------------------------------------------------------------

// 1. Получаем значение из поля ввода
function getMovieFromUser() {
    // Проверяем, что поле ввода не пустое (если пустое, то функция не работает)
    if (!inputNode.value) {
        return;
    }

    return inputNode.value.trim(); // Функция возвращает значение, введённое в поле ввода (метод .trim() убирает лишние пробелы с двух концов)
}

// 2. Очищаем поле ввода
function clearInput() {
    inputNode.value = "";
}

// 3. Функция поиска фильмов
function findMovie(movieTitle) {
    const apiKey = "6dde023";
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;

    fetch(url)
        .then(response => response.json())

        .then((data) => {
            if (data.Search) {
                movies = data.Search; // Сохраняем список фильмов, полученный из API, в глобальную переменную movies
                // 4. Выводим список фильмов
                renderMovieList();
            }
        });
}

// 4. Выводим список фильмов
function renderMovieList() {
    // 1. Очищаем список перед добавлением новых элементов, чтобы выводился только актуальный список фильмов
    movieListNode.innerHTML = "";
    
    // 2. Проходимся по каждому объекту (фильму) массива movies
    movies.forEach(movie => {

        // 2.1 Объявляем переменные, в которых будут храниться значения ключей объекта, чтобы использовать их в HTML
        const movieTitle = movie.Title;
        const movieYear = movie.Year;
        const movieType = movie.Type;
        const moviePoster = movie.Poster;

        // 2.2 Для каждого фильма из списка создаём <li> элемент и добавляем ему классы
        const newMovie = document.createElement("li");
        newMovie.classList.add("js-list__element", "list__element");

        // 2.3 Добавляем разметку внутрь <li>
         newMovie.innerHTML = `
            <p>${movieTitle}</p>
            <p>${movieYear}</p>
            <p>${movieType}</p>
            <img src="${moviePoster}" alt="Movie poster">
            `

        // 2.4 Добавляем <li> в список
        movieListNode.appendChild(newMovie);
    })
}