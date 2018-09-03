function YoutubeLazy(options) {

    var nodes = document.querySelectorAll('[data-youtube-lazy]'),
        idArray = [],
        apiKey = 'AIzaSyAk4ile8sBWQZYCuFhwEHukBw24JzLVXSo',
        parametrs = 'snippet,contentDetails,statistics,status';


    nodes.forEach(function(item, i) {
        var videoId = item.getAttribute('data-youtube-lazy');
        idArray.push(videoId);
    });

    axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${idArray.join(',')}&key=${apiKey}&part=${parametrs}`)
    .then((response) => {
        var items = response.data.items,
        videos = [];

        items.forEach(function(item) {
            videos.push({
                title: item.snippet.localized.title,
                description: item.snippet.localized.description,
                views: item.statistics.commentCount,
                comments: item.statistics.commentCount,
                likes: item.statistics.likeCount,
                dislikes: item.statistics.dislikeCount,
                thumbnails: item.snippet.thumbnails
            });
        });


    }).catch((err) => {});


}


YoutubeLazy();