//메인페이지 Notice 영역 슬라이드
$(document).ready(function() {
    $('#slider').slick({
        infinite : true, 
        slidesToShow : 1, 
        slidesToScroll : 1,
        autoplay : true,
        autoplaySpeed: 10000,
        arrows : true, 
        vertical : false,
        pauseOnHover : true,
        arrows : true,
        draggable: true,
        prevArrow : "<button type='button' class='slick-prev'>Previous</button>",
        nextArrow : "<button type='button' class='slick-next'>Next</button>",
    });
});

//사이드 메뉴 클릭이벤트
$(document).ready(function() {
    // 초기에 모든 two-depth와 three-depth 메뉴를 숨김
    $(".two-depth, .three-depth").hide();

    // one-depth 클릭을 처리
    $(".one-depth .d1>a").click(function(e) {
        if ($(this).parent(".one-menu").length > 0) {
            // one-menu 클래스가 있는 경우에는 링크로 이동
            window.location.href = $(this).attr("href");
        } else {
            e.preventDefault();
            var twoDepthMenu = $(this).siblings(".two-depth");
            
            // 클릭한 one-depth 메뉴를 제외하고 모든 two-depth 메뉴를 숨김
            $(".two-depth").not(twoDepthMenu).hide();
            $(".d2").removeClass("active");
            $(".three-depth").not(twoDepthMenu).hide();
            
            // 클릭한 one-depth 메뉴의 two-depth 메뉴를 토글
            twoDepthMenu.toggle();
            
            // 모든 one-depth 메뉴에서 "active" 클래스 제거
            $(".d1").removeClass("active");
            
            // 클릭한 one-depth 메뉴에 "active" 클래스 추가
            $(this).parent(".d1").addClass("active");
        }
    });
    
    // two-depth 클릭을 처리
    $(".two-depth .d2>a").click(function(e) {
        if ($(this).parent(".one-menu").length > 0) {
            // one-menu 클래스가 있는 경우에는 링크로 이동
            window.location.href = $(this).attr("href");
        } else {
        e.preventDefault();
        var threeDepthMenu = $(this).siblings(".three-depth");

        // 클릭한 two-depth 메뉴의 three-depth 메뉴를 토글
        threeDepthMenu.toggle();

        // 클릭한 two-depth 메뉴에 "active" 클래스 추가
        $(this).parent(".d2").toggleClass("active");
        }
    });

    // three-depth 메뉴 클릭 시, two-depth 메뉴가 닫히지 않도록 함
    $(".three-depth>a").click(function(e) {
        e.stopPropagation();
    });

    // 문서의 다른 부분을 클릭할 때 메뉴를 닫음
    $(document).click(function(e) {
        if (!$(e.target).closest(".one-depth, .two-depth, .three-depth").length) {
            $(".two-depth").hide();
            $(".three-depth").hide();
            $(".d1, .d2").removeClass("active");
        }
    });
});

//사이드바 접고 펴기
$(function () {
    $(".side-fold").click(function () {
        $("#sidemenu").toggleClass("fold");
        $(this).toggleClass("fold");
        $(".main-wrap").toggleClass("stretch");
        $(".sub-content-wrap").toggleClass("stretch");
        $("#nav-copyright").toggleClass("hide");
        $("#slider").slick('goTo', 1);
    });
});

//리스트 페이지네이션
$(function () {
    $(".btn-page").click(function(){
        $(".btn-page").removeClass("selected");
        $(this).addClass("selected");
    });
});

$(function () {
    $(".listrow").click(function () {
        var radiobox = $(this).find("input:radio");
        // 현재 클릭된 Row(<tr>)
        $('input[name="selcell"]').attr('checked', false);
        radiobox.attr('checked', true);
    });
});

//Toast Editor
$(document).ready(function() {
    const Editor = toastui.Editor;

    const editor = new Editor({
            el: document.querySelector('#editor'),
            height: '300px',
            initialEditType: 'markdown',
            previewStyle: 'vertical'
        });

    editor.getMarkdown();
});

