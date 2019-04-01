function is_touch_device() {
    return ('ontouchstart' in document.documentElement);
}
jQuery.exists = function (selector) {
    return (jQuery(selector).length > 0);
};

(function ($) {

    "use strict";




    /* Blog, Portfolio Audio */
    /* -------------------------------------------------------------------- */

    function loop_audio_init() {
        if ($.exists('.jp-jplayer')) {
            $('.jp-jplayer.mk-blog-audio').each(function () {
                var css_selector_ancestor = "#" + $(this).siblings('.jp-audio').attr('id');
                var ogg_file, mp3_file, mk_theme_js_path;
                ogg_file = $(this).attr('data-ogg');
                mp3_file = $(this).attr('data-mp3');
                $(this).jPlayer({
                    ready: function () {
                        $(this).jPlayer("setMedia", {
                            mp3: mp3_file,
                            ogg: ogg_file,
                        });
                    },
                    play: function () { // To avoid both jPlayers playing together.
                        $(this).jPlayer("pauseOthers");
                    },
                    swfPath: mk_theme_js_path,
                    supplied: "mp3, ogg",
                    cssSelectorAncestor: css_selector_ancestor,
                    wmode: "window"
                });
            });
        }
    }

    /* jQuery prettyPhoto lightbox */
    /* -------------------------------------------------------------------- */

    function mk_lightbox_init() {
        $('.mk-lightbox').iLightBox({
            social: {
              facebook: false,
              twitter: false,
              googleplus: false,
            }
        });
    }



    /* Flexslider init */
    /* -------------------------------------------------------------------- */

    function mk_flexslider_init() {


        $('.mk-flexslider.mk-script-call').each(function() {

            if($(this).parents('.mk-tabs').length || $(this).parents('.mk-accordion').length) {
                $(this).removeData("flexslider");    
            }
            

            var $this = $(this),
            $selector = $this.attr('data-selector'),
            $animation = $this.attr('data-animation'),
            $easing = $this.attr('data-easing'),
            $direction = $this.attr('data-direction'),
            $smoothHeight = $this.attr('data-smoothHeight') == "true" ? true : false,
            $slideshowSpeed = $this.attr('data-slideshowSpeed'),
            $animationSpeed = $this.attr('data-animationSpeed'),
            $controlNav = $this.attr('data-controlNav') == "true" ? true : false,
            $directionNav = $this.attr('data-directionNav') == "true" ? true : false,
            $pauseOnHover = $this.attr('data-pauseOnHover') == "true" ? true : false,
            $isCarousel = $this.attr('data-isCarousel') == "true" ? true : false;

            if($selector != undefined) {
               var $selector_class = $selector;
            } else {
                var $selector_class = ".mk-flex-slides > li";
            }

            if($isCarousel == true) {
                var $itemWidth = parseInt($this.attr('data-itemWidth')),
                $itemMargin = parseInt($this.attr('data-itemMargin')),
                $minItems = parseInt($this.attr('data-minItems')),
                $maxItems = parseInt($this.attr('data-maxItems')),
                $move = parseInt($this.attr('data-move'));
            } else {
                var $itemWidth = $itemMargin = $minItems = $maxItems = $move = 0;
            }

            $this.flexslider({
                selector: $selector_class,
                animation: $animation,
                easing: $easing,
                direction: $direction,
                smoothHeight: $smoothHeight,
                slideshow: true,
                slideshowSpeed: $slideshowSpeed,
                animationSpeed: $animationSpeed,
                controlNav: $controlNav,
                directionNav: $directionNav,
                pauseOnHover: $pauseOnHover,
                prevText: "",
                nextText: "",
                 
                itemWidth: $itemWidth,
                itemMargin: $itemMargin,
                minItems: $minItems,
                maxItems: $maxItems,
                move: $move,
            });

        });

    }












    /* Background Parallax Effects */
        /* -------------------------------------------------------------------- */

        function mk_backgrounds_parallax() {
            if(mk_header_parallax == true) { $('.mk-header-bg').addClass('mk-parallax-enabled');}
            if(mk_body_parallax == true) { $('body').addClass('mk-parallax-enabled');}
            if(mk_banner_parallax == true) { $('#mk-header').addClass('mk-parallax-enabled');}
            if(mk_page_parallax == true) { $('#theme-page').addClass('mk-parallax-enabled');}
            if(mk_footer_parallax == true) { $('#mk-footer').addClass('mk-parallax-enabled');}

            $('.mk-parallax-enabled').each(function() {
                if(!is_touch_device()) {
                   $(this).parallax("49%", -0.2);
                }

            });
        }


    $(document).ready(function () {

        mk_lightbox_init();
        mk_backgrounds_parallax();
        mk_flexslider_init();



        /* Animated Contents */
        /* -------------------------------------------------------------------- */
        if (!is_touch_device()) {
            $('body').addClass('mk-transform');
        }

        function mk_animated_contents() {
            if ($.exists('.mk-animate-element')) {
                $(".mk-animate-element:in-viewport").each(function (i) {
                    var $this = $(this);
                    if (!$this.hasClass('mk-in-viewport')) {
                        setTimeout(function () {
                            $this.addClass('mk-in-viewport');
                        }, 200 * i);
                    }
                });
            }
        }
        mk_animated_contents();
        $(window).scroll(function () {
            mk_animated_contents();
        });


        /* Box Blur effect */
        /* -------------------------------------------------------------------- */


        $(window).load(function () {
            if ($.exists('.icon-box-boxed.blured-box, .mk-employee-item.employee-item-blur') && !is_touch_device()) {

                    $('.icon-box-boxed.blured-box, .mk-employee-item.employee-item-blur').blurjs({
                        source: '.mk-blur-parent',
                        radius: 18,
                        overlay: "rgba(255,255,255,0.6)",
                    });
                
            }

        });


        /* Tabs */
        /* -------------------------------------------------------------------- */


        if ($.exists('.mk-tabs, .mk-news-tab, .mk-woo-tabs')) {
            $(".mk-tabs, .mk-news-tab, .mk-woo-tabs").tabs();
             $('.mk-tabs.vertical-style').each(function(){
                $(this).find('.mk-tabs-pane').css('minHeight', $(this).find('.mk-tabs-tabs').height() - 1);
            });

             $('.mk-tabs .mk-tabs-tabs li a').on('click', function() {
                           mk_flexslider_init();
                           loops_iosotop_init();
                            isotop_load_fix();
             });

             

        }




        /* Ajax Search */
        /* -------------------------------------------------------------------- */
        function mk_ajax_search() {
            $("#mk-ajax-search-input").autocomplete({ 
                delay: 50,
                minLength: 2,  
                appendTo: $("#mk-nav-search-wrapper"), 
                search: function( event, ui ) {
                    $(this).parent('form').addClass('ajax-searching'); 
                },
                source: function(req, response){  
                    $.getJSON(ajaxurl+'?callback=?&action=mk_ajax_search', req, response);  
                },  
                select: function(event, ui) {  
                    window.location.href=ui.item.link;  
                },
                response: function( event, ui ) {
                    $(this).parent('form').removeClass('ajax-searching').addClass('ajax-search-complete');
                }
                
            }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {

                
                return $( "<li>" ).append( "<a>" + item.image + "<span class='search-title'>" + item.label + "</span><span class='search-date'>"+item.date+"</span></a>" )
                .appendTo( ul );

            }; 
        }
        if($.exists('.main-nav-side-search')) {
            mk_ajax_search();    
        }
        




         /* Hover Events */
        /* -------------------------------------------------------------------- */
        function mk_hover_events() {

            $('.shopping-cart-header').stop(true, true).hover(

                function(){

                $('.mk-shopping-cart-box').fadeIn(200);

            }, function(){

                $('.mk-shopping-cart-box').fadeOut(200);

            });


        }    

        mk_hover_events();







        /* Ajax portfolio */
        /* -------------------------------------------------------------------- */
        if($.exists('.portfolio-ajax-enabled')) {
            $('.portfolio-grid.portfolio-ajax-enabled').ajaxPortfolio();
        }






        /* Love This */
        /* -------------------------------------------------------------------- */
        function mk_love_post() {

            $('body').on('click','.mk-love-this', function() {
                var $this = $(this),
                $id = $this.attr('id');
                    
                if($this.hasClass('item-loved')) return false;    

                if($this.hasClass('item-inactive')) return false;

                var $sentdata = {
                    action: 'mk_love_post', 
                    post_id: $id 
                }
                
                $.post(ajaxurl, $sentdata, function(data){
                    $this.find('span').html(data);
                    $this.addClass('item-loved');
                });
                
                $this.addClass('item-inactive');
                return false;
        });


        }

        mk_love_post();






            /* Woocommerce Scripts */
    /* -------------------------------------------------------------------- */
    function product_loop_add_cart(){
        var $body = $('body');

        $body.on('click', '.add_to_cart_button', function()
        {
            var product = $(this).parents('.product:eq(0)').addClass('adding-to-cart').removeClass('added-to-cart');
        })
        
        $body.bind('added_to_cart', function()
        {
            $('.adding-to-cart').removeClass('adding-to-cart').addClass('added-to-cart');
        });
    }
    product_loop_add_cart();

    function shop_isotop_init() {
        if($.exists('.mk-products')) {
            $('.mk-products').each(function() {

            if(!$(this).parents('.mk-woocommerce-carousel').length) {
                        var $container = $(this),
                        $container_item = '.mk-products .product';

                        $container.isotope({
                            itemSelector: $container_item,
                            masonry: {
                            columnWidth: 1
                            } 

                        });

                        $(window)
                        .on("debouncedresize", function (event) {
                        $woo_container.isotope('reLayout');
                    });

                $('.mk-products > .product')
                            .each(function (i) {
                            $(this).delay(i*200).animate({
                                'opacity': 1
                            }, 'fast');

                        })
                            .promise()
                            .done(function () {
                            setTimeout(function () {
                                $container.isotope('reLayout');
                            }, 1000);
                        });        
            }
            });
        }
    }
    $(window).load(function() {
        shop_isotop_init();
    });
    



        /* Social Share */
        /* -------------------------------------------------------------------- */

            function mk_social_share() {
                /*
                var completed = 0;

                $.getJSON('http://api.pinterest.com/v1/urls/count.json?url='+window.location+'&callback=?', function(data) {
                    if((data.count != 0) && (data.count != undefined) && (data.count != null)) { 
                        $('.pinterest-share span').html( data.count );
                    }
                    else {
                        $('.pinterest-share span').html( 0 );
                    }
                    completed++;
                });


                $.getJSON("http://graph.facebook.com/?id="+ window.location +'&callback=?', function(data) {
                    if((data.shares != 0) && (data.shares != undefined) && (data.shares != null)) { 
                        $('.facebook-share span').html( data.shares ); 
                    }
                    else {
                        $('.facebook-share span').html( 0 );   
                    }
                    completed++;
                });

                $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url='+window.location+'&callback=?', function(data) {
                    if((data.count != 0) && (data.count != undefined) && (data.count != null)) { 
                        $('.twitter-share span').html( data.count );
                    }
                    else {
                        $('.twitter-share span').html( 0 );
                    }
                    completed++;
                });
                */


                $('.twitter-share').on('click', function(){
                    var $url = $(this).attr('data-url'),
                    $title = $(this).attr('data-title');

                    window.open( 'http://twitter.com/intent/tweet?text='+$title+' '+$url, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
                    return false;
                });

                 $('.pinterest-share').on('click', function(){
                    var $url = $(this).attr('data-url'),
                    $title = $(this).attr('data-title'),
                    $image = $(this).attr('data-image');
                    window.open( 'http://pinterest.com/pin/create/button/?url='+$url+'&media='+$image+'&description='+$title, "twitterWindow", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
                    return false;
                });

                $('.facebook-share').on('click', function(){
                    var $url = $(this).attr('data-url');
                    window.open( 'https://www.facebook.com/sharer/sharer.php?u='+$url, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
                    return false;
                });

                $('.googleplus-share').on('click', function(){
                    var $url = $(this).attr('data-url');
                    window.open( 'https://plus.google.com/share?url='+$url, "googlePlusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
                    return false;
                });

                $('.linkedin-share').on('click', function(){
                    var $url = $(this).attr('data-url'),
                    $title = $(this).attr('data-title'),
                    $desc = $(this).attr('data-desc');
                    window.open( 'http://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title+'&summary='+$desc, "linkedInWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
                    return false;
                });



            }
            mk_social_share();



        /* Adds Video element to page section background */
        /* -------------------------------------------------------------------- */

       

        function mk_video_background_size() {
                
            $('.mk-video-holder').each(function() {
                var $width, 
                $height = $(this).outerHeight() + 20;

                if($.exists('.mk-boxed-enabled')) {
                    $width = $('#mk-boxed-layout').width();
                } else {
                    $width = $('html').width();
                }
                $('.mk-section-video').css('width', $width);

                if($(window).width() > 1000) {
                    $('.mk-section-video video, .mk-section-video .mejs-overlay, .mk-section-video .mejs-container, .mk-section-video object').css({width : $width, height : parseInt($width/1.777)});    
                } else {
                    $(this).find('.mk-section-video video, .mk-section-video .mejs-overlay, .mk-section-video .mejs-container, .mk-section-video object').css({width : parseInt($height*1.777), height : $height});
                }

            });
            
    }

        if($.exists('.mk-section-video')) {
            $(window).load(function () {
            setTimeout(function () {
               if($(window).width() > 960) {
                    mk_video_background_size();
                   $('.mk-section-video').css('visibility', 'visible');

                $('.mk-section-video video').mediaelementplayer({
                    enableKeyboard: false,
                    iPadUseNativeControls: false,
                    pauseOtherPlayers: false,
                    iPhoneUseNativeControls: false,
                    AndroidUseNativeControls: false
                });
                $('.mk-video-preload').fadeOut(1000);
                
                } else {
                    $('.mk-section-video').hide();
                   $('.mk-video-preload').show();
                }

              
            }, 4000);
             });
            
            

            
            

            $(window).on("debouncedresize", function () {
                        mk_video_background_size();

            });
        }



        /* Floating Go to top Link */
        /* -------------------------------------------------------------------- */
        $(window).scroll(function () {
            if ($(this).scrollTop() > 700) {
                $('.mk-go-top, .mk-quick-contact-wrapper').removeClass('off').addClass('on');
            }
            else {
                $('.mk-go-top, .mk-quick-contact-wrapper').removeClass('on').addClass('off');
            }
        });

        $('.mk-go-top, .mk-back-top-link, .single-back-top a, .divider-go-top, .comments-back-top').click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $('.mk-classic-comments').click(function () {
            $("html, body").animate({
                scrollTop: $('#comments').offset().top
            }, 800);

        });



        /* Portfolio Grid & List view */
        /* -------------------------------------------------------------------- */

        if ($.exists('.mk-portfolio-orientation')) {
            $('.mk-portfolio-orientation a').on('click', function () {

                $(this).siblings().removeClass('current').end().addClass('current');
                var data_view_id = '#' + $(this).parent().attr('data-view');
                if ($(this).hasClass('mk-grid-view')) {

                    $(data_view_id).removeClass('mk-portfolio-list').addClass('mk-portfolio-grid');

                }
                else {
                    $(data_view_id).removeClass('mk-portfolio-grid').addClass('mk-portfolio-list');
                }
                $('.mk-theme-loop').isotope('reLayout');
                return false;
            });
        }




        /* Accordions & Toggles */
        /* -------------------------------------------------------------------- */


        /* Accordions */

        if ($.exists('.mk-accordion')) {

            $.tools.toolsTabs.addEffect("slide", function (i, done) {
                this.getPanes().slideUp(250);
                this.getPanes().eq(i).slideDown(250, function () {
                    done.call();
                });
            });

            $(".mk-accordion").each(function () {

                if ($(this).hasClass('accordion-action')) {


                    var $initialIndex = $(this).attr('data-initialIndex');
                    if ($initialIndex == undefined || $initialIndex == 0) {
                        $initialIndex = 0;
                    }
                    $(this).toolsTabs("div.mk-accordion-pane", {
                        toolsTabs: '.mk-accordion-tab',
                        effect: 'slide',
                        initialIndex: $initialIndex,
                        slideInSpeed: 400,
                        slideOutSpeed: 400
                    });
                }
                else {
                    $(".toggle-action .mk-accordion-tab").toggle(

                    function () {
                        $(this).addClass('current');
                        $(this).siblings('.mk-accordion-pane').slideDown(150);
                    }, function () {
                        $(this).removeClass('current');
                        $(this).siblings('.mk-accordion-pane').slideUp(150);
                    });
                }
            });

        }





        /* Toggles */

        if ($.exists('.mk-toggle-title')) {
            $(".mk-toggle-title").toggle(

            function () {
                $(this).addClass('active-toggle');
                $(this).siblings('.mk-toggle-pane').slideDown(200);
            }, function () {
                $(this).removeClass('active-toggle');
                $(this).siblings('.mk-toggle-pane').slideUp(200);
            });
        }


        /* Message Boxes */
        /* -------------------------------------------------------------------- */

        $('.box-close-btn').on('click', function () {
            $(this).parent().fadeOut(300);
            return false;

        });



        $('.mk-tooltip').each(function () {
            $(this).find('.tooltip-init').hover(function () {
                $(this).siblings('.tooltip-text').animate({
                    'opacity': 1
                }, 400);

            }, function () {
                $(this).siblings('.tooltip-text').animate({
                    'opacity': 0
                }, 400);
            });

        });



    



        /* Newspaper Comments & Share section */
        /* -------------------------------------------------------------------- */

        function mk_newspaper_comments_share() {

            $('.newspaper-item-footer').each(function () {

                $(this).find('.newspaper-item-comment').click(function () {

                    $(this).parents('.newspaper-item-footer').find('.newspaper-social-share').slideUp(200).end().find('.newspaper-comments-list').slideDown(200);
                    setTimeout(function () {
                        $('.mk-theme-loop').isotope('reLayout');
                    }, 300);
                });

                $(this).find('.newspaper-item-share').click(function () {

                    $(this).parents('.newspaper-item-footer').find('.newspaper-comments-list').slideUp(200).end().find('.newspaper-social-share').slideDown(200);
                    setTimeout(function () {
                        $('.mk-theme-loop').isotope('reLayout');
                    }, 300);

                });

            });

        }
        mk_newspaper_comments_share();



        /* Responsive Fixes */
        /* -------------------------------------------------------------------- */


        function mk_responsive_fix() {

            if ($(window).width() > mk_responsive_nav_width) {
                $('body').removeClass('mk-responsive').addClass('mk-desktop');
                $('#mk-responsive-nav').hide();
                mk_main_navigation_init();
                mk_main_navigation();
            }

            if ($(window).width() < mk_responsive_nav_width) {
              if (!$.exists('#mk-responsive-nav')) {
                    $('.main-navigation-ul').clone().attr({id:"mk-responsive-nav", "class":""}).insertAfter('.mk-header-inner');

                         $('#mk-responsive-nav > li > ul, #mk-responsive-nav > li > div').each(function() {
                              $(this).siblings('a').append('<span class="mk-moon-arrow-down mk-nav-arrow mk-nav-sub-closed"></span>');
                        });
                   
                    
                    $('.mk-header-inner').attr('style', '');

                    $('#mk-responsive-nav').append($('.responsive-searchform'));


             $('.mk-nav-arrow').click(function(e) {

                if($(this).hasClass('mk-nav-sub-closed')) {
                    $(this).parent().siblings('ul').slideDown(300);
                    $(this).parent().siblings('div').slideDown(300);
                    $(this).removeClass('mk-nav-sub-closed').addClass('mk-nav-sub-opened');
                } else {
                    $(this).parent().siblings('ul').slideUp(300);
                    $(this).parent().siblings('div').slideUp(300);
                    $(this).removeClass('mk-nav-sub-opened').addClass('mk-nav-sub-closed');
                }
                e.preventDefault();
            });    

            }
                $('#mk-responsive-nav li, #mk-responsive-nav li a, #mk-responsive-nav ul, #mk-responsive-nav div').attr('style', '');
                $('body').removeClass('mk-desktop').addClass('mk-responsive');
                $('mk-header-padding-wrapper').css('padding', 0);
            }

        }
        mk_responsive_fix();

        $(window).load(function () {
            

            $('.modern-style-nav .header-logo, .modern-style-nav .header-logo a').css('width', $('.header-logo img').width());
        });

        $(window).on("debouncedresize", function () {
            mk_responsive_fix();
        });








        /* Initialize isiotop for newspaper style */
        /* -------------------------------------------------------------------- */

        function loops_iosotop_init() {
            if ($('.mk-theme-loop').hasClass('isotop-enabled')) {
                var $mk_container, $mk_container_item;
                $mk_container = $('.mk-theme-loop');
                $mk_container_item = '.mk-isotop-item';

                $mk_container.isotope({
                    itemSelector: $mk_container_item,
                    animationEngine: "best-available",
                    masonry: {
                        columnWidth: 1
                    }

                });




                $('#mk-filter-portfolio ul li a').click(function () {
                    var $this;
                    $this = $(this);

                    /* Removes ajax container when filter items get triggered */
                    $this.parents('.portfolio-grid').find('.ajax-container').animate({
                        'height' : 0,
                        opacity : 0
                    }, 500);

                    if ($this.hasClass('.current')) {
                        return false;
                    }
                    var $optionSet = $this.parents('#mk-filter-portfolio ul');
                    $optionSet.find('.current').removeClass('current');
                    $this.addClass('current');

                    var selector = $(this).attr('data-filter');

                    $mk_container.isotope({
                        filter: ''
                    });
                    $mk_container.isotope({
                        filter: selector
                    });


                    return false;
                });


                
                $('.mk-loadmore-button').hide();
                if ($('.mk-theme-loop').hasClass('scroll-load-style') || $('.mk-theme-loop').hasClass('load-button-style')) {
                    if ($.exists('.mk-pagination')) {
                        $('.mk-loadmore-button').css('display', 'block');
                    }
                    $('.mk-pagination').hide();
                   

                    $('.mk-loadmore-button').on('click', function() {
                        if(!$(this).hasClass('pagination-loading')) {
                            $(this).addClass('pagination-loading');
                        }
                            
                    });

                    $mk_container.infinitescroll({
                        navSelector: '.mk-pagination',
                        nextSelector: '.mk-pagination a:first',
                        itemSelector: $mk_container_item,
                        bufferPx: 70,
                        loading: {
                            finishedMsg: "",
                            img: mk_images_dir + "/load-more-loading.gif",
                            msg: null,
                            msgText: "",
                            selector: '.mk-loadmore-button',
                            speed: 300,
                            start: undefined
                        },
                        errorCallback: function () {

                            $('.mk-loadmore-button').html(mk_no_more_posts).addClass('disable-pagination');

                        },

                    },

                    function (newElements) {

                        var $newElems = $(newElements);
                        $newElems.imagesLoaded(function () {
                            $(this).parent().siblings('.mk-loadmore-button').removeClass('pagination-loading');


                            var selected_item = $('#mk-filter-portfolio ul').find('.current').attr('data-filter');
                            
                            $mk_container.isotope('appended', $newElems);
                            $mk_container.isotope({
                                 filter: ''
                            });
                            $mk_container.isotope({
                                filter: selected_item
                            });
                            
                            $mk_container.isotope('reLayout');
                            loop_audio_init();
                            mk_newspaper_comments_share();
                            mk_lightbox_init();
                            mk_social_share();
                            mk_theme_toggle_box();


                        });
                    }

                    );



                    /* Loading elements based on scroll window */
                    if ($('.mk-theme-loop.isotop-enabled').hasClass('load-button-style')) {
                        $(window).unbind('.infscr');
                        $('.mk-loadmore-button').click(function () {

                            $mk_container.infinitescroll('retrieve');

                            return false;

                        });
                    }

                }
                else {
                    $('.mk-loadmore-button').hide();
                }

            }
        }


        $('.filter-faq li a').click(function () {

            $(this).parent().siblings().children().removeClass('current');
            $(this).addClass('current');

            var filterVal = $(this).attr('data-filter');

            if (filterVal === '') {
                $('.mk-faq-container .mk-faq-toggle').slideDown(200).removeClass('hidden');
            }
            else {
                $('.mk-faq-container .mk-faq-toggle').each(function () {
                    if (!$(this).hasClass(filterVal)) {
                        $(this).slideUp(200).addClass('hidden');
                    }
                    else {
                        $(this).slideDown(200).removeClass('hidden');
                    }
                });
            }
            return false;
        });



        /* reload elements on reload */
        /* -------------------------------------------------------------------- */

        if ($.exists('.mk-blog-container.isotop-enabled') || $.exists('.mk-portfolio-container') || $.exists('.mk-news-container')) {
                 $(window).load(function() {
                $(window).unbind('keydown');
                    loops_iosotop_init();
                    isotop_load_fix();
              });

            $(window).on("debouncedresize", function () {
                $('.mk-theme-loop').isotope('reLayout');
            });

        }






        /* Fix isotop layout */
        /* -------------------------------------------------------------------- */

        function isotop_load_fix() {
            if ($.exists('.mk-blog-container.isotop-enabled') || $.exists('.mk-portfolio-container') || $.exists('.mk-news-container')) {
                $('.mk-blog-container.isotop-enabled>article, .mk-portfolio-container>article, .mk-news-container>article').each(function (i) {
                    $(this).delay(i * 150).animate({
                        'opacity': 1
                    }, 500);

                }).promise().done(function () {
                    setTimeout(function () {
                        $('.mk-theme-loop').isotope('reLayout');
                    }, 1500);
                });
                setTimeout(function () {
                        $('.mk-theme-loop').isotope('reLayout');
                }, 2500);
            }

        }





        /* Jplayer */
        /* -------------------------------------------------------------------- */

        loop_audio_init();




        /* Recent Works Widget */
        /* -------------------------------------------------------------------- */

        $('.widget_recent_portfolio li').each(function () {

            $(this).find('.portfolio-widget-thumb').hover(function () {

                $(this).siblings('.portfolio-widget-info').animate({
                    'opacity': 1
                }, 200);
            }, function () {

                $(this).siblings('.portfolio-widget-info').animate({
                    'opacity': 0
                }, 200);
            });


        });








        /* Contact Form */
        /* -------------------------------------------------------------------- */

         function mk_contact_form() {

        if ($.tools.validator != undefined) {
            $.tools.validator.addEffect("contact_form", function (errors) {
                $.each(errors, function (index, error) {
                    var input = error.input;

                    input.addClass('mk-invalid');
                });
            }, function (inputs) {
                inputs.removeClass('mk-invalid');
            });


            $('.mk-contact-form').validator({
                effect: 'contact_form'
            }).submit(function (e) {
                var form = $(this);
                if (!e.isDefaultPrevented()) {
                    $(this).find('.mk-contact-loading').fadeIn('slow');
                    $.post(this.action, {
                        'to': $(this).find('input[name="contact_to"]').val().replace("*", "@"),
                        'name': $(this).find('input[name="contact_name"]').val(),
                        'email': $(this).find('input[name="contact_email"]').val(),
                        'content': $(this).find('textarea[name="contact_content"]').val()
                    }, function () {
                        form.fadeIn('fast', function () {
                            $(this).find('.mk-contact-loading').fadeOut('slow');
                            $(this).find('.mk-contact-success').delay(2000).fadeIn('slow').delay(8000).fadeOut();
                            $(this).find('input#contact_email, input#contact_name, textarea').val("");
                        });
                    });
                    e.preventDefault();
                }
            });

        }
    }

    mk_contact_form();




        /* Blog Loop Carousel Shortcode */
        /* -------------------------------------------------------------------- */



        function mk_blog_carousel() {
            if (!$.exists('.mk-blog-showcase')) { return; }
            $('.mk-blog-showcase ul li').each(function () {

                $(this).on('hover', function () {

                    $(this).siblings('li').removeClass('mk-blog-first-el').end().addClass('mk-blog-first-el');

                });

            });


        }
        mk_blog_carousel();









        /* Main Navigation */
        /* -------------------------------------------------------------------- */

        function mk_main_navigation_init() {

            $(".main-navigation-ul").dcMegaMenu({
                rowItems: '6',
                speed: 200,
                effect: 'fade',
                fullWidth: true
            });
            
        }


        function mk_main_navigation() {
            var nav_height = $('#mk-main-navigation').height();
            $('.main-navigation-ul div.sub-container').css('top', nav_height);
            if($('.mk-header-inner').hasClass('mk-fixed')) {
                $('#mk-nav-search-wrapper').css('top', nav_height);
                $('.modern-style-nav .mk-shopping-cart-box').css('top', nav_height);
                
            } else {
                $('#mk-nav-search-wrapper').css('top', nav_height);
                 $('.modern-style-nav .mk-shopping-cart-box').css('top', nav_height - 18);
            }
            

        }


        function mk_responsive_nav() {

            $('.mk-nav-responsive-link').click(function () {
                if ($('body').hasClass('mk-opened-nav')) {
                    $('body').removeClass('mk-opened-nav').addClass('mk-closed-nav');
                    $('#mk-responsive-nav').slideUp(300);
                }
                else {
                    $('body').removeClass('mk-closed-nav').addClass('mk-opened-nav');
                    $('#mk-responsive-nav').slideDown(300);
                }
            });

            $('.mk-toolbar-resposnive-icon').click(function () {
                if ($('body').hasClass('toolbar-oppend')) {
                    $('body').removeClass('toolbar-oppend').addClass('toolbar-closed');
                    $('.mk-header-toolbar').slideUp();
                }
                else {
                   $('body').removeClass('toolbar-closed').addClass('toolbar-oppend');
                   $('.mk-header-toolbar').slideDown();
                }
            });


        }
        mk_responsive_nav();



        /* Header Fixed */

        /* -------------------------------------------------------------------- */
        var mk_header_height = $('.mk-header-inner').height();


        var wp_admin_height = 0;
        var mk_limit_height;
        if ($.exists("#wpadminbar")) {
            wp_admin_height = $("#wpadminbar").height();

             if(!$.exists('.mk-header-toolbar') && !$('#mk-header').hasClass('classic-style-nav')) {
                wp_admin_height = 0;
            }
        }
        
        if(!$.exists("#wpadminbar") && $.exists('.mk-header-toolbar') && !$('#mk-header').hasClass('classic-style-nav')) {
            wp_admin_height = $('.mk-header-toolbar').height();
        }

        var mk_window_y = 0;
        mk_window_y = $(window).scrollTop();

        if ($('#mk-header').hasClass('classic-style-nav')) {
            mk_limit_height = wp_admin_height + (mk_header_height * 2);
        }
        else {
            mk_limit_height = wp_admin_height;
        }



        function mk_fix_classic_header() {
            mk_window_y = $(window).scrollTop();
            if (mk_window_y > mk_limit_height) {
                if (!($(".mk-header-nav-container").hasClass("mk-fixed"))) {
                    //$(".mk-header-toolbar").hide();
                    $(".mk-header-padding-wrapper").css("padding-top", mk_header_height);
                    $(".mk-header-nav-container").addClass("mk-fixed").css("top", wp_admin_height);
                }

            }
            else {
                if (($(".mk-header-nav-container").hasClass("mk-fixed"))) {
                    $(".mk-header-toolbar").show();
                    $(".mk-header-nav-container").css({
                        "top": 0
                    }).removeClass("mk-fixed");
                    $(".mk-header-padding-wrapper").css("padding-top", "");
                }
            }
        }


        function mk_fix_modern_header() {
            var mk_window_y = $(window).scrollTop(),
            header_els = $('#mk-header.modern-style-nav .mk-header-inner .main-navigation-ul > li > a, .mk-header-inner #mk-header-search, #mk-header.modern-style-nav .mk-header-inner .mk-header-start-tour, .mk-header-inner,#mk-header.modern-style-nav .mk-search-trigger i, #mk-header.modern-style-nav .mk-search-trigger, .shopping-cart-header'),
            header_height = parseInt($('#mk-header').attr('data-height')),
            header_height_sticky = parseInt($('#mk-header').attr('data-sticky-height')),
            new_height = 0;

            


            if ($.exists("#wpadminbar")) { 
                        var top_distance = mk_limit_height;

                        if(!$.exists('.mk-header-toolbar')) {
                                var top_distance = $("#wpadminbar").height();
                                var top_padding = header_height;
                        } else {
                            var top_padding = header_height_sticky;
                        }

                        
            } else {
               var top_distance = 0;
               if(!$.exists('.mk-header-toolbar')) {
                        var top_padding = header_height;
                } else {
                    var top_padding =  header_height_sticky;
                }
            }

            //console.log(mk_limit_height);

            if (mk_window_y > mk_limit_height) {
                if (!($(".mk-header-inner").hasClass("mk-fixed"))) {
                    //$(".mk-header-toolbar").hide();
                    $(".mk-header-padding-wrapper").css("padding-top", top_padding + 'px');


                    $(".mk-header-inner").addClass("mk-fixed").css({
                        "top": top_distance
                    });
                }
               
                
            }
            else {
                if (($(".mk-header-inner").hasClass("mk-fixed"))) {
                    $(".mk-header-toolbar").show();
                    $(".mk-header-inner").css({
                        "top": 0
                    }).removeClass("mk-fixed");
                    $(".mk-header-padding-wrapper").css("padding-top", "");
                }
                
                
            }
    
            if($(window).width() > mk_responsive_nav_width){
            if(mk_window_y < (header_height - header_height_sticky)) {
                new_height = header_height - mk_window_y;

            } else {
                new_height = header_height_sticky;
            }
              header_els.css({height: new_height + 'px', lineHeight: new_height + 'px'});
            }
        }


        if (mk_window_y > mk_limit_height && !(is_touch_device() || $(window).width() < mk_responsive_nav_width || mk_header_sticky === false)) {
            if ($('#mk-header').hasClass('classic-style-nav')) {
                mk_fix_classic_header();
            }
            else {
                mk_fix_modern_header();
            }

        }



        $(window).scroll(function () {
            if (is_touch_device() || mk_header_sticky === false || $(window).width() < mk_responsive_nav_width) { return; }

            if ($('#mk-header').hasClass('classic-style-nav')) {
                mk_fix_classic_header();
            }
            else {
                mk_fix_modern_header();
            }
            mk_main_navigation();
            setTimeout(function () {
                mk_main_navigation();
            }, 1000);

        });






        /* Header Search Form */
        /* -------------------------------------------------------------------- */

        function mk_header_searchform() {

            $('.mk-header-toolbar #mk-header-searchform .text-input').on('focus', function () {

                if ($('.mk-header-toolbar #mk-header-searchform .text-input').hasClass('on-close-state')) {
                    $('.mk-header-toolbar #mk-header-searchform .text-input').removeClass('on-close-state').animate({
                        'width': '200px'
                    }, 200);
                    return false;
                }
            });

            $(".mk-header-toolbar .mk-header-searchform").click(function (event) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            });

            $('.widget .mk-searchform .text-input').focus(function () {
                $(this).parent().find('.mk-icon-remove-sign').css('opacity', 0.5);
            });
            $('.widget .mk-searchform .text-input').blur(function () {
                $(this).parent().find('.mk-icon-remove-sign').css('opacity', 0);
            });

            $("html").click(function () {
                $(this).find(".mk-header-toolbar #mk-header-searchform .text-input").addClass('on-close-state').animate({
                    'width': 90
                }, 300);
            });

            $('.mk-searchform .mk-icon-remove-sign, .mk-notfound-search .mk-icon-remove-sign').on('click', function () {
                $(this).siblings('#mk-header-searchform .text-input, .mk-searchform .text-input, .mk-notfound-search .notfound-text-input').val(' ').focus();
            });
        }
        mk_header_searchform();




        /* Login Form */
        /* -------------------------------------------------------------------- */



        $(".mk-header-login, .mk-header-signup, .mk-quick-contact-wrapper, .blog-share-container, .news-share-buttons, .main-nav-side-search").click(function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            else if (window.event) {
                window.event.cancelBubble = true;
            }
        });
        $("html").click(function () {
            $(this).find(".mk-login-register, #mk-header-subscribe, #mk-quick-contact, .single-share-buttons, .single-share-box, .blog-social-share, .news-share-buttons, #mk-nav-search-wrapper").fadeOut(100);
            $('.mk-quick-contact-link').removeClass('quick-contact-active');
            $('.mk-toggle-trigger').removeClass('mk-toggle-active');
        });

        $('.mk-forget-password').on('click', function () {
            $('#mk-forget-panel').siblings().hide().end().show();
        });

        $('.mk-create-account').on('click', function () {
            $('#mk-register-panel').siblings().hide().end().show();
        });

        $('.mk-return-login').on('click', function () {
            $('#mk-login-panel').siblings().hide().end().show();
        });


        $('.mk-quick-contact-link').on('click', function () {
            if(!$(this).hasClass('quick-contact-active')) {
                $('#mk-quick-contact').fadeIn(150);
                $(this).addClass('quick-contact-active');
            } else {
                 $('#mk-quick-contact').fadeOut(100);
                 $(this).removeClass('quick-contact-active');
            }
            return false;
        });


        function mk_theme_toggle_box() {
            $('.mk-toggle-trigger').on('click', function () {
                if(!$(this).hasClass('mk-toggle-active')) {
                    $('.mk-box-to-trigger').fadeOut(100);
                    $(this).parent().find('.mk-box-to-trigger').fadeIn(150);
                    $('.mk-toggle-trigger').removeClass('mk-toggle-active');
                    $(this).addClass('mk-toggle-active');
                } else {
                     $('.mk-box-to-trigger').fadeOut(100);
                     $(this).removeClass('mk-toggle-active');
                }
                return false;
            });
        }
        mk_theme_toggle_box();



        /* Milestone Number Shortcode */
        /* -------------------------------------------------------------------- */

        function mk_milestone() {
        if ($.exists('.mk-milestone')) {
           $('.mk-milestone:in-viewport').each(function(){
            var el_this = $(this),
                stop_number = el_this.find('.milestone-number').attr('data-stop'),
                animation_speed = parseInt(el_this.find('.milestone-number').attr('data-speed'));

            if (!$(this).hasClass('scroll-animated')) {
                    $(this).addClass('scroll-animated');    

                $({countNum: el_this.find('.milestone-number').text()}).animate({countNum: stop_number}, {
                      duration: animation_speed,
                      easing:'linear',
                      step: function() {
                        el_this.find('.milestone-number').text(Math.floor(this.countNum));
                      },
                      complete: function() {
                        el_this.find('.milestone-number').text(this.countNum);
                      }
                    });
                  }
           });
      
        }
    }


    /* Skill Meter and Charts */
    /* -------------------------------------------------------------------- */

    function mk_skill_meter() {
        if ($.exists('.mk-skill-meter')) {
            $(".mk-skill-meter .progress-outer:in-viewport").each(function () {
                var $this = $(this);
                if (!$this.hasClass('scroll-animated')) {
                    $this.addClass('scroll-animated');
                    $this.animate({
                        width: $(this).attr("data-width") + '%'
                    }, 2000);
                }

            });
        }
    }



    function mk_charts() {
        if ($.exists('.mk-chart')) {
            $(window).on("load", function () {
                $('.mk-chart').each(function () {
                    var $this, $parent_width, $chart_size;
                    $this = $(this);
                    $parent_width = $(this).parent().width();
                    $chart_size = $this.attr('data-barSize');
                    if ($parent_width < $chart_size) {
                        $chart_size = $parent_width;
                        $this.css('line-height', $chart_size);
                        $this.find('i').css({
                            'line-height': $chart_size + 'px',
                            'font-size': ($chart_size / 3)
                        });
                    }
                    if (!$this.hasClass('chart-animated')) {
                        $this.easyPieChart({
                            animate: 1300,
                            lineCap: 'round',
                            lineWidth: $this.attr('data-lineWidth'),
                            size: $chart_size,
                            barColor: $this.attr('data-barColor'),
                            trackColor: $this.attr('data-trackColor'),
                            scaleColor: 'transparent',
                            onStep: function (value) {
                                this.$el.find('.chart-percent span').text(Math.ceil(value));
                            }
                        });
                    }
                });
            });
        }
    }


    $(document).ready(function () {
        mk_skill_meter();
        mk_charts();
        mk_milestone();
        mk_swipe_slider();

    });


    $(window).scroll(function () {
        mk_skill_meter();
        mk_charts();
        mk_milestone();
    });





    function mk_nice_scroll(){
        $("html").niceScroll({
            scrollspeed: 50,
            mousescrollstep: 40,
            cursorwidth: 10,
            cursorborder: 0,
            cursorcolor: '#797979',
            cursorborderradius: 6,
            autohidemode: true,
            horizrailenabled: false,
            enablemousewheel : true,
            zindex : 9999
        });
        
    }
    if($(window).width() > 690 && $('body').outerHeight(true) > $(window).height() && mk_smooth_scroll == true) {
        mk_nice_scroll()    
    }







    /* Smooth scroll using hash */
    /* -------------------------------------------------------------------- */
     $(".mk-smooth").bind('click',function(event){
        if ($.exists("#wpadminbar")) {
            var wp_admin_height = $("#wpadminbar").height();
        } else {
            wp_admin_height = 0;
        }
        
        var header_height = $('.mk-header-inner').height();     
        $("body, html").animate({
            scrollTop: $($(this).attr("href")).offset().top - (header_height + wp_admin_height) + "px"
        }, {
            duration: 1200,
            easing: "easeInOutExpo"
        });

        return false;
        event.preventDefault();
    });


    /* Scroll function for main navigation on one page concept */
    /* -------------------------------------------------------------------- */



     function mk_main_nav_scroll() {

        //console.log(window.location.href.split('#')[0]);

        var lastId,
            topMenu = $("#mk-main-navigation"),
            menuItems = topMenu.find("a");


            menuItems.each(function(){
                var href = $(this).attr("href").split('#')[0];

                if(href == window.location.href.split('#')[0] && (typeof $(this).attr("href").split('#')[1] != 'undefined' )) {
                    console.log($(this).attr("href").split('#')[1]);
                    $(this).attr("href", "#" + $(this).attr("href").split('#')[1]);
                    $(this).parent().removeClass("current-menu-item");
                }


            });


     
            var scrollItems = menuItems.map(function(){
              var item = $(this).attr("href");

              if(/^#\w/.test(item) && $(item).length) {
                 
                return $(item);
              }
                
             });


       if ($.exists("#wpadminbar")) {
            var wp_admin_height = $("#wpadminbar").height();
        } else {
            wp_admin_height = 0;
        } 
        var header_height = parseInt($('#mk-header').attr('data-sticky-height'));


        menuItems.click(function(e){
          var href = $(this).attr("href");
            if(typeof $(href).offset() != 'undefined') { 
                var href_top = $(href).offset().top;
            } else {
                var href_top = 0;
            }
            //console.log(href_top);
           var offsetTop = href === "#" ? 0 : href_top-(wp_admin_height+header_height-1) + "px";

          $('html, body').stop().animate({ 
              scrollTop: offsetTop
          }, {
                    duration: 1200,
                    easing: "easeInOutExpo"
          });
          e.preventDefault();
        });

        
        $(window).scroll(function(){
        
            if(!scrollItems.length) return false;

           var fromTop = $(this).scrollTop()+(wp_admin_height+header_height);
           
           var cur = scrollItems.map(function(){

             if ($(this).offset().top < fromTop)
               return this;
           });
           //console.log(cur);
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";
           
           if (lastId !== id) {
               lastId = id;

               menuItems.parent().removeClass("current-menu-item");
               if(id.length) {
                    menuItems.filter("[href=#"+id+"]").parent().addClass("current-menu-item");
                }
           }                   
        });
    }    

    mk_main_nav_scroll();




    /* Swipe Slideshow */
    /* -------------------------------------------------------------------- */


        function mk_swipe_slider() {

            $('.mk-swiper-slider').each(function() {

                var $this = $(this),
                $thumbs = $this.parent().siblings('.gallery-thumbs-small'),
                $next_arrow = $this.find('.mk-swiper-next'),
                $prev_arrow = $this.find('.mk-swiper-prev'),
                $direction = $this.attr('data-direction'),
                $pagination = $this.attr('data-pagination') == "true" ? true : false,
                $slideshowSpeed = $this.attr('data-slideshowSpeed'),
                $animationSpeed = $this.attr('data-animationSpeed'),
                $controlNav = $this.attr('data-controlNav') == "true" ? true : false,
                $directionNav = $this.attr('data-directionNav') == "true" ? true : false,
                $freeModeFluid = $this.attr('data-freeModeFluid') == "true" ? true : false,
                $freeMode = $this.attr('data-freeMode') == "true" ? true : false,
                $mousewheelControl = $this.attr('data-mousewheelControl') == "true" ? true : false,
                $loop = $this.attr('data-loop') == "true" ? true : false,
                $slidesPerView = $this.attr('data-slidesPerView');

                if($pagination === true) {
                    var $pagination_class = '#'+$this.attr('id')+' .swiper-pagination';
                } else {
                    var $pagination_class = false;
                }
              

                var mk_swiper = $(this).swiper({
                    mode:$direction,
                    loop: $loop,
                    freeMode : $freeMode,
                    pagination : $pagination_class,
                    freeModeFluid : $freeModeFluid,
                    autoplay : $slideshowSpeed,
                    speed : $animationSpeed,
                    calculateHeight : true,
                    grabCursor : true,
                    useCSS3Transforms: false,
                    mousewheelControl : $mousewheelControl,
                    paginationClickable : true,
                    slidesPerView : $slidesPerView,
                    onSwiperCreated : function(swiper) {

                    },
                      onSlideChangeStart: function(){
                      $thumbs.find('.active-item').removeClass('active-item');
                      $thumbs.find('a').eq(mk_swiper.activeIndex).addClass('active-item');
                    }
                });
                

                $prev_arrow.click(function(e){
                    mk_swiper.swipePrev();
                });

                $next_arrow.click(function(e){
                    mk_swiper.swipeNext();
                });

           

            
              $thumbs.find('a').on('touchstart mousedown',function(e){
                    e.preventDefault();
                     $thumbs.find('.active-item').removeClass('active-item');
                    $(this).addClass('active-item');
                    mk_swiper.swipeTo( $(this).index() );
              });

              $thumbs.find('a').click(function(e) {
                e.preventDefault();
              });


         });

        } 







    /* Edge Slideshow */
    /* -------------------------------------------------------------------- */


        function mk_edge_slider_init() {

            var $slider_wrapper = $('.mk-edge-slider'),
            $next_arrow = $slider_wrapper.find('.mk-edge-next'),
            $prev_arrow = $slider_wrapper.find('.mk-edge-prev'),
            $pause = $slider_wrapper.attr('data-pause'),
            $speed = $slider_wrapper.attr('data-speed');


                var mk_swiper = $slider_wrapper.swiper({
                    mode:'horizontal',
                    loop: true,
                    grabCursor : true,
                    //useCSS3Transforms: true,
                    mousewheelControl : true,
                   // pagination : $pagination_class,
                    freeModeFluid : true,
                    //autoplay : $slideshowSpeed,
                    speed : $speed,
                    autoplay : $pause,
                     onSwiperCreated : function(swiper) {
                       
                    },
                      onSlideChangeStart: function(){
                      //$thumbs.find('.active-item').removeClass('active-item');
                      //$thumbs.find('a').eq(mk_swiper.activeIndex).addClass('active-item');
                    }
                });

                $prev_arrow.click(function(e){
                    mk_swiper.swipePrev();
                });

                $next_arrow.click(function(e){
                    mk_swiper.swipeNext();
                });


                setTimeout(function () {
                             $('.edge-slider-loading').fadeOut();
                        }, 2000);
               

        } 

        mk_edge_slider_init();




        function mk_edge_slider_resposnive() {

                var $items = $('.edge-slider-holder, .mk-edge-slider, .mk-edge-slider .swiper-slide, .edge-slider-holder');

                    var $window_height = $(window).outerHeight();

                    if($.exists('#wpadminbar')) {
                        $window_height = $window_height - $('#wpadminbar').outerHeight();
                    }

                    if($.exists('.mk-header-toolbar')) {
                        $window_height = $window_height - $('.mk-header-toolbar').outerHeight();               
                    }

                    if($.exists('.mk-header-inner')) { 
                        var $header_height = $('#mk-header').attr('data-height');
                    } else {
                        var $header_height = 0;
                    }

                    $window_height = $window_height - $header_height;

                if($(window).width() < 780) {

                    $items.animate({'height': '400px'}, 400);
                
                } else {

                    $items.animate({'height': $window_height}, 300);
                }

                 $('.mk-edge-slider .swiper-slide').each(function() {

                         if($(window).width() < 780) { 
                            $window_height = 400;
                         }

                        var $this = $(this),
                        $content = $this.find('.edge-slide-content');

                        if($this.hasClass('left_center') || $this.hasClass('center_center') || $this.hasClass('right_center')) {

                            var $this_height_half = $content.outerHeight()/2,
                            $window_half = $window_height/2;

                            $content.animate({'marginTop' : ($window_half - $this_height_half)}, 300);
                        }

                        if($this.hasClass('left_bottom') || $this.hasClass('center_bottom') || $this.hasClass('right_bottom')) {

                            var $distance_from_top = $window_height - $content.outerHeight() - 70;

                            $content.animate({'marginTop' : ($distance_from_top)}, 300);
                        }

                    });

            $('.mk-edge-slider').find('.edge-skip-slider').bind("click", function() {

                 $("html, body").stop(true, true).animate({
                    scrollTop: $window_height + 40,
                    easing: "easeInOutExpo"
                }, 500);

            });
            

        }

          mk_edge_slider_resposnive();

          $(window).on("debouncedresize", function (event) {
                    setTimeout(function () {
                             mk_edge_slider_resposnive();
                        }, 500);
          });




});
})(jQuery);






/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright 2013 Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}"+"</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,top:b}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);





/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function ($) {

    var $event = $.event,
        $special, resizeTimeout;

    $special = $event.special.debouncedresize = {
        setup: function () {
            $(this).on("resize", $special.handler);
        },
        teardown: function () {
            $(this).off("resize", $special.handler);
        },
        handler: function (event, execAsap) {
            // Save the context
            var context = this,
                args = arguments,
                dispatch = function () {
                    // set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply(context, args);
                };

            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }

            execAsap ? dispatch() : resizeTimeout = setTimeout(dispatch, $special.threshold);
        },
        threshold: 150
    };

})(jQuery);


