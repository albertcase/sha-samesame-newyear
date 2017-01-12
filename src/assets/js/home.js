;(function(){

    var controller = function(){
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

        var step = 5;
        self.startMove($('.role .role-progress'),minPosX,maxPosX,step);

    };

    //the element start move
    controller.prototype.startMove = function(e,startPos,endPos,step){
        var self = this;
        var curPos = e[0].offsetLeft;
        e.css('left',endPos);
        //var aaa = setTimeout(function(){
        //    e.css('left',endPos+$('.role').width());
        //    self.maskChicken(e.find('.role-progress'));
        //},4000);
        //var doNow = setInterval(function(){
        //    curPos = curPos + step;
        //
        //    if(curPos>endPos){
        //        clearInterval(doNow);
        //        return;
        //    };
        //
        //},1000);

    };

    //stop move
    controller.prototype.stopMove = function(){

    };

    //change role progress
    controller.prototype.maskChicken = function(e){
        //use mask, not width
        e.css('-webkit-mask-position','100% 0');
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

