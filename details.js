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
                    <h1>Title: ${data.Title}</h1>
                    <p>Year: ${data.Year}</p>
                    <p>Release date: ${data.Released}</p>
                    <p>Duration: ${data.Runtime}</p>
                    <p>Genre: ${data.Genre}</p>
                    <p>Director: ${data.Director}</p>
                    <p>Writers: ${data.Writer}</p>
                    <p>Cast: ${data.Actors}</p>
                    <p>${data.Plot}</p>
                `
                // 3. Добавляю <div> на отдельную страницу в HTML
                movieCardNode.appendChild(movieCard);
            }
        });
}