/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
    });

    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        
        //get the starting position of each element to have parallax applied to it      
        $this.each(function(){
            firstTop = $this.offset().top;
        });

        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }
            
        // setup defaults if arguments aren't specified
        if (arguments.length < 1 || xpos === null) xpos = "50%";
        if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
        if (arguments.length < 3 || outerHeight === null) outerHeight = true;
        
        // function to be called whenever the window is scrolled or resized
        function update(){
            var pos = $window.scrollTop();              

            $this.each(function(){
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);

                // Check if totally above or totally below viewport
                if (top + height < pos || top > pos + windowHeight) {
                    return;
                }

                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }       

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);


/*
 * DC Mega Menu - jQuery mega menu
 * Copyright (c) 2011 Design Chemical
 *
 */
(function($){

    //define the defaults for the plugin and how to call it 
    $.fn.dcMegaMenu = function(options){
        //set default options  
        var defaults = {
            classParent: 'dc-mega',
            classContainer: 'sub-container',
            classSubParent: 'mega-hdr',
            classSubLink: 'mega-hdr',
            classWidget: 'dc-extra',
            rowItems: 6,
            speed: 'fast',
            effect: 'fade',
            event: 'hover',
            fullWidth: false,
            onLoad : function(){},
            beforeOpen : function(){},
            beforeClose: function(){}
        };

        //call in the default otions
        var mega_div_width = parseInt($('.mk-mega-nav').attr('data-megawidth'));
        var options = $.extend(defaults, options);
        var $dcMegaMenuObj = this;

        //act upon the element that is passed into the design    
        return $dcMegaMenuObj.each(function(options){

            var clSubParent = defaults.classSubParent;
            var clSubLink = defaults.classSubLink;
            var clParent = defaults.classParent;
            var clContainer = defaults.classContainer;
            var clWidget = defaults.classWidget;
           //console.log(jQuery(this).parents('.mk-header-nav-container').width());
            
            megaSetup();
            
            function megaOver(){
                var subNav = $('.sub',this);
                $(this).addClass('mega-hover');
                if(defaults.effect === 'fade'){
                    $(subNav).fadeIn(defaults.speed);
                }
                if(defaults.effect === 'slide'){
                    $(subNav).show(defaults.speed);
                }
                // beforeOpen callback;
                defaults.beforeOpen.call(this);
            }
            function megaAction(obj){
                var subNav = $('.sub',obj);
                $(obj).addClass('mega-hover');
                if(defaults.effect === 'fade'){
                    $(subNav).fadeIn(defaults.speed);
                }
                if(defaults.effect === 'slide'){
                    $(subNav).show(defaults.speed);
                }
                // beforeOpen callback;
                defaults.beforeOpen.call(this);
            }
            function megaOut(){
                var subNav = $('.sub',this);
                $(this).removeClass('mega-hover');
                $(subNav).hide();
                // beforeClose callback;
                defaults.beforeClose.call(this);
            }
            function megaActionClose(obj){
                var subNav = $('.sub',obj);
                $(obj).removeClass('mega-hover');
                $(subNav).hide();
                // beforeClose callback;
                defaults.beforeClose.call(this);
            }
            function megaReset(){
                $('li',$dcMegaMenuObj).removeClass('mega-hover');
                $('.sub',$dcMegaMenuObj).hide();
            }

            function megaSetup(){
                //$arrow = '<span class="dc-mega-icon"></span>';
                var clParentLi = clParent+'-li';
                var menuWidth = $dcMegaMenuObj.outerWidth();
                $('> li',$dcMegaMenuObj).each(function(){
                    //Set Width of sub
                    var $mainSub = $('> ul',this);
                    var $primaryLink = $('> a',this);
                    if($mainSub.length){
                        //$primaryLink.addClass(clParent).append($arrow);
                        $mainSub.addClass('sub').wrap('<div class="'+clContainer+'" />');
                        
                        var pos = $(this).position();
                        pl = pos.left;
                            
                        // checks whether its a mega menu. editd by MK    
                        if($('ul.mk_mega_menu',$mainSub).length){
                            $(this).addClass(clParentLi);
                            $('.'+clContainer,this).addClass('mega');
                            $('> li',$mainSub).each(function(){
                                if(!$(this).hasClass(clWidget)){
                                    $(this).addClass('mega-unit');
                                    if($('> ul',this).length){
                                        $(this).addClass(clSubParent);
                                        $('> a',this).addClass(clSubParent+'-a');
                                    } else {
                                        $(this).addClass(clSubLink);
                                        $('> a',this).addClass(clSubLink+'-a');
                                    }
                                }
                            });

                            // Create Rows
                            var hdrs = $('.mega-unit',this);
                            rowSize = parseInt(defaults.rowItems);
                            for(var i = 0; i < hdrs.length; i+=rowSize){
                                hdrs.slice(i, i+rowSize).wrapAll('<div class="row" />');
                            }

                            // Get Sub Dimensions & Set Row Height
                            $mainSub.show();
                            
                            // Get Position of Parent Item
                            var pw = $(this).width();
                            var pr = pl + pw;
                            
                            // Check available right margin
                            var mr = menuWidth - pr;
                            
                            // // Calc Width of Sub Menu
                            var subw = $mainSub.outerWidth();
                            var totw = $mainSub.parent('.'+clContainer).outerWidth();
                            var cpad = totw - subw;
                            
                            if(defaults.fullWidth === true){
                                var fw = menuWidth - cpad;
                                $mainSub.parent('.'+clContainer).css({width:mega_div_width});
                                $dcMegaMenuObj.addClass('full-width');
                            }
                            var iw = $('.mega-unit',$mainSub).outerWidth(true);
                            var rowItems = $('.row:eq(0) .mega-unit',$mainSub).length;
                            var inneriw = iw * rowItems;
                            var totiw = inneriw + cpad;
                            
                            // Set mega header height
                            $('.row',this).each(function(){
                                $('.mega-unit:last',this).addClass('last');
                                var maxValue = undefined;
                                $('.mega-unit > a',this).each(function(){
                                    var val = parseInt($(this).height());
                                    if (maxValue === undefined || maxValue < val){
                                        maxValue = val;
                                    }
                                });
                                $('.mega-unit > a',this).css('height',maxValue+'px');
                                $(this).css('width',inneriw+'px');
                            });
                            
                            // Calc Required Left Margin incl additional required for right align
                            
                            if(defaults.fullWidth === true){
                                params = {left: 0};
                            } else {
                                
                                var ml = mr < ml ? ml + ml - mr : (totiw - pw)/2;
                                var subLeft = pl - ml;

                                // If Left Position Is Negative Set To Left Margin
                                var params = {left: pl+'px', marginLeft: -ml+'px'};
                                
                                if(subLeft < 0){
                                    params = {left: 0};
                                }else if(mr < ml){
                                    params = {right: 0};
                                }
                            }
                            $('.'+clContainer,this).css(params);
                            
                            // Calculate Row Height
                            $('.row',$mainSub).each(function(){
                                var rh = $(this).height();
                                $('.mega-unit',this).css({height: rh+'px'});
                                $(this).parent('.row').css({height: rh+'px'});
                            });
                            $mainSub.hide();
                    
                        } else {
                            $('.'+clContainer,this).addClass('non-mega').css('left',pl+'px');
                        }
                        // MK edition
                        if(!$('ul',$mainSub).hasClass('mk_mega_menu')){
                            $('.'+clContainer,this).addClass('mk-nested-sub');
                            //console.log($('.mk-nested-sub > ul',this).width());
                            $mk_nested_ul = $('.mk-nested-sub > ul',this);
                            $mk_nested_width = $mk_nested_ul.width();

                            $mk_nested_ul.find('ul').css('left', $mk_nested_width+'px');
                            $mk_nested_ul.find('li').each(function(){
                                var $nested_sub = $('> ul',this);
                                if($nested_sub.length) {
                                    jQuery(this).append('<i class="mk-mega-icon mk-icon-angle-right"></i>');
                                }
                                jQuery(this).hover(function(){
                                jQuery(this).find('> ul').stop(true, true).delay(100).fadeIn(100);
                                    }, function() {
                                jQuery(this).find('> ul').stop(true, true).delay(100).fadeOut(100);
                                });
                            });

                        }    
                    }
                });
                // Set position of mega dropdown to bottom of main menu
                var menuHeight = $('> li > a',$dcMegaMenuObj).outerHeight(true);
                $('.'+clContainer,$dcMegaMenuObj).css({top: menuHeight+'px'}).css('z-index','1000');
                
                if(defaults.event == 'hover'){
                    // HoverIntent Configuration
                    var config = {
                        sensitivity: 1,
                        interval: 30,
                        over: megaOver,
                        timeout: 50,
                        out: megaOut
                    };
                    $('li',$dcMegaMenuObj).hoverIntent(config);
                }
                
                if(defaults.event == 'click'){
                
                    $('body').mouseup(function(e){
                        if(!$(e.target).parents('.mega-hover').length){
                            megaReset();
                        }
                    });

                    $('> li > a.'+clParent,$dcMegaMenuObj).click(function(e){
                        var $parentLi = $(this).parent();
                        if($parentLi.hasClass('mega-hover')){
                            megaActionClose($parentLi);
                        } else {
                            megaAction($parentLi);
                        }
                        e.preventDefault();
                    });
                }
                
                // onLoad callback;
                defaults.onLoad.call(this);
            }
        });
    };
})(jQuery);






