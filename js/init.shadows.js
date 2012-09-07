/**
 * @fileOverview Сценарий отбора элементов для создания теней у текста
 * на странице "Zaragoza - макет сайта".
 * @author <a href="http://elkonina.ru/">Конина Елена</a>
 */
$(function() {
	/**
	 * Отбирает элементы, для которых определено css-правило
	 * 'text-shadow', корректирует заданные значения правила: т.к.
	 * плагин jquery.textshadow.js не обрабатывает множественные тени,
	 * то значения теней урезаются до первого
	 * 
	 * @param {Node} n - узел DOM
	 */
	var init = function(n) {
		if (n.nodeType == 1 && n.currentStyle['text-shadow']) {
			// игнорируем отдельные элементы
			if (/slogan|plus/.test(n.className))
				return;
				/**
				 * Массив значений: размер тени по горизонтали, то же по
				 * вертикали, радиус рамытия и цвет.
				 * 
				 * @type {Array}
				 * @description у вычисленного правила "text-shadow" сразу
				 *              же отсекаются все значения кроме первого,
				 *              которое раскладывается в массив.
				 */
			var shadow = n.currentStyle['text-shadow'].replace(/(.+)(?:(,.*))/, '$1').split(' '),
				/**
				 * Объект, содержащий значения параметров, с которыми будет 
				 * вызываться функция textShadow() плагина jquery.textshadow.js
				 * 
				 * @type {Object}
				 */
				option = {
					x : null,
					y : null,
					radius : null,
					color : ''
				}
			switch (shadow.length) {
				// если есть значения тени по оси Х и Y
				case 3 :
					option.x = shadow[0];
					option.y = shadow[1];
					option.color = shadow[2];
					break;
				// если есть значения тени по оси Х и Y, и радиус размытия 
				case 4 :
					option.x = parseInt(shadow[0], 10);
					option.y = parseInt(shadow[1], 10);
					option.radius = parseInt(shadow[2], 10);
					option.color = shadow[3];
					break;
			}
			// каждый отобранный элемент обрабатывается textShadow()
			$(n).textShadow(option);
		}
		/**
		 * Дочерние элементы узла, для которых будет рекурсивно вызвана функция init
		 * @type {HTMLCollection[]}
		 */
		var children = n.children, i = 0, last = children.length;
		for (; i < last; i++) {
			init(children[i]);
		}
	};
	init(document.body);
});
