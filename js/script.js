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
		submitFilm = document.querySelector('form.add'),
		inputFilm = submitFilm.querySelector('.adding__input'),
		checkbox = submitFilm.querySelector('[type="checkbox"]')

	function removeAdds(arr) {
		arr.forEach(item => {
			item.remove()
		})
	}

	function makeChanges(value1, value2) {
		value1.textContent = 'драма'
		value2.style.backgroundImage = "url('img/bg.jpg')"
	}

	function outputMovies(films, parent) {
		parent.innerHTML = ''
		sortArray(films)
		films.forEach((film, i) => {
			parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li> 
			`
		})

		document.querySelectorAll('.delete').forEach((button, index) => {
			button.addEventListener('click', function (event) {
				event.preventDefault()
				button.parentElement.remove()
				films.splice(index, 1)
				outputMovies(films, parent)
			})
		})
	}

	function addMovies(films, parent) {
		submitFilm.addEventListener('submit', function (event) {
			event.preventDefault()
			let film = inputFilm.value.trim()
			const favorite = checkbox.checked

			if (film) {
				if (film.length > 21) {
					film = `${film.substring(0, 22)}...`
				}

				if (favorite) {
					console.log('Добавляем любимый фильм')
				}

				films.push(film)
				outputMovies(films, parent)
			}

			event.target.reset()
		})
	}

	function sortArray(films) {
		films.forEach((item, i, arr) => {
			arr[i] = item.toLowerCase()
		})

		films.sort()
	}

	removeAdds(ads)
	makeChanges(genre, poster)
	addMovies(movieDB.movies, movieList)
	outputMovies(movieDB.movies, movieList)
})
