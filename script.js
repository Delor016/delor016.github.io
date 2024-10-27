const images = ['./img/photos/image2.png', './img/photos/image3.png', './img/photos/image4.jpg', './img/photos/image5.jpg', './img/photos/image7.png', './img/photos/image8.png', './img/photos/image9.png']; // Убедитесь, что пути к вашим изображениям правильные
let currentIndex = 0;

const imageDisplay = document.getElementById('imageDisplay');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const imageCounter = document.getElementById('imageCounter'); // Получаем элемент счетчика

// Функция для обновления состояния кнопок
function updateButtonState() {
    prevButton.disabled = currentIndex === 0; 
    nextButton.disabled = currentIndex === images.length - 1; 

    prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
    nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
}

// Функция для обновления текста с номером фотографии
function updateImageCounter() {
    imageCounter.innerHTML = `<span class="red-bold">${currentIndex + 1}</span>/${images.length}`;
}

// Функция для смены изображения с плавным эффектом
// Функция для смены изображения с плавным эффектом
function changeImage(newIndex) {
    const oldImage = imageDisplay.cloneNode(); // Клонируем текущее изображение
    oldImage.src = images[currentIndex];
    oldImage.style.opacity = '1'; // Устанавливаем полную непрозрачность
    imageDisplay.parentNode.appendChild(oldImage); // Добавляем клонированное изображение в контейнер

    // Уменьшаем прозрачность текущего изображения
    imageDisplay.style.opacity = '0';

    setTimeout(() => {
        currentIndex = newIndex; // Обновляем индекс
        imageDisplay.src = images[currentIndex]; // Обновляем изображение
        imageDisplay.style.opacity = '1'; // Восстанавливаем непрозрачность
        oldImage.remove(); // Удаляем клонированное изображение
        updateButtonState(); // Обновляем состояние кнопок
        updateImageCounter(); // Обновляем счетчик
    }, 500); // 500 мс – время, соответствующее CSS-анимации
}

// Проверяем существование элементов
if (imageDisplay && prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            changeImage(currentIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            changeImage(currentIndex + 1);
        }
    });
} else {
    console.error("Элементы не найдены. Проверьте IDs в HTML.");
}

// Инициализация
updateButtonState();
updateImageCounter(); // Устанавливаем начальное значение счетчика

// Получаем кнопки по их ID
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

// Функция для смены активной кнопки
function setActiveButton(activeButton) {
    // Убираем класс active у всех кнопок
    button1.classList.remove('active');
    button2.classList.remove('active');
    button3.classList.remove('active');
    
    // Добавляем класс active только к нажимаемой кнопке
    activeButton.classList.add('active');
}

// Добавляем обработчики событий на кнопки
button1.addEventListener('click', () => setActiveButton(button1));
button2.addEventListener('click', () => setActiveButton(button2));
button3.addEventListener('click', () => setActiveButton(button3));

const buttons = document.querySelectorAll('.catalog-button');

buttons.forEach((button) => {
    const originalText = button.textContent; // Сохраняем оригинальный текст кнопки (цену)

    button.addEventListener('mouseenter', () => {
        button.textContent = 'Связаться'; // Меняем текст на "Связаться" при наведении
    });

    button.addEventListener('mouseleave', () => {
        button.textContent = originalText; // Возвращаем оригинальный текст (цену) при убирании курсора
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.catalog-button1');
    const cards = document.querySelectorAll('.card');

    // Функция для отображения карточек в зависимости от активной кнопки
    function displayCards(category) {
        cards.forEach(card => {
            card.style.display = card.dataset.category === category ? 'block' : 'none';
        });
    }

    // Установка обработчиков событий на кнопки
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем класс active у всех кнопок и добавляем к нажимаемой
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Определяем категорию и отображаем соответствующие карточки
            const category = button.dataset.category;
            displayCards(category);
        });
    });

    // Инициализация: показываем карточки для первой категории
    displayCards('oil-change');
});



// Работа с отзывами
const reviewContainer = document.querySelector('.reviews-container');
const reviewCards = document.querySelectorAll('.review-card');
let reviewIndex = 0;
let itemsToShow = 3; // Стандартное количество отзывов
let isSwiping = false; // Флаг, указывающий на прокрутку пальцем