(function ($, window, document, undefined) {
    "use strict";
    var pluginName = "ajaxPortfolio",
        defaults = {
            propertyName: "value"
        };

    function Plugin(element, options) {
        this.element = $(element);
        this.settings = $.extend({}, defaults, options);
        this.init();
        
    }
    Plugin.prototype = {
        init: function () {
            var obj = this;
            this.grid = this.element.find('.mk-portfolio-container'),
            this.items = this.grid.children();

            if (this.items.length < 1) return false; //If no items was found then exit
            this.ajaxDiv = this.element.find('div.ajax-container'),
            this.filter = this.element.find('#mk-filter-portfolio'),
            this.loader = this.element.find('.portfolio-loader'),
            this.triggers = this.items.find('.project-load'),
            this.closeBtn = this.ajaxDiv.find('.close-ajax'),
            this.nextBtn = this.ajaxDiv.find('.next-ajax'),
            this.prevBtn = this.ajaxDiv.find('.prev-ajax'),
            this.api = {},
            this.id = null,
            this.win = $(window),
            this.current = 0,
            this.breakpointT = 989,
            this.breakpointP = 767,
            this.columns = this.grid.data('columns'),
            this.real_col = this.columns;
            this.loader.fadeIn();
            if (this.items.length == 1) {
                this.nextBtn.remove();
                this.prevBtn.remove();
            }
            this.grid.waitForImages(function() {
                obj.loader.fadeOut();
                obj.bind_handler();
            });

        },
        
        bind_handler: function () {
            var obj = this; // Temp instance of this object
            // Bind the filters with isotope
            obj.filter.find('a').click(function () {
                obj.triggers.removeClass('active');
                obj.grid.removeClass('grid-open');
                obj.close_project();
                obj.filter.find('a').removeClass('active_sort');
                $(this).addClass('active_sort');
                var selector = $(this).attr('data-filter');
                obj.grid.isotope({
                    filter: selector
                });
                return false;
            });
            
            obj.triggers.on('click', function(){
                
                var clicked = $(this),
                    clickedParent = clicked.parents('.mk-portfolio-item');
                
                obj.current = clickedParent.index();
                
                if(clicked.hasClass('active'))
                    return false;
                
                obj.close_project();
                
                obj.triggers.removeClass('active');
                clicked.addClass('active');
                obj.grid.addClass('grid-open');
                obj.loader.fadeIn();
                
                obj.id = clicked.data('post-id');
                
                obj.load_project();
                
                return false;
                
            });
            
            obj.nextBtn.on('click', function(){
                if(obj.current == obj.triggers.length-1) {
                    obj.triggers.eq(0).trigger('click');
                    return false;
                }
                else {
                    obj.triggers.eq(obj.current + 1).trigger('click');
                    return false;
                }
                    
            });
            
            obj.prevBtn.on('click', function(){
                if(obj.current == 0) {
                    obj.triggers.eq(obj.triggers.length-1).trigger('click');
                    return false;
                }
                else {
                    obj.triggers.eq(obj.current - 1).trigger('click');
                    return false;
                }
                    
            });
            
            // Bind close button
            obj.closeBtn.on('click', function(){
                obj.close_project();
                obj.triggers.removeClass('active');
                obj.grid.removeClass('grid-open');
                return false;
            });
        
            
        },
        // Function to close the ajax container div
        close_project: function(){
                var obj = this, // Temp instance of this object
                project = obj.ajaxDiv.find('.ajax_project'),
                newH = project.actual('outerHeight');
                
                obj.ajaxDiv.find('iframe').attr('src', '');


            if(obj.ajaxDiv.height() > 0) {
                obj.ajaxDiv.css('height', newH+'px').transition({
                    height: 0,
                    opacity: 0
                }, 600);
            }
            else {
                obj.ajaxDiv.transition({
                    height: 0,
                    opacity: 0
                }, 600);
            }
        },      
        load_project: function(){
            var obj = this;
            $.post(ajaxurl, {
                action  :       'mk_ajax_portfolio',
                id      :       obj.id
            }, function (response) {
                obj.ajaxDiv.find('.ajax_project').remove();
                obj.ajaxDiv.append(response);
                obj.project_factory();
                mk_ajax_lightbox_init();
                 setTimeout(function () {
                            mk_flexslider_init();
                        }, 2000);;
                
            });         
        },
        project_factory:function(){
            var obj = this,
                project = this.ajaxDiv.find('.ajax_project');
            
            
            
            project.waitForImages(function() {
                $('html:not(:animated),body:not(:animated)').animate({ scrollTop: obj.ajaxDiv.offset().top -160  }, 700);
                mk_flexslider_init();
                obj.loader.fadeOut(function(){
                    var newH = project.actual('outerHeight');
                    obj.ajaxDiv.transition({
                        opacity: 1,
                        height:newH
                    }, 400, function(){
                        obj.ajaxDiv.css({height:'auto'});
                    });
                });
                
            });
            
        },

    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);



    function mk_flexslider_init() {


        jQuery('.mk-flexslider.mk-script-call').each(function() {

          

            var $this = jQuery(this),
            $selector = $this.attr('data-selector'),
            $animation = $this.attr('data-animation'),
            $easing = $this.attr('data-easing'),
            $direction = $this.attr('data-direction'),
            $smoothHeight = $this.attr('data-smoothHeight') == "true" ? true : false,
            $slideshowSpeed = $this.attr('data-slideshowSpeed'),
            $animationSpeed = $this.attr('data-animationSpeed'),
            $controlNav = $this.attr('data-controlNav') == "true" ? true : false,
            $directionNav = $this.attr('data-directionNav') == "true" ? true : false,
            $pauseOnHover = $this.attr('data-pauseOnHover') == "true" ? true : false,
            $isCarousel = $this.attr('data-isCarousel') == "true" ? true : false;

            if($selector != undefined) {
               var $selector_class = $selector;
            } else {
                var $selector_class = ".mk-flex-slides > li";
            }

            if($isCarousel == true) {
                var $itemWidth = parseInt($this.attr('data-itemWidth')),
                $itemMargin = parseInt($this.attr('data-itemMargin')),
                $minItems = parseInt($this.attr('data-minItems')),
                $maxItems = parseInt($this.attr('data-maxItems')),
                $move = parseInt($this.attr('data-move'));
            } else {
                var $itemWidth = $itemMargin = $minItems = $maxItems = $move = 0;
            }

            $this.flexslider({
                selector: $selector_class,
                animation: $animation,
                easing: $easing,
                direction: $direction,
                smoothHeight: $smoothHeight,
                slideshow: true,
                slideshowSpeed: $slideshowSpeed,
                animationSpeed: $animationSpeed,
                controlNav: $controlNav,
                directionNav: $directionNav,
                pauseOnHover: $pauseOnHover,
                prevText: "",
                nextText: "",
                 
                itemWidth: $itemWidth,
                itemMargin: $itemMargin,
                minItems: $minItems,
                maxItems: $maxItems,
                move: $move,
            });

        });

    }


    function mk_ajax_lightbox_init() {
        jQuery('.mk-lightbox').iLightBox({
            social: {
              facebook: false,
              twitter: false,
              googleplus: false,
            }
        });
    }



