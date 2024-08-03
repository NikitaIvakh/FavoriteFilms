/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img. Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла. Отсортировать их по алфавиту

5) Добавить нумерацию выведенных фильмов */

// 'use strict'

// const ads = document.querySelectorAll('.promo__adv img'),
// 	poster = document.querySelector('.promo__bg'),
// 	genre = poster.querySelector('.promo__genre'),
// 	moveList = document.querySelectorAll('.promo__interactive-list li')

// ads.forEach(item => {
// 	item.remove()
// })

// genre.textContent = 'драма'
// poster.style.backgroundImage = "url('img/bg.jpg')"

// const movieDB = {
// 	movies: [
// 		'Логан',
// 		'Лига справедливости',
// 		'Ла-ла лэнд',
// 		'Одержимость',
// 		'Скотт Пилигрим против...',
// 	],
// 	outputMovies: movies => {
// 		moveList.forEach((item, i) => {
// 			item.innerHTML = ''
// 			return (item.innerHTML = `
// 				${i + 1} ${movies[i]}
// 				<div class="delete"></div>
// 			`)
// 		})
// 	},
// 	sortedMovies: function () {
// 		return movieDB.movies.join(', ').toLowerCase().split(', ').sort()
// 	},
// }

// movieDB.outputMovies(movieDB.sortedMovies())

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - новый фильм добавляется в список. Страница не должна перезагружаться. Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict'

document.addEventListener('DOMContentLoaded', function () {
	const movieDB = {
		movies: [
			'Логан',
			'Лига справедливости',
			'Ла-ла лэнд',
			'Одержимость',
			'Скотт Пилигрим против...',
		],
	}

	const ads = document.querySelectorAll('.promo__adv img'),
		poster = document.querySelector('.promo__bg'),
		genre = poster.querySelector('.promo__genre'),
		movieList = document.querySelector('.promo__interactive-list'),
		submitFilm = document.querySelector('.add button'),
		inputFilm = document.querySelector('.add input'),
		checkbox = document.querySelector('[type="checkbox"]')

	ads.forEach(item => {
		item.remove()
	})

	genre.textContent = 'драма'
	poster.style.backgroundImage = "url('img/bg.jpg')"

	outputMovies()
	addMovies()

	function outputMovies() {
		movieList.innerHTML = ''
		movieDB.movies.forEach((item, i, arr) => {
			arr[i] = item.toLowerCase()
		})
		movieDB.movies.sort()
		movieDB.movies.forEach((film, i) => {
			const filmLong = film.length > 21 ? `${film.substring(0, 21)}...` : film
			movieList.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${filmLong}
            <div class="delete"></div>
        </li>
    `
		})

		const deleteButtons = document.querySelectorAll('.delete')
		deleteButtons.forEach((button, index) => {
			button.addEventListener('click', function (event) {
				event.preventDefault()
				movieDB.movies.splice(index, 1)
				outputMovies()
			})
		})
	}

	function addMovies() {
		submitFilm.addEventListener('click', function (event) {
			event.preventDefault()
			const film = inputFilm.value.trim()
			movieDB.movies.push(film)
			const favorite = checkbox.checked

			if (favorite) {
				console.log('Добавляем любимый фильм')
			}

			outputMovies()
		})
	}
})
