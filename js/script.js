'use strict'

window.addEventListener('DOMContentLoaded', () => {
	function setActive(obj, i) {
		obj.forEach(item => item.classList.remove('active'));
		obj[i].classList.add('active');
	}

	function addModal(parent, subject, undersubj, buttonText) {
		const newModal = document.createElement('div');
		newModal.classList.add('modal')

		newModal.innerHTML = `
			<div class="modal__subject">${subject}</div>
			<div class="modal__undersubj">${undersubj}</div>
			<form action="" class="form">
				<input type="text" name="name" placeholder="Ваше имя">
				<input type="tel" name="phone" placeholder="Ваш телефон">
				<input type="email" name="email" placeholder="Ваш E-mail">
				<button class="button button_big">${buttonText}</button>
			</form>
		`;

		parent.append(newModal);
	}

	//slider
	const slides = document.querySelectorAll('.slider__slide'),
		  page = document.querySelector('.slider__page'),
		  line = document.querySelector('.slider__line'),
		  nextSlide = document.querySelector('.slider__next'),
		  prevSlide = document.querySelector('.slider__prev'),
		  width = window.getComputedStyle(line).width.replace(/\D/g, "");
	let translate = 0;

	slides.forEach(item => item.style.width = width + 'px');

	page.style.width = (100 * slides.length) + "%";

	nextSlide.addEventListener('click', () => {
		if (translate == +width * (slides.length - 1)) {
			translate = 0
		} else {
			translate += +width;
		}
		page.style.transform = `translateX(-${translate}px)`;
	});

	prevSlide.addEventListener('click', () => {
		if (translate == 0) {
			translate = +width * (slides.length - 1)
		} else {
			translate -= +width;
		}
		page.style.transform = `translateX(-${translate}px)`;
	});

	//catalog
	class CatalogElem {
		constructor (url, title, text, price, offPrice, parent) {
			this.url = url;
			this.title = title;
			this.text = text;
			this.price = price;
			this.offPrice = offPrice;
			this.parent = parent;
		}

		addElem() {
			const newItem = document.createElement('div');
			newItem.classList.add("catalog__item");

			newItem.innerHTML = `
				<div class="catalog__item-top">
					<div class="catalog__item-img"><img src="${this.url}" alt="watch"></div>
					<div class="catalog__item-title">Пульсометр ${this.title}</div>
					<div class="catalog__item-text">${this.text}</div>
					<span class="catalog__item-more">подробнее</span>
					<div class="catalog__item-list">
						<ul>
							<li>Вы услышите звуковое оповещение о нужном пульсе во время тренировки;</li>
							<li>Вы увидите информативный графический индикатор целевых тренировочных зон пульса;</li>
							<li>Также Вы увидите информацию о расходе калорий за тренировку;</li>
							<li>Вы сможете посмотреть данные по 10 тренировкам.</li>
						</ul>
						<span class="catalog__item-back">назад</span>
					</div>
				</div>
				<hr>
				<div class="catalog__item-bot">
					<div class="catalog__item-price">
						<span>${this.price} руб.</span>${this.offPrice} руб.
					</div>
					<button data-modalBuyOpen class="button button_small">купить</button>
				</div>
			`;

			this.parent.append(newItem);
		}
	}

	const parents = document.querySelectorAll('.catalog__items');

	for (let i = 0; i < 6; i++) {
		new CatalogElem(
			"img/watch.jpg",
			"Polar FT1",
			"Для первых шагов в тренировках, основанных на сердечном ритме",
			'4 750',
			'4 500',
			parents[0]
		).addElem()
	}

	for (let i = 0; i < 2; i++) {
		new CatalogElem(
			"img/watch.jpg",
			"Polar FT1",
			"Для первых шагов в тренировках, основанных на сердечном ритме",
			'4 750',
			'4 500',
			parents[1]
		).addElem()
	}

	new CatalogElem(
		"img/watch.jpg",
		"Polar FT1",
		"Для первых шагов в тренировках, основанных на сердечном ритме",
		'4 750',
		'4 500',
		parents[2]
	).addElem()

	const catBut = document.querySelectorAll('.catalog__nav-button');

	catBut.forEach((item, i) => {
		item.addEventListener('click', () => {
			setActive(catBut, i);
			setActive(parents, i);
		});
	});

	const more = document.querySelectorAll('.catalog__item-more'),
		  back = document.querySelectorAll('.catalog__item-back'),
		  list = document.querySelectorAll('.catalog__item-list');

	more.forEach((item, i) => {
		item.addEventListener('click', () => {
			list[i].classList.add('active');
		});
	});

	back.forEach((item, i) => {
		item.addEventListener('click', () => {
			list[i].classList.remove('active');
		});
	});

	//modal
	const modalsWindow = document.querySelector('.modals'),
		  modalConsOpen = document.querySelectorAll('[data-modalConsOpen]'),
		  body = document.querySelector('body');
	modalConsOpen.forEach(item => {
		item.addEventListener('click', () => {
			modalsWindow.classList.add('active');
			addModal(modalsWindow, 'Просто заполните форму заявки', 'и мы перезвоним вам в течении 10 минут', 'заказать кОНСУЛЬТАЦИЮ');
			body.style.overflow = 'hidden';
		});
	});

	modalsWindow.addEventListener('click', (e) => {
		if (e.target === modalsWindow) {
			modalsWindow.innerHTML = '';
			modalsWindow.classList.remove('active');
			body.style.overflow = 'unset';
		}
	});

	window.addEventListener('click', (e) => {
		if (e.target.getAttribute('data-modalBuyOpen') == '') {
			modalsWindow.classList.add('active');
			addModal(modalsWindow, 'Ваш заказ:', 'Пульсометр Polar FT1', 'купить');
			body.style.overflow = 'hidden';
		}
	}); 

	//up-arrow
	const upArrow = document.querySelector('.up-arrow');

	window.addEventListener('scroll', () => {
		if (window.pageYOffset >= 2000) {
			upArrow.classList.add('active');
		} else {
			upArrow.classList.remove('active');
		}
	});

	upArrow.addEventListener('click', () => {
		window.scrollTo(0, 0);
	});

});