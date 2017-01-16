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
        this.floor1_imageArray = [];
        this.facade_imageArray = [];
        this.floor2_before_imageArray = [];
        this.floor3_afterArrow_imageArray = [];
        this.suprise_imageArray = [];
        var ArrLength=120;
        var newstring='',newstring2='',newstring3='',newstring4='',newstring5='';
        for(var i=0;i<ArrLength;i=i+6){
            if(i<10){
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_0000'+i+'.png';
                newstring2='src/dist/images/'+'facade_alone/facadealone_0000'+i+'.png';
                newstring3='src/dist/images/'+'2before/2before_0000'+i+'.png';
                newstring4='src/dist/images/'+'3afterarrow/3afterarrow_0000'+i+'.png';
                newstring5='src/dist/images/'+'endingpage_frame2/endingpage_0000'+i+'.jpg';
            }else if(i>9 && i<100){
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_000'+i+'.png';
                newstring2='src/dist/images/'+'facade_alone/facadealone_000'+i+'.png';
                newstring3='src/dist/images/'+'2before/2before_000'+i+'.png';
                newstring4='src/dist/images/'+'3afterarrow/3afterarrow_000'+i+'.png';
                newstring5='src/dist/images/'+'endingpage_frame2/endingpage_000'+i+'.jpg';
            }else{
                newstring='src/dist/images/'+'floor_withoutbg/1floorwithoutbg_00'+i+'.png';
                newstring2='src/dist/images/'+'facade_alone/facadealone_00'+i+'.png';
                newstring3='src/dist/images/'+'2before/2before_00'+i+'.png';
                newstring4='src/dist/images/'+'3afterarrow/3afterarrow_00'+i+'.png';
                newstring5='src/dist/images/'+'endingpage_frame2/endingpage_00'+i+'.jpg';
            }
            this.floor1_imageArray.push(newstring);
            this.facade_imageArray.push(newstring2);
            this.floor2_before_imageArray.push(newstring3);
            this.floor3_afterArrow_imageArray.push(newstring4);
            this.suprise_imageArray.push(newstring5);
        };


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
        imagesArray = imagesArray.concat(self.floor1_imageArray).concat(self.facade_imageArray).concat(self.floor2_before_imageArray).concat(self.floor3_afterArrow_imageArray).concat(self.suprise_imageArray);
        var i = 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                $('.preload .v-content').html('已加载'+progress+'%');
            },
            onComplete: function(){
                //
                //
                $('.preload').remove();
                $('.container').addClass('fade');
                //self.welcomePage();
                //self.doGame();
                self.getSurprise();

            }
        });


    };

    //welcome page
    controller.prototype.welcomePage = function(){
        var self = this;
        //go first page
        Common.gotoPin(0);
        var j=0;
        var reqAnimateHome = new reqAnimate($('#pin-home .content img'),{
            fps: 6,
            totalFrames: 20,
            time: 2,
            processAnimation: function(){
                var imgName = self.facade_imageArray[j];
                if(j>self.facade_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#pin-home .content img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateHome.start();

    //    click page, go game page
        $('#pin-home').on('touchstart',function(){
            reqAnimateHome.cancel();
            self.doGame();
        });
    };

    //game page
    controller.prototype.doGame = function(){
        var self = this;
        Common.gotoPin(1);
        self.animateForFloor2Before();
        self.animateForFloor1();

        var container = $('.pin-content');
        var scrren_1 = $('.screen-1'),
            scrren_2 = $('.screen-2'),
            scrren_3 = $('.screen-3');

        var ele = document.getElementById('action-chicken');
        var chickenLength = $(ele).width()*0.6;
        var minPosX = -$(ele).width(),maxPosX = container.width(),
            minPosY = 0,maxPosY = container.height() - scrren_1.height();
        var firstPosX = container.width()/2 - $('.role .role-progress').width()/ 2,
            firstLevelPosX = $('#floor1 .level')[0].offsetLeft - chickenLength;

        var floor2LevelPosX =$('#floor2').width()*0.4,
            floor1PosY = scrren_1[0].offsetTop + scrren_1.height() - $('.role').height(),
            floor2PosY = scrren_2[0].offsetTop + scrren_2.height() - $('.role').height(),
            floor3PosY = 0;

        var floor3PosXEnd = $('#floor2').width()*0.77 - $(ele).width()*0.5;
        var step = 10;
        $('.role').css('top',floor1PosY);

        self.startMove(ele,minPosX,firstLevelPosX,step);

        //self.curStep = 5;
        ele.addEventListener('transitionend',function(){

            switch (self.curStep)
            {
                case 0:
                    console.log("floor1: from left to middle");
                    //console.log(self.curStep);
                    $('#floor1 .dialogue').addClass('show');
                    $('#floor1 .dialogue-btn').on('touchstart',function(){
                        if(self.curStep ==1){
                            $('#floor1 .dialogue').removeClass('show');
                            //after animation
                            $('#floor1 .level').addClass('after');
                            $('#floor1 .level img').attr('src','/src/dist/images/1eventafter2.gif');
                            $(ele).css('left',maxPosX);
                        }
                    });
                    break;
                case 1:
                    console.log("floor1: from middle to  right");
                    $('.role').css('top',floor2PosY);
                    $(ele).addClass('change');
                    break;
                case 2:
                    console.log("floor1-2: from floor1 right to floor2 right");
                    $(ele).css('left',floor2LevelPosX);
                    $('.role').addClass('floor2mask');
                    break;
                case 3:
                    console.log("floor2: from right to middle");
                    $('#floor2 .dialogue').addClass('show');
                    $('#floor2 .dialogue-btn').on('touchstart',function(){
                        if(self.curStep ==4){
                            $('#floor2 .dialogue').removeClass('show');
                            //after animation
                            $('#floor2 .level').addClass('after');
                            $('#floor2 .level img').attr('src','/src/dist/images/1eventafter2.gif');
                            $(ele).css('left',minPosX);
                        }
                    });
                    break;
                case 4:
                    console.log("floor2: from middle to left");
                    $('.role').css('top',floor3PosY);
                    $(ele).removeClass('change');
                    break;
                case 5:
                    console.log("floor2-3: from floor2 left to floor3 left");
                    $('.role').css('top',floor3PosY).addClass('floor3mask');
                    $(ele).css('left',firstLevelPosX);
                    break;
                case 6:
                    console.log("floor3: from floor3 left to middle");
                    $('#floor3 .dialogue').addClass('show');
                    $('#floor3 .dialogue-btn').on('touchstart',function(){
                        if(self.curStep ==7){
                            $('#floor3 .dialogue').removeClass('show');
                            //after animation
                            //$('#floor3 .level').addClass('after');
                            //$('#floor3 .level img').attr('src','/src/dist/images/1eventafter2.gif');
                            $(ele).css('left',floor3PosXEnd-20);
                        }
                    });
                    break;
                case 7:
                    console.log("floor3: from floor3 middle to right");
                    //transform the element
                    self.animateForFloor3();
                    //$(ele).css({
                    //    left:firstLevelPosX+250,
                    //    bottom:0,
                    //});
                    $(ele).css('left',floor3PosXEnd);
                    break;
                case 8:
                    console.log("floor3: from floor3 right to out");
                    $(ele).addClass('changedirection').css({
                        left:floor3PosXEnd+$(ele).width(),
                        bottom:$(ele).height(),
                    });
                    break;
                case 9:
                    console.log("floor3: from floor3 out to hide");
                    self.getSurprise();
                    break;
            };
            self.curStep++;
            self.enableMove = false;
        });


    };
    controller.prototype.animateForFloor2Before = function () {
        var self = this;
        var j = 0;
        var reqAnimateFloor2Before = new reqAnimate($('#floor2 .l-bg img'),{
            fps: 6,
            totalFrames: 20,
            //time: 0,
            processAnimation: function(){
                var imgName = self.floor2_before_imageArray[j];
                if(j>self.floor2_before_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#floor2 .l-bg img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateFloor2Before.start();

    };
    controller.prototype.animateForFloor1 = function () {
        var self = this;
        var j = 0;
        var reqAnimateNow = new reqAnimate($('#floor1 .l-bg img'),{
            fps: 6,
            totalFrames: 20,
            //time: 0,
            processAnimation: function(){
                var imgName = self.floor1_imageArray[j];
                if(j>self.floor1_imageArray.length-2){
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

    };

    controller.prototype.animateForFloor3 = function () {
        var self = this;
        var j = 0;
        var reqAnimateFloor3 = new reqAnimate($('#floor3 .arrow img'),{
            fps: 6,
            totalFrames: 20,
            time: 1,
            processAnimation: function(){
                var imgName = self.floor3_afterArrow_imageArray[j];
                if(j>self.floor3_afterArrow_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#floor3 .arrow img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateFloor3.start();

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
        var self = this;
        Common.gotoPin(2);
        self.surpriseBgAni();
        //click ask btn, go exchange
        $('.result-ask .btn').on('touchstart', function(){
            $('.result-ask').removeClass('show');
            $('.result-1').addClass('show');
        });

        //click go to qrcode part
        $('.result .btn-exchange').on('touchstart', function(){
            $('.result').removeClass('show');
            $('.qrcode').addClass('show');
        });

        //qrcode
        $('.qrcode .btn-exchange').on('touchstart', function(){
            self.welcomePage();
        });

    };

    controller.prototype.surpriseBgAni = function () {
        var self = this;
        var j = 0;
        var reqAnimateSurpriseBgAni = new reqAnimate($('#pin-surprise .result-wrap img'),{
            fps: 6,
            totalFrames: 20,
            //time: 1,
            processAnimation: function(){
                var imgName = self.suprise_imageArray[j];
                if(j>self.suprise_imageArray.length-2){
                    j=0;
                }
                j++;
                $('#pin-surprise .result-wrap img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateSurpriseBgAni.start();

    };

    //dom ready
    $(document).ready(function(){

        var welcome = new controller();
        welcome.init();


    });


})();