// Проверка разрешения экрана
function updateItemsToShow() {
    if (window.innerWidth < 961) { // Изменено условие
        itemsToShow = 2; // Показать 2 отзыва на экранах до 960px
        toggleNavigationButtons(false); // Скрываем кнопки навигации
    } else {
        itemsToShow = 3; // Иначе показать 3 отзыва
        toggleNavigationButtons(true); // Показываем кнопки навигации
    }
    updateCards(); // Обновляем карточки после изменения количества
}

// Функция для скрытия/показа кнопок навигации
function toggleNavigationButtons(visible) {
    document.getElementById('prev').style.display = visible ? 'block' : 'none';
    document.getElementById('next').style.display = visible ? 'block' : 'none';
}

// Обновленный код для обновления карточек
function updateCards() {
    reviewCards.forEach((card) => {
        card.style.display = 'none'; // Скрываем карточку
        card.classList.remove('show', 'active', 'left', 'right'); // Убираем классы
    });

    for (let i = 0; i < itemsToShow; i++) {
        const index = (reviewIndex + i) % reviewCards.length;
        reviewCards[index].style.display = 'flex'; // Показываем карточку
        reviewCards[index].classList.add('show'); // Немедленное появление

        // Не делаем второй отзыв большим на экранах до 1024px
        if (i === 1 && window.innerWidth >= 961) {
            reviewCards[index].classList.add('active'); // Активируем среднюю карточку
        }
    }

    document.getElementById('prev').disabled = reviewIndex === 0;
    document.getElementById('next').disabled = reviewIndex + itemsToShow >= reviewCards.length;
}


// Обработчики событий для прокрутки пальцем
let startX;

reviewContainer.addEventListener('touchstart', (e) => {
    if (window.innerWidth < 961) { // Проверяем ширину экрана
        startX = e.touches[0].clientX; // Запоминаем начальную позицию касания
        isSwiping = true; // Устанавливаем флаг прокрутки
    }
});

reviewContainer.addEventListener('touchmove', (e) => {
    if (window.innerWidth < 961) { // Проверяем ширину экрана
        const moveX = e.touches[0].clientX; // Текущая позиция касания
        const diffX = startX - moveX;

        // Если касание прошло достаточно далеко влево или вправо
        if (diffX > 50) {
            nextReview(); // Перейти к следующему отзыву
            startX = moveX; // Обновляем начальную позицию
        } else if (diffX < -50) {
            previousReview(); // Вернуться к предыдущему отзыву
            startX = moveX; // Обновляем начальную позицию
        }
    }
});

reviewContainer.addEventListener('touchend', () => {
    isSwiping = false; // Сбрасываем флаг прокрутки
});

// Функции для переключения отзывов
function nextReview() {
    reviewIndex = (reviewIndex + 1) % reviewCards.length;
    updateCards();
}

function previousReview() {
    reviewIndex = (reviewIndex - 1 + reviewCards.length) % reviewCards.length;
    updateCards();
}

// Инициализация
updateItemsToShow();
window.addEventListener('resize', updateItemsToShow); // Обновляем при изменении размера окна




// Обработчики событий для кнопок "влево" и "вправо"
document.getElementById('next').addEventListener('click', () => {
    if (reviewIndex + itemsToShow < reviewCards.length) {
        reviewIndex += itemsToShow;
        updateCards();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (reviewIndex > 0) {
        reviewIndex -= itemsToShow;
        updateCards();
    }
});

// Инициализация
updateItemsToShow(); // Устанавливаем начальное количество отзывов
window.addEventListener('resize', updateItemsToShow); // Обновляем при изменении размера окна


ymaps.ready(init);

function init() {
    var map = new ymaps.Map("map", {
        center: [50.667855, 40.041014], // Координаты 
        zoom: 15
    });

    var placemark = new ymaps.Placemark(
        [50.667855, 40.041014], 
        {
            hintContent: "Мы на картах",
            balloonContent: "Революции, 22 с. Лосево"
        }
    );

    map.geoObjects.add(placemark);
}

document.addEventListener('DOMContentLoaded', function() {
    const introSection = document.querySelector('.intro');
    const backgrounds = ['bg1', 'bg2', 'bg3']; // Классы для различных фонов
    let currentBackground = 0;

    function changeBackground() {
        introSection.classList.remove(backgrounds[currentBackground]);
        currentBackground = (currentBackground + 1) % backgrounds.length;
        introSection.classList.add(backgrounds[currentBackground]);
    }

    // Изменение фона каждые 5 секунд (5000 миллисекунд)
    setInterval(changeBackground, 6000);
});

(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav-close');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__nav_active');
    })
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
    })
}());

// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());