/** @var {object} media - объект видеозаписи*/
var	media;

/** @var {object} play - кнопка play/pause */
var	play;

/** @var {object} bar - шкала времени */
var	bar;

/** @var {object} mute - кнопка mute/sound */
var	mute;

/** @var {object} volume - ползунок громкости */
var	volume;

/** @var {number} loop - идентификатор выполнения для функции setInterval.
 * Используется для остановки проверки текущего положения на шкале времени.
 */
var	loop;

/**
 * Функция инициализирует все элементы проигрывателя и вешает
 * на его элементы управления обработчики событий.
 */
function initiate()
{ 
	//получаем объект видеозаписи
	media = document.getElementById('media');

	//получаем объект кнопки play
	play = document.getElementById('play');

	//получаем объект шкалы времени
	bar = document.getElementById('bar');

	//получаем объект текущего времени полосы прокрутки
	progress = document.getElementById('progress');

	//получаем объект кнопки mute
	mute = document.getElementById('mute');

	//получаем объект ползунка громкости
	volume = document.getElementById('volume');

	//вешаем обработчик события click на кнопку play/pause
	play.addEventListener('click', playPauseClick);

    //вешаем обработчик события click на кнопку mute/sound
	mute.addEventListener('click', soundMuteClick);

	//вешаем обработчик события click на шкалу времени
	bar.addEventListener('click', move);

	//вешаем обработчик события change на ползунок громкости
	volume.addEventListener('change', level); 
}

/**
 * Функция вызывается при нажатии на кнопку Play/Pause
 */
function playPauseClick()
{
	//если видеозапись не стоит на паузе и не дошло до конца
	if(!media.paused && !media.ended) 
	{
		//ставим видео на паузу
		media.pause();
		//меняем текст кнопки на "Play"
		play.value = 'Play';
		//отменяем выполнение функции setInterval, которая вызывает
		//функцию status
		clearInterval(loop);
	}
	else
	{
		//запускаем видеозапись
		media.play();
		//меняем надпись на кнопке на "Pause"
		play.value = 'Pause';
		//через каждую секунду будет вызываться функция status.
		loop = setInterval(status, 1000);
	}
}

/**
 * Функция показыает на шкале времени сколько видео уже просмотрено
 */
function status()
{
	//если просмотр не закончен
	if(!media.ended)
	{
		//получаем сколько уже просмотрено в процентах
		var size = parseInt(media.currentTime / media.duration * 100);
		//закрашиваем просмотренное видео на шкале времени
		progress.style.width = size + '%';
	}
	else
	{
		//если просмотр закончен, тогда шкалу времени обнуляем
		progress.style.width = '0px';
		//меням надпись на кнопке воспроизведения на "Play"
		play.innerHTML = 'Play';
        //отменяем выполнение функции setInterval, которая вызывает
        //функцию status
		clearInterval(loop);
	} 
}

/**
 * Функция срабатывает в случае клика по шкале времени
 * @param {object} e - событие клика при выборе времени на шкале
 */
function move(e)
{
	//если воспроизведение не на паузе и не закончено
	if(!media.paused && !media.ended)
	{
		//получаем значение куда кликнул пользователь на шкале времени
		var mouseX = e.pageX - bar.offsetLeft;
		//выставляем соответствующее время для видео
        media.currentTime = mouseX * media.duration / bar.clientWidth;
        //выставляем соответствующее положение для индикатора времени
		progress.style.width = mouseX + 'px'; 
	} 
}

/**
 * Функция срабатывает при нажатии на кнопку "Mute/Sound"
 */
function soundMuteClick()
{
	//если звук был включен
	if(mute.value == 'Mute')
	{
		//выключаем звук
		media.muted = true;
		//делаем надпись на кнопке "Sound"
		mute.value = 'Sound'; 
	}
	else
	{
		//включаем звук
		media.muted = false;
		//делаем надпись на кнопке "Mute"
		mute.value = 'Mute'; 
	} 
}

/**
 * Функция срабатывает при перемещении ползунка громкости.
 * Устанавливает громкость видео
 */
function level()
{ 
	media.volume = volume.value; 
} 

//после загрузки страницы запускаем функцию initiate
addEventListener('load', initiate);

