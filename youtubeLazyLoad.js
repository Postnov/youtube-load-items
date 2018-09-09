


function YoutubeLazyLoad(selector, params) {
    if (document.querySelectorAll(selector).length) {
        var nodes = document.querySelectorAll(selector)
    }else {
        throw new Error('This selector is not defined in dom');
    }

    var idArray = [],
        apiKey = 'AIzaSyAk4ile8sBWQZYCuFhwEHukBw24JzLVXSo',
        parametrs = 'snippet,contentDetails,statistics,status',
        request = new XMLHttpRequest();

    var options = {
        thumbnailSize: params.thumbnailSize || false,
        imgWrapp: params.imgWrapp || false,
        likes: params.likes || false,
        title: params.title || false,
        description: params.description || false,
        comments: params.comments || false,
        views: params.views || false,
        dislikes: params.dislikes || false,
        playIcon: params.playIcon || false
    }



    // Функция для создания node элемента
    var yllCreateElement =  function (node, attr, classList, type, innerHtml) {
        var elem = document.createElement(node);

        if (attr) {
            Object.keys(attr).forEach((item) => {
                elem.setAttribute(item, attr[item])
            })
        }
        if (classList) elem.classList += classList;
        if (type) 	   elem.setAttribute('type', type);
        if (innerHtml) elem.innerHTML  = innerHtml;

        return elem;
    }



    // Собираем все id видео
    nodes.forEach(function(item, i) {
        var videoId = item.getAttribute('data-youtube-lazy');
        idArray.push(videoId);
    });


    request.open('GET', `https://www.googleapis.com/youtube/v3/videos?id=${idArray.join(',')}&key=${apiKey}&part=${parametrs}`);

    request.onload = function() {
       if (request.status >= 200 && request.status < 400) { //проверяем статус запроса
            var response = JSON.parse(request.response),
                items = response.items,
                videos = [];


            // Перебираем полученные видео и формируем нужный нам объект
            items.forEach(function(item) {
                videos.push({
                    id: item.id,
                    title: item.snippet.localized.title,
                    description: item.snippet.localized.description,
                    views: item.statistics.viewCount,
                    comments: item.statistics.commentCount,
                    likes: item.statistics.likeCount,
                    dislikes: item.statistics.dislikeCount,
                    thumbnails: item.snippet.thumbnails,
                });
            });

            // Перебираем элементы dom и добавляем данные
            nodes.forEach(function(item, i) {
                var hasImgWrapp = item.querySelector(options.imgWrapp),
                    hasTitle = item.querySelector(options.title),
                    hasDescription = item.querySelector(options.description),
                    hasLikes = item.querySelector(options.likes),
                    hasViews = item.querySelector(options.views),
                    hasComments = item.querySelector(options.comments),
                    hasDislikes = item.querySelector(options.dislikes);


                if (options.imgWrapp !== false) {
                    var imgWrapp = hasImgWrapp || yllCreateElement('div', undefined, 'yll__img-wrapp', undefined,undefined);
                    imgWrapp.style.backgroundImage = `url(${videos[i].thumbnails[options.thumbnailSize].url})`;

                    if (!hasImgWrapp) {
                        item.appendChild(imgWrapp);
                    }

                    if(options.playIcon) {
                        var icon = yllCreateElement('img', {src: 'http://icons.iconarchive.com/icons/dakirby309/simply-styled/128/YouTube-icon.png'}, 'yll__youtube-icon', undefined, undefined);
                        imgWrapp.appendChild(icon);
                    }

                    imgWrapp.addEventListener('click', function() {
                        var iframe = yllCreateElement('iframe', {src: `https://www.youtube.com/embed/${videos[i].id}?autoplay=1`, 'allowfullscreen': 'allowfullscreen'}, 'yll__iframe', undefined, undefined);
                        if(icon) this.removeChild(icon)
                        this.appendChild(iframe);
                    })
                }

                if (options.title !== false) {
                    var title = hasTitle ?
                    hasTitle : item.appendChild(yllCreateElement('p', undefined, 'yll__title', undefined, undefined));

                    title.innerHTML = videos[i].title;
                }

                if (options.description !== false) {
                    var description = hasDescription ?
                    hasDescription : item.appendChild(yllCreateElement('p', undefined, 'yll__description', undefined, undefined));

                    description.innerHTML = videos[i].description;
                }
                if (options.likes !== false) {
                    var likes = hasLikes ?
                    hasLikes : item.appendChild(yllCreateElement('span', undefined, 'yll__likes', undefined, undefined));

                    likes.innerHTML = videos[i].likes;
                }
                if (options.views !== false) {
                    var views = hasViews ?
                    hasViews : item.appendChild(yllCreateElement('span', undefined, 'yll__views', undefined, undefined));

                    views.innerHTML = videos[i].views;
                }
                if (options.comments !== false) {
                    var comments = hasComments ?
                    hasComments : item.appendChild(yllCreateElement('span', undefined, 'yll__comments', undefined, undefined));

                    comments.innerHTML = videos[i].comments;
                }
                if (options.dislikes !== false) {
                    var dislikes = hasDislikes ?
                    hasDislikes : item.appendChild(yllCreateElement('span', undefined, 'yll__dislikes', undefined, undefined));

                    dislikes.innerText = videos[i].dislikes;
                }

            });
       } else {
         //failed
         console.log(request.responseText);
       }
     };

    request.send();
}// end YoutubeLazyLoad