//전체 메뉴 접고 펴기
$(function () {
    $(window).on('resize', function() {
        var deviceW = $(window).width();
        if (deviceW <= 1280 && deviceW > 720) {
            $("#sidemenu").addClass("fold");
            $(".side-fold").addClass("fold");
            $(".main-wrap").addClass("stretch");
            $(".sub-content-wrap").addClass("stretch");
            $("#nav-copyright").addClass("hide");
            $("#slider").slick('goTo', 1);
        } else if (deviceW <= 720){
            $("#sidemenu").addClass("hide");
            $("#slider").slick('goTo', 1);
        }
    });
    // 전체메뉴 click, hover 이벤트
    $('#hamburgerBtn').click(function () {
        $(this).find(".hamburger").toggleClass("on");
        $('#all-menu').toggleClass("is-active");
        $("#logo-mobile").toggleClass("hide");
        $("header").toggleClass("on");
        if ($('#all-menu').hasClass("is-active")) {
            $(this).attr("title", "대메뉴 닫기");
            $(".mobile-home").css("display", "block");
            $('body').css('overflow', 'hidden');
        } else {
            $(this).attr("title", "대메뉴 열기");
            $(".mobile-home").css("display", "none");
            $('body').css('overflow', 'auto');
        }
    });
    
    // 창 크기가 변경될 때 클래스 조작 함수 호출
    $(window).on('resize', function() {
        if ($(window).width() > 1280) {
            $('#hamburgerBtn .hamburger').removeClass("on");
            $('#all-menu').removeClass("is-active");
            $("#logo-mobile").removeClass("hide");
            $("header").removeClass("on");
            $('#hamburgerBtn').attr("title", "대메뉴 열기");
            $(".mobile-home").css("display", "none");
            $('body').css('overflow', 'auto');
        }
    });

    //모바일 1뎁스 메뉴 클릭이벤트
    $('.a-depth1 > li').click(function () {
        $(".a-depth1 > li").removeClass("focus");
        // 현재 클릭한 li 요소에 focus 클래스 추가
        $(this).addClass('focus');
        
        // 대상 div의 인덱스를 가져와서 해당 div에 active 클래스 추가
        var index = $(this).index();
        $('nav div.a-target').removeClass('active');
        $('nav div.a-target:eq(' + index + ')').addClass('active');
    });
});

$(document).ready(function() {
    // a-depth1의 li 요소를 클릭할 때
    $('nav ul.a-depth1 li').click(function() {
    });
});


$(document).ready(function() {
    // 초기에 모든 .settings 요소에서 'on' 클래스를 제거
    $(".settings").removeClass("on");

    // .id-info 클릭 시
    $('.id-info').click(function(event) {
        event.stopPropagation(); // 이벤트 버블링 중지
        if ($(".settings1").hasClass("on")) {
            $(".settings1").removeClass("on");
        } else if ($(".settings2").hasClass("on")) {
            $(".settings2").removeClass("on");
            $(".settings1").addClass("on");
        } else {
            $(".settings1").addClass("on");
        }
    });
    
    // .header-icon2 클릭 시
    $('.header-icon2').click(function(event) {
        event.stopPropagation(); // 이벤트 버블링 중지
        if ($(".settings2").hasClass("on")) {
            $(".settings2").removeClass("on");
        } else if ($(".settings1").hasClass("on")) {
            $(".settings1").removeClass("on");
            $(".settings2").addClass("on");
        } else {
            $(".settings2").addClass("on");
        }
    });

    // 다른 부분을 클릭했을 때 .settings의 'on' 클래스 제거
    $(document).click(function(event) {
        if (!$(event.target).closest(".settings").length) {
            $(".settings").removeClass("on");
        }
    });
});

