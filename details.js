// Объявляю переменные – константы
const apiKey = "6dde023";

// Объявляю переменные – ссылки на HTML элементы
const movieCardNode = document.querySelector(".js-movie-card"); // Карточка фильма

// ОСНОВНЫЕ ФУНКЦИИ ----------------------------------------------------------------

// Вывожу карточку фильма
renderMovieDetails();

// ПОДФУНКЦИИ ----------------------------------------------------------------

function renderMovieDetails() {
    // 1. Создаю переменную, в которой будут храниться параметры URL адреса
    const params = new URLSearchParams(location.search);
    // Пример location.search: "?imdbID=tt0372784"

    // 2. Получаю значение параметра "imdbID" из URL (уникальный ID фильма)
    const id = params.get("imdbID");
    // Пример: id = "tt0372784"

    // 3. Формирую URL для запроса к OMDb API с этим ID
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
    // Этот URL даст нам подробную информацию по фильму с таким ID

    fetch(url) // Отправляю запрос к API OMDb, используя URL с нужным ID фильма
        .then(response => response.json()) // Преобразовываю ответ сервера из JSON-формата в обычный объект JS
        .then((data) => { // Работаю с полученными данными
            if (data.Response === "True") { // Проверяю, получены ли данные с сервера
                // Далее подставляю полученные данные в нужный мне элемент
                // 1. Создаю контейнер, который хранит карточку фильма
                const movieCard = document.createElement("div");
                movieCard.classList.add("js-movie-card", "movie-card");

                // 2. Добавляю разметку внутрь <div>
                movieCard.innerHTML = `
                    <div class="movie-card__container">
                        <img class="movie-card__poster"
                        src="${data.Poster}"
                        alt="Movie poster"
                        >

                        <div class="movie-card__text">
                            <h1 class="movie-card__text-title">${data.Title}</h1>
                            <p>Year: <span class="movie-card__text-data">${data.Year}</span></p>
                            <p>Rating: <span class="movie-card__text-data">${data.Rated}</span></p>
                            <p>Release date: <span class="movie-card__text-data">${data.Released}</span></p>
                            <p>Duration: <span class="movie-card__text-data">${data.Runtime}</span></p>
                            <p>Genre: <span class="movie-card__text-data">${data.Genre}</span></p>
                            <p>Director: <span class="movie-card__text-data">${data.Director}</span></p>
                            <p>Writers: <span class="movie-card__text-data">${data.Writer}</span></p>
                            <p>Cast: <span class="movie-card__text-data">${data.Actors}</span></p>
                        </div>
                    </div>

                    <p class="movie-card__plot">${data.Plot}</p>
                `
                // 3. Добавляю <div> на отдельную страницу в HTML
                movieCardNode.appendChild(movieCard);
            }
        });
}