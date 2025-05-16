// Объявление переменных – ссылок на HTML элементы
const inputNode = document.querySelector(".js-movies__input"); // Поле ввода названия фильма
const searchBtnNode = document.querySelector(".js-movies__search-btn"); // Кнопка "Search"
const movieListNode = document.querySelector(".js-movie__list"); // Список фильмов

// ОСНОВНЫЕ ФУНКЦИИ ----------------------------------------------------------------

// 1. Пользователь ищет фильм
searchBtnNode.addEventListener("click", function() {
    // 1. Получаем значение из поля ввода
    const movieTitle = getMovieFromUser(); // Сохраняем введённое название фильма

    if (!movieTitle) { // Если название не введено — выходим из функции
        return;
    }

    // 2. Вызываю функцию поиска фильмов
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

// 3. Функция для поиска фильмов
function findMovie(movieTitle) {
    const apiKey = "6dde023";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;

    fetch(url)
        .then(response => response.json())

        .then((data) => console.log(data));
}