// rwd_check.js
(function($){ 
  const conBox = $('#conBox');
  //디바이스별 크기 기준 설정
  const mobile=480, tablet=768, labtop=1366, pc=1600;

  //기본 디바이스 명칭 설정
  let nowSize;
  const device = [ 'mobile', 'tablet', 'labtop', 'pc', 'pcfull' ];
  let beforeW = $(window).outerWidth(true);

  // 디바이스별 data처리
    const DeviceData = function(wid){

      switch(wid){
        case device[0]: 
          conBox.load('./temp/main_mob.html');
        break;
        case device[1]: 
          conBox.load('./temp/main_tab.html', function(){
            $('body').append('<script src="../js/main_tap.js"></script>');
          });
        break;
        case device[2]: 
        case device[3]: 
        case device[4]: 
          conBox.load('./temp/main_pc.html', function(){
            $('head').find('title').before('<link rel="stylesheet" href="../css/pc.css">');
            $('body').append('<script src="../js/main_pc.js"></script>')
          });
        break;
      }
    };

  // 디바이스 크기 체크
  const DeviceSet = function(winW){
    if(winW <= mobile ){
      nowSize = device[0];
    } else if(winW > mobile && winW <= tablet) {
      nowSize = device[1];
    } else if(winW > tablet && winW <= labtop) {
      nowSize = device[2];
    } else if(winW > labtop && winW <= pc) {
      nowSize = device[3];
    } else {
      nowSize = device[4];
    }
    return nowSize;
  }
  let beforeDevice = DeviceSet(beforeW);
  DeviceData(beforeDevice); //Device별 사이즈 파일 불러오는 함수

  // ---------------------------------------------------
  //navigator.userAgent : 사용자의 브라우저를 확인하는 명령어
  let browser = navigator.userAgent.toLowerCase();
  let nowb = null;
  if(browser.indexOf('firefox') != -1){ //-1:없다는 뜻
    nowb = 'firefox';
  } else {
    nowb = 'other';
  }
  console.log(nowb);
  // ---------------------------------------------------
  //브라우저별 사이즈 변경 시 새로고침
  $(window).on('resize', function(){
    let afterW = $(window).outerWidth(true);
    let afterDevice = DeviceSet(afterW);
    
    if(beforeDevice !== afterDevice){ 
      if( nowb == 'firefox'){
        window.location = window.location;
      } else {
        location.reload();
      }
    }
  });
  console.log(nowSize);

})(jQuery);