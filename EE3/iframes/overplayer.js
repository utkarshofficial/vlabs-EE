const overPlayer = {
  trial_banner: document.querySelector(".trial_banner"),
  playBtn: document.querySelector(
    ".play-controls-container__play-pause-button"
  ),
  headTitle: document.querySelector(".info-container__title div"),
  sliderIsPlaying: false,
  init() {
    this.hideTrialBanner();
    this.updateTitle();
  },
  slidePlay() {
    const touchStartOn = function (el, x, y) {
      var e, err;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      try {
        e = document.createEvent("TouchEvent");
        e.initTouchEvent("touchstart", true, true);
      } catch (error) {
        err = error;
        try {
          e = document.createEvent("UIEvent");
          e.initUIEvent("touchstart", true, true);
        } catch (error) {
          err = error;
          e = document.createEvent("Event");
          e.initEvent("touchstart", true, true);
        }
      }
      e.targetTouches = [
        {
          pageX: x,
          pageY: y,
        },
      ];
      console.log(e)
      return el.dispatchEvent(e);
    };

    let btn = $(this.playBtn)
    let btnOffset = btn.offset()

    touchStartOn(this.playBtn, btnOffset.left + 5, btnOffset.top + 5)
  },
  slidePause() {},
  hideTrialBanner() {
    this.trial_banner.style.opacity = 0;
  },
  updateTitle() {
    this.headTitle.innerHTML = "Buck Converter";
  },
  isSlidePlaying() {
    let playBtnPath = document.querySelector(
      ".play-controls-container__play-pause-button svg path"
    );
    // if playing then the path.d[1] == 5 else == 7 pause
    // ! playing
    if (playBtnPath.attributes.d.value[1] == 5) {
      return true;
    }
    // ! pause
    return false;
  },
  addClassNameListener(elemId, callback) {
    var elem = document.getElementById(elemId);
    var lastClassName = elem.className;
    window.setInterval( function() {   
       var className = elem.className;
        if (className !== lastClassName) {
            callback();   
            lastClassName = className;
        }
    },10)
  },
  onPlayBtn(){
    window.setInterval(()=>{
      this.playBtn.firstChild.firstChild.attributes.d.value[1]
    },10)
  },
};

overPlayer.init();
overPlayer.slidePlay();

