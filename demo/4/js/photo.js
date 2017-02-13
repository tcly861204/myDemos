/**
 * Created by Administrator on 2017/2/13.
 */
window.onload = function(){
    var photo = {
        init:function(){
            var data = dataList,
                len = data.length;
            this.createPhotos(data);
        },
        createPhotos:function(data){
            var photo_html = $('.photo')[0].innerHTML.split('{{split}}')[0].trim();
            var nav_html = $('.nav')[0].innerHTML.trim();
            var photos=[],navs=[];
            data.forEach(function(item,i){
                var photoTemp = photo_html.replace(/{{id}}/,i)
                    .replace(/{{src}}/,'src')
                    .replace(/{{img}}/,item.img)
                    .replace(/{{caption}}/,item.caption)
                    .replace(/{{desc}}/,item.desc);
                var navTemp = nav_html.replace(/{{id}}/,i);
                photos.push(photoTemp);
                navs.push(navTemp);
            });
            photos.push('<div class="nav">'+navs.join('')+'</div>');
            $('.photo')[0].innerHTML = photos.join('');
        }
    };
    photo.init();





};