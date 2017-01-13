;(function(){

    var controller = function(){
        this.enableMove = true;
        this.firstStop = true;
        this.secondStop = false;
        this.thirdStop = false;
        /*each transition end set to ++*/
        /*we have 8 transition end for chicken element*/
        this.curStep = 0;
        //this.firstStop = true;
        this.floor1_imageArray = [],ArrLength=120;
        for(var i=0;i<ArrLength;i++){
            if(i<10){
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_0000'+i+'.png';
            }else if(i>9 && i<100){
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_000'+i+'.png';
            }else{
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_00'+i+'.png';
            }
            this.floor1_imageArray.push(newstring);
        }
        //console.log(floor1_imageArray);


    };
    //init
    controller.prototype.init = function(){
        var self = this;
        //self.welcomePage();
        //self.doGame();
        var baseurl = 'src/dist/images/';
        var imagesArray = [
            //baseurl+'logo.png',
        ];
        imagesArray.join(self.floor1_imageArray);
        //console.log(imagesArray);
        //var floor1_bg = [];
        //append floor 1 image sequece to imageArray
        for(var x=0;x<120;x++){
            var newstring = '';
            if(x<10){
                newstring=baseurl+'floor_withoutbg/1floorwithoutbg_0000'+x+'.png';
            }else if(x>9 && x<100){
                newstring=baseurl+'floor_withoutbg/1floorwithoutbg_000'+x+'.png';
            }else{
                newstring=baseurl+'floor_withoutbg/1floorwithoutbg_00'+x+'.png';
            }
            imagesArray.push(newstring);
        }
        var i = 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                //$('.preload .v-content').html('已加载'+progress+'%');
            },
            onComplete: function(){
                //
                //
                $('.preload').remove();
                $('.container').addClass('fade');
                self.doGame();

            }
        });


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
        self.animateForFloor3();

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


            switch (self.curStep)
            {
                case 0:
                    console.log("floor1: from left to middle");
                    break;
                case 1:
                    console.log("floor1: from middle to  right");
                    break;
                case 2:
                    console.log("floor1-2: from floor1 right to floor2 right");
                    break;
                case 3:
                    console.log("floor2: from right to middle");
                    break;
                case 4:
                    console.log("floor2: from middle to left");
                    break;
                case 5:
                    console.log("floor2-3: from floor2 left to floor3 left");
                    break;
                case 6:
                    console.log("floor3: from floor3 left to middle");
                    break;
                case 7:
                    console.log("floor3: from floor3 middle to right");
                    break;
                case 8:
                    console.log("floor3: from floor3 right to out");
                    break;
            };
            self.curStep++;
            self.enableMove = false;
            ////self.forbiddenMove();
            //if(self.firstStop && !self.secondStop && !self.thirdStop){
            //    //    first
            //    console.log('end');
            //    console.log('dofirstAnimate');
            //    return;
            //}else if(!self.firstStop && self.secondStop && !self.thirdStop){
            //    console.log('end');
            //    console.log('dofirst2Animate');
            //    $(ele).css('left',0);
            //    $('.role').css('bottom','4rem');
            //    //self.firstStop = false;
            //    //self.secondStop = true;
            //}
        });


        $('#floor1').on('touchstart',function(){
            console.log('click');

            if(self.curStep ==1){
                $(ele).css('left',maxPosX);
            }
        });



    };
    controller.prototype.animateForFloor3 = function () {
        var self = this;
        var j = 0;
        var reqAnimateNow = new reqAnimate($('#floor1 .l-bg img'),{
            fps: 30,
            totalFrames: 120,
            //time: 0,
            processAnimation: function(){
                var imgName = self.floor1_imageArray[j];
                if(j>118){
                    j=0;
                }
                j++;
                $('#floor1 .l-bg img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateNow.start();

    }

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
        var self = this;
        Common.gotoPin(2);

    };

    //dom ready
    $(document).ready(function(){

        var welcome = new controller();
        welcome.init();


    });


})();

