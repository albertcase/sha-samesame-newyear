;(function(){

    var controller = function(){
        this.enableMove = true;
        this.firstStop = true;
        this.secondStop = false;
        this.thirdStop = false;
        //this.firstStop = true;

    };
    //init
    controller.prototype.init = function(){
        var self = this;
        //self.welcomePage();
        self.doGame();
    };

    //welcome page
    controller.prototype.welcomePage = function(){
        var self = this;
        //go first page
        Common.gotoPin(0);

    //    click page, go game page
        $('#pin-home').on('touchstart',function(){
            self.doGame();
        });
    };

    //game page
    controller.prototype.doGame = function(){
        var self = this;
        Common.gotoPin(1);

        var container = $('.pin-content');
        var scrren_1 = $('.screen-1'),
            scrren_2 = $('.screen-2'),
            scrren_3 = $('.screen-3');

        var minPosX = 0,maxPosX = container.width(),
            minPosY = 0,maxPosY = container.height() - scrren_1.height();
        var firstPosX = container.width()/2 - $('.role .role-progress').width()/2;
        var ele = document.getElementById('action-chicken');
        var step = 10;
        self.startMove(ele,minPosX,firstPosX,step);
        //var aaa = setTimeout(function(){
        //    self.forbiddenMove();
        //},4000);

        //ele.addEventListener('animationstart',function(){
        //    console.log('start');
        //});
        ele.addEventListener('transitionend',function(){
            console.log('end');
            console.log('dofirstAnimate');
            self.enableMove = false;
            //self.forbiddenMove();
        });


        $('.screen-3').on('touchstart',function(){
            //$(ele).css('left',curPos);

            if(self.firstStop && !self.secondStop && !self.thirdStop){
                //    first
                //self.enableMove = true;
                $(ele).css('left',maxPosX);
            }
        });



    };

    //the element start move
    controller.prototype.startMove = function(e,startPos,endPos,step){
        var self = this;
        var curPos = e.offsetLeft;
        $(e).css('left',endPos);
        //var aaa = setTimeout(function(){
        //    self.forbiddenMove();
        //},4000);



    };

    //stop move
    controller.prototype.stopMove = function(){

    };
    controller.prototype.forbiddenMove = function(){
        var self = this;
        var curPos = $('.role-progress').offsetLeft;
        alert('第一个挡住');
        $('.screen-3').on('touchstart',function(){
            self.startMove($('.role .role-progress'),curPos,$('.container').width(),0);
        });
    };

    //change role progress
    controller.prototype.maskChicken = function(e){

    };

    //go surprise page
    controller.prototype.getSurprise = function(){

    };

    //dom ready
    $(document).ready(function(){

        var welcome = new controller();
        welcome.init();


    });


})();