//리스트 테이블영역의 스크롤을 마우스 드래그로 제어하는 함수
$(document).ready(function() {
    /* 라이브러리 정의 */
    $.fn.scrollMove = function () {
        var controlDown = false;
        var pointer = {
            pageY : 0,
            pageX : 0,
            scrollTop : 0,
            scrollLeft : 0,
        };
        // 마우스 이벤트
        $(this).css('cursor','all-scroll');
        $(this).on('mousedown',function(e){
            e.preventDefault();
            controlDown = true;
            pointer.pageX = e.pageX;
            pointer.pageY = e.pageY;
            pointer.scrollTop = $(this).scrollTop();
            pointer.scrollLeft = $(this).scrollLeft();
        });
        $(this).on('mousemove',function(e){
            if(controlDown){
                var newPageX = e.pageX;
                var newPageY = e.pageY;
                $(this).scrollLeft(pointer.scrollLeft - newPageX + pointer.pageX);
                $(this).scrollTop(pointer.scrollTop - newPageY + pointer.pageY);
            }
        });
        $(this).on('mouseup',function(e){controlDown = false;});    
    };	

    // 스크롤 이벤트 실행
    // $('.result_area').scrollMove();
});


$(document).ready(function() {
    $('.opener').click(function() {
        $(this).find(".btn-folder").toggleClass("open");
    });
});

//상세페이지 탭 닫기 기능
$(document).ready(function() {
    $('.tab-close').click(function() {
        $(this).parents("li").remove();
    });
});


$(document).ready(function() {
    $(".d-keybox").removeClass("drop");

    $('.drop-key').click(function() {
        if(!$('.d-keybox').hasClass("drop")){
            $(this).parent().find(".d-keybox").addClass("drop");
        } else {
            $(this).parent().find(".d-keybox").removeClass("drop");
        };
    });

    $(document).mouseup(function(e) {
        var container = $(".d-keybox");

        // 클릭된 위치가 d-keybox 영역이 아니면 drop 클래스 제거
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass("drop");
        }
    });
});



$(document).ready(function() {
    $('label, select').each(function() {
        var input = $(this).find('input, select');

        // input 또는 select 요소의 포커스 및 readonly, disabled 상태 변화를 감지하여 클래스 업데이트
        input.on('focus', function() {
            // select가 비활성화(disabled) 또는 읽기 전용(readonly) 상태인 경우 focused 클래스 추가하지 않음
            if (!$(this).prop('disabled') && !$(this).prop('readonly')) {
                $(this).closest('label').addClass('focused');
            }
        });

        input.on('blur', function() {
            $(this).closest('label').removeClass('focused');
        });
    });
});


//게시판 카테고리 클릭이벤트
$(function(){
    $(".ct-2depth").hide();

    $(".ct-1depth-title").click(function(){
        // 현재 클릭한 요소에 'active' 클래스를 토글합니다.
        $(this).toggleClass('active');

        // 모든 다른 ct-1depth-title에서 'active' 클래스를 제거합니다.
        $(".ct-1depth-title").not(this).removeClass('active');

        // 현재 클릭한 요소에 'active' 클래스가 있는지 확인합니다.
        if($(this).hasClass("active")) {
            // 현재 클릭한 요소의 부모에서 ct-2depth를 찾아서 표시합니다.
            $(".ct-2depth").stop().slideUp();
            $(this).siblings(".ct-2depth").stop().slideDown();
        } else {
            // 'active' 클래스가 없는 경우 모든 ct-2depth를 숨깁니다.
            $(".ct-2depth").stop().slideUp();
        }
    });
});

//모달 오픈
$(function(){
    // 팝업 열기 버튼 클릭 이벤트
    $('.modal-button').click(function() {
        var target = $(this).data('target');
        $(target).closest(".modal-panel").addClass("is-active");
        $(target).fadeIn();
        $(target).find(".modal-content").fadeIn();
        $(target).find(".modal-content").addClass("is-active");
        //본문창 스크롤 막기
        $('body').addClass('scrollLock');
    });
    
    // 팝업 닫기 버튼 클릭 이벤트
    $('.modal-btn.close').click(function() {
        var target = $(this).closest('.modal');
        $(target).closest('.modal-panel').removeClass("is-active");
        $(target).fadeOut();
        $(target).find(".modal-content").removeClass("is-active");
        //본문창 스크롤 막기 해제
        $('body').removeClass('scrollLock');
    });
});


