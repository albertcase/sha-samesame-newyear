;(function(){
    $.ajax({
        url:'http://2017cnygreeting.samesamechina.com/jssdk?url=http://2017cnygreeting.samesamechina.com',
        type:'GET',
        dataType:'json',
        success:function(data){
            console.log(data);
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }
    });

    wx.ready(function(){
        //wx.hideOptionMenu({
        //    menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:QZone","menuItem:copyUrl","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email"] // 要显示的菜单项，所有menu项见附录3
        //});
        wx.onMenuShareAppMessage({
            title: '与刘嘉玲、娜扎一起领略ROSSO VALENTINO梦幻之作',
            desc: '红色SPIKE铆钉链条包，Valentino微信独家限量发售。',
            link: 'http://rossovalentino.samesamechina.com/event/',
            imgUrl: window.location.origin+'/src/images/share.jpg',
            type: '',
            dataUrl: '',
            success: function () {
                //    success
                _hmt.push(['_trackEvent', 'btn-weixin', 'share', 'success']);

            },
            cancel: function () {
            }
        });
        wx.onMenuShareTimeline({
            title: '与刘嘉玲、娜扎一起领略ROSSO VALENTINO梦幻之作',
            link: 'http://rossovalentino.samesamechina.com/event/',
            imgUrl: window.location.origin+'/src/images/share.jpg',
            success: function () {
                _hmt.push(['_trackEvent', 'btn-weixin', 'share', 'success']);
            },
            cancel: function () {

            }
        });

    })
})();
