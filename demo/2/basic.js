/**
 * Created by Administrator on 2017/1/4.
 */
window.onload = function(){
    var dom = document.getElementById('clock'),
        ctx = dom.getContext('2d'),
        now = new Date();
    var drawClock = {
        init:function(_ctx,h,m,s){
            this.ctx = _ctx;
            this.width = this.ctx.canvas.width;
            this.height = this.ctx.canvas.height;
            this.r = this.width/2;
            this.rem = this.width/200;
            this.drawBackground(h,m,s);
        },
        drawBackground:function(h,m,s){
            var that = this;
            this.ctx.save();
            this.ctx.translate(this.r,this.r);
            this.ctx.beginPath();
            this.ctx.lineWidth = this.rem*10;
            this.ctx.arc(0,0,(this.r-this.rem*5),0,2*Math.PI,true);
            this.ctx.stroke();
            this.hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
            this.ctx.font = (this.rem*16)+'px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.hourNumbers.forEach(function(number,i){
                that.ctx.deg = (2*Math.PI/12)*i;
                that.ctx.x = Math.cos(that.ctx.deg)*(that.r-that.rem*30);
                that.ctx.y = Math.sin(that.ctx.deg)*(that.r-that.rem*30);
                that.ctx.fillText(number,that.ctx.x,that.ctx.y);
            });
            for(var i=0;i<60;i++){
                this.ctx.deg = (2*Math.PI/60)*i;
                this.ctx.x = Math.cos(this.ctx.deg)*(this.r-that.rem*19);
                this.ctx.y = Math.sin(this.ctx.deg)*(this.r-that.rem*19);
                this.ctx.beginPath();
                if(i%5===0){
                    this.ctx.fillStyle = '#000';
                }else{
                    this.ctx.fillStyle = '#ccc';
                }
                this.ctx.arc(this.ctx.x,this.ctx.y,this.rem*2,0,2*Math.PI,true);
                this.ctx.fill();
            }
            this.drawHour(h,m,s);
        },
        drawHour:function(hour,minutes,second){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.deg = (2*Math.PI/12)*hour;
            this.ctx.mindeg = (2*Math.PI/12/60)*minutes;
            this.ctx.rotate(this.ctx.deg+this.ctx.mindeg);
            this.ctx.lineWidth = this.rem*6;
            this.ctx.lineCap = 'round';
            this.ctx.moveTo(0,this.rem*10);
            this.ctx.lineTo(0,-this.r/2);
            this.ctx.stroke();
            this.ctx.restore();
            this.drawMinutes(minutes,second);
        },
        drawMinutes:function(minutes,second){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.deg = (2*Math.PI/60)*minutes;
            this.ctx.rotate(this.ctx.deg);
            this.ctx.lineWidth = this.rem*3;
            this.ctx.lineCap = 'round';
            this.ctx.moveTo(0,10);
            this.ctx.lineTo(0,-this.r+this.rem*30);
            this.ctx.stroke();
            this.ctx.restore();
            this.drawSecond(second);
        },
        drawSecond:function(second){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.deg = (2*Math.PI/60)*second;
            this.ctx.rotate(this.ctx.deg);
            this.ctx.fillStyle = '#f00';
            this.ctx.moveTo(-this.rem*2,this.rem*20);
            this.ctx.lineTo(this.rem*2,this.rem*20);
            this.ctx.lineTo(this.rem,-this.r+this.rem*18);
            this.ctx.lineTo(-this.rem,-this.r+this.rem*18);
            this.ctx.fill();
            this.ctx.restore();
            this.drawDot();
        },
        drawDot:function(){
            this.ctx.beginPath();
            this.ctx.fillStyle = '#666';
            this.ctx.arc(0,0,this.rem*6,0,2*Math.PI,false);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.fillStyle = '#fff';
            this.ctx.arc(0,0,this.rem*3,0,2*Math.PI,false);
            this.ctx.fill();
            this.ctx.restore();
        }
    };
    drawClock.init(ctx,now.getHours(),now.getMinutes(),now.getSeconds());
    setInterval(function(){
        now = new Date();
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        drawClock.init(ctx,now.getHours(),now.getMinutes(),now.getSeconds());
    },1000);




};































