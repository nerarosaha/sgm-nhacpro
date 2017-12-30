jQuery(function($) {
    "use strict";
    var SLZ = window.SLZ || {};
    SLZ.headerFunction = function() {
        $(".hamburger-menu").on('click', function() {
            $(".hamburger-menu").toggleClass("active");
            $('body').toggleClass("show-megamenu-mobile");
            $('.navigation-mobile').css("min-height", $('.body-wrapper').height() - $(".header-topbar").height() - $(".header-middle").height());
        });
        $('body').on('click', function(event) {
            if ($('.hamburger-menu').has(event.target).length === 0 && !$('.hamburger-menu').is(event.target) && $('.navigation-mobile').has(event.target).length === 0 && !$('.navigation-mobile').is(event.target) && $('#modal-login').has(event.target).length === 0 && !$('#modal-login').is(event.target)) {
                $(".hamburger-menu").removeClass("active");
                $('body').removeClass("show-megamenu-mobile");
                $('.navigation-mobile').css("min-height", 0);
            }
            if ($('.section-login .dropdown-list-item').has(event.target).length === 0 && !$('.section-login .dropdown-list-item').is(event.target) && $('.section-login .user-name').has(event.target).length === 0 && !$('.section-login .user-name').is(event.target)) {
                $('.section-login .dropdown-list-item').addClass('hide');
            }
            if ($('.arrange-box').has(event.target).length === 0 && !$('.arrange-box').is(event.target)) {
                $('.arrange-box .dropdown-list-item').addClass('hide');
            }
        });
        $('.icons-dropdown-wrapper').on('click', function() {
            $(this).toggleClass('submenu-opened');
            $(this).next().toggleClass('open');
        });
        $('.user-info .user-name').on('click', function(event) {
            event.preventDefault();
            $(this).parent().find(".dropdown-list-item").toggleClass('hide');
        });
        if ($('.back-to-top').length) {
            var scrollTrigger = 100;
            var backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.back-to-top').addClass('show');
                } else {
                    $('.back-to-top').removeClass('show');
                }
            };
            backToTop();
            $(window).on('scroll', function() {
                backToTop();
            });
            $('.back-to-top').on('click', function(e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }
        $('.arrange-box .btn-select').on('click', function(event) {
            event.preventDefault();
            $(this).parent().find(".dropdown-list-item").toggleClass('hide');
        });
        $('.arrange-box .dropdown-list-item a').on('click', function(event) {
            $(this).parents('.dropdown-list-item').addClass('hide');
            var text = $(this).text();
            $(this).parents('.arrange-box').find('.btn-select span').text(text);
        });
        $('.box-create-playlist .btn-add-list').on('click', function(event) {
            event.preventDefault();
            $(this).parent().find(".dropdown-list-item").removeClass('hide');
            $('.btn-add-list').css({
                "color": "#f4b43e"
            });
        });
        $('.dropdown-list-item .btn-close').on('click', function(event) {
            event.preventDefault();
            $('.box-create-playlist').find(".dropdown-list-item").addClass('hide');
            $('.btn-add-list').css({
                "color": "#000"
            });
        });
        var isOpenEditbox = false;
        $('.group-btn-edit .btn-edit').on('click', function(event) {
            event.preventDefault();
            isOpenEditbox = true;
            var $labelDes = $('.news-layout-2.box-edit-playlist .news-content .description');
            $(this).addClass('hide');
            $('.group-btn-edit .btn-accept').removeClass('hide');
            $labelDes.addClass('hide');
            var $txtareaDescription = $labelDes.parent().find("#txtareaDescription");
            $txtareaDescription.parent().removeClass('hide');
            $txtareaDescription.val($labelDes.text());
            $txtareaDescription.focus();
        });
        $('.group-btn-edit .btn-accept').on('click', function(event) {
            if (isOpenEditbox === true) {
                event.preventDefault();
                isOpenEditbox = false;
                $(this).addClass('hide');
                $('.group-btn-edit .btn-edit').removeClass('hide');
                var $labelDes = $('.news-layout-2.box-edit-playlist .news-content .description');
                var $txtareaDes = $labelDes.parent().find("#txtareaDescription");
                var $playlist_list_id = $('.news-layout-2.box-edit-playlist .news-content .playlist_list_id');
                playlist_save_settings($playlist_list_id.val(), $txtareaDes.val());
                $labelDes.text($txtareaDes.val());
                $labelDes.removeClass('hide');
                $txtareaDes.parent().addClass('hide');
            }
        });
    };
    SLZ.mainFunction = function() {
        if ($('.video-related').length) {
            $('.video-related').slick({
                vertical: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                draggable: false,
                focusOnSelect: true,
                responsive: [{
                    breakpoint: 1025,
                    settings: {
                        vertical: false,
                        draggable: true,
                        slidesToShow: 3
                    }
                }, {
                    breakpoint: 769,
                    settings: {
                        vertical: false,
                        draggable: true,
                        slidesToShow: 2
                    }
                }, {
                    breakpoint: 481,
                    settings: {
                        vertical: false,
                        draggable: true,
                        slidesToShow: 1,
                        arrows: false,
                        dots: true
                    }
                }]
            });
            if (window.innerWidth > 1024) {
                setTimeout(function() {
                    $('.video-related').css('height', $('.video-container > iframe').height());
                    $('.video-related .slick-list').css('height', $('.video-related .slick-list').height());
                    $('#stick_video_title').html('<a style="color:#898989;" href=' + $('.title.active').attr('href-source') + '>' + $('.title.active').html() + '</a>')
                }, 0);
            }
            $('.related-item').on('click', function(event, slick, currentSlide, nextSlide) {
                event.preventDefault();
                $('.news-related .title').removeClass('active');
                var a = $('.video-related .title');
                var url = $(this).find('.title').attr('video-source');
                for (var i = 0; i < a.length; i++) {
                    if ($(a[i]).attr('video-source') == url) {
                        $(a[i]).addClass('active');
                    }
                }
                $(this).find('.title').addClass('active');
                pm_video_data.next_url = $(this).closest('div').nextAll('.related-item')[0];
                var autoplay = jQuery.parseJSON($('#video-js').attr('data-setup'));
                autoplay.autoplay = true;
                autoplay = JSON.stringify(autoplay);
                $('#video-js').attr('data-setup', autoplay);
                $('#stick_video_title').html('<a style="color:#898989;" href=' + $('.title.active').attr('href-source') + '>' + $('.title.active').html() + '</a>');
                var video = videojs('#video-js').ready(function() {
                    var player = this;
                    player.on('loadedmetadata', function() {
                        $('.vjs-big-play-button').addClass('vjs-pm-show-big-play');
                        $('.vjs-control-bar').css({
                            "display": "block"
                        });
                    });
                    player.src([{
                        src: url,
                        type: "video/youtube"
                    }]);
                    player.on('waiting', function() {
                        $('.vjs-loading-spinner').removeClass('vjs-hidden');
                    });
                    player.persistvolume({
                        namespace: "Melody-vjs-Volume"
                    });
                    player.socialShare({
                        twitter: {},
                        facebook: {},
                    });
                    player.on('ended', function() {});
                });
                setTimeout(function() {
                    $('.iframeblocker').click()
                }, 1000);
            });
            $('.video-related').on('afterChange', function(event, slick, currentSlide, nextSlide) {
                if (window.innerWidth > 1024) {
                    setTimeout(function() {
                        $('.video-related .slick-list').css('height', $('.video-related .slick-list').height() - 4);
                    }, 0);
                }
            });
        }
        $('.mega-child-categories .mega-cat-child').on('mouseenter', function() {
            $('.mega-child-categories .mega-cat-child').parent().removeClass('active');
            $(this).parent().addClass('active');
            var menuID = $(this).data('target');
            $('.content-megamenu .tab-pane').removeClass('in active');
            $('.content-megamenu ' + menuID).addClass('in active');
        });
        if (window.innerWidth > 991) {
            if ($('.video-detail').length) {
                $('.player,.video-overlay').css('height', $('.video-detail .video-wrapper').height());
            }
            if ($('.video-playlist').length) {
                $('.player,.video-overlay').css('height', $('.video-playlist .video-wrapper').height());
            }
        }
        if ($('.search-wrapper').length) {
            $('.search-wrapper input').blur(function(event) {
                $('.search-result').addClass('hide');
            }).focus(function(event) {
                $('.search-result').removeClass('hide');
            });
        }
        $('.list-group-action li:not(.btn-expand-wrapper) a').on('click', function(event) {
            event.preventDefault();
            if ($(this).parent('li').hasClass('active')) {
                $($(this).attr('href')).removeClass('active');
                $(this).parent('li').removeClass('active');
            } else {
                $('.section-action-content .tab-pane').removeClass('active');
                $('.list-group-action li:not(.btn-expand-wrapper)').removeClass('active');
                $($(this).attr('href')).addClass('active in');
                $(this).parent('li').addClass('active');
            }
        });
        if ($('.btn-expand').length) {
            $('.btn-expand').on('click', function(event) {
                $(this).toggleClass('active');
                event.preventDefault();
                $('.video-detail,.video-playlist').toggleClass('video-expanded');
                if ($('.video-detail').length) {
                    $('.player,.video-overlay').css('height', $('.video-detail .video-wrapper').height());
                }
                if ($('.video-playlist').length) {
                    $('.player,.video-overlay').css('height', $('.video-playlist .video-wrapper').height());
                }
            });
        }
        if ($('.sendto-wrapper').length) {
            $('.sendto-wrapper .btn-sendto').on('click', function(event) {
                event.preventDefault();
                $(this).parent().parent().find('.sendto-content').toggleClass('hide');
            });
        }
        if ($('.code-wrapper').length) {
            $('.btn-code').on('click', function(event) {
                event.preventDefault();
                $(this).parent().parent().find('.embed-link').toggleClass('hide');
            });
        }

        function Video_Select() {
            $(this).addClass('watching');
            $('.playlist-current').html($('.list-video .item.watching').index() + 1);
            var index = $('.list-video .item.watching').index();
            var scrollTo = $('.list-video .item').outerHeight(true) * index;
            $('.list-video').mCustomScrollbar('scrollTo', scrollTo);
        }
        if ($('.list-video').length) {
            $('.list-video').mCustomScrollbar();
            $('.list-video').css('height', $('.playlist-wrapper').height() - $('.playlist-header').height());
            Video_Select();
        }
        if ($('.playlist-action').length) {
            $('.btn-loop').on('click', function(event) {
                if ($.cookie('loop') == 'off') {
                    event.preventDefault();
                    $(this).parent().addClass('active');
                    $.cookie('loop', 'on')
                    var list_videos = $('.list-video .item');
                    var index = $('.list-video .item.watching').index();
                    var count_videos = list_videos.length;
                    if (index == count_videos - 1) {
                        pm_video_data.last_video = true;
                    } else {
                        pm_video_data.last_video = false;
                    }
                } else {
                    event.preventDefault();
                    $.cookie('loop', 'off');
                    $(this).parent().removeClass('active');
                }
            });
            $('.btn-random').on('click', function(event) {
                if ($.cookie('random') == 'on') {
                    $.cookie('random', 'off');
                    $(this).parent().removeClass('active');
                    var index = $('.list-video .item.watching').index();
                    var other_videos = $('.list-video .item:not(.watching)');
                    try {
                        pm_video_data.url_random = other_videos[index].childNodes[1].childNodes[3].childNodes[0].href;
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    event.preventDefault();
                    $(this).parent().addClass('active');
                    var other_videos = $('.list-video .item:not(.watching)').sort(function() {
                        return 0.5 - Math.random();
                    });
                    try {
                        pm_video_data.url_random = other_videos[0].childNodes[1].childNodes[3].childNodes[0].href;
                    } catch (err) {
                        console.log(err)
                    }
                    $.cookie('random', 'on');
                    console.log($.cookie('random'));
                }
            });
        }
        if ($.cookie('loop') != null) {
            if ($.cookie('loop') == 'on') {
                $('.btn-loop').parent().addClass('active');
                var list_videos = $('.list-video .item');
                var index = $('.list-video .item.watching').index();
                var count_videos = list_videos.length;
                if (index == count_videos - 1) {
                    pm_video_data.last_video = true;
                } else {
                    pm_video_data.last_video = false;
                }
            } else {
                event.preventDefault();
                $('.btn-loop').parent().removeClass('active');
                var list_videos = $('.list-video .item');
                var index = $('.list-video .item.watching').index();
                var count_videos = list_videos.length;
                if (index == count_videos - 1) {
                    pm_video_data.last_video = true;
                } else {
                    pm_video_data.last_video = false;
                }
            }
        }
        if ($.cookie('random') != null) {
            if ($.cookie('random') == 'on') {
                $('.btn-random').parent().addClass('active');
                var other_videos = $('.list-video .item:not(.watching)').sort(function() {
                    return 0.5 - Math.random();
                });
                pm_video_data.url_random = other_videos[0].childNodes[1].childNodes[3].childNodes[0].href;
            } else {
                $('.btn-random').parent().removeClass('active');
            }
        }

        function CreateCaptcha() {
            var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
            var i, letter_1, letter_2, letter_3, letter_4, letter_5, letter_6;
            for (i = 0; i < 6; i++) {
                letter_1 = alpha[Math.floor(Math.random() * alpha.length)];
                letter_2 = alpha[Math.floor(Math.random() * alpha.length)];
                letter_3 = alpha[Math.floor(Math.random() * alpha.length)];
                letter_4 = alpha[Math.floor(Math.random() * alpha.length)];
                letter_5 = alpha[Math.floor(Math.random() * alpha.length)];
                letter_6 = alpha[Math.floor(Math.random() * alpha.length)];
            }
            cd = letter_1 + ' ' + letter_2 + ' ' + letter_3 + ' ' + letter_4 + ' ' + letter_5 + ' ' + letter_6;
            $('#CaptchaImageCode').empty().append('<canvas id="CapCode" class="capcode" width="150" height="30"></canvas>');
            var c = document.getElementById("CapCode"),
                ctx = c.getContext("2d"),
                x = c.width / 2,
                img = new Image();
            img.src = "assets/images/bg-captcha.jpg";
            img.onload = function() {
                var pattern = ctx.createPattern(img, "repeat");
                ctx.fillStyle = pattern;
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.font = "bold 24px Roboto Slab";
                ctx.fillStyle = '#5b5b5b';
                ctx.textAlign = 'center';
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillText(cd, x, 24);
            };
        }
        if ($('.sendto-content').length) {
            var cd;
            $('.btn-reload').on('click', function(event) {
                event.preventDefault();
                CreateCaptcha();
            });
        }(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
		
        if ($('.btn-auto-play').length) {
            $('.btn-auto-play').on('click', function(event) {
                if ($('#autoplayonoff').hasClass('checked')) {
                    $('#autoplayonoff').removeClass('checked');
                    $('#autoplayonoff').removeClass('changeBg');
                    $('#autoplayonoff .button').removeClass('button-on');
                    pm_video_data.autoplay_next = false;
                    $.cookie('pm_autoplay_next', 'off', {
                        path: '/'
                    });
                } else {
                    $('#autoplayonoff').addClass('checked');
                    $('#autoplayonoff').addClass('changeBg');
                    $('#autoplayonoff .button').addClass('button-on');
                    pm_video_data.autoplay_next = true;
                    $.cookie('pm_autoplay_next', 'on', {
                        path: '/'
                    });
                }
            });
        }
    };
    $(document).ready(function() {
        SLZ.headerFunction();
        SLZ.mainFunction();
    });
    $(window).on('load resize', function() {
        if ($('.video-related').length) {
            if (window.innerWidth > 1024) {
                $('.video-related').css('height', $('.video-container').parent().height());
            } else {
                $('.video-related').css('height', 'auto');
            }
        }
        if (window.innerWidth > 991) {
            if ($('.video-detail').length) {
                $('.player,.video-overlay').css('height', $('.video-detail .video-wrapper').height());
            }
            if ($('.video-playlist').length) {
                $('.player,.video-overlay').css('height', $('.video-playlist .video-wrapper').height());
            }
        } else {
            $('.player').css('height', 'auto');
        }
        if ($('.list-video').length) {
            $('.list-video').css('height', $('.playlist-wrapper').height() - $('.playlist-header').height());
        }
    });
});

function share_facebook(e) {
    FB.ui({
        method: "share",
        href: e
    }, function(e) {
        console.log(e)
    })
}

function share_twitter(e) {
    u = e, t = document.title, window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(u) + '&text=' + encodeURIComponent(document.title), 'tweetShare', 'toolbar=no,status=no,width=640,height=400,scrollbars=no')
}

function share_google(e) {
    return window.open("https://plus.google.com/share?url=" + e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"), !1
}