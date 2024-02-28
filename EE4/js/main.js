// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }
    });

    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit");
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = () => {
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function () {
          Quiz.close();
          Quiz.init();
        };

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    };
  },
};

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
  },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: {
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
};

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn() {
  let nextBtn = document.querySelector(".btn-next");
  nextBtn.classList.toggle("btn-deactive");
}
const setIsProcessRunning = (value) => {
  // calling toggle the next
  if (value != isRunning) {
    toggleNextBtn();
  }

  isRunning = value;
  if (value) {
    Dom.hideAll();
  }
};

// global for document object
const get = (query) => {
  return document.querySelector(query);
};

const getAll = (query) => {
  return document.querySelectorAll(query);
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25) {
  if (ccObj != null) {
    ccObj.destroy();
  }

  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped() {
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    },
  });
  if (!isMute) textToSpeach(text);
  return ccDom;
}

class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if (selector instanceof HTMLElement) {
      this.item = selector;
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector;
    // push
  }
  hidden(isHidden) {
    if (isHidden == false) this.item.style.visibility = "visible";
    else this.item.style.visibility = "hidden";
  }
  setContent(text) {
    this.item.innerHTML = text;
    return this;
  }
  zIndex(idx) {
    this.item.style.zIndex = idx;
    return this;
  }
  opacity(val = 1) {
    this.item.style.opacity = val;
    return this;
  }
  rotate(deg) {
    this.item.style.transform = `rotate(${deg}deg)`;
    return this;
  }
  addClass(className) {
    this.item.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.item.classList.remove(className);
    return this;
  }
  borderRadius(amount) {
    amount += "px";
    this.styles({
      borderRadius: amount,
    });
  }
  scale(val = 1) {
    this.item.style.scale = val;
    return this;
  }
  get() {
    return this.item;
  }
  set(
    left = null,
    top = null,
    height = null,
    width = null,
    bottom = null,
    right = null,
    disp = "block"
  ) {
    // coordinates
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
    this.height = height;
    this.width = width;
    this.item.style.opacity = 1;
    this.item.style.transform = "translateX(0) translateY(0)";

    if (this.left !== null) this.item.style.left = String(this.left) + "px";
    if (this.top !== null) this.item.style.top = String(this.top) + "px";
    if (this.bottom !== null)
      this.item.style.bottom = String(this.bottom) + "px";
    if (this.right !== null) this.item.style.right = String(this.right) + "px";
    if (this.height !== null)
      this.item.style.height = String(this.height) + "px";
    if (this.width !== null) this.item.style.width = String(this.width) + "px";
    this.show(disp);
    return this;
  }
  show(disp = "block") {
    //! push for every element
    this.push();

    this.item.style.display = disp;
    // this.opacity();
    return this;
  }
  hide() {
    this.item.style.display = "none";
    return this;
  }
  play(speed = 1) {
    this.item.play();
    this.item.playbackRate = speed;
    return this;
  }
  // for setting styles
  styles(props) {
    for (let property in props) {
      this.item.style[property] = props[property];
    }
    return this;
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj) {
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems() {
    Dom.arrayOfAnimes = [];
  }
  static hideAll() {
    //to empty the setCC
    setCC("");
    // to delete all content of content adder menu
    Scenes.items.contentAdderBox.setContent("");
    for (let i of Dom.arrayOfItems) {
      i.hide();
      i.opacity();
    }
    // * reset animes
    for (let i of Dom.arrayOfAnimes) {
      // to reset each anime after back btn pressed
      i.reset();
    }
    Dom.resetItems();
  }
  static resetItems() {
    Dom.arrayOfItems = [];
  }
  static setBlinkArrowRed(
    isX = true,
    left = null,
    top = null,
    height = 30,
    width = null,
    rotate = 0
  ) {
    let blinkArrow = new Dom(".blinkArrowRed")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  static setBlinkArrow(
    isX = true,
    left = null,
    top = null,
    height = 60,
    width = 60,
    rotate = 0
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130;
    let blinkArrow = new Dom(".blinkArrow")
      .set(left, top, height, width)
      .rotate(rotate)
      .zIndex(10000);
    if (isX === -1) {
      blinkArrow.hide();
      return;
    }
    let x = 0,
      y = 0;
    if (isX) {
      x = 20;
    } else {
      y = 20;
    }
    var blink = anime({
      targets: blinkArrow.item,
      easing: "easeInOutQuad",
      opacity: 1,
      translateX: x,
      translateY: y,
      direction: "alternate",
      loop: true,
      autoplay: false,
      duration: 300,
    });

    return blink;
  }
  push() {
    if (this.selector != ".anime-header") Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0;
}

// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    concept_development: new Dom(".concept_development"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    graph1: new Dom(".graph1"),
    graph2: new Dom(".graph2"),
    graph3: new Dom(".graph3"),
    graph4: new Dom(".graph4"),
    graph5: new Dom(".graph5"),
    graph_box_1: new Dom(".graph_box1"),
    graph_box_2: new Dom(".graph_box2"),
    graph_box_3: new Dom(".graph_box3"),
    graph_box_4: new Dom(".graph_box4"),
    graph_box_5: new Dom(".graph_box5"),
    xLabel: new Dom(".xLabel"),
    yLabel: new Dom(".yLabel"),

    part3_table_one: new Dom(".part3_table_one"),
    part3_table_two: new Dom(".part3_table_two"),
    part3_table_three: new Dom(".part3_table_three"),
    part3_table_four: new Dom(".part3_table_four"),
    part3_table_four_2: new Dom(".part3_table_four_2"),
    slider_vIn: new Dom(".slider_vIn"),
    slider_D: new Dom(".slider_D"),
    slider_R: new Dom(".slider_R"),
    slider_C: new Dom(".slider_C"),
    slider_box: new Dom(".slider-box"),
   
    btn_delete: new Dom(".btn-delete"),
    btn_reset: new Dom(".btn-reset"),
    btn_record: new Dom(".btn-record"),
    btn_check_connections: new Dom(".btn-check-connections"),
    btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

    btn_transparent: new Dom(".btn-transparent"),

    formulas_component_stress: new Dom("formulas_component_stress"),
    formulas_efficiency: new Dom("formulas_efficiency"),
    formulas_ideal: new Dom("formulas_ideal"),
    formulas_nomenclautre: new Dom("formulas_nomenclautre"),
    formulas_non_ideal: new Dom("formulas_non_ideal"),
    formulas_procedure: new Dom("formulas_procedure"),
    formulas_universal: new Dom("formulas_universal"),
    part_3_option_select: new Dom("part_3_option_select"),
    part_1_text_for_crrct: new Dom("part_1_text_for_crrct"),
    part_1_text_for_wrong: new Dom("part_1_text_for_wrong"),


    // !EE4 images added

    btn_connections: new Dom("btn_connections"),
    btn_connectons_completed: new Dom("btn_connectons_completed"),
    btn_instructions: new Dom("btn_instructions"),
    btn_nomenclature: new Dom("btn_nomenclature"),
    btn_plot: new Dom("btn_plot"),
    btn_procedure: new Dom("btn_procedure"),
    btn_reset: new Dom("btn_reset"),
    btn_start_experiment: new Dom("btn_start_experiment"),
    method_1_cable_black_bottom: new Dom("method_1_cable_black_bottom"),
    method_1_cable_black_top: new Dom("method_1_cable_black_top"),
    method_1_cable_blue: new Dom("method_1_cable_blue"),
    method_1_cable_green: new Dom("method_1_cable_green"),
    method_1_cable_pink: new Dom("method_1_cable_pink"),
    method_1_cable_purple: new Dom("method_1_cable_purple"),
    method_1_cable_red: new Dom("method_1_cable_red"),
    method_1_cable_yellow: new Dom("method_1_cable_yellow"),
    method_2_cable_green: new Dom("method_2_cable_green"),
    method_2_cable_red: new Dom("method_2_cable_red"),
    method_2_cable_yellow: new Dom("method_2_cable_yellow"),
    part_1_instructions_box: new Dom("part_1_instructions_box"),
    part_1_procedure_box: new Dom("part_1_procedure_box"),
    part_1_select_option_1_1: new Dom("part_1_select_option_1_1"),
    part_1_select_option_1_2: new Dom("part_1_select_option_1_2"),
    part_1_select_option_2: new Dom("part_1_select_option_2"),
    part_1_select_option_3: new Dom("part_1_select_option_3"),
    part_1_select_option_full: new Dom("part_1_select_option_full"),
    part_1_slide_1: new Dom("part_1_slide_1"),
    part_1_slide_2: new Dom("part_1_slide_2"),
    part_1_slide_3: new Dom("part_1_slide_3"),
    part_1_slide_3_compo_1_off: new Dom("part_1_slide_3_compo_1_off"),
    part_1_slide_3_compo_1_on: new Dom("part_1_slide_3_compo_1_on"),
    part_1_slide_3_compo_1_text: new Dom("part_1_slide_3_compo_1_text"),
    part_1_slide_3_compo_2_off: new Dom("part_1_slide_3_compo_2_off"),
    part_1_slide_3_compo_2_on: new Dom("part_1_slide_3_compo_2_on"),
    part_1_slide_3_compo_2_text: new Dom("part_1_slide_3_compo_2_text"),
    part_1_procedure_box_2: new Dom("part_1_procedure_box_2"),
    part_1_slide_4: new Dom("part_1_slide_4"),
    part_1_incomplete_connection: new Dom("part_1_incomplete_connection"),

    //! EE4 tables added
    part_1_table_1: new Dom(".part_1_table_1"),
    part_1_table_2: new Dom(".part_1_table_2"),

    part_1_table_1_col_1: new Dom(".part_1_table_1_col_1"),
    part_1_table_1_col_2: new Dom(".part_1_table_1_col_2"),
    part_1_table_1_col_3: new Dom(".part_1_table_1_col_3"),
    part_1_table_1_col_4: new Dom(".part_1_table_1_col_4"),
    part_1_table_1_col_5: new Dom(".part_1_table_1_col_5"),
    part_1_table_1_col_6: new Dom(".part_1_table_1_col_6"),
    part_1_table_1_col_7: new Dom(".part_1_table_1_col_7"),
    part_1_table_1_col_8: new Dom(".part_1_table_1_col_8"),

    part_1_table_2_col_1: new Dom(".part_1_table_2_col_1"),
    part_1_table_2_col_2: new Dom(".part_1_table_2_col_2"),
    part_1_table_2_col_3: new Dom(".part_1_table_2_col_3"),
    part_1_table_2_col_4: new Dom(".part_1_table_2_col_4"),
    part_1_table_2_col_5: new Dom(".part_1_table_2_col_5"),
    part_1_table_2_col_7: new Dom(".part_1_table_2_col_7"),
    part_1_table_2_col_8: new Dom(".part_1_table_2_col_8"),
    part_1_table_2_col_9: new Dom(".part_1_table_2_col_9"),
    part_1_table_2_col_10: new Dom(".part_1_table_2_col_10"),
    // ! new items dom

    // part2
    part_2_conncection_cable_a2 : new Dom("part_2_conncection_cable_a2"),
    part_2_conncection_cable_n2 : new Dom("part_2_conncection_cable_n2"),
    part_2_conncection_cable_p1 : new Dom("part_2_conncection_cable_p1"),
    part_2_conncection_cable_p2 : new Dom("part_2_conncection_cable_p2"),
    part_2_conncection_cable_r2 : new Dom("part_2_conncection_cable_r2"),
    part_2_conncection_cable_s : new Dom("part_2_conncection_cable_s"),
    part_2_conncection_cable_v1 : new Dom("part_2_conncection_cable_v1"),
    part_2_conncection_cable_v2 : new Dom("part_2_conncection_cable_v2"),
    part_2_conncection_cable_vg1 : new Dom("part_2_conncection_cable_vg1"),
    part_2_conncection_cable_vg2 : new Dom("part_2_conncection_cable_vg2"),
    part_2_conncection_supply_1_red_button : new Dom("part_2_conncection_supply_1_red_button"),
    part_2_conncection_supply_2_red_button : new Dom("part_2_conncection_supply_2_red_button"),
    part_2_connections_components : new Dom("part_2_connections_components"),
    // connection box
    part_2_connections_box: new Dom(".part_2_connections_box"),


    domQs1: new Dom("domQs1"),
    domQs2: new Dom("domQs2"),
    domQs3: new Dom("domQs3"),
    domQs4: new Dom("domQs4"),
    domQs5: new Dom("domQs5"),
    domQs6: new Dom("domQs6"),

    chart: [
      (graph1 = null),
      (graph2 = null),
      (graph3 = null),
      (graph4 = null),
      (graph5 = null),
      (graph6 = null),
      (graph7 = null),
    ],

    chart: {
      label1: {
        x: "Label 2",
        y: "Label 1",
      },
      label2: {
        x: "Label 2",
        y: "Label 1",
      },
      label3: {
        x: "Label 2",
        y: "Label 1",
      },
      label4: {
        x: "Label 2",
        y: "Label 1",
      },
      label5: {
        x: "Label 2",
        y: "Label 1",
      },
      label6: {
        x: "Label 2",
        y: "Label 1",
      },
      label7: {
        x: "Label 2",
        y: "Label 1",
      },
    },
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone: [0, 0, 0, 0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);

      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin() {
              // to hide previous step images
              intru.destroy();
              Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            },
          })
          .add({
            duration: 12000,
            complete() {
              setCC("Click 'Next' to go to next step");
              Dom.setBlinkArrow(true, 790, 444).play();
              setIsProcessRunning(false);
            },
          });
      };
      return true;
    }),
    (objective = function () {
      setIsProcessRunning(true);
      Dom.hideAll();

      // require
      Scenes.items.slider_box.hide();

      // !images array
      let imgs = document.querySelectorAll(".theory");

      let btn_transparent = Scenes.items.btn_transparent.item;
      Scenes.items.btn_transparent.show();
      // Scenes.items.btn_next.hide()

      let zIndex = 1003;
      let prevAnime = null;
      let slides = [];
      let currSlideIdx = 0;
      let pages = [];
      let currPageIdx = 0;
      let animeIsRunning = true;

      //! function is anime active
      function nextBtnToggle() {
        if (animeIsRunning) {
          animeIsRunning = false;
          btn_transparent.classList.remove("btn-deactive");
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrow(true, 790, 414).play();
        } else {
          animeIsRunning = true;
          btn_transparent.classList.add("btn-deactive");
          Dom.setBlinkArrow(-1);
        }
      }
      nextBtnToggle();

      // ! uncomment after done
      function resetNextBtn() {
        btn_transparent.onclick = () => {
          Dom.hideAll();
          Scenes.items.btn_transparent.show();
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrow(true, 790, 414).play();
          slides[++i]();
        };
      }

      function pagesNextBtn() {
        btn_transparent.onclick = () => {
          if (animeIsRunning) {
            return;
          }
          if (currPageIdx == pages.length) {
            resetNextBtn();
            btn_transparent.click();
            currPageIdx = 0;
            return;
          }
          // for calling pages in slides
          pages[currPageIdx++]();
        };
      }

      function fadeAnime(target, begin = () => {}, complete = () => {}) {
        anime({
          targets: target.item,
          opacity: [0, 1],
          duration: 1000,
          easing: "linear",
          round: 100,
          begin() {
            target.show();
            begin();
            // animeIsRunning = true
          },
          complete() {
            complete();
            // nextBtnToggle()
          },
        });
      }

      function blinkAnime(target, begin = () => {}, complete = () => {}) {
        target.show();
        anime({
          targets: target.item,
          opacity: [0.6, 1, 0.6],
          loop: true,
          easing: "linear",
          round: 100,
          duration: 700,
          begin() {
            begin();
          },
        });
        anime({
          delay: 1000,
          complete() {
            complete();
          },
        });
      }

      function rotateAnime(target, begin = () => {}, complete = () => {}) {
        return anime({
          targets: target.item,
          rotate: 360,
          easing: "linear",
          loop: true,
          duration: 800,
          begin() {
            begin();
          },
          complete() {
            complete();
          },
        });
      }

      slides = [
        // slide1 = ()=>{
        //   Scenes.items.slide_1.show()
        // },
        (slide2 = () => {
          Scenes.items.slide_2.show();
        }),
        (slide3 = () => {
          Scenes.items.slide_3_page_1.show();

          pages = [
            () => {
              let target = Scenes.items.slide_3_page_2;
              anime({
                targets: target.item,
                opacity: [0, 1],
                duration: 1000,
                easing: "linear",
                round: 100,
                begin() {
                  target.show();
                  nextBtnToggle();
                },
                complete() {
                  nextBtnToggle();
                },
              });
            },
            () => {
              let target = Scenes.items.slide_3_page_3;
              anime({
                targets: target.item,
                opacity: [0, 1],
                duration: 1000,
                easing: "linear",
                round: 100,
                begin() {
                  target.show();
                  nextBtnToggle();
                },
                complete() {
                  nextBtnToggle();
                },
              });
            },
            () => {
              let target = Scenes.items.slide_3_page_4;
              anime({
                targets: target.item,
                opacity: [0, 1],
                duration: 1000,
                easing: "linear",
                round: 100,
                begin() {
                  target.show();
                  nextBtnToggle();
                },
                complete() {
                  nextBtnToggle();
                },
              });
            },
          ];

          pagesNextBtn();
        }),
        (slide4 = () => {
          Scenes.items.slide_4_page_1.show();
          Scenes.items.slide_4_page_1_fan.set(270, 193, 90, 90);

          let battery = [
            Scenes.items.slide_4_page_2_battery_1.set(120 - 500, -295).item,
            Scenes.items.slide_4_page_2_battery_2.set(60 - 500, -240).item,
            Scenes.items.slide_4_page_2_battery_3.set(0 - 500, -186).item,
          ];
          let tempI = 0;
          let idx = [120, 60, 0];
          anime
            .timeline({
              duration: 500,
              easing: "easeInOutExpo",
            })
            .add({
              targets: battery[tempI],
              left: idx[tempI++],
            })
            .add({
              targets: battery[tempI],
              left: idx[tempI++],
            })
            .add({
              targets: battery[tempI],
              left: idx[tempI++],
            });

          // Scenes.items.slide_4_page_2_volt_text.show()

          pages = [
            () => {
              tempI = 0;
              topIdx = -45;
              leftIdx = 0;
              anime
                .timeline({
                  duration: 1000,
                  easing: "easeInOutExpo",
                })
                .add({
                  targets: battery[tempI++],
                  left: leftIdx,
                  top: topIdx,
                  begin() {
                    nextBtnToggle();
                  },
                })
                .add({
                  targets: battery[tempI++],
                  left: leftIdx,
                  top: topIdx,
                })
                .add({
                  targets: battery[tempI++],
                  left: leftIdx,
                  top: topIdx,
                  complete() {
                    fadeAnime(
                      Scenes.items.slide_4_page_2_volt_text,
                      () => {},
                      () => {
                        nextBtnToggle();
                      }
                    );
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    nextBtnToggle();
                    fadeAnime(Scenes.items.slide_4_page_3_wire);
                    prevAnime = anime({
                      targets: Scenes.items.slide_4_page_1_fan.item,
                      rotate: 360,
                      easing: "linear",
                      loop: true,
                      duration: 800,
                    });
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_4_page_3_text_1);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(
                      Scenes.items.slide_4_page_3_text_2,
                      () => {},
                      () => {
                        nextBtnToggle();
                      }
                    );
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide5 = () => {
          // old anime pause
          prevAnime.pause();

          Scenes.items.slide_5_page_1.show();
          // Scenes.items.slide_5_page_3_4_blast.set(220,170,220,160)

          let battery = [
            Scenes.items.slide_4_page_2_battery_1
              .set(120 - 500, -295)
              .zIndex(zIndex++).item,
            Scenes.items.slide_4_page_2_battery_2
              .set(60 - 500, -240)
              .zIndex(zIndex++).item,
          ];

          let tempI = 0;
          let idx = [120, 60];

          anime
            .timeline({
              duration: 800,
              easing: "easeInOutExpo",
            })
            .add({
              targets: battery[tempI],
              left: idx[tempI++],
            })
            .add({
              targets: battery[tempI],
              left: idx[tempI++],
            });

          // Scenes.items.slide_4_page_2_volt_text.show()

          pages = [
            () => {
              tempI = 0;
              topIdx = -45;
              leftIdx = 0;
              anime
                .timeline({
                  duration: 1000,
                  easing: "easeInOutExpo",
                })
                .add({
                  targets: battery[tempI++],
                  left: leftIdx,
                  top: topIdx,
                  begin() {
                    nextBtnToggle();
                  },
                })
                .add({
                  targets: battery[tempI++],
                  left: leftIdx,
                  top: topIdx,
                  complete() {
                    fadeAnime(Scenes.items.slide_5_page_2_volt_text);
                  },
                })
                .add({
                  complete() {
                    fadeAnime(Scenes.items.slide_5_page_2_text_1);
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 1000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    Scenes.items.slide_5_page_2_text_1.hide();
                    fadeAnime(Scenes.items.slide_5_page_3_1_text_1);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_5_page_3_2_wire);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_5_page_3_3_light);
                  },
                })
                // * For GIF
                .add({
                  begin() {
                    Scenes.items.slide_5_page_3_3_light.hide();
                    Scenes.items.slide_5_page_3_4_blast.set(220, 170, 220, 160);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(
                      Scenes.items.slide_5_page_3_5_cross.zIndex(zIndex++)
                    );
                  },
                })
                .add({
                  begin() {
                    Scenes.items.slide_5_page_3_1_text_1.hide();
                    fadeAnime(Scenes.items.slide_5_page_3_6_emoji);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_5_page_3_7_text_2);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_5_page_3_8_text_3);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              Scenes.items.slide_5_page_4_1_text_1.show();
            },
          ];

          pagesNextBtn();
        }),
        (slide6 = () => {
          Scenes.items.slide_6_page_1.show();

          pages = [
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_6_page_2_1_text_1);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    let target = Scenes.items.slide_6_page_2_2_emoji_blink;
                    fadeAnime(target);
                    blinkAnime(target);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_6_page_3_1_text_1);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    let target = Scenes.items.slide_6_page_3_2_emoji_blink;
                    fadeAnime(target);
                    blinkAnime(target);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide7 = () => {
          Scenes.items.slide_7_page_1_1.show();
          nextBtnToggle();
          fadeAnime(
            Scenes.items.slide_7_page_1_2,
            () => {},
            () => {
              fadeAnime(
                Scenes.items.slide_7_page_1_3,
                () => {},
                () => {
                  nextBtnToggle();
                }
              );
            }
          );
        }),
        (slide8 = () => {
          Scenes.items.slide_8_page_1.show();
          Scenes.items.slide_4_page_1_fan
            .set(272, 193, 83, 83)
            .zIndex(zIndex++);

          pages = [
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(
                      Scenes.items.slide_8_page_2_and_rotate_the_fan,
                      () => {},
                      () => {
                        rotateAnime(Scenes.items.slide_4_page_1_fan);
                      }
                    );
                    nextBtnToggle();
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 1000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_8_page_3_1);
                    nextBtnToggle();
                  },
                })
                .add({
                  duration: 300,
                  begin() {
                    fadeAnime(Scenes.items.slide_8_page_3_2_light);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_8_page_3_3_blank);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_8_page_3_4_emoji);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_8_page_3_5_text);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide9 = () => {
          // old anime pause
          prevAnime.pause();

          Scenes.items.slide_9.show();
        }),
        (slide10 = () => {
          Scenes.items.slide_10_page_1.show();
          // Scenes.items.slide_10_page_2.show()
          // Scenes.items.slide_10_page_3.show()
          // Scenes.items.slide_10_page_4_1.show()
          // Scenes.items.slide_10_page_4_2_plus.show()
          // Scenes.items.slide_10_page_4_3_minus.show()

          pages = [
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_10_page_2);
                    nextBtnToggle();
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_10_page_3);
                    nextBtnToggle();
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_10_page_4_1);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_10_page_4_2_plus);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_10_page_4_3_minus);
                  },
                })
                .add({
                  begin() {
                    // rotate the minus plus
                    let plus = Scenes.items.slide_10_page_4_2_plus;
                    let minus = Scenes.items.slide_10_page_4_3_minus;

                    blinkAnime(plus);
                    blinkAnime(minus);
                    anime({
                      targets: plus.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: 40 },
                        { translateX: 130 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                    anime({
                      targets: minus.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: -70 },
                        { translateX: -130 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                  },
                })
                .add({
                  delay: 3000,
                  complete() {
                    fadeAnime(
                      Scenes.items.slide_10_page_4_4_arrow,
                      () => {},
                      () => {
                        fadeAnime(
                          Scenes.items.slide_10_page_4_5_text,
                          () => {},
                          () => {
                            nextBtnToggle();
                          }
                        );
                      }
                    );
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide11 = () => {
          Scenes.items.slide_11_page_1.show();
          // Scenes.items.slide_11_page_2_1.show()
          // Scenes.items.slide_11_page_2_2_blink.show()
          // Scenes.items.slide_11_page_3_1.show()
          // Scenes.items.slide_11_page_3_2_rotate_it.set(595,248,23,90)

          pages = [
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_11_page_2_1);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    blinkAnime(Scenes.items.slide_11_page_2_2_blink);
                    fadeAnime(Scenes.items.slide_11_page_2_2_blink);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_11_page_3_1);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    let rightArrow =
                      Scenes.items.slide_11_page_3_2_rotate_it.set(
                        595,
                        248,
                        23,
                        90
                      );
                    fadeAnime(
                      rightArrow,
                      () => {},
                      () => {
                        anime({
                          targets: rightArrow.item,
                          rotate: 180,
                          duration: 2000,
                          easing: "easeOutQuad",
                          complete() {
                            blinkAnime(
                              rightArrow,
                              () => {},
                              () => {
                                fadeAnime(
                                  Scenes.items.slide_11_page_3_3_text_and_arrow.zIndex(
                                    zIndex++
                                  ),
                                  () => {},
                                  () => {
                                    nextBtnToggle();
                                  }
                                );
                              }
                            );
                          },
                        });
                      }
                    );
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide12 = () => {
          Scenes.items.slide_12_page_1.show();
          // Scenes.items.slide_12_page_2_1_pwm_blink.show()
          // Scenes.items.slide_12_page_2_2.show()
          // Scenes.items.slide_12_page_2_3_text.show()

          pages = [
            () => {
              anime
                .timeline({
                  duration: 1000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_12_page_2_1_pwm_blink);
                    blinkAnime(Scenes.items.slide_12_page_2_1_pwm_blink);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_12_page_2_2);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_12_page_2_3_text);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 1000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_12_page_3_1_pwn_blink);
                    blinkAnime(Scenes.items.slide_12_page_3_1_pwn_blink);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_12_page_3_2);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_12_page_3_3_text);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_12_page_3_4_text_2);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide13 = () => {
          Scenes.items.slide_13_page_1.show();
          // Scenes.items.slide_13_page_2.show()
          // Scenes.items.slide_13_page_3_1_plus.show()
          // Scenes.items.slide_13_page_3_2_minus_rotate_both.show()
          // Scenes.items.slide_13_page_3_4.show()
          // Scenes.items.slide_13_page_3_5_text.show()

          pages = [
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_13_page_2);
                    nextBtnToggle();
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_13_page_3_1_plus);
                    fadeAnime(Scenes.items.slide_13_page_3_2_minus_rotate_both);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    anime({
                      targets: Scenes.items.slide_13_page_3_1_plus.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: 40 },
                        { translateX: 100 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                    anime({
                      targets:
                        Scenes.items.slide_13_page_3_2_minus_rotate_both.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: -40 },
                        { translateX: -100 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                  },
                })
                .add({
                  // delay: 2000,
                  begin() {
                    fadeAnime(Scenes.items.slide_13_page_3_4);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_13_page_3_5_text);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide14 = () => {
          Scenes.items.slide_14_page_1.show();
          Scenes.items.slide_14_page_1_ball.show().zIndex(zIndex++);

          // Scenes.items.slide_14_page_3_3_white_image_for_blue_line.item.style.border = "1px solid black"
          Scenes.items.slide_14_page_3_3_white_image_for_blue_line
            .set(342, 347, 29, 81)
            .hide();

          pages = [
            () => {
              anime
                .timeline({
                  duration: 1000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_14_page_2_1_blink);
                    blinkAnime(Scenes.items.slide_14_page_2_1_blink);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_14_page_2_2_text);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(
                      Scenes.items.slide_14_page_3_1_symbols.zIndex(zIndex++),
                      () => {
                        Scenes.items.slide_14_page_1_ball
                          .show()
                          .zIndex(zIndex++);
                        Scenes.items.slide_14_page_3_3_white_image_for_blue_line
                          .show()
                          .zIndex(zIndex++);
                      },
                      () => {
                        Scenes.items.slide_14_page_3_2_green_graph_and_start_ball
                          .show()
                          .zIndex(zIndex - 4)
                          .set(-75);
                      }
                    );
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    let timeFrame = 1700;
                    anime({
                      targets: Scenes.items.slide_14_page_1_ball.item,
                      keyframes: [
                        { translateY: -42, duration: 10 },
                        { translateX: 389 },
                        { translateY: 180 },
                        { translateX: 0 },
                        { translateY: 0 },
                      ],
                      duration: timeFrame,
                      easing: "easeInOutQuad",
                      loop: true,
                    });
                    anime({
                      targets:
                        Scenes.items
                          .slide_14_page_3_2_green_graph_and_start_ball.item,
                      keyframes: [
                        { left: 0, duration: timeFrame - 300 },
                        { left: -75, duration: 0 },
                      ],
                      easing: "easeInQuad",
                      loop: true,
                    });
                    anime({
                      targets:
                        Scenes.items.slide_14_page_3_3_white_image_for_blue_line
                          .item,
                      keyframes: [
                        { translateX: 81, width: 0, duration: timeFrame - 300 },
                        { width: 81, duration: 0 },
                      ],
                      easing: "easeInQuad",
                      loop: true,
                    });
                  },
                })
                .add({
                  begin() {
                    anime({
                      targets: Scenes.items.slide_13_page_3_1_plus.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: 40 },
                        { translateX: 100 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                    anime({
                      targets:
                        Scenes.items.slide_13_page_3_2_minus_rotate_both.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: -40 },
                        { translateX: -100 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                  },
                })
                .add({
                  // delay: 2000,
                  begin() {
                    fadeAnime(Scenes.items.slide_13_page_3_4);
                  },
                })
                .add({
                  begin() {
                    fadeAnime(Scenes.items.slide_13_page_3_5_text);
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
        (slide15 = () => {
          Scenes.items.slide_15_page_1.show().zIndex(zIndex++);
          Scenes.items.slide_15_page_1_ball.show().zIndex(zIndex++);
          Scenes.items.slide_15_page_1_green_graph.show();
          Scenes.items.slide_15_page_1_plus.show().zIndex(zIndex);
          Scenes.items.slide_15_page_1_minus.show().zIndex(zIndex);

          Scenes.items.slide_15_page_3_1_white
            .set(363, 347, 29, 76)
            .zIndex(zIndex)
            .hide();

          pages = [
            () => {
              anime
                .timeline({
                  duration: 1000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    fadeAnime(
                      Scenes.items.slide_15_page_2_1_blink.zIndex(zIndex)
                    );
                    blinkAnime(Scenes.items.slide_15_page_2_1_blink);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    fadeAnime(
                      Scenes.items.slide_15_page_2_2_text.zIndex(zIndex)
                    );
                  },
                  complete() {
                    nextBtnToggle();
                  },
                });
            },
            () => {
              anime
                .timeline({
                  duration: 2000,
                  easing: "linear",
                })
                .add({
                  begin() {
                    blinkAnime(Scenes.items.slide_15_page_1_plus);
                    blinkAnime(Scenes.items.slide_15_page_1_minus);
                    nextBtnToggle();
                  },
                })
                .add({
                  begin() {
                    anime({
                      targets: Scenes.items.slide_15_page_1_plus.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: 18 },
                        { translateX: 130 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                    anime({
                      targets: Scenes.items.slide_15_page_1_minus.item,
                      easing: "linear",
                      keyframes: [
                        { translateY: -18 },
                        { translateX: -130 },
                        { translateY: 0 },
                      ],
                      duration: 2000,
                    });
                  },
                })
                .add({
                  begin() {
                    fadeAnime(
                      Scenes.items.slide_15_page_3_1_arrow_and_text.zIndex(
                        zIndex
                      ),
                      () => {
                        Scenes.items.slide_15_page_3_1_white.show();
                      }
                    );
                  },
                })
                .add({
                  begin() {
                    let timeFrame = 1700;
                    anime({
                      targets: Scenes.items.slide_15_page_1_ball.item,
                      keyframes: [
                        { translateY: -42, duration: 10 },
                        { translateX: 588 },
                        { translateY: 180 },
                        { translateX: 0 },
                        { translateY: 0 },
                      ],
                      duration: timeFrame,
                      easing: "easeInOutQuad",
                      loop: true,
                    });
                    anime({
                      targets: Scenes.items.slide_15_page_1_green_graph.item,
                      keyframes: [
                        { left: 75, duration: timeFrame - 300 },
                        { left: 0, duration: 0 },
                      ],
                      easing: "easeInQuad",
                      loop: true,
                    });
                    anime({
                      targets: Scenes.items.slide_15_page_3_1_white.item,
                      keyframes: [
                        { translateX: 81, width: 0, duration: timeFrame - 300 },
                        { width: 81, duration: 0 },
                      ],
                      easing: "easeInQuad",
                      loop: true,
                    });
                    anime({
                      delay: timeFrame,
                      duration: 2000,
                      begin() {
                        fadeAnime(
                          Scenes.items.slide_15_page_3_2_graph.zIndex(zIndex)
                        );
                      },
                      complete() {
                        fadeAnime(
                          Scenes.items.slide_15_page_3_3_text.zIndex(zIndex),
                          () => {},
                          () => {
                            nextBtnToggle();
                            Scenes.items.btn_next.show();
                            Scenes.items.btn_transparent.hide();
                            // for going to next animation
                            anime({
                              duration: 40,
                              complete() {
                                setIsProcessRunning(false);
                                Dom.setBlinkArrow(true, 790, 414).play();
                                setCC("Click 'Next' to go to next step");
                              },
                            });
                          }
                        );
                      },
                    });
                  },
                });
            },
          ];

          pagesNextBtn();
        }),
      ];

      let i = 0;
      // slides[i]()
      // resetNextBtn()

      Scenes.items.concept_development.set().styles({
        zIndex: "5000",
        scale: "1.267 1.16",
        top: "-68px",
        position: "absolute",
      });

      return true;
    }),
    //! EE4 step 1
    (step1 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show();

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = "";

      Scenes.setStepHeading("Step-1", "To Plot Different Characteristics.");
      // setCC("Click on the 'ICON' to plot the performance characteristics.")

      // * remove all previous restrictions

      //! * Required Elements

      Scenes.items.part_1_select_option_full.set(0, 0, 404);
      Scenes.items.part_1_select_option_1_1.set(600, 8, 60, 270).zIndex(1);
      Scenes.items.part_1_select_option_1_2.set(600, 85, 60, 270).zIndex(1);
      Scenes.items.part_1_select_option_2.set(170, 153, 100, 416).zIndex(1);
      Scenes.items.part_1_select_option_3.set(150, 275, 100, 462).zIndex(1);

      let rightTicks = [
        Scenes.items.right_tick_1.set(20, 280).hide(),
        Scenes.items.right_tick_2.set(208, 280).hide().zIndex(2001),
        Scenes.items.right_tick_3.set(435, 280).hide(),
        Scenes.items.right_tick_4.set(630, 280).hide(),
      ];

      // ! onclicks for all options
      let options = [
        Scenes.items.part_1_select_option_1_1,
        Scenes.items.part_1_select_option_1_2,
        Scenes.items.part_1_select_option_2,
        Scenes.items.part_1_select_option_3,
      ];

      // ! Destroy Graphs
      function destroyGraphs() {
        for (let i = 0; i < 7; i++) {
          if (Scenes.items.chart[i] != null) {
            Scenes.items.chart[i].destroy();
          }
        }
      }
      // destroyGraphs()

      Scenes.forMathematicalExpressionBtn = 0;

      const opOne = () => {
        Scenes.optionsDone[0] = 1;
        Scenes.forMathematicalExpressionBtn = 1;
        Scenes.steps[0 + 3]();
      };
      const opTwo = () => {
        Scenes.optionsDone[1] = 1;
        Scenes.forMathematicalExpressionBtn = 2;
        Scenes.steps[1 + 3]();
      };
      const opThree = () => {
        Scenes.optionsDone[2] = 1;
        Scenes.forMathematicalExpressionBtn = 3;
        Scenes.steps[2 + 3]();
      };
      const opFour = () => {
        Scenes.optionsDone[3] = 1;
        Scenes.forMathematicalExpressionBtn = 4;
        Scenes.steps[3 + 3]();
      };
      options[0].item.onclick = opOne;
      options[1].item.onclick = opTwo;
      options[2].item.onclick = opThree;
      options[3].item.onclick = opFour;

      // ! if all options done then exit
      let exit = true;
      for (let i of Scenes.optionsDone) {
        if (i == 0) {
          exit = false;
          break;
        }
      }

      if (exit) {
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulator Done");
        setIsProcessRunning(false);
      }

      return true;
    }),
    // (step11 = function () {
    //   setIsProcessRunning(true);
    //   // to hide previous step
    //   Dom.hideAll();
    //   Scenes.items.projectIntro.hide();
    //   Dom.setBlinkArrow(-1);
    //   Scenes.items.btn_next.show();
    //   Scenes.items.slider_box.hide();

    //   Scenes.setStepHeading("Step-1", "Circuit Formulation");

    //   let reset = function () {
    //     Scenes.items.part1_component_voltage
    //       .set(5 + 40, -20, 150)
    //       .zIndex(3)
    //       .styles({
    //         rotate: "0deg",
    //       });
    //     Scenes.items.part1_component_inductor
    //       .set(85 + 70, -20, 120)
    //       .zIndex(3)
    //       .styles({
    //         rotate: "0deg",
    //       });
    //     Scenes.items.part1_component_capacitor
    //       .set(85 + 190 + 70, -20, 130)
    //       .zIndex(3)
    //       .styles({
    //         rotate: "0deg",
    //       });
    //     Scenes.items.part1_component_mosfet
    //       .set(250 + 160, -40, 140)
    //       .zIndex(3)
    //       .styles({
    //         rotate: "0deg",
    //       });
    //     Scenes.items.part1_component_diode
    //       .set(85 + 190 + 270 + 70, -20, 120)
    //       .zIndex(3)
    //       .styles({
    //         rotate: "0deg",
    //       });
    //     Scenes.items.part1_component_resistance
    //       .set(85 + 190 + 350 + 70, -31, 132)
    //       .zIndex(3)
    //       .styles({
    //         rotate: "0deg",
    //       });

    //     Scenes.items.box1.set(100, 230, 90).zIndex(2);
    //     Scenes.items.box2.set(185, 140, 80, 135).zIndex(2);
    //     Scenes.items.box3.set(295, 245, 95).zIndex(2);
    //     Scenes.items.box4.set(360, 140, 80, 115).zIndex(2);
    //     Scenes.items.box5.set(475, 250, 85).zIndex(2);
    //     Scenes.items.box6.set(588, 250, 95).zIndex(2);

    //     Scenes.items.symbol_vIn.set(40, -20, 60).zIndex(5);
    //     Scenes.items.symbol_L.set(208, -20, 60).zIndex(5);
    //     Scenes.items.symbol_C.set(208 + 150, -25, 60).zIndex(5);
    //     Scenes.items.symbol_S.set(208 + 150 + 50, -40, 60).zIndex(5);
    //     Scenes.items.symbol_D.set(208 + 150 + 270, -25, 55).zIndex(5);
    //     Scenes.items.symbol_R.set(208 + 150 + 350, -30, 55).zIndex(5);

    //     Scenes.items.part1_incrrct_text.set(10, 40, null, 790).hide();

    //     ee3_btn_check.classList.add("btn-deactive");

    //     resetActive = "";
    //     checkCnnctn = "";
    //     // wrongNoTimes = "";

    //     for (let i in boxAnimes) {
    //       boxAnimes[i].pause();
    //     }

    //     // Scenes.steps[2]()
    //   };

    //   let checkCnnctn = "";
    //   let wrongNoTimes = "";

    //   let check = function () {
    //     Dom.setBlinkArrowRed(-1);
    //     console.log(checkCnnctn);
    //     if (checkCnnctn == "111111") {
    //       Scenes.items.part1_crrct_text.set(10, 40, null, 790);
    //       // after complete
    //       Dom.setBlinkArrow(true, 790, 408).play();
    //       setCC("Click 'Next' to go to next step");
    //       setIsProcessRunning(false);
    //     } else {
    //       Scenes.items.part1_incrrct_text.set(10, 40, null, 790);
    //       wrongNoTimes += "1";
    //       if (wrongNoTimes == "11111") {
    //         Dom.setBlinkArrowRed(true, 882, -18, 30, 30, 90).play();
    //         ee3_btn_hint.classList.remove("btn-deactive");
    //       }
    //       console.log("wrong no. of times", wrongNoTimes);
    //     }
    //   };

    //   let boxAnimes = [];

    //   //function to blink boxes to different color
    //   function boxAnime() {
    //     var myObject = {
    //       prop1: 0,
    //       prop2: 0,
    //       prop3: 0,
    //       prop4: 0,
    //       prop5: 0,
    //       prop6: 0,
    //     };

    //     let boxBlink_1 = anime({
    //       targets: myObject,
    //       prop1: 360,
    //       easing: "linear",
    //       round: 1000,
    //       update: function () {
    //         box1.item.style.filter = `hue-rotate(${myObject.prop1}deg)`;
    //       },
    //       loop: true,
    //       autoplay: false,
    //     });
    //     let boxBlink_2 = anime({
    //       targets: myObject,
    //       prop2: 360,
    //       easing: "linear",
    //       round: 1000,
    //       update: function () {
    //         box2.item.style.filter = `hue-rotate(${myObject.prop2}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,
    //     });
    //     let boxBlink_3 = anime({
    //       targets: myObject,
    //       prop3: 360,
    //       easing: "linear",
    //       round: 1000,
    //       update: function () {
    //         box3.item.style.filter = `hue-rotate(${myObject.prop3}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,
    //     });
    //     let boxBlink_4 = anime({
    //       targets: myObject,
    //       prop4: 360,
    //       easing: "linear",
    //       round: 1000,
    //       update: function () {
    //         box4.item.style.filter = `hue-rotate(${myObject.prop4}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,
    //     });
    //     let boxBlink_5 = anime({
    //       targets: myObject,
    //       prop5: 360,
    //       easing: "linear",
    //       round: 1000,
    //       update: function () {
    //         box5.item.style.filter = `hue-rotate(${myObject.prop5}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,
    //     });
    //     let boxBlink_6 = anime({
    //       targets: myObject,
    //       prop6: 360,
    //       easing: "linear",
    //       round: 1000,
    //       update: function () {
    //         box6.item.style.filter = `hue-rotate(${myObject.prop6}deg)`;
    //       },
    //       autoplay: false,
    //       loop: true,
    //     });

    //     boxAnimes = [
    //       boxBlink_1,
    //       boxBlink_2,
    //       boxBlink_3,
    //       boxBlink_4,
    //       boxBlink_5,
    //       boxBlink_6,
    //     ];
    //   }

    //   let ee3_btn_check = Scenes.items.ee3_btn_check.set(
    //     720 - 80,
    //     -70,
    //     null,
    //     90
    //   ).item;
    //   let ee3_btn_reset = Scenes.items.ee3_btn_reset.set(
    //     720 - 80 + 100,
    //     -70,
    //     null,
    //     90
    //   ).item;
    //   let ee3_btn_hint = Scenes.items.ee3_btn_hint.set(
    //     720 - 80 + 200,
    //     -70,
    //     null,
    //     90
    //   ).item;

    //   ee3_btn_check.classList.add("btn-deactive");
    //   ee3_btn_hint.classList.add("btn-deactive");

    //   ee3_btn_check.onclick = check;
    //   ee3_btn_reset.onclick = reset;

    //   let isShow = 0;
    //   Scenes.items.part1_crrct_circuit.set(20, -20, 450).zIndex(10).hide();
    //   ee3_btn_hint.onclick = () => {
    //     Dom.setBlinkArrowRed(-1);
    //     if (!isShow) {
    //       Scenes.items.part1_crrct_circuit.show();
    //       isShow = 1;
    //     } else {
    //       Scenes.items.part1_crrct_circuit.hide();
    //       isShow = 0;
    //     }
    //   };

    //   //! Required items

    //   // Dom.setBlinkArrowRed(true,100,78,30,30,90).play()

    //   Scenes.items.part1_circuit.set(140, 180, 220);
    //   Scenes.items.box1.set(100, 230, 90).zIndex(2);
    //   Scenes.items.box2.set(185, 140, 80, 135).zIndex(2);
    //   Scenes.items.box3.set(295, 245, 95).zIndex(2);
    //   Scenes.items.box4.set(360, 140, 80, 115).zIndex(2);
    //   Scenes.items.box5.set(475, 250, 85).zIndex(2);
    //   Scenes.items.box6.set(588, 250, 95).zIndex(2);

    //   // symbols required position
    //   Scenes.items.symbol_vIn.set(40, -20, 60).zIndex(5);
    //   Scenes.items.symbol_L.set(208, -20, 60).zIndex(5);
    //   Scenes.items.symbol_C.set(208 + 150, -25, 60).zIndex(5);
    //   Scenes.items.symbol_S.set(208 + 150 + 50, -40, 60).zIndex(5);
    //   Scenes.items.symbol_D.set(208 + 150 + 270, -25, 55).zIndex(5);
    //   Scenes.items.symbol_R.set(208 + 150 + 350, -30, 55).zIndex(5);

    //   //!Correct positons
    //   Scenes.items.part1_component_voltage
    //     .set(5 + 40, -20, 150)
    //     .rotate(0)
    //     .zIndex(3);
    //   Scenes.items.part1_component_inductor
    //     .set(85 + 70, -20, 120)
    //     .rotate(0)
    //     .zIndex(3);
    //   Scenes.items.part1_component_capacitor
    //     .set(85 + 190 + 70, -20, 130)
    //     .rotate(0)
    //     .zIndex(3);
    //   Scenes.items.part1_component_mosfet
    //     .set(250 + 160, -40, 140)
    //     .rotate(0)
    //     .zIndex(3);
    //   Scenes.items.part1_component_diode
    //     .set(85 + 190 + 270 + 70, -20, 120)
    //     .rotate(0)
    //     .zIndex(3);
    //   Scenes.items.part1_component_resistance
    //     .set(85 + 190 + 350 + 70, -31, 132)
    //     .rotate(0)
    //     .zIndex(3);

    //   let compo = {
    //     box: null,
    //     item: null,
    //   };
    //   // !box clicked

    //   boxAnime();

    //   let box1 = Scenes.items.box1;
    //   box1.item.onclick = () => {
    //     boxAnimes[0].play();
    //     console.log("box1 clicked");
    //     compo.box = box1;
    //   };
    //   let box2 = Scenes.items.box2;
    //   box2.item.onclick = () => {
    //     boxAnimes[1].play();
    //     console.log("box2 clicked");
    //     compo.box = box2;
    //   };
    //   let box3 = Scenes.items.box3;
    //   box3.item.onclick = () => {
    //     boxAnimes[2].play();
    //     console.log("box3 clicked");
    //     compo.box = box3;
    //   };
    //   let box4 = Scenes.items.box4;
    //   box4.item.onclick = () => {
    //     boxAnimes[3].play();
    //     console.log("box4 clicked");
    //     compo.box = box4;
    //   };
    //   let box5 = Scenes.items.box5;
    //   box5.item.onclick = () => {
    //     boxAnimes[4].play();
    //     console.log("box5 clicked");
    //     compo.box = box5;
    //   };
    //   let box6 = Scenes.items.box6;
    //   box6.item.onclick = () => {
    //     boxAnimes[5].play();
    //     console.log("box6 clicked");
    //     compo.box = box6;
    //   };

    //   //item click
    //   let item1 = Scenes.items.part1_component_voltage;
    //   item1.item.onclick = () => {
    //     console.log("item1 clicked");
    //     compo.item = item1;
    //     toSet();
    //   };
    //   let item2 = Scenes.items.part1_component_inductor;
    //   item2.item.onclick = () => {
    //     console.log("item2 clicked");
    //     compo.item = item2;
    //     toSet();
    //   };
    //   let item3 = Scenes.items.part1_component_capacitor;
    //   item3.item.onclick = () => {
    //     console.log("item3 clicked");
    //     compo.item = item3;
    //     toSet();
    //   };
    //   let item4 = Scenes.items.part1_component_mosfet;
    //   item4.item.onclick = () => {
    //     console.log("item4 clicked");
    //     compo.item = item4;
    //     toSet();
    //   };
    //   let item5 = Scenes.items.part1_component_diode;
    //   item5.item.onclick = () => {
    //     console.log("item5 clicked");
    //     compo.item = item5;
    //     toSet();
    //   };
    //   let item6 = Scenes.items.part1_component_resistance;
    //   item6.item.onclick = () => {
    //     console.log("item6 clicked");
    //     compo.item = item6;
    //     toSet();
    //   };

    //   let resetActive = "";

    //   //! function to set the element
    //   let toSet = function () {
    //     resetActive += "1";
    //     console.log("reset active", resetActive);

    //     if (resetActive == "111111") {
    //       Dom.setBlinkArrowRed(true, 690, -18, 30, 30, 90).play();
    //       ee3_btn_check.classList.remove("btn-deactive");
    //     }

    //     let boxName = compo.box;
    //     let itemName = compo.item;

    //     function toSetItem(
    //       target,
    //       left_ = null,
    //       top_ = null,
    //       height_ = null,
    //       width_ = null
    //     ) {
    //       anime({
    //         targets: target.item,
    //         duration: 1000,
    //         easing: "easeInOutQuad",
    //         height: height_,
    //         width: width_,
    //         left: left_,
    //         top: top_,
    //       });
    //     }
    //     function toSetSymbol(target, left_ = null, top_ = null) {
    //       anime({
    //         targets: target.item,
    //         duration: 1000,
    //         easing: "easeInOutQuad",
    //         left: left_,
    //         top: top_,
    //       });
    //     }

    //     let vIn = Scenes.items.symbol_vIn;
    //     let L = Scenes.items.symbol_L;
    //     let C = Scenes.items.symbol_C;
    //     let S = Scenes.items.symbol_S;
    //     let D = Scenes.items.symbol_D;
    //     let R = Scenes.items.symbol_R;

    //     //!if item1 clicked
    //     if (itemName == item1 && boxName == box1) {
    //       box1.hide();
    //       toSetItem(item1, 118.5, 178);
    //       toSetSymbol(vIn, 77, 183);
    //       // item1.set(118.5,178,150)
    //       checkCnnctn += "1";
    //       console.log(checkCnnctn);
    //     }
    //     if (itemName == item1 && boxName == box2) {
    //       item1.styles({
    //         rotate: "90deg",
    //       });
    //       box2.hide();
    //       // item1.set(242,73,225)
    //       toSetItem(item1, 242, 110);
    //       toSetSymbol(vIn, 219, 205);
    //     }
    //     if (itemName == item1 && boxName == box3) {
    //       box3.hide();
    //       // item1.set(307, 193,150)
    //       toSetItem(item1, 307, 193, 150);
    //       toSetSymbol(vIn, 252, 256);
    //     }
    //     if (itemName == item1 && boxName == box4) {
    //       item1.styles({
    //         rotate: "90deg",
    //       });
    //       box4.hide();
    //       // item1.set(415, 109)
    //       toSetItem(item1, 415, 109);
    //       toSetSymbol(vIn, 397, 204);
    //     }
    //     if (itemName == item1 && boxName == box5) {
    //       box5.hide();
    //       // item1.set(485, 194)
    //       toSetItem(item1, 485, 194);
    //       toSetSymbol(vIn, 432, 256);
    //     }
    //     if (itemName == item1 && boxName == box6) {
    //       box6.hide();
    //       // item1.set(588, 194)
    //       toSetItem(item1, 588, 194);
    //       toSetSymbol(vIn, 535, 267);
    //     }

    //     //!if item2 clicked
    //     if (itemName == item2 && boxName == box1) {
    //       item2.styles({
    //         rotate: "90deg",
    //       });
    //       box1.hide();
    //       // item2.set(100, 212)
    //       toSetItem(item2, 100, 212);
    //       toSetSymbol(L, 61, 251);
    //     }
    //     if (itemName == item2 && boxName == box2) {
    //       box2.hide();
    //       toSetItem(item2, 171, 90);
    //       toSetSymbol(L, 226, 209);

    //       // item2.set(171, 90)
    //     }
    //     if (itemName == item2 && boxName == box3) {
    //       item2.styles({
    //         rotate: "90deg",
    //       });
    //       box3.hide();
    //       // item2.set(288, 230)
    //       toSetItem(item2, 288, 230);
    //       toSetSymbol(L, 254, 264);
    //     }
    //     if (itemName == item2 && boxName == box4) {
    //       box4.hide();
    //       toSetItem(item2, 339, 90);
    //       toSetSymbol(L, 393, 208);
    //       // item2.set(339, 90)
    //       checkCnnctn += "1";
    //       console.log(checkCnnctn);
    //     }
    //     if (itemName == item2 && boxName == box5) {
    //       item2.styles({
    //         rotate: "90deg",
    //       });
    //       box5.hide();
    //       toSetItem(item2, 467, 230);
    //       toSetSymbol(L, 438, 263);

    //       // item2.set(467, 230)
    //     }
    //     if (itemName == item2 && boxName == box6) {
    //       item2.styles({
    //         rotate: "90deg",
    //       });
    //       box6.hide();
    //       toSetItem(item2, 569, 230);
    //       toSetSymbol(L, 550, 266);

    //       // item2.set(569, 230)
    //     }

    //     //! if item3 clicked
    //     if (itemName == item3 && boxName == box1) {
    //       box1.hide();
    //       // item3.set(129, 195)
    //       toSetItem(item3, 129, 195);
    //       toSetSymbol(C, 143, 191);
    //     }
    //     if (itemName == item3 && boxName == box2) {
    //       item3.styles({
    //         rotate: "90deg",
    //       });
    //       box2.hide();
    //       // item3.set(235,133)
    //       toSetItem(item3, 235, 133);
    //       toSetSymbol(C, 280, 180);
    //     }
    //     if (itemName == item3 && boxName == box3) {
    //       box3.hide();
    //       // item3.set(318, 213)
    //       toSetItem(item3, 318, 213);
    //       toSetSymbol(C, 334, 207);
    //     }
    //     if (itemName == item3 && boxName == box4) {
    //       item3.styles({
    //         rotate: "90deg",
    //       });
    //       box4.hide();
    //       // item3.set(399, 133)
    //       toSetItem(item3, 399, 133);
    //       toSetSymbol(C, 445, 185);
    //     }
    //     if (itemName == item3 && boxName == box5) {
    //       box5.hide();
    //       // item3.set(496, 213)
    //       toSetItem(item3, 496, 213);
    //       toSetSymbol(C, 513, 211);
    //       checkCnnctn += "1";
    //       console.log(checkCnnctn);
    //     }
    //     if (itemName == item3 && boxName == box6) {
    //       box6.hide();
    //       toSetItem(item3, 599, 213);
    //       toSetSymbol(C, 613, 235);

    //       // item3.set(599, 213)
    //     }

    //     //! if item4 clicked
    //     if (itemName == item4 && boxName == box1) {
    //       item4.styles({
    //         rotate: "90deg",
    //       });
    //       box1.hide();
    //       toSetItem(item4, 55, 205);
    //       toSetSymbol(S, 148, 201);
    //       // item4.set(55, 205)
    //     }
    //     if (itemName == item4 && boxName == box2) {
    //       box2.hide();
    //       toSetItem(item4, 171, 124);
    //       toSetSymbol(S, 167, 121);

    //       // item4.set(171, 124)
    //       checkCnnctn += "1";
    //       console.log(checkCnnctn);
    //     }
    //     if (itemName == item4 && boxName == box3) {
    //       item4.styles({
    //         rotate: "90deg",
    //       });
    //       box3.hide();
    //       toSetItem(item4, 243, 221);
    //       toSetSymbol(S, 339, 214);

    //       // item4.set(243, 221)
    //     }
    //     if (itemName == item4 && boxName == box4) {
    //       box4.hide();
    //       toSetItem(item4, 346, 124);
    //       toSetSymbol(S, 346, 123);

    //       // item4.set(346, 124)
    //     }
    //     if (itemName == item4 && boxName == box5) {
    //       item4.styles({
    //         rotate: "90deg",
    //       });
    //       box5.hide();
    //       toSetItem(item4, 420, 221);
    //       toSetSymbol(S, 510, 215);

    //       // item4.set(420, 221)
    //     }
    //     if (itemName == item4 && boxName == box6) {
    //       item4.styles({
    //         rotate: "90deg",
    //       });
    //       box6.hide();
    //       toSetItem(item4, 525, 221);
    //       toSetSymbol(S, 555, 217);

    //       // item4.set(525, 221)
    //     }

    //     // ! if item5 clicked
    //     if (itemName == item5 && boxName == box1) {
    //       box1.hide();
    //       toSetItem(item5, 134, 214);
    //       toSetSymbol(D, 143, 214);
    //       // item5.set(134, 214)
    //     }
    //     if (itemName == item5 && boxName == box2) {
    //       item5.styles({
    //         rotate: "90deg",
    //       });
    //       box2.hide();
    //       toSetItem(item5, 222, 144);
    //       toSetSymbol(D, 261, 184);

    //       // item5.set(222, 144)
    //     }
    //     if (itemName == item5 && boxName == box3) {
    //       box3.hide();
    //       // item5.set(322, 230)
    //       toSetItem(item5, 322, 230);
    //       toSetSymbol(D, 330, 232);
    //       checkCnnctn += "1";
    //       console.log(checkCnnctn);
    //     }
    //     if (itemName == item5 && boxName == box4) {
    //       item5.styles({
    //         rotate: "90deg",
    //       });
    //       box4.hide();
    //       // item5.set(387, 144)
    //       toSetItem(item5, 387, 144);
    //       toSetSymbol(D, 432, 182);
    //     }
    //     if (itemName == item5 && boxName == box5) {
    //       box5.hide();
    //       toSetItem(item5, 500, 230);
    //       toSetSymbol(D, 509, 229);

    //       // item5.set(500, 230)
    //     }
    //     if (itemName == item5 && boxName == box6) {
    //       box6.hide();
    //       toSetItem(item5, 604, 230);
    //       toSetSymbol(D, 618, 237);

    //       // item5.set(604, 230)
    //     }

    //     //! if item6 clicked
    //     if (itemName == item6 && boxName == box1) {
    //       box1.hide();
    //       toSetItem(item6, 132, 198);
    //       toSetSymbol(R, 139, 195);
    //       // item6.set(132, 198)
    //     }
    //     if (itemName == item6 && boxName == box2) {
    //       item6.styles({
    //         rotate: "90deg",
    //       });
    //       box2.hide();
    //       toSetItem(item6, 239, 129);
    //       toSetSymbol(R, 288, 178);
    //       // item6.set(239, 129)
    //     }
    //     if (itemName == item6 && boxName == box3) {
    //       box3.hide();
    //       // item6.set(321, 214)
    //       toSetItem(item6, 321, 214);
    //       toSetSymbol(R, 330, 212);
    //     }
    //     if (itemName == item6 && boxName == box4) {
    //       item6.styles({
    //         rotate: "90deg",
    //       });
    //       box4.hide();
    //       toSetItem(item6, 402, 129);
    //       toSetSymbol(R, 451, 181);
    //       // item6.set(402, 129)
    //     }
    //     if (itemName == item6 && boxName == box5) {
    //       box5.hide();
    //       toSetItem(item6, 498, 214);
    //       toSetSymbol(R, 509, 213);

    //       // item6.set(498, 214)
    //     }
    //     if (itemName == item6 && boxName == box6) {
    //       box6.hide();
    //       toSetItem(item6, 602, 214);
    //       toSetSymbol(R, 618, 237);
    //       // item6.set(601, 214)
    //       checkCnnctn += "1";
    //     }

    //     compo.box = null;
    //     compo.item = null;
    //   };
    //   // ------ end

    //   return true;
    // }),
    (step2 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading("", "Output Characterisitics Using Meters.");

      Scenes.items.btn_next.show();
      function stepTutorial2() {
        setCC("Select V<sub>in</sub>");
        Dom.setBlinkArrowRed(true, 110, 89, 30, 30, 90).play();

        sliders.selectOp2.oninput = () => {
          Dom.setBlinkArrowRed(true, 270, 89, 30, 30, 90).play();
          setCC("Select R");

          sliders.selectOp3.oninput = () => {
            Dom.setBlinkArrowRed(true, 90, 144, 30, 30, 90).play();
            setCC("Select D");

            sliders.slider.onclick = () => {
              Dom.setBlinkArrowRed(true, 400, 8, 30, 30, 90).play();
              setCC("Press Record");
            };
          };
        };
      }
      // stepTutorial2()
      //! Required Items

      Scenes.items.part_1_slide_1.set(0, -30, 440, 950);
      Scenes.items.btn_instructions.set(750 + 40, 200, 50).zIndex(1);
      Scenes.items.btn_connections.set(750 + 40, 200 + 55, 50).zIndex(1);
      Scenes.items.btn_connectons_completed
        .set(750 + 40, 200 + 110, 50, 147)
        .zIndex(1);
      Scenes.items.btn_start_experiment
        .set(750 + 40, 200 + 165, 50, 147)
        .zIndex(1);
      Scenes.items.btn_reset.set(660, 200 + 165, 40).zIndex(1);


      // Scenes.items.part_1_table_1.set(520,-60)
      // Scenes.items.method_1_cable_red.set(55,170, 230).zIndex(1)
      // Scenes.items.method_1_cable_blue.set(352,346, 48).zIndex(1)
      // Scenes.items.method_1_cable_green.set(460,95, 300).zIndex(1)
      // Scenes.items.method_1_cable_black_top.set(0,-20, 230).zIndex(2)
      // Scenes.items.method_1_cable_yellow.set(75,350,50).zIndex(2)
      // Scenes.items.method_1_cable_black_bottom.set(30,300, 100).zIndex(2)
      // Scenes.items.method_1_cable_pink.set(270,150, 230).zIndex(2)
      // Scenes.items.method_1_cable_purple.set(350,150, 230).zIndex(2)

      // Scenes.items.part_1_incomplete_connection.set(620, 310, 50, 160)



      Dom.setBlinkArrowRed(true, 755, 210, 30, 30, 180).play();

      let cableJoin = 0;

      let options = [
        Scenes.items.btn_instructions,
        Scenes.items.btn_connections,
        Scenes.items.btn_connectons_completed,
        Scenes.items.btn_start_experiment,
        Scenes.items.btn_reset,
      ];

      //! onclick for INSTRUCTIONS
      const opOne = () => {
        Scenes.items.part_1_instructions_box.set(220, 60, 250).zIndex(2);
        Dom.setBlinkArrowRed(true, 755, 265, 30, 30, 180).play();
      };

      //! onclick for CONNECTIONS
      const opTwo = () => {
        Scenes.items.part_1_instructions_box.hide()
        Scenes.items.part_1_table_1.set(520,-60)

        let cols = [
          Scenes.items.part_1_table_1_col_1,
          Scenes.items.part_1_table_1_col_2,
          Scenes.items.part_1_table_1_col_3,
          Scenes.items.part_1_table_1_col_4,
          Scenes.items.part_1_table_1_col_5,
          Scenes.items.part_1_table_1_col_6,
          Scenes.items.part_1_table_1_col_7,
          Scenes.items.part_1_table_1_col_8,
        ]

        const opOne = () => {
          Scenes.items.method_1_cable_red.set(55,170, 230).zIndex(1)
          cableJoin++;
        }

        const opTwo = () => {
          Scenes.items.method_1_cable_blue.set(352,346, 48).zIndex(1)
          cableJoin++;
          
        }
        const opThree = () => {
          Scenes.items.method_1_cable_green.set(460,95, 300).zIndex(1)
          cableJoin++;

        }
        const opFour = () => {
          Scenes.items.method_1_cable_black_top.set(0,-20, 230).zIndex(2)
          cableJoin++;

        }
        const opFive = () => {
          Scenes.items.method_1_cable_yellow.set(75,350,50).zIndex(2)
          cableJoin++;

        }
        const opSix = () => {
          Scenes.items.method_1_cable_black_bottom.set(30,300, 100).zIndex(2)
          cableJoin++;

        }
        const opSeven = () => {
          Scenes.items.method_1_cable_pink.set(270,150, 230).zIndex(2)
          cableJoin++;

        }
        const opEight = () => {
          Scenes.items.method_1_cable_purple.set(350,150, 230).zIndex(2)
          cableJoin++;
          console.log(cableJoin);
        }

        
        cols[0].item.onclick = opOne
        cols[1].item.onclick = opTwo
        cols[2].item.onclick = opThree
        cols[3].item.onclick = opFour
        cols[4].item.onclick = opFive
        cols[5].item.onclick = opSix
        cols[6].item.onclick = opSeven
        cols[7].item.onclick = opEight



        Dom.setBlinkArrowRed(true, 755, 320, 30, 30, 180).play();
      };

      //! onclick for CONNECTIONS COMPLETED
      const opThree = () => {
        if(cableJoin < 8){
           Scenes.items.part_1_incomplete_connection.set(620, 310, 50, 160)
        }

        Dom.setBlinkArrowRed(true, 755, 375, 30, 30, 180).play();
      };

           let cables = [
          Scenes.items.method_1_cable_black_bottom,
          Scenes.items.method_1_cable_black_top,
          Scenes.items.method_1_cable_blue,
          Scenes.items.method_1_cable_green,
          Scenes.items.method_1_cable_pink,
          Scenes.items.method_1_cable_purple,
          Scenes.items.method_1_cable_red,
          Scenes.items.method_1_cable_yellow,
        ]


      //! onclick for START EXPERIMENT
      const opFour = () => {
        //* Remove all previous images

        for(let cable of cables){
          cable.hide();
        }

        Scenes.items.part_1_slide_1.hide();
        Scenes.items.btn_instructions.hide();
        Scenes.items.btn_connections.hide();
        Scenes.items.btn_connectons_completed.hide();
        Scenes.items.btn_start_experiment.hide();
        Scenes.items.btn_reset.hide();
        Scenes.items.part_1_table_1.hide();

        //*set new images
        Scenes.items.part_1_slide_2.set(0, -20, 610, 500);

        Scenes.items.btn_plot.set(505, 180, 50).zIndex(1);
        Scenes.items.btn_procedure.set(505, 200 + 120, 40, 150).zIndex(1);
        Scenes.items.btn_nomenclature.set(505, 200 + 165, 40, 180).zIndex(1);
        Scenes.items.part3_table_two.set(505, -70, null, 410);


        // Dom.setBlinkArrowRed(true, 755, 210, 30, 30, 180).play();
        Dom.setBlinkArrowRed(-1)
      };

      //! onclick for RESET
      const opFive = () => {
        
        // let cables = [
        //   Scenes.items.method_1_cable_black_bottom,
        //   Scenes.items.method_1_cable_black_top,
        //   Scenes.items.method_1_cable_blue,
        //   Scenes.items.method_1_cable_green,
        //   Scenes.items.method_1_cable_pink,
        //   Scenes.items.method_1_cable_purple,
        //   Scenes.items.method_1_cable_red,
        //   Scenes.items.method_1_cable_yellow,
        // ]

        for(let cable of cables){
          cable.hide();
        }

        cableJoin = 0;
        
      };

      options[0].item.onclick = opOne;
      options[1].item.onclick = opTwo;
      options[2].item.onclick = opThree;
      options[3].item.onclick = opFour;
      options[4].item.onclick = opFive;

      return true;
    }),
    (step3 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show();

      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = "";

      Scenes.setStepHeading(
        "",
        "Output Characteristics Using Probes and Oscilloscope"
      );
      setCC("Click on the 'ICON' to plot the performance characteristics.");

      // * Required Elements
      Scenes.items.part_1_slide_3.set(10, -25, 450, 940);
      Scenes.items.btn_instructions.set(760 + 40, -4+10+10, 45, 148).zIndex(1);
      Scenes.items.btn_connections.set(760 + 40, 1 + 53+10, 45, 148).zIndex(1);
      Scenes.items.btn_connectons_completed.set(760 + 40, 103+10, 45, 147).zIndex(1);
      Scenes.items.btn_start_experiment.set(760 + 40,  152+10, 45, 147).zIndex(1);
      Scenes.items.btn_reset.set(660, 200 + 165, 40).zIndex(1);
      Scenes.items.btn_reset.set(710,15, 40, 80).zIndex(1);

      Dom.setBlinkArrowRed(true, 755, 20, 30, 30, 180).play();


      let options = [
        Scenes.items.btn_instructions,
        Scenes.items.btn_connections,
        Scenes.items.btn_connectons_completed,
        Scenes.items.btn_start_experiment,
        Scenes.items.btn_reset,
      ];

      const opOne = () => {
        
        Scenes.items.part_1_procedure_box_2.set(220, 60, 250)
        Dom.setBlinkArrowRed(true, 755, 65, 30, 30, 180).play();

      };
      const opTwo = () => {

        Scenes.items.part_1_procedure_box_2.hide()
        Scenes.items.part_1_table_2.set(520,-60)
        Dom.setBlinkArrowRed(true, 755, 120, 30, 30, 180).play();

      };
      const opThree = () => {
    
        Dom.setBlinkArrowRed(true, 755, 170, 30, 30, 180).play();
        Scenes.items.part_1_slide_4.set(2,-20, 445 , 960)        
        Scenes.items.btn_procedure.set(505, 200 + 120, 40, 130).zIndex(1);
        Scenes.items.btn_nomenclature.set(505, 200 + 165, 40, 160).zIndex(1);


      };
      const opFour = () => {
        //* Remove all previous images
        Scenes.items.part_1_slide_1.hide();
        Scenes.items.btn_instructions.hide();
        Scenes.items.btn_connections.hide();
        Scenes.items.btn_connectons_completed.hide();
        Scenes.items.btn_start_experiment.hide();
        Scenes.items.btn_reset.hide();

        //*set new images
        Scenes.items.part_1_slide_2.set(0, -20, 610, 500);

        Scenes.items.btn_plot.set(505, 180, 50).zIndex(1);
        Scenes.items.btn_procedure.set(505, 200 + 120, 40, 150).zIndex(1);
        Scenes.items.btn_nomenclature.set(505, 200 + 165, 40, 180).zIndex(1);
        Scenes.items.part3_table_two.set(505, -70, null, 410);
        // Dom.setBlinkArrowRed(true, 755, 210, 30, 30, 180).play();
      };
      const opFive = () => {};

      options[0].item.onclick = opOne;
      options[1].item.onclick = opTwo;
      options[2].item.onclick = opThree;
      options[3].item.onclick = opFour;
      options[4].item.onclick = opFive;
      // ! if all options done then exit
      let exit = true;
      for (let i of Scenes.optionsDone) {
        if (i == 0) {
          exit = false;
          break;
        }
      }

      if (exit) {
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulator Done");
        setIsProcessRunning(false);
      }

      return true;
    }),
    (step4 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading("Step-2", "Transfer Characteristics.");
      Scenes.items.btn_next.show();
      // ! Step Connection

      // required elements 
      let btns = [
        Scenes.items.btn_instructions.set(750 + 40, 190, 50).zIndex(10),
        Scenes.items.btn_connections.set(750 + 40, 190 + 55, 50).zIndex(10),
        Scenes.items.btn_connectons_completed
          .set(750 + 40, 190 + 110, 50, 147)
          .zIndex(10),
        Scenes.items.btn_start_experiment
          .set(750 + 40, 190 + 165, 50, 147)
          .zIndex(10),
        Scenes.items.btn_reset.set(660, 190 + 165, 40).zIndex(10)
      ]

      // required images
      let images = [
        Scenes.items.part_2_connections_components.set(0,0).zIndex(1),
        Scenes.items.part_2_conncection_supply_1_red_button.set(150,118,20,23).zIndex(10),
        Scenes.items.part_2_conncection_supply_2_red_button.set(155,311,22,23).zIndex(10),
        Scenes.items.part_2_connections_box,
      ]

      let cables = [
        Scenes.items.part_2_conncection_cable_p1.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_s.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_a2.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_r2.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_p2.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_n2.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_v1.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_v2.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_vg1.set(0,0).zIndex(5).hide(),
        Scenes.items.part_2_conncection_cable_vg2.set(0,0).zIndex(5).hide(),
      ]

      let cables_color = [
        "#e40000",
        "#4f699a",
        "#008039",
        "#0d0d0d",
        "#f9c101",
        "#7f3a0b",
        "#b6355d",
        "#851b85",
        "#073007",
        "#7c5565",
      ]
      function hideConnectionStepImgs(){
        let allImages = [
          ...btns,...images,...cables
        ]
        allImages.forEach(ele=>{
          ele.hide()
        })
        Dom.setBlinkArrowRed(-1)
      }
      //! Connection Part
      function partConnections(){
         // Connection Logic
        Scenes.items.part_2_connections_box.set(435,-40).hide()

        //! connection box onclick
        Scenes.items.btn_connections.item.onclick = ()=>{
          Scenes.items.part_2_connections_box.show("flex")
          // ! connection table arrow move
          Dom.setBlinkArrowRed(true,500,35,35,null,90).play()
          setCC("")
        }
        let box_buttons = document.querySelectorAll(".part_2_connections_box button")

        //! connection box onclick
        let btnClickedCount = 0
        let connectionBtnArrow = 500
        let arrowLeftGap = 43
        box_buttons.forEach((ele,i)=>{
          ele.onclick = ()=>{
            // increasing count of complete connection
            if(ele.style.color!="white"){
              btnClickedCount++
              //! move arrow 
              connectionBtnArrow += arrowLeftGap
              Dom.setBlinkArrowRed(true,connectionBtnArrow,35,35,null,90).play()
              
              if(btnClickedCount==10){
                Dom.setBlinkArrowRed(true,745,305,35,null,180).play()
                setCC("Click on Connections Completed")

                Scenes.items.btn_connections.item.onclick = ()=>{}
              }
            }
            
            cables[i].show()
            ele.style.backgroundColor = cables_color[i]
            ele.style.color = "white"
            ele.style.textShadow = "1px 1px black"
          }
        })

        Dom.setBlinkArrowRed(true,745,250,35,null,180).play()
        setCC("Click on Connections")

        //! Onclick for check connections
        Scenes.items.btn_connectons_completed.item.onclick = ()=>{
          
          if(btnClickedCount==10){
            
            //! First red button click 
            Scenes.items.part_1_slide_3_compo_1_text.set(178,144,50).zIndex(10)
            Dom.setBlinkArrowRed(true,186,113).play()
            setCC("Switch on Main Supply")
            Scenes.items.part_2_conncection_supply_1_red_button.item.onclick = ()=>{
              
              Scenes.items.part_2_conncection_supply_1_red_button.hide()
              Scenes.items.part_1_slide_3_compo_1_text.hide()
              //! Second red button click
              
              Scenes.items.part_1_slide_3_compo_2_text.set(178,338,56).zIndex(10)
              Dom.setBlinkArrowRed(true,186,306).play()
              setCC("Switch on Gate Supply")

              Scenes.items.part_2_conncection_supply_2_red_button.item.onclick = ()=>{
                Scenes.items.part_2_conncection_supply_2_red_button.hide()
                Scenes.items.part_1_slide_3_compo_2_text.hide()

                Dom.setBlinkArrowRed(true,745,360,35,null,180).play()
                setCC("Click on Start Experiment")
              }
            }
            
          }
          else{
            Scenes.items.part_1_incomplete_connection.set(570,300,50).zIndex(10)
            anime({
              targets: Scenes.items.part_1_incomplete_connection.item,
              delay: 2000,
              complete(){
                Scenes.items.part_1_incomplete_connection.hide()
              }
            })
          }
        }
      }
      partConnections()

      //! Graph Part
      function partCalculation(){
        
      }

      //! onclick start btn
      Scenes.items.btn_start_experiment.item.onclick = ()=>{
        // * Hide preivous
        hideConnectionStepImgs()
        // * calculation part
        partCalculation()
      }

      return true
    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll();
      Scenes.setStepHeading("Step-3", "Switching Characteristics.");
      // setCC("Record 7 reading for 3 different load resistances.")
      // ! show the slider
      Scenes.items.slider_box.set(25, 15).scale(0.95);
      Scenes.items.btn_next.show();

      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_3.set(-30, 155)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.btn_record.set(240, -60);
      Scenes.items.btn_delete.set(340, -60);
      Scenes.items.btn_reset.set(440, -60);
      // Scenes.items.part3_table_three.set(20)
      Scenes.items.part3_table_two.set(-43, 160, null).scale(0.9);

      let table = Scenes.items.part3_table_two.item;
      let tableColumnMax = table.tBodies[0].rows[0].cells.length;
      let tableRowMax = table.tBodies[0].rows.length;

      let valuesToMatch = [];
      // * index to handle records
      let recordBtnClickIdx =
        table.tBodies[0].rows[6].cells[4].innerHTML == "" ? 0 : 7;

      // generate option
      sliders.generateOptionsFor(1);

      // ! graph
      Scenes.items.graph_box_2.set();
      Scenes.items.graph2.set(null, null, 220, 355);
      let ctx = Scenes.items.graph2.item;

      // ! Label for graph
      let xLabel = Scenes.items.chart.label2.x;
      let yLabel = Scenes.items.chart.label2.y;
      let dataLabel1 = "Data";
      let dataLabel2 = "Data";

      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 1;
      if (Scenes.items.chart[graphIdx] != null) {
        Scenes.items.xLabel.set().setContent(xLabel);
        Scenes.items.yLabel.set().setContent(yLabel);
      }

      // ! To Plot graph
      function plotGraph(
        ctx,
        graphIdx,
        data,
        dataLabel,
        xLabel = null,
        yLabel = null,
        beginAtZero = false
      ) {
        // for label
        Scenes.items.yLabel.set(487, 33).setContent(yLabel).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px",
          rotate: "-90deg",
        });
        Scenes.items.xLabel.set(720, 140).setContent(xLabel).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content",
        });

        // ! Destroy old graph
        let graphRef = Scenes.items.chart[graphIdx];
        if (graphRef != null) {
          graphRef.destroy();
        }

        graphRef = new Chart(ctx, {
          type: "scatter",
          plugins: [
            {
              // afterDraw: chart => {
              //   var ctx = chart.chart.ctx;
              //   ctx.save();
              //   ctx.textAlign = 'center';
              //   ctx.font = '18px Arial';
              //   ctx.fillStyle = 'black';
              //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              //   ctx.textAlign = 'left';
              //   ctx.font = '10px Arial';
              //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              //   ctx.restore();
              // },
            },
          ],
          data: {
            datasets: [
              {
                label: dataLabel,
                fill: false,
                borderColor: "red",
                backgroundColor: "red",
                data: data,
                display: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: "black",
                    fontSize: 17,
                  },
                  ticks: {
                    beginAtZero: beginAtZero,
                    fontColor: "black",
                    fontSize: 14,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: "black",
                    fontSize: 17,
                  },
                  ticks: {
                    beginAtZero: beginAtZero,
                    fontColor: "black",
                    fontSize: 14,
                  },
                },
              ],
            },
          },
        });

        Scenes.items.chart[graphIdx] = graphRef;
      }

      // for adding new datasets to graph
      const graph = {
        addDataset(chart, label, bgColor, data) {
          chart.data.datasets.push({
            label: label,
            fill: false,
            borderColor: bgColor,
            backgroundColor: bgColor,
            data: data,
          });
          chart.update();
        },
        addData(chart, index, data) {
          console.log(data);
          if (data.length > 0) {
            chart.data.datasets[index].data = data;
          } else {
            chart.data.datasets[index].data.push(data);
          }
          chart.update();
        },
      };

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2() {
        Dom.setBlinkArrowRed(true, 100, 78, 30, 30, 90).play();
        setCC("Select Characteristics");

        sliders.selectOp1.oninput = () => {
          Dom.setBlinkArrowRed(true, 260, 78, 30, 30, 90).play();
          setCC("Select V<sub>in</sub>");

          // * for highlighting table
          function addClassToTable(className) {
            let cls = ["v0-bg", "m-bg", "iIn-bg"];
            for (let i of cls) Scenes.items.part3_table_two.removeClass(i);

            Scenes.items.part3_table_two.addClass(className);
          }
          switch (sliders.selectOp1.value) {
            case "D-vs-M":
              addClassToTable("m-bg");
              break;
            case "D-vs-I":
              addClassToTable("iIn-bg");
              break;
            case "D-vs-V":
              addClassToTable("v0-bg");
              break;
          }

          sliders.selectOp2.oninput = () => {
            Dom.setBlinkArrowRed(true, 430, 78, 30, 30, 90).play();
            setCC("Select R");

            sliders.selectOp3.oninput = () => {
              Dom.setBlinkArrowRed(true, 100, 138, 30, 30, 90).play();
              setCC("Select D");

              sliders.slider.onclick = () => {
                Dom.setBlinkArrowRed(true, 280, -10, 30, 30, 90).play();
                setCC("Press Record");
              };
            };
          };
        };
      }
      if (recordBtnClickIdx == 0) {
        stepTutorial2();
      }

      function setDataToGraph() {
        let characteristicsValue = Scenes.items.slider_C.item.value;

        let graphDataActual = [];
        let graphDataIdeal = [];
        var rows = table.tBodies[0].rows;
        let n = 8,
          xLabel = "Duty Ratio (D)",
          yLabel = "";
        for (let i = 0; i < n; i++) {
          let x = rows[i].cells[3].innerHTML,
            yActual = null,
            yIdeal = null;
          switch (characteristicsValue) {
            case "D-vs-M":
              yActual = rows[i].cells[6].innerHTML;
              yIdeal = rows[i].cells[7].innerHTML;
              yLabel = "M (D)";
              dataLabel1 = "M(D) non-ideal";
              dataLabel2 = "M(D) ideal";
              setCC(
                "Voltage gain depends on the load resistance and  non-ideal voltage drops of components and hence it is drooping as compared to ideal case."
              );
              break;
            case "D-vs-I":
              yActual = rows[i].cells[9].innerHTML;
              yIdeal = rows[i].cells[10].innerHTML;
              yLabel = "I<sub>0</sub> (A)";
              dataLabel1 = "I₀ (A) non-ideal";
              dataLabel2 = "I₀ (A) ideal";
              setCC(
                "Load current is equal to load voltage by load resistance and it depends on the non-ideal voltage drops of components and hence it is drooping as compared to ideal case."
              );
              break;
            case "D-vs-V":
              yActual = rows[i].cells[4].innerHTML;
              yIdeal = rows[i].cells[5].innerHTML;
              yLabel = "V<sub>0</sub> (V)";
              dataLabel1 = "V₀ (V) non-ideal";
              dataLabel2 = "V₀ (V) ideal";
              setCC(
                "Voltage depends on the load resistance and  non-ideal voltage drops of components and hence it is drooping as compared to ideal case."
              );
              break;
          }
          graphDataActual.push({
            x: x,
            y: yActual,
          });
          graphDataIdeal.push({
            x: x,
            y: yIdeal,
          });
        }

        Scenes.items.chart.label2.x = xLabel;
        Scenes.items.chart.label2.y = yLabel;

        plotGraph(
          ctx,
          graphIdx,
          graphDataActual,
          dataLabel1,
          xLabel,
          yLabel,
          true
        );
        Scenes.items.graph2.set(null, null, 220, 355);
        graph.addDataset(
          Scenes.items.chart[graphIdx],
          dataLabel2,
          "blue",
          graphDataIdeal
        );
      }
      // ! ------------> If data already present plot the graph
      if (table.tBodies[0].rows[6].cells[2].innerHTML !== "") {
        setIsProcessRunning(false);
        Scenes.currentStep = 4;

        // ! change the table column index who's changing
        let changeableColumnIndx = 3;

        recordBtnClickIdx = 8;
        let rows = table.tBodies[0].rows;

        // * to get old values from table for matching
        for (let i = 0; i < tableColumnMax; i++) {
          let val = rows[i].cells[changeableColumnIndx].innerHTML;
          valuesToMatch.push(Number(val));
        }
      } else {
        // ! Please note this when plot the graph then show the graph ...
        plotGraph(ctx, graphIdx, [{}], dataLabel1, xLabel, yLabel, true);
        Scenes.items.graph2.set(null, null, 220, 355);
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )

      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick = function () {
        if (recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax) {
          return;
        }
        let row = table.tBodies[0].rows;

        for (let i = 1; i < tableColumnMax; i++) {
          row[recordBtnClickIdx - 1].cells[i].innerHTML = "";
        }
        recordBtnClickIdx = recordBtnClickIdx - 1;
        if (recordBtnClickIdx == 0) {
          sliders.enableAll();
          stepTutorial2();
        }
        valuesToMatch.pop();
      };

      //! onclick for reset
      Scenes.items.btn_reset.item.onclick = function () {
        var rows = table.tBodies[0].rows;

        for (let i = 0; i < tableRowMax; i++) {
          for (let j = 1; j < tableColumnMax; j++) {
            rows[i].cells[j].innerHTML = "";
          }
        }

        for (let i = 0; i < tableRowMax; i++) {
          rows[i].cells[0].innerHTML = i + 1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[6]();
      };

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function () {
        // taking values from all sliders
        let vInValue = Number(Scenes.items.slider_vIn.item.value);
        let dutyRatioValue = Number(Scenes.items.slider_D.item.value);
        let resistanceValue = Number(Scenes.items.slider_R.item.value);

        // * if all values not selected
        if (vInValue == "" || dutyRatioValue == "" || resistanceValue == "") {
          setCC("Select all values first.");
          return;
        }

        updateValues(vInValue, dutyRatioValue, resistanceValue);

        // ! for arrow system
        if (recordBtnClickIdx < tableRowMax - 1) {
          Dom.setBlinkArrowRed(true, 100, 138, 30, 30, 90).play();
          setCC("Select D");
        } else {
          Dom.setBlinkArrowRed(-1);
        }

        // ! Can't select same values
        if (
          recordBtnClickIdx < 8 &&
          valuesToMatch.indexOf(dutyRatioValue) != -1
        ) {
          setCC("Please select different value.");
          return;
        } else {
          valuesToMatch.push(dutyRatioValue);
        }

        // ! sort the data
        if (recordBtnClickIdx >= 8) {
          function sortTable() {
            var rows = table.tBodies[0].rows;

            let n = 8;
            for (let i = 0; i < n; i++) {
              for (let j = 0; j < n - i - 1; j++) {
                let val1 = Number(rows[j].cells[8].innerHTML);
                let val2 = Number(rows[j + 1].cells[8].innerHTML);
                if (val1 > val2) {
                  let temp = rows[j].innerHTML;
                  rows[j].innerHTML = rows[j + 1].innerHTML;
                  rows[j + 1].innerHTML = temp;
                }
              }
            }
            for (let i = 0; i < n; i++) {
              rows[i].cells[0].innerHTML = i + 1;
            }
          }
          sortTable();

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph();

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false);
          Scenes.currentStep = 4;
        }

        // ! deactivate the sliders after first value  done
        if (recordBtnClickIdx == 0) {
          sliders.disable(0, 1, 2);
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++];
        tableRow.cells[1].innerHTML = vInValue;
        tableRow.cells[2].innerHTML = resistanceValue;
        tableRow.cells[3].innerHTML = dutyRatioValue;
        tableRow.cells[4].innerHTML = Number(
          Formulas.nonIdeal.v0(values)
        ).toFixed(2);
        tableRow.cells[5].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(
          2
        );
        tableRow.cells[6].innerHTML = Number(
          Formulas.nonIdeal.M(values)
        ).toFixed(2);
        tableRow.cells[7].innerHTML = Number(Formulas.ideal.M(values)).toFixed(
          2
        );
        tableRow.cells[8].innerHTML = Number(
          Formulas.nonIdeal.i0(values)
        ).toFixed(2);
        tableRow.cells[9].innerHTML = Number(Formulas.ideal.i0(values)).toFixed(
          2
        );
        tableRow.cells[10].innerHTML = Number(
          Formulas.efficiencyPlot.p0(values)
        ).toFixed(2);
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)
        // tableRow.cells[11].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false);
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if (recordBtnClickIdx == 8) {
          setCC("Press Record");
          Dom.setBlinkArrowRed(true, 280, -10, 30, 30, 90).play();
        }
      };

      return true;
    }),
    (step6 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading("", "Efficiency Plot.");
      // setCC("Record 7 reading for different Load Resistances (R0)")
      // ! show the slider
      Scenes.items.slider_box.set(25, 15).scale(0.95);
      Scenes.items.btn_next.show();

      //! Required Items
      Scenes.items.btn_record.set(240, -60);
      Scenes.items.btn_delete.set(340, -60);
      Scenes.items.btn_reset.set(440, -60);
      let table = Scenes.items.part3_table_three
        .set(-30, 160, null)
        .scale(0.9).item;
      let tableColumnMax = table.tBodies[0].rows[0].cells.length;
      let tableRowMax = table.tBodies[0].rows.length;

      let valuesToMatch = [];
      // * index to handle records
      let recordBtnClickIdx =
        table.tBodies[0].rows[6].cells[4].innerHTML == "" ? 0 : 7;

      // generate option
      sliders.generateOptionsFor(2);

      // ! graph
      Scenes.items.graph_box_3.set();
      Scenes.items.graph3.set(null, null, 220, 355);
      let ctx = Scenes.items.graph3.item;

      // ! Label for graph
      let xLabel = Scenes.items.chart.label3.x;
      let yLabel = Scenes.items.chart.label3.y;
      let dataLabel = "Data";

      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 2;
      if (Scenes.items.chart[graphIdx] != null) {
        Scenes.items.xLabel.set().setContent(xLabel);
        Scenes.items.yLabel.set().setContent(yLabel);
      }

      // ! To Plot graph
      function plotGraph(
        ctx,
        graphIdx,
        data,
        dataLabel,
        xLabel = null,
        yLabel = null,
        beginAtZero = false
      ) {
        // for label
        Scenes.items.yLabel.set(487, 33).setContent(yLabel).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px",
          rotate: "-90deg",
        });
        Scenes.items.xLabel.set(720, 140).setContent(xLabel).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content",
        });

        // ! Destroy old graph
        let graphRef = Scenes.items.chart[graphIdx];
        if (graphRef != null) {
          graphRef.destroy();
        }

        graphRef = new Chart(ctx, {
          type: "scatter",
          plugins: [
            {
              // afterDraw: chart => {
              //   var ctx = chart.chart.ctx;
              //   ctx.save();
              //   ctx.textAlign = 'center';
              //   ctx.font = '18px Arial';
              //   ctx.fillStyle = 'black';
              //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              //   ctx.textAlign = 'left';
              //   ctx.font = '10px Arial';
              //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              //   ctx.restore();
              // },
            },
          ],
          data: {
            datasets: [
              {
                label: dataLabel,
                fill: false,
                borderColor: "red",
                backgroundColor: "red",
                data: data,
                display: false,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: "black",
                    fontSize: 17,
                  },
                  ticks: {
                    beginAtZero: beginAtZero,
                    fontColor: "black",
                    fontSize: 14,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: "black",
                    fontSize: 17,
                  },
                  ticks: {
                    beginAtZero: beginAtZero,
                    fontColor: "black",
                    fontSize: 14,
                  },
                },
              ],
            },
          },
        });

        Scenes.items.chart[graphIdx] = graphRef;
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2() {
        Dom.setBlinkArrowRed(true, 100, 78, 30, 30, 90).play();
        setCC("Select Characteristics");

        sliders.selectOp1.oninput = () => {
          Dom.setBlinkArrowRed(true, 260, 78, 30, 30, 90).play();
          setCC("Select V<sub>in</sub>");

          sliders.selectOp2.oninput = () => {
            Dom.setBlinkArrowRed(true, 430, 78, 30, 30, 90).play();
            setCC("Select R");

            sliders.selectOp3.oninput = () => {
              Dom.setBlinkArrowRed(true, 100, 138, 30, 30, 90).play();
              setCC("Select D");

              sliders.slider.onclick = () => {
                Dom.setBlinkArrowRed(true, 280, -10, 30, 30, 90).play();
                setCC("Press Record");
              };
            };
          };
        };
      }
      if (recordBtnClickIdx == 0) {
        stepTutorial2();
      }

      function setDataToGraph() {
        let characteristicsValue = Scenes.items.slider_C.item.value;

        let graphData = [];
        var rows = table.tBodies[0].rows;
        let n = 8,
          xLabel = "Duty Ratio (D)",
          yLabel = "";
        for (let i = 0; i < n; i++) {
          let x = rows[i].cells[3].innerHTML,
            y = null;
          switch (characteristicsValue) {
            case "P-vs-Losses":
              y = rows[i].cells[9].innerHTML;
              yLabel = "Losses (W)";
              setCC(
                "Due to loading effect, at higher load resistances, losses are more."
              );
              break;
            case "P-vs-Efficiency":
              y = rows[i].cells[10].innerHTML;
              yLabel = "Efficiencty (%)";
              setCC(
                "Due to loading effect, at higher load resistances, efficiency decreases."
              );
              break;
          }
          graphData.push({
            x: x,
            y: y,
          });
        }
        Scenes.items.chart.label3.x = xLabel;
        Scenes.items.chart.label3.y = yLabel;

        plotGraph(ctx, graphIdx, graphData, dataLabel, xLabel, yLabel, true);
        Scenes.items.graph3.set(null, null, 220, 355);
      }

      // ! ------------> If data already present plot the graph
      if (table.tBodies[0].rows[6].cells[2].innerHTML !== "") {
        setIsProcessRunning(false);
        Scenes.currentStep = 4;

        // ! change the table column index who's changing
        let changeableColumnIndx = 3;

        recordBtnClickIdx = 8;
        let rows = table.tBodies[0].rows;

        // * to get old values from table for matching
        for (let i = 0; i < tableColumnMax; i++) {
          let val = rows[i].cells[changeableColumnIndx].innerHTML;
          valuesToMatch.push(Number(val));
        }
      } else {
        // ! Please note this when plot the graph then show the graph ...
        plotGraph(ctx, graphIdx, [{}], dataLabel, xLabel, yLabel, true);
        Scenes.items.graph3.set(null, null, 220, 355);
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )

      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick = function () {
        if (recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax) {
          return;
        }
        let row = table.tBodies[0].rows;

        for (let i = 1; i < tableColumnMax; i++) {
          row[recordBtnClickIdx - 1].cells[i].innerHTML = "";
        }
        recordBtnClickIdx = recordBtnClickIdx - 1;
        if (recordBtnClickIdx == 0) {
          sliders.enableAll();
        }
        valuesToMatch.pop();
      };

      //! onclick for reset
      Scenes.items.btn_reset.item.onclick = function () {
        var rows = table.tBodies[0].rows;

        for (let i = 0; i < tableRowMax; i++) {
          for (let j = 1; j < tableColumnMax; j++) {
            rows[i].cells[j].innerHTML = "";
          }
        }

        for (let i = 0; i < tableRowMax; i++) {
          rows[i].cells[0].innerHTML = i + 1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[5]();
      };

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function () {
        // taking values from all sliders
        let vInValue = Number(Scenes.items.slider_vIn.item.value);
        let dutyRatioValue = Number(Scenes.items.slider_D.item.value);
        let resistanceValue = Number(Scenes.items.slider_R.item.value);

        // * if all values not selected
        if (vInValue == "" || dutyRatioValue == "" || resistanceValue == "") {
          setCC("Select all values first.");
          return;
        }

        updateValues(vInValue, dutyRatioValue, resistanceValue);

        // ! for arrow system
        if (recordBtnClickIdx < tableRowMax - 1) {
          Dom.setBlinkArrowRed(true, 100, 138, 30, 30, 90).play();
          setCC("Select D");
        } else {
          Dom.setBlinkArrowRed(-1);
        }

        // ! Can't select same values
        if (
          recordBtnClickIdx < 8 &&
          valuesToMatch.indexOf(dutyRatioValue) != -1
        ) {
          setCC("Please select different value.");
          return;
        } else {
          valuesToMatch.push(dutyRatioValue);
        }

        // ! sort the data
        if (recordBtnClickIdx >= 8) {
          function sortTable() {
            var rows = table.tBodies[0].rows;

            let n = 8;
            for (let i = 0; i < n; i++) {
              for (let j = 0; j < n - i - 1; j++) {
                let val1 = Number(rows[j].cells[8].innerHTML);
                let val2 = Number(rows[j + 1].cells[8].innerHTML);
                if (val1 > val2) {
                  let temp = rows[j].innerHTML;
                  rows[j].innerHTML = rows[j + 1].innerHTML;
                  rows[j + 1].innerHTML = temp;
                }
              }
            }
            for (let i = 0; i < n; i++) {
              rows[i].cells[0].innerHTML = i + 1;
            }
          }
          sortTable();

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph();
          Scenes.items.graph2.set(null, null, 220, 355);

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false);
          Scenes.currentStep = 4;
        }

        // deactivate the sliders after first value  done
        // todo
        if (recordBtnClickIdx == 0) {
          sliders.disable(0, 1, 2);
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++];
        tableRow.cells[1].innerHTML = vInValue;
        tableRow.cells[2].innerHTML = resistanceValue;
        tableRow.cells[3].innerHTML = dutyRatioValue;
        tableRow.cells[4].innerHTML = Number(
          Formulas.efficiencyPlot.v0(values)
        ).toFixed(2);
        tableRow.cells[5].innerHTML = Number(
          Formulas.efficiencyPlot.M(values)
        ).toFixed(2);
        tableRow.cells[6].innerHTML = Number(
          Formulas.efficiencyPlot.iIn(values)
        ).toFixed(2);
        tableRow.cells[7].innerHTML = Number(
          Formulas.efficiencyPlot.i0(values)
        ).toFixed(2);
        tableRow.cells[8].innerHTML = Number(
          Formulas.efficiencyPlot.p0(values)
        ).toFixed(2);
        tableRow.cells[9].innerHTML = Number(
          Formulas.efficiencyPlot.losses(values)
        ).toFixed(2);
        tableRow.cells[10].innerHTML = Number(
          Formulas.efficiencyPlot.eff(values)
        ).toFixed(2);

        // let x = tableRow.cells[9].innerHTML
        // let y = tableRow.cells[10].innerHTML
        // // ! addData to graph
        // graph.addData(0,{x:x,y:y})

        // if(recordBtnClickIdx>6){
        //   // after complete
        //   Dom.setBlinkArrow(true, 790, 408).play();
        //   setCC("Click 'Next' to go to next step");
        //   setIsProcessRunning(false);
        //   Scenes.currentStep = 4
        // }
        // warning for sorting the data
        if (recordBtnClickIdx == 8) {
          setCC("Press Record");
          Dom.setBlinkArrowRed(true, 280, -10, 30, 30, 90).play();
        }
      };

      return true;
    }),
    (step7 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading("", "Component Stress and Selection");
      // ! show the slider
      Scenes.items.slider_box.set(25, 15).scale(0.95);
      Scenes.items.btn_next.show();

      //! Required Items
      Scenes.items.btn_record.set(240, -60);
      Scenes.items.btn_delete.set(340, -60);
      Scenes.items.btn_reset.set(440, -60);
      // ! graph

      sliders.generateOptionsFor(3);
      Scenes.items.part4_table_graph.set(10, 160, 220, 535);

      let graph_box5 = new Dom(".graph_box4");
      let graph_box4 = new Dom(".graph_box5");
      Scenes.items.graph4.set(null, null, 250, 355);
      Scenes.items.graph5.set(null, 200, 250, 355);
      graph_box4.set();
      graph_box5.set(null, 171);
      let ctx1 = Scenes.items.graph4.item;
      let ctx2 = Scenes.items.graph5.item;
      let chart1 = Scenes.items.chart[3];
      let chart2 = Scenes.items.chart[4];

      let xLabel = "";
      let yLabel = "";

      let config = {
        type: "bar",
        data: {
          labels: ["Vs", "Vd", "Vc", "Vo"],
          datasets: [
            {
              backgroundColor: ["blue", "red", "purple", "green"],
              // data: [10,10,20],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Voltage Stress",
          },
          plugins: [
            {
              afterDraw: (chart) => {
                var ctx = chart.chart.ctx;
                ctx.save();
                ctx.textAlign = "center";
                ctx.font = "18px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(
                  "Output Power (P )",
                  chart.chart.width / 2,
                  chart.chart.height - 24
                );
                ctx.textAlign = "left";
                ctx.font = "10px Arial";
                ctx.fillText(
                  "0",
                  chart.chart.width - 119,
                  chart.chart.height - 12
                );
                ctx.restore();
              },
            },
          ],
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString: yLabel,
                },
                ticks: { beginAtZero: true },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: false,
                  labelString: xLabel,
                },
                ticks: { beginAtZero: true },
              },
            ],
          },
        },
      };

      function plotGraph() {
        if (chart1 != null) {
          chart1.destroy();
          chart2.destroy();
        }

        chart1 = new Chart(ctx1, {
          type: "bar",
          data: {
            labels: ["", "", ""],
            datasets: [
              {
                backgroundColor: ["red", "green", "purple"],
                // data: [10,10,20],
              },
            ],
          },
          plugins: [
            {
              afterDraw: (chart) => {
                var ctx = chart.chart.ctx;
                ctx.save();
                ctx.textAlign = "center";
                ctx.font = "20px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(
                  "v                   v                  v",
                  chart.chart.width - 170,
                  chart.chart.height - 32
                );
                ctx.textAlign = "left";
                ctx.font = "12px Arial";
                ctx.fillText(
                  "S                               D                               C",
                  chart.chart.width - 275,
                  chart.chart.height - 27
                );
                ctx.restore();
              },
            },
          ],
          options: {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Voltage Stress",
              fontColor: "black",
              fontSize: 15,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: "black",
                    fontSize: 15,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                  },
                  ticks: {
                    beginAtZero: true,
                    fontColor: "black",
                    fontSize: 15,
                  },
                },
              ],
            },
          },
        });
        chart2 = new Chart(ctx2, {
          type: "bar",
          data: {
            labels: ["", "", ""],
            datasets: [
              {
                backgroundColor: ["red", "green", "purple"],
                // data: [10,10,20],
              },
            ],
          },
          plugins: [
            {
              afterDraw: (chart) => {
                var ctx = chart.chart.ctx;
                ctx.save();
                ctx.textAlign = "center";
                ctx.font = "20px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(
                  "i                   i                  i",
                  chart.chart.width - 170,
                  chart.chart.height - 32
                );
                ctx.textAlign = "left";
                ctx.font = "12px Arial";
                ctx.fillText(
                  "S                               D                             C",
                  chart.chart.width - 275,
                  chart.chart.height - 27
                );
                ctx.restore();
              },
            },
          ],
          options: {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Current Stress",
              fontColor: "black",
              fontSize: 15,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    fontColor: "black",
                    fontSize: 15,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                  },
                  ticks: {
                    beginAtZero: true,
                    fontColor: "black",
                    fontSize: 15,
                  },
                },
              ],
            },
          },
        });
        Scenes.items.chart[3] = chart1;
        Scenes.items.chart[4] = chart2;
      }

      function stepTutorial2() {
        Dom.setBlinkArrowRed(true, 100, 78, 30, 30, 90).play();
        setCC("Select Characteristics");

        sliders.selectOp1.oninput = () => {
          Dom.setBlinkArrowRed(true, 260, 78, 30, 30, 90).play();
          setCC("Select V<sub>in</sub>");

          sliders.selectOp2.oninput = () => {
            Dom.setBlinkArrowRed(true, 430, 78, 30, 30, 90).play();
            setCC("Select R");

            sliders.selectOp3.oninput = () => {
              Dom.setBlinkArrowRed(true, 280, -10, 30, 30, 90).play();
              setCC("Press Record");
            };
          };
        };
      }
      if (chart1 == null) {
        stepTutorial2();
      }

      const graph = {
        addDataset(chart, label, bgColor, data) {
          chart.data.datasets.push({
            label: label,
            fill: true,
            borderColor: bgColor,
            data: data,
          });
          chart.update();
        },
        addData(chart, index, data) {
          console.log(data);
          if (data.length > 0) {
            chart.data.datasets[index].data = data;
          } else {
            chart.data.datasets[index].data.push(data);
          }
          chart.update();
        },
      };

      // ! ------------> If data already present plot the graph
      if (chart1 != null) {
        setIsProcessRunning(false);
        Scenes.currentStep = 4;
      } else {
        plotGraph();
        // Scenes.items.graph2.set(null,null,190,355)
        Scenes.items.graph4.set(null, null, 250, 355);
        Scenes.items.graph5.set(null, 200, 250, 355);
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function () {
        // taking values from all sliders
        let vInValue = Number(Scenes.items.slider_vIn.item.value);
        let dutyRatioValue = Number(Scenes.items.slider_D.item.value);
        let resistanceValue = Number(Scenes.items.slider_R.item.value);

        // * if all values not selected
        if (vInValue == "" || dutyRatioValue == "" || resistanceValue == "") {
          setCC("Select all values first.");
          return;
        }

        Dom.setBlinkArrowRed(-1);
        updateValues(vInValue, dutyRatioValue, resistanceValue);

        //  let tableRow = table.tBodies[0].rows[0]
        //  tableRow.cells[1-1].innerHTML = vInValue
        //  tableRow.cells[2-1].innerHTML = dutyRatioValue
        //  tableRow.cells[3-1].innerHTML = resistanceValue
        //  tableRow.cells[4-1].innerHTML = Number(Formulas.stress.v0(values)).toFixed(2)
        //  tableRow.cells[5-1].innerHTML = Number(Formulas.stress.M(values)).toFixed(2)
        //  tableRow.cells[6-1].innerHTML = Number(Formulas.stress.i_L2(values)).toFixed(2)
        //  tableRow.cells[7-1].innerHTML = Number(Formulas.stress.i0(values)).toFixed(2)

        //  let iIn = Number(Formulas.stress.I_In(values)).toFixed(2)
        //  let v0 = Number(Formulas.stress.v0(values)).toFixed(2)
        //  let iL2 = Number(Formulas.stress.i_L2(values)).toFixed(2)
        //  let ic = Number(Formulas.stress.i_L2(values) - Formulas.stress.i0(values)).toFixed(2)
        //  // table two changes
        //  let table2Row = Scenes.items.part3_table_four_2.item.tBodies[0].rows
        // table2Row[0].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
        // table2Row[1].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
        // table2Row[2].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`

        // table2Row[0].cells[2].innerHTML = `> i<sub>L2</sub> (${iL2})`
        // table2Row[1].cells[2].innerHTML = `> i<sub>L2</sub> (${iL2})`
        // table2Row[2].cells[2].innerHTML = `> (i<sub>L2</sub>-i<sub>0</sub>) (${ic})`

        let vS = Number(Formulas.stress.v0(values)).toFixed(2);
        let vD = Number(Formulas.stress.v0(values)).toFixed(2);
        let vC = Number(Formulas.stress.v0(values)).toFixed(2);

        let iS = Number(Formulas.stress.v0(values)).toFixed(2);
        let iD = Number(Formulas.stress.v0(values)).toFixed(2);
        let iC = Number(Formulas.stress.v0(values)).toFixed(2);

        // ! add values to graph
        let graph1_data = [vS, vD, vC];
        let graph2_data = [iS, iD, iC];

        plotGraph();
        graph.addData(chart1, 0, graph1_data);
        graph.addData(chart2, 0, graph2_data);
        Scenes.items.graph4.set(null, null, 250, 355);
        Scenes.items.graph5.set(null, 200, 250, 355);
        // after complete
        Dom.setBlinkArrow(true, 790, 408).play();
        // setCC("Click 'Next' to go to next step");
        setIsProcessRunning(false);
        Scenes.currentStep = 4;

        // ! fix resistance value to its original
        // resistanceSlider.min = 10
        // resistanceSlider.max = 500
        // resistanceSlider.step = 1
        // resistanceSlider.value = 10
        // resistanceSlider.oninput = ()=>{}
      };

      return true;
    }),
    // (completed = function () {
    //   Dom.hideAll();
    //   Scenes.items.contentAdderBox.setContent("");

    //   // get(".btn-save").style.display = "block";
    //   Scenes.items.btn_save.show().push();
    //   Dom.setBlinkArrow(-1);
    //   setCC("Download it and share with your friends.");
    //   // certificate name
    //   let certificateStuName = get("#certificateStuName");
    //   certificateStuName.innerHTML = student_name;
    //   // get("#quizScore").innerHTML = Quiz.score;
    //   get("#certificateDate").innerHTML = currentDateGlobal;
    //   Scenes.items.certificate.show("flex").push();

    //   // * restart btn

    //   let nxtBtn = get(".btn-next");
    //   nxtBtn.innerHTML = "Restart";
    //   nxtBtn.onclick = function () {
    //     location.reload();
    //   }

    //   return true;
    // }),
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = () => {};
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      backDrawerItem();
      backProgressBar();
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return;
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }
    } else {
    }
  },
};