//모달 공지사항 닫기
$(function(){
    // 팝업 닫기 버튼 클릭 이벤트
    $('.modal-close').click(function() {
        $(".modal-notice").css({
            animation: 'moveDown .5s ease forwards',
        }).removeClass("is-active");
    
        $(".modal-panel-notice").fadeOut(300, function() {
            // fadeOut이 완료된 후에 실행되는 콜백 함수
            $(".modal-panel-notice").removeClass("is-active");
        });
        // 본문창 스크롤 막기 해제
        $('body').removeClass('scrollLock');
    });
});

//모달 공지사항 슬라이드
$(function() {
    let i = 0;
    let intervalId; // 변수 추가

    function slide() {
        $(".modal-slide-wrap ul").animate({left: -100 + "%"}, 700, function() {
            $(".modal-slide-wrap ul").append($(".modal-slide-wrap ul li").first());
            $(".modal-slide-wrap ul").css({left: 0});
        });
    }

    function prevSlide() {
        $(".modal-slide-wrap ul").prepend($(".modal-slide-wrap ul li").last());
        $(".modal-slide-wrap ul").css({left: -100 + "%"});
        $(".modal-slide-wrap ul").animate({left: 0}, 700);
    }

    function nextSlide() {
        $(".modal-slide-wrap ul").animate({left: -100 + "%"}, 700, function() {
            $(".modal-slide-wrap ul").append($(".modal-slide-wrap ul li").first());
            $(".modal-slide-wrap ul").css({left: 0});
        });
    }

    function startInterval() {
        intervalId = setInterval(slide, 7000);
    }

    startInterval(); // 초기에 interval 시작

    $(".prev").on("click", function() {
        clearInterval(intervalId); // 현재 interval 해제
        prevSlide();
        startInterval(); // 새로운 interval 시작
    });

    $(".next").on("click", function() {
        clearInterval(intervalId); // 현재 interval 해제
        nextSlide();
        startInterval(); // 새로운 interval 시작
    });
});


//해시태그
$(document).ready(function () {
    var tag = {};
    var counter = 0;

    // 입력한 값을 태그로 생성한다.
    function addTag (value) {
        tag[counter] = value;
        counter++; // del-tag 의 고유 id 가 된다.
    }

    // tag 안에 있는 값을 array type 으로 만들어서 넘긴다.
    function marginTag () {
        return Object.values(tag).filter(function (word) {
            return word !== "";
        });
    }

    // 서버에 제공
    $("#tag-form").on("submit", function (e) {
        var value = marginTag(); // return array
        $("#rdTag").val(value); 

        $(this).submit();
    });

    $("#hashtag").on("keypress", function (e) {
        var self = $(this);

        //엔터나 스페이스바 눌렀을때 실행
        if (e.key === "Enter" || e.keyCode == 32) {

            var tagValue = self.val(); // 값 가져오기

            // 해시태그 값 없으면 실행X
            if (tagValue !== "") {

                // 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
                var result = Object.values(tag).filter(function (word) {
                    return word === tagValue;
                })
            
                // 해시태그가 중복되었는지 확인
                if (result.length == 0) { 
                    $("#tag-list").append("<li class='tag-item'>"+"#"+tagValue+"<span class='del-tag' idx='"+counter+"'></span></li>");
                    $("#tag-list").addClass("pt8");
                    addTag(tagValue);
                    self.val("");
                } else {
                    alert("Tag values are duplicated.");
                }
            }
            e.preventDefault(); // SpaceBar 시 빈공간이 생기지 않도록 방지
        }
    });

    // 삭제 버튼 
    // 인덱스 검사 후 삭제
    $(document).on("click", ".del-tag", function (e) {
        var index = $(this).attr("idx");
        tag[index] = "";
        $(this).parent().remove();

        // .tag-item이 있는지 여부에 따라 .tag-listbox에 pt8 클래스 추가 또는 삭제
        if ($("#tag-list > .tag-item").length == 0) {
            $("#tag-list").removeClass("pt8");
        } else {
            $("#tag-list").addClass("pt8");
        }
    });
})



//DESIGNATE버튼 페이지 연결
$(document).ready(function () {
    $("#btn-designate").click(function () {
        // 새 창을 여는 코드
        var popupWindow = window.open('../mymenu/IMP-UI-003-01-01-02.html', '_blank', 'width=1200, height=1050'); 
    });
});

