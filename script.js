// Объявляю переменные – константы
const apiKey = "6dde023";

// Объявляю переменные – ссылки на HTML элементы
const inputNode = document.querySelector(".js-movies__input"); // Поле ввода названия фильма
const searchBtnNode = document.querySelector(".js-movies__search-btn"); // Кнопка "Search"
const movieListNode = document.querySelector(".js-movie-list"); // Список фильмов

// Объявляю основную переменную, которая содержит массив фильмов
let movies = [];

// ОСНОВНЫЕ ФУНКЦИИ ----------------------------------------------------------------

// 1. Пользователь ищет фильм
searchBtnNode.addEventListener("click", function() {
    // 1. Получаю значение из поля ввода
    const movieTitle = getMovieFromUser(); // Сохраняю введённое название фильма

    if (!movieTitle) { // Если название не введено — выхожу из функции
        return;
    }

    // 2. Вызываю функцию поиска фильмов
    findMovie(movieTitle);

    // 3. Очищаю поле ввода
    clearInput();
});

// 2. При клике по фильму — переход на другую страницу
movieListNode.addEventListener("click", function(event) {
    const movieElement = event.target.closest(".js-list__element");

    if (movieElement) { // Если пользователь кликнул на элемент, который содержит класс .js-list__element, то:
        goToMoviePage(movieElement); // Открывается страница фильма
    }
});

// ПОДФУНКЦИИ ----------------------------------------------------------------

// 1. Получаю значение из поля ввода
function getMovieFromUser() {
    // Проверяю, что поле ввода не пустое (если пустое, то функция не работает)
    if (!inputNode.value) {
        return;
    }

    return inputNode.value.trim(); // Функция возвращает значение, введённое в поле ввода (метод .trim() убирает лишние пробелы с двух концов)
}

// 2. Очищаю поле ввода
function clearInput() {
    inputNode.value = "";
}

// 3. Функция поиска фильмов
function findMovie(movieTitle) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`; // Создаю переменную url, в которой будет храниться адрес, к которому я буду обращаться через функцию fetch() – чтобы не писать адрес в саму функцию

    fetch(url) // Отправляю HTTP-запрос по адресу url
        .then(response => response.json()) // С помощью метода .json() превращаю полученный ответ с сервера в обычный объект JS, который будет читаться в консоли

        .then((data) => { // Переделываю данные из JSON в нужное мне отображение
            if (data.Search) { // Проверяю, есть ли у объекта data ключ Search (это массив фильмов)
                // Сохраняю список фильмов, полученный из API, в глобальную переменную movies
                movies = data.Search;

                // Вывожу список фильмов
                renderMovieList();
            }
        });
}

// 4. Вывожу список фильмов
function renderMovieList() {
    // 1. Очищаю список перед добавлением новых элементов, чтобы выводился только актуальный список фильмов
    movieListNode.innerHTML = "";
    
    // 2. Прохожусь по каждому объекту (фильму) массива movies
    movies.forEach(movie => {

        // 2.1 Объявляю переменные, в которых будут храниться значения ключей объекта, чтобы использовать их в HTML
        const movieTitle = movie.Title;
        const movieYear = movie.Year;
        const movieType = movie.Type;
        const moviePoster = movie.Poster;

        // 2.2 Для каждого фильма из списка создаю <li> элемент и добавляю ему классы
        const newMovie = document.createElement("li");
        newMovie.classList.add("js-list__element", "list__element");
        newMovie.dataset.id = movie.imdbID; // Добавляю data-атрибут data-id, чтобы можно было получить ID фильма

        // 2.3 Добавляю разметку внутрь <li>
         newMovie.innerHTML = `
            <div class="movie">
                <div class="movie__poster-wrapper">
                    <img class="movie__poster"
                        src="${moviePoster}"
                        alt="Movie poster"
                    >
                </div>
                <div class="movie__text-wrapper">
                    <p class="movie__title">${movieTitle}</p>
                    <p class="movie__year">${movieYear}</p>
                    <p class="movie__type">${movieType}</p>
                </div>
            </div>
            `

        // 2.4 Добавляю <li> в список
        movieListNode.appendChild(newMovie);
    })
}

// Переход на страницу фильма (отдельный HTML файл)
function goToMoviePage(movieElement) {
    // 1. Достаю ID фильма из data-атрибута карточки
    const id = movieElement.dataset.id;
    // Например: <div class="js-list__element" data-id="tt0372784">
    
    // Добавляю этот ID в URL и перехожу на страницу movie.html
    location.href = `movie.html?imdbID=${id}`;
}