// * slider
// var rangeSlider = function () {
//   var slider = $(".range-slider"),
//     range = $(".range-slider__range"),
//     value = $(".range-slider__value");

//   slider.each(function () {
//     value.each(function () {
//       var value = $(this).prev().attr("value");
//       $(this).html(value);
//     });

//     range.on("input", function () {
//       $(this).next(value).html(this.value);
//       $(this).next(value).val(this.value);
//     });
//   });
// };
// $(".resistance-input").on("keyup", () => {
//   let slider = $(".slider_R .range-slider__range");
//   let input = document.querySelector(".resistance-input");

//   let min = 1;
//   let max = Number(slider.attr("max"));
//   // if (input.value < min) {
//   //   input.value = min;
//   // }
//   if (input.value > max) {
//     input.value = max;
//   }
//   slider.val(input.value);
// });
// rangeSlider();

// stepcalling
Scenes.currentStep = 5;

Scenes.next();
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");

const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox() {
  let popupBtns = document.querySelectorAll(".btn-popup");
  let popupWindow = document.querySelector(".btn-popup-window");

  popupBtns[0].onmouseover = () => {
    popupWindow.src = Scenes.items.formulas_procedure.item.src;
  };
  popupBtns[1].onmouseover = () => {
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src;
  };
  popupBtns[2].onmouseover = () => {
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src;
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src;
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src;
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src;
        break;

      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src;
        break;
    }
  };
}
// btnPopupBox();

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }
