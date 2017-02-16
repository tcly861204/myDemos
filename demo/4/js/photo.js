/**
 * Created by Administrator on 2017/2/13.
 */
window.onload = function(){
    var photo = {
        init:function(){
            var data = dataList;
            this.Len = data.length;
            this.createPhotos(data);
            var that = this;
            that.now = 0;
            this.sortImgs(that.now);
            $('.nav_i').query().forEach(function(item,i){
                item.index = i;
                item.onclick = function(){
                    if(that.now !== this.index) {
                        var nav = $('#nav_' + that.now);
                        nav.removeClass('back').removeClass('active');
                        var photo = $('#photo_' + that.now);
                        photo.removeClass('center').removeClass('back').addClass('front');
                        photo[0].onclick = null;
                        that.now = this.index;
                        that.flag = true;
                    }
                    that.trueImg($('#photo_'+this.index),$('#nav_'+this.index));
                }
            });
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
        },
        sortImgs:function(n){
            var photos = $('.photo_i'),
                center = photos.eq(n);
            center[0].removeAttribute('style');
            center.addClass('center');
            this.flag = true;
            var nav = $('#nav_'+n).addClass('active'),that = this;
            center[0].onclick = function(){
                that.trueImg(center,nav);
            };
            var photoArray = $('.photo_i').query();
            photoArray.splice(n,1);
            photoArray.sort(function(){
                return 0.5-Math.random();
            });
            var left = photoArray.splice(0,Math.floor(this.Len/2)),
                right = photoArray;
            var rP = this.scope();
            left.forEach(function(item,i){
                item.style.zIndex = that.rn([0,that.Len]);
                item.style.top = that.rn(rP.L.y)+'px';
                item.style.left = that.rn(rP.L.x)+'px';
                item.style.transform = 'translate(0,0) scale(.6) rotate('+that.rn([-2160,2160])+'deg)';
            });
            right.forEach(function(item,i){
                item.style.zIndex = that.rn([0,that.Len]);
                item.style.top = that.rn(rP.R.y)+'px';
                item.style.left = that.rn(rP.R.x)+'px';
                item.style.transform = 'translate(0,0) scale(.6) rotate('+that.rn([-2160,2160])+'deg)';
            });
        },
        rn:function(arr){  //编写某个区间的随机整数
             var max = Math.max.apply(null,arr),
                 min = Math.min.apply(null,arr);
             return Math.round(Math.random() * (max - min) + min);
        },
        scope:function(){
            var outter = $('.photo_wall')[0];
            var oneImg = $('#photo_'+this.rn([0,this.Len-1]))[0];
            var W = outter.clientWidth,
                H = outter.clientHeight,
                w = oneImg.offsetWidth,
                h = oneImg.offsetHeight;
            return {
                L:{
                    x:[-w/3,W/2 - w/2 - w],
                    y:[-h/3,H - h*2/3]
                },
                R:{
                    x:[W/2 + w/2,W - w*2/3],
                    y:[-h/3,H - h*2/3]
                }
            };
        },
        trueImg:function(obj,obj2){
            if(obj[0].className.indexOf('center')<0){
                this.sortImgs(this.now);
                return;
            }
            if(this.flag){
                this.flag = false;
                obj.removeClass('front').addClass('back');
                obj2.addClass('back');
            }else{
                this.flag = true;
                obj.removeClass('back').addClass('front');
                obj2.removeClass('back');
            }
        }
    };
    $('.shade').on('click',function(){
        $('.photo').css('opacity',1);
        $('.shade').addClass('hide').removeClass('shade');
        photo.init();
    });
};