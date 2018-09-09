# Youtube Lazy Load

Библиотека для оптимальной загрузки видео и показа данных видео.
---------



[Демо](http://dev-postnov.ru/works/youtube-lazy-load/)

Видео будет загружаться по клику на миниатюру видео.

Получаемые данные:
- Миниатюра видео
- Заголовок
- Краткое описание
- Количество лайков
- Количество дизлайков
- Количество комментариев
- Количество просмотров

Для использования подключите файл библиотеки перед вашим основным файлом js.

    <script src="js/youtubeLazyLoad.min.js"></script>
    <script src="js/main.js"></script>


В data-атрибуте (data-youtube-lazy) элемента укажите id видео.

    <div data-youtube-lazy="k3yRfEw1pYk">
        внутрь этого тега вы можете помещать и не связанные с библиотекой данные, данные библиотеки будут добавлять к вашему содержимому, а не заменять его.
    </div>


Затем в основном коде вашего сайта вызовите функцию YoutubeLazyLoad.

    YoutubeLazyLoad (selector, params)

Функция принимает селектор, который будет содержать информацию о видео и объект параметров.

Перед использованием необходимо [получить]((https://www.youtube.com/watch?v=qXhIpThTMlk) ) youtube api key

Принимаемые параметры и их значения:

        youtubeApiKey: key // youtube api key
        thumbnailSize: ('maxres' || 'standard' || 'high' || 'default' || 'medium'), // размер миниатюры
        imgWrapp: selector , // обертка для миниатюры
        title: selector , // заголовок
        description: selector , // описание
        likes: selector , // количество лайков
        comments: selector , // количество комментариев
        views: selector , // количество просмотров
        dislikes: selector , // количество дизлайков
        playIcon: true || image path // показывать ли иконку


Пример вызова функции:

html:

    <div class="video-item">
        <div class="video-imgwrapp"></div>
        <p>Dislikes - <span class="video-title"></span></p>
        <p>Descibe - <span class="video-text"></span></p>
        <p>Likes - <span class="video-likes"></span></p>
        <p>Dislikes - <span class="video-dislikes"></span></p>
    </div>

javascript:

    YoutubeLazyLoad ('.video-item', {
        youtubeApiKey: 'AL12kdvasuFNPASsnalskd',
        thumbnailSize: 'maxres',
        imgWrapp: '.video-imgwrapp',
        title: '.video-title',
        likes: '.video-likes',
        description: '.video-text',
        playIcon: '../img/play.png'
    });


Не у каждого видео имеются все размеры миниатюр, если указанной вами миниатюры не будет, будет установлен размер "standard" с размером 640x480.

