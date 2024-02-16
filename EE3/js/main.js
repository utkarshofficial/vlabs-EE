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
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
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
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

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
    }
  },
}

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
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    Dom.hideAll()
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

const 


textToSpeach = (text) => {
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
    onStringTyped(){
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  if (!isMute) textToSpeach(text);
  return ccDom;
}
   
class Dom {
  constructor(selector) {
    this.item = null;
    if (selector[0] == "." || selector[0] == "#") {
      this.item = get(selector);
    } else if(selector instanceof HTMLElement) {
      this.item = selector
    } else {
      this.item = src.get(selector);
    }
    this.selector = selector            
    // push
  }
  hidden(isHidden){
    if(isHidden == false)
      this.item.style.visibility = "visible"
    else
      this.item.style.visibility = "hidden"
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
    this.left = left
    this.top = top
    this.bottom = bottom
    this.right = right
    this.height = height
    this.width = width
    this.item.style.opacity = 1
    this.item.style.transform = "translateX(0) translateY(0)"

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
    this.push()

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
  styles(props){
    for(let property in props){
      this.item.style[property] = props[property];
    }
    return this
  }
  // * static elements/objects of anime
  static arrayOfAnimes = [];
  static arrayOfItems = [];
  static animePush(animeObj){
    Dom.arrayOfAnimes.push(animeObj);
  }
  static resetAnimeItems(){
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
    for (let i of Dom.arrayOfAnimes){
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
    rotate = 0,
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
    rotate = 0,
  ) {
    // because we added the blinkArrow image out of the anime-main
    top += 130
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
    if(this.selector != ".anime-header")
      Dom.arrayOfItems.push(this);
    return this;
  }
  forMathematicalExpressionBtn = 0
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

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    
box_img : new Dom("box_img"),
component_battery : new Dom("component_battery"),
component_capacitor : new Dom("component_capacitor"),
component_diode : new Dom("component_diode"),
component_inductor : new Dom("component_inductor"),
component_mosfet : new Dom("component_mosfet"),
component_register : new Dom("component_register"),
full_circuit : new Dom("full_circuit"),
full_circuit2 : new Dom("full_circuit2"),
circuit_full_2 : new Dom("circuit_full_2"),
circuit_full_3 : new Dom("circuit_full_3"),
graph_arrow : new Dom("part_3_graph_arrow"),
part_3_option_1 : new Dom("part_3_option_1"),
part_3_option_2 : new Dom("part_3_option_2"),
part_3_option_3 : new Dom("part_3_option_3"),
part_3_option_4 : new Dom("part_3_option_4"),
record_btn : new Dom("record_btn"),
part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_C : new Dom(".slider_C"),
part_2_circuit : new Dom("part_2_circuit"),
part_2_graph_1 : new Dom("part_2_graph_1"),
part_2_graph_2 : new Dom("part_2_graph_2"),
part_2_graph_3 : new Dom("part_2_graph_3"),
run_btn : new Dom("run_btn"),
slider_box : new Dom(".slider-box"),
right_tick_1 : new Dom("right_tick_1"),
right_tick_2 : new Dom("right_tick_2"),
right_tick_3: new Dom("right_tick_3"),
right_tick_4 : new Dom("right_tick_4"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph1_arrow : new Dom("graph1_arrow"),
graph2_arrow : new Dom("graph2_arrow"),
part_2_graph_empty : new Dom("part_2_graph_empty"),
part_3_option_4_graph : new Dom("part_3_option_4_graph"),
btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),
btn_check_connections: new Dom(".btn-check-connections"),
    btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

// Theory
slide_1 : new Dom("slide_1"),
slide_2 : new Dom("slide_2"),
slide_3_page_1 : new Dom("slide_3_page_1"),
slide_3_page_2 : new Dom("slide_3_page_2"),
slide_3_page_3 : new Dom("slide_3_page_3"),
slide_3_page_4 : new Dom("slide_3_page_4"),
slide_4_page_1 : new Dom("slide_4_page_1"),
slide_4_page_1_fan : new Dom("slide_4_page_1_fan"),
slide_4_page_2_battery_1 : new Dom("slide_4_page_2_battery_1"),
slide_4_page_2_battery_2 : new Dom("slide_4_page_2_battery_2"),
slide_4_page_2_battery_3 : new Dom("slide_4_page_2_battery_3"),
slide_4_page_2_volt_text : new Dom("slide_4_page_2_volt_text"),
slide_4_page_3_text_1 : new Dom("slide_4_page_3_text_1"),
slide_4_page_3_text_2 : new Dom("slide_4_page_3_text_2"),
slide_4_page_3_wire : new Dom("slide_4_page_3_wire"),
slide_5_page_1 : new Dom("slide_5_page_1"),
slide_5_page_2_text_1 : new Dom("slide_5_page_2_text_1"),
slide_5_page_2_volt_text : new Dom("slide_5_page_2_volt_text"),
slide_5_page_3_1_text_1 : new Dom("slide_5_page_3_1_text_1"),
slide_5_page_3_2_wire : new Dom("slide_5_page_3_2_wire"),
slide_5_page_3_3_light : new Dom("slide_5_page_3_3_light"),
slide_5_page_3_4_blast : new Dom("slide_5_page_3_4_blast"),
slide_5_page_3_5_cross : new Dom("slide_5_page_3_5_cross"),
slide_5_page_3_6_emoji : new Dom("slide_5_page_3_6_emoji"),
slide_5_page_3_7_text_2 : new Dom("slide_5_page_3_7_text_2"),
slide_5_page_3_8_text_3 : new Dom("slide_5_page_3_8_text_3"),
slide_5_page_4_1_text_1 : new Dom("slide_5_page_4_1_text_1"),
slide_6_page_1 : new Dom("slide_6_page_1"),
slide_6_page_2_1_text_1 : new Dom("slide_6_page_2_1_text_1"),
slide_6_page_2_2_emoji_blink : new Dom("slide_6_page_2_2_emoji_blink"),
slide_6_page_3_1_text_1 : new Dom("slide_6_page_3_1_text_1"),
slide_6_page_3_2_emoji_blink : new Dom("slide_6_page_3_2_emoji_blink"),
slide_7_page_1_1 : new Dom("slide_7_page_1_1"),
slide_7_page_1_2 : new Dom("slide_7_page_1_2"),
slide_7_page_1_3 : new Dom("slide_7_page_1_3"),
slide_8_page_1 : new Dom("slide_8_page_1"),
slide_8_page_2_and_rotate_the_fan : new Dom("slide_8_page_2_and_rotate_the_fan"),
slide_8_page_3_1 : new Dom("slide_8_page_3_1"),
slide_8_page_3_2_light : new Dom("slide_8_page_3_2_light"),
slide_8_page_3_3_blank : new Dom("slide_8_page_3_3_blank"),
slide_8_page_3_4_emoji : new Dom("slide_8_page_3_4_emoji"),
slide_8_page_3_5_text : new Dom("slide_8_page_3_5_text"),
slide_9 : new Dom("slide_9"),
slide_10_page_1 : new Dom("slide_10_page_1"),
slide_10_page_2 : new Dom("slide_10_page_2"),
slide_10_page_3 : new Dom("slide_10_page_3"),
slide_10_page_4_1 : new Dom("slide_10_page_4_1"),
slide_10_page_4_2_plus : new Dom("slide_10_page_4_2_plus"),
slide_10_page_4_3_minus : new Dom("slide_10_page_4_3_minus"),
slide_10_page_4_4_arrow : new Dom("slide_10_page_4_4_arrow"),
slide_10_page_4_5_text : new Dom("slide_10_page_4_5_text"),
slide_11_page_1 : new Dom("slide_11_page_1"),
slide_11_page_2_1 : new Dom("slide_11_page_2_1"),
slide_11_page_2_2_blink : new Dom("slide_11_page_2_2_blink"),
slide_11_page_3_1 : new Dom("slide_11_page_3_1"),
slide_11_page_3_2_rotate_it : new Dom("slide_11_page_3_2_rotate_it"),
slide_11_page_3_3_text_and_arrow : new Dom("slide_11_page_3_3_text_and_arrow"),
slide_12_page_1 : new Dom("slide_12_page_1"),
slide_12_page_2_1_pwm_blink : new Dom("slide_12_page_2_1_pwm_blink"),
slide_12_page_2_2 : new Dom("slide_12_page_2_2"),
slide_12_page_2_3_text : new Dom("slide_12_page_2_3_text"),
slide_12_page_3_1_pwn_blink : new Dom("slide_12_page_3_1_pwn_blink"),
slide_12_page_3_2 : new Dom("slide_12_page_3_2"),
slide_12_page_3_3_text : new Dom("slide_12_page_3_3_text"),
slide_12_page_3_4_text_2 : new Dom("slide_12_page_3_4_text_2"),
slide_13_page_1 : new Dom("slide_13_page_1"),
slide_13_page_2 : new Dom("slide_13_page_2"),
slide_13_page_3_1_plus : new Dom("slide_13_page_3_1_plus"),
slide_13_page_3_2_minus_rotate_both : new Dom("slide_13_page_3_2_minus_rotate_both"),
slide_13_page_3_4 : new Dom("slide_13_page_3_4"),
slide_13_page_3_5_text : new Dom("slide_13_page_3_5_text"),
slide_14_helper : new Dom("slide_14_helper"),
slide_14_page_1 : new Dom("slide_14_page_1"),
slide_14_page_1_ball : new Dom("slide_14_page_1_ball"),
slide_14_page_2_1_blink : new Dom("slide_14_page_2_1_blink"),
slide_14_page_2_2_text : new Dom("slide_14_page_2_2_text"),
slide_14_page_3_1_symbols : new Dom("slide_14_page_3_1_symbols"),
slide_14_page_3_2_green_graph_and_start_ball : new Dom("slide_14_page_3_2_green_graph_and_start_ball"),
slide_14_page_3_3_white_image_for_blue_line : new Dom("slide_14_page_3_3_white_image_for_blue_line"),
slide_15_page_1 : new Dom("slide_15_page_1"),
slide_15_page_1_ball : new Dom("slide_15_page_1_ball"),
slide_15_page_1_green_graph : new Dom("slide_15_page_1_green_graph"),
slide_15_page_1_minus : new Dom("slide_15_page_1_minus"),
slide_15_page_1_plus : new Dom("slide_15_page_1_plus"),
slide_15_page_2_1_blink : new Dom("slide_15_page_2_1_blink"),
slide_15_page_2_2_text : new Dom("slide_15_page_2_2_text"),
slide_15_page_3_1_arrow_and_text : new Dom("slide_15_page_3_1_arrow_and_text"),
slide_15_page_3_1_white : new Dom("slide_15_page_3_1_white"),
slide_15_page_3_2_graph : new Dom("slide_15_page_3_2_graph"),
slide_15_page_3_3_text : new Dom("slide_15_page_3_3_text"),

btn_transparent: new Dom(".btn-transparent"),
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),
part_3_option_select : new Dom("part_3_option_select"),
part_1_text_for_crrct: new Dom("part_1_text_for_crrct"),
part_1_text_for_wrong: new Dom("part_1_text_for_wrong"),

//EE3 img added
box1 : new Dom("box1"),
box2 : new Dom("box2"),
box3 : new Dom("box3"),
box4 : new Dom("box4"),
box5 : new Dom("box5"),
box6 : new Dom("box6"),
part1_circuit : new Dom("part1_circuit"),
part1_component_capacitor : new Dom("part1_component_capacitor"),
part1_component_diode : new Dom("part1_component_diode"),
part1_component_inductor : new Dom("part1_component_inductor"),
part1_component_mosfet : new Dom("part1_component_mosfet"),
part1_component_resistance : new Dom("part1_component_resistance"),
part1_component_voltage : new Dom("part1_component_voltage"),
part_3_option_5 : new Dom("part_3_option_5"),

part1_crrct_text : new Dom("part1_crrct_text"),
part1_incrrct_text : new Dom("part1_incrrct_text"),
part1_crrct_circuit : new Dom("part1_crrct_circuit"),
ee3_btn_check : new Dom(".ee3-btn-check"),
ee3_btn_reset : new Dom(".ee3-btn-reset"),
ee3_btn_hint : new Dom(".ee3-btn-hint"),


// EE3 dom items added




     
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


 chart: {
  graph1: null,
  graph2: null,
  graph5: null,
 }



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
  optionsDone:[0,0,0,0],
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
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
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
      Dom.hideAll()
      
      // require
      
      // !images array
      let imgs = document.querySelectorAll(".theory");
      
      let btn_transparent = Scenes.items.btn_transparent.item;
      Scenes.items.btn_transparent.show()
      // Scenes.items.btn_next.hide()
      
      
      let zIndex = 1003
      let prevAnime = null
      let slides = []
      let currSlideIdx = 0
      let pages = []
      let currPageIdx = 0
      let animeIsRunning = true

      //! function is anime active
      function nextBtnToggle(){
        if(animeIsRunning){
          animeIsRunning = false
          btn_transparent.classList.remove("btn-deactive")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrow(true, 790, 414).play();
        }else{
          animeIsRunning = true
          btn_transparent.classList.add("btn-deactive")
          Dom.setBlinkArrow(-1);
          
        }
      }
      nextBtnToggle()

      // ! uncomment after done
      function resetNextBtn(){
        btn_transparent.onclick = ()=>{
          Dom.hideAll()
          Scenes.items.btn_transparent.show()
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrow(true, 790, 414).play();
          slides[++i]()          
        }
      }

      function pagesNextBtn(){
        btn_transparent.onclick = ()=>{
          if(animeIsRunning){
            return
          }
          if(currPageIdx == pages.length){
            resetNextBtn()
            btn_transparent.click()
            currPageIdx = 0
            return
          }
          // for calling pages in slides
          pages[currPageIdx++]()
        }
      }

      function fadeAnime(target,begin=()=>{},complete=()=>{}){
        anime({
          targets: target.item,
          opacity: [0,1],
          duration: 1000,
          easing: 'linear',
          round: 100,
          begin(){
            target.show()
            begin()
            // animeIsRunning = true
          },
          complete(){
            complete()
            // nextBtnToggle()
          }
        })
      }

      function blinkAnime(target,begin=()=>{},complete=()=>{}){
        target.show()
        anime({
          targets: target.item,
          opacity: [0.6,1,0.6],
          loop: true,
          easing: "linear",
          round: 100,
          duration: 700,
          begin(){
            begin()
          },
        })
        anime({
          delay: 1000,
          complete(){
            complete()
          }
        })
      }

      function rotateAnime(target,begin=()=>{},complete=()=>{}){
        return anime({
          targets: target.item,
          rotate: 360,
          easing: "linear",
          loop: true,
          duration: 800,
          begin(){
            begin()
          },
          complete(){
            complete()
          }
        })
      }


      slides = [
        // slide1 = ()=>{
        //   Scenes.items.slide_1.show()
        // },
        slide2 = ()=>{
          Scenes.items.slide_2.show()
        },
        slide3 = ()=>{
          Scenes.items.slide_3_page_1.show()

          pages = [
            ()=>{
              let target = Scenes.items.slide_3_page_2
              anime({
                targets: target.item,
                opacity: [0,1],
                duration: 1000,
                easing: 'linear',
                round: 100,
                begin(){
                  target.show()
                  nextBtnToggle()
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              let target = Scenes.items.slide_3_page_3
              anime({
                targets: target.item,
                opacity: [0,1],
                duration: 1000,
                easing: 'linear',
                round: 100,
                begin(){
                  target.show()
                  nextBtnToggle()
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              let target = Scenes.items.slide_3_page_4
              anime({
                targets: target.item,
                opacity: [0,1],
                duration: 1000,
                easing: 'linear',
                round: 100,
                begin(){
                  target.show()
                  nextBtnToggle()
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
          ]

          pagesNextBtn()
        },
        slide4 = ()=>{
          Scenes.items.slide_4_page_1.show()
          Scenes.items.slide_4_page_1_fan.set(270,193,90,90)

          let battery = [
            Scenes.items.slide_4_page_2_battery_1.set(120-500,-295).item,
            Scenes.items.slide_4_page_2_battery_2.set(60-500,-240).item,
            Scenes.items.slide_4_page_2_battery_3.set(0-500,-186).item
          ]
          let tempI = 0
          let idx = [120,60,0]
          anime.timeline({
            duration: 500,
            easing: "easeInOutExpo",
          })
          .add({
            targets: battery[tempI],
            left: idx[tempI++]
          })
          .add({
            targets: battery[tempI],
            left: idx[tempI++]
          })
          .add({
            targets: battery[tempI],
            left: idx[tempI++]
          })
                    

          
          // Scenes.items.slide_4_page_2_volt_text.show()
          
          pages = [
            ()=>{
              tempI = 0
              topIdx = -45
              leftIdx = 0
              anime.timeline({
                duration: 1000,
                easing: "easeInOutExpo",
              })
              .add({
                targets: battery[tempI++],
                left: leftIdx,
                top: topIdx,
                begin(){
                  nextBtnToggle()
                }
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
                complete(){
                  fadeAnime(Scenes.items.slide_4_page_2_volt_text,()=>{},()=>{
                  nextBtnToggle()
                  })
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  nextBtnToggle()
                  fadeAnime(Scenes.items.slide_4_page_3_wire)
                  prevAnime = anime({
                    targets: Scenes.items.slide_4_page_1_fan.item,
                    rotate: 360,
                    easing: "linear",
                    loop: true,
                    duration: 800,
                  })
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_4_page_3_text_1)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_4_page_3_text_2,
                  ()=>{},
                  ()=>{
                    nextBtnToggle()
                  })
                }
              })
            },
          ]

          pagesNextBtn()
        },
        slide5 = ()=>{
          // old anime pause
          prevAnime.pause()
          
          Scenes.items.slide_5_page_1.show()
          // Scenes.items.slide_5_page_3_4_blast.set(220,170,220,160)

          let battery = [
            Scenes.items.slide_4_page_2_battery_1.set(120-500,-295).zIndex(zIndex++).item,
            Scenes.items.slide_4_page_2_battery_2.set(60-500,-240).zIndex(zIndex++).item,
          ]

          let tempI = 0
          let idx = [120,60]

          anime.timeline({
            duration: 800,
            easing: "easeInOutExpo",
          })
          .add({
            targets: battery[tempI],
            left: idx[tempI++]
          })
          .add({
            targets: battery[tempI],
            left: idx[tempI++]
          })
                    
          // Scenes.items.slide_4_page_2_volt_text.show()
          
          pages = [
            ()=>{
              tempI = 0
              topIdx = -45
              leftIdx = 0
              anime.timeline({
                duration: 1000,
                easing: "easeInOutExpo",
              })
              .add({
                targets: battery[tempI++],
                left: leftIdx,
                top: topIdx,
                begin(){
                  nextBtnToggle()
                }
              })
              .add({
                targets: battery[tempI++],
                left: leftIdx,
                top: topIdx,
                complete(){
                  fadeAnime(Scenes.items.slide_5_page_2_volt_text)
                }
              })
              .add({
                complete(){
                  fadeAnime(Scenes.items.slide_5_page_2_text_1)
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 1000,
                easing: "linear",
              })
              .add({
                begin(){
                  Scenes.items.slide_5_page_2_text_1.hide()
                  fadeAnime(Scenes.items.slide_5_page_3_1_text_1)
                  nextBtnToggle()
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_5_page_3_2_wire)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_5_page_3_3_light)
                }
              })
              // * For GIF
              .add({
                begin(){
                  Scenes.items.slide_5_page_3_3_light.hide()
                  Scenes.items.slide_5_page_3_4_blast.set(220,170,220,160)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_5_page_3_5_cross.zIndex(zIndex++))
                }
              })
              .add({
                begin(){
                  Scenes.items.slide_5_page_3_1_text_1.hide()
                  fadeAnime(Scenes.items.slide_5_page_3_6_emoji)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_5_page_3_7_text_2)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_5_page_3_8_text_3)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              Scenes.items.slide_5_page_4_1_text_1.show()
            },
          ]

          pagesNextBtn()
        },
        slide6 = ()=>{
          Scenes.items.slide_6_page_1.show()

          pages = [
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_6_page_2_1_text_1)
                  nextBtnToggle()
                }
              })
              .add({
                begin(){
                  let target = Scenes.items.slide_6_page_2_2_emoji_blink
                  fadeAnime(target)
                  blinkAnime(target)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_6_page_3_1_text_1)
                  nextBtnToggle()
                }
              })
              .add({
                begin(){
                  let target = Scenes.items.slide_6_page_3_2_emoji_blink
                  fadeAnime(target)
                  blinkAnime(target)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
          ]

          pagesNextBtn()
        },
        slide7 = ()=>{
          Scenes.items.slide_7_page_1_1.show()
          nextBtnToggle()
          fadeAnime(Scenes.items.slide_7_page_1_2,
            ()=>{},()=>{
              fadeAnime(Scenes.items.slide_7_page_1_3,
                ()=>{},
                ()=>{
                  nextBtnToggle()
                })
            })

        },
        slide8 = ()=>{
          Scenes.items.slide_8_page_1.show()
          Scenes.items.slide_4_page_1_fan.set(272,193,83,83).zIndex(zIndex++)

          pages = [
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_8_page_2_and_rotate_the_fan,
                    ()=>{},
                    ()=>{
                      rotateAnime(Scenes.items.slide_4_page_1_fan)
                    }  
                  )
                  nextBtnToggle()
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 1000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_8_page_3_1)
                  nextBtnToggle()
                }
              })
              .add({
                duration: 300,
                begin(){
                  fadeAnime(Scenes.items.slide_8_page_3_2_light)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_8_page_3_3_blank)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_8_page_3_4_emoji)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_8_page_3_5_text)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
          ]

          pagesNextBtn()
        },
        slide9 = ()=>{
          // old anime pause
          prevAnime.pause()

          Scenes.items.slide_9.show()
        },
        slide10 = ()=>{
          Scenes.items.slide_10_page_1.show()
          // Scenes.items.slide_10_page_2.show()
          // Scenes.items.slide_10_page_3.show()
          // Scenes.items.slide_10_page_4_1.show()
          // Scenes.items.slide_10_page_4_2_plus.show()
          // Scenes.items.slide_10_page_4_3_minus.show()

          pages = [
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_10_page_2)
                  nextBtnToggle()
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_10_page_3)
                  nextBtnToggle()
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_10_page_4_1)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_10_page_4_2_plus)
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_10_page_4_3_minus)
                }
              })
              .add({
                begin(){
                  // rotate the minus plus
                  let plus = Scenes.items.slide_10_page_4_2_plus
                  let minus = Scenes.items.slide_10_page_4_3_minus

                  blinkAnime(plus)
                  blinkAnime(minus)
                  anime({
                    targets: plus.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: 40},
                      {translateX: 130},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                  anime({
                    targets: minus.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: -70},
                      {translateX: -130},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                }
              })
              .add({
                delay: 3000,
                complete(){
                  fadeAnime(Scenes.items.slide_10_page_4_4_arrow,
                    ()=>{},
                    ()=>{
                      fadeAnime(Scenes.items.slide_10_page_4_5_text,
                        ()=>{},
                        ()=>{
                          nextBtnToggle()
                      })    
                    }
                  )
                }
              })
            },
            
          ]

          pagesNextBtn()
        },
        slide11 = ()=>{
          Scenes.items.slide_11_page_1.show()
          // Scenes.items.slide_11_page_2_1.show()
          // Scenes.items.slide_11_page_2_2_blink.show()
          // Scenes.items.slide_11_page_3_1.show()
          // Scenes.items.slide_11_page_3_2_rotate_it.set(595,248,23,90)

          pages = [
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_11_page_2_1)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  blinkAnime(Scenes.items.slide_11_page_2_2_blink)
                  fadeAnime(Scenes.items.slide_11_page_2_2_blink)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_11_page_3_1)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  let rightArrow = Scenes.items.slide_11_page_3_2_rotate_it.set(595,248,23,90)
                  fadeAnime(rightArrow,
                    ()=>{},
                    ()=>{
                      anime({
                        targets: rightArrow.item, 
                        rotate: 180,
                        duration: 2000,
                        easing: 'easeOutQuad',
                        complete(){
                          blinkAnime(rightArrow,
                            ()=>{},
                            ()=>{
                              fadeAnime(Scenes.items.slide_11_page_3_3_text_and_arrow.zIndex(zIndex++),
                              ()=>{},
                              ()=>{
                                nextBtnToggle()
                              })
                            }  
                          )
                        }
                      })
                    }
                  )
                },
              })
            },
          ]

          pagesNextBtn()
        },
        slide12 = ()=>{
          Scenes.items.slide_12_page_1.show()
          // Scenes.items.slide_12_page_2_1_pwm_blink.show()
          // Scenes.items.slide_12_page_2_2.show()
          // Scenes.items.slide_12_page_2_3_text.show()

          pages = [
            ()=>{
              anime.timeline({
                duration: 1000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_12_page_2_1_pwm_blink)
                  blinkAnime(Scenes.items.slide_12_page_2_1_pwm_blink)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_12_page_2_2)
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_12_page_2_3_text)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 1000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_12_page_3_1_pwn_blink)
                  blinkAnime(Scenes.items.slide_12_page_3_1_pwn_blink)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_12_page_3_2)
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_12_page_3_3_text)
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_12_page_3_4_text_2)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
          ]

          pagesNextBtn()
        },
        slide13 = ()=>{
          Scenes.items.slide_13_page_1.show()
          // Scenes.items.slide_13_page_2.show()
          // Scenes.items.slide_13_page_3_1_plus.show()
          // Scenes.items.slide_13_page_3_2_minus_rotate_both.show()
          // Scenes.items.slide_13_page_3_4.show()
          // Scenes.items.slide_13_page_3_5_text.show()

          pages = [
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_13_page_2)
                  nextBtnToggle()
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_13_page_3_1_plus)
                  fadeAnime(Scenes.items.slide_13_page_3_2_minus_rotate_both)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  anime({
                    targets: Scenes.items.slide_13_page_3_1_plus.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: 40},
                      {translateX: 100},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                  anime({
                    targets: Scenes.items.slide_13_page_3_2_minus_rotate_both.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: -40},
                      {translateX: -100},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                }
              })
              .add({
                // delay: 2000,
                begin(){
                  fadeAnime(Scenes.items.slide_13_page_3_4)
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_13_page_3_5_text)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
          ]

          pagesNextBtn()
        },    
        slide14 = ()=>{
          Scenes.items.slide_14_page_1.show()
          Scenes.items.slide_14_page_1_ball.show().zIndex(zIndex++)

          // Scenes.items.slide_14_page_3_3_white_image_for_blue_line.item.style.border = "1px solid black"
          Scenes.items.slide_14_page_3_3_white_image_for_blue_line.set(342,347,29,81).hide()

          
          pages = [
            ()=>{
              anime.timeline({
                duration: 1000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_14_page_2_1_blink)
                  blinkAnime(Scenes.items.slide_14_page_2_1_blink)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_14_page_2_2_text)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_14_page_3_1_symbols.zIndex(zIndex++)
                    ,()=>{
                      Scenes.items.slide_14_page_1_ball.show().zIndex(zIndex++)
                      Scenes.items.slide_14_page_3_3_white_image_for_blue_line.show().zIndex(zIndex++)
                    }
                    ,()=>{
                      Scenes.items.slide_14_page_3_2_green_graph_and_start_ball.show().zIndex(zIndex-4).set(-75)
                    }
                  )
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  let timeFrame = 1700
                  anime({
                    targets: Scenes.items.slide_14_page_1_ball.item,
                    keyframes: [
                      {translateY: -42, duration: 10},
                      {translateX: 389},
                      {translateY: 180},
                      {translateX: 0},
                      {translateY: 0},
                    ],
                    duration: timeFrame,
                    easing: "easeInOutQuad",
                    loop: true
                  })
                  anime({
                    targets: Scenes.items.slide_14_page_3_2_green_graph_and_start_ball.item,
                    keyframes: [
                      {left: 0,duration: timeFrame-300},
                      {left: -75, duration: 0},
                    ],
                    easing: "easeInQuad",
                    loop: true,
                  })
                  anime({
                    targets: Scenes.items.slide_14_page_3_3_white_image_for_blue_line.item,
                    keyframes: [
                      {translateX: 81, width: 0, duration: timeFrame-300},
                      {width:81, duration: 0},
                    ],
                    easing: "easeInQuad",
                    loop: true,
                  })
                }
              })
              .add({
                begin(){
                  anime({
                    targets: Scenes.items.slide_13_page_3_1_plus.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: 40},
                      {translateX: 100},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                  anime({
                    targets: Scenes.items.slide_13_page_3_2_minus_rotate_both.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: -40},
                      {translateX: -100},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                }
              })
              .add({
                // delay: 2000,
                begin(){
                  fadeAnime(Scenes.items.slide_13_page_3_4)
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_13_page_3_5_text)
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
          ]

          pagesNextBtn()
        }, 
        slide15 = ()=>{
          Scenes.items.slide_15_page_1.show().zIndex(zIndex++)
          Scenes.items.slide_15_page_1_ball.show().zIndex(zIndex++)
          Scenes.items.slide_15_page_1_green_graph.show()
          Scenes.items.slide_15_page_1_plus.show().zIndex(zIndex)
          Scenes.items.slide_15_page_1_minus.show().zIndex(zIndex)

          Scenes.items.slide_15_page_3_1_white.set(363,347,29,76).zIndex(zIndex).hide()

          pages = [
            ()=>{
              anime.timeline({
                duration: 1000,
                easing: "linear",
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_15_page_2_1_blink.zIndex(zIndex))
                  blinkAnime(Scenes.items.slide_15_page_2_1_blink)
                  nextBtnToggle()
                },
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_15_page_2_2_text.zIndex(zIndex))
                },
                complete(){
                  nextBtnToggle()
                }
              })
            },
            ()=>{
              anime.timeline({
                duration: 2000,
                easing: "linear",
              })
              .add({
                begin(){
                  blinkAnime(Scenes.items.slide_15_page_1_plus)
                  blinkAnime(Scenes.items.slide_15_page_1_minus)
                  nextBtnToggle()
                }
              })
              .add({
                begin(){
                  anime({
                    targets: Scenes.items.slide_15_page_1_plus.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: 18},
                      {translateX: 130},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                  anime({
                    targets: Scenes.items.slide_15_page_1_minus.item,
                    easing: "linear",
                    keyframes: [
                      {translateY: -18},
                      {translateX: -130},
                      {translateY: 0},
                    ],
                    duration: 2000,
                  })
                }
              })
              .add({
                begin(){
                  fadeAnime(Scenes.items.slide_15_page_3_1_arrow_and_text.zIndex(zIndex),()=>{
                    Scenes.items.slide_15_page_3_1_white.show()
                  })
                },
              })
            .add({
                begin(){
                  let timeFrame = 1700
                  anime({
                    targets: Scenes.items.slide_15_page_1_ball.item,
                    keyframes: [
                      {translateY: -42, duration: 10},
                      {translateX: 588},
                      {translateY: 180},
                      {translateX: 0},
                      {translateY: 0},
                    ],
                    duration: timeFrame,
                    easing: "easeInOutQuad",
                    loop: true
                  })
                  anime({
                    targets: Scenes.items.slide_15_page_1_green_graph.item,
                    keyframes: [
                      {left: 75,duration: timeFrame-300},
                      {left: 0, duration: 0},
                    ],
                    easing: "easeInQuad",
                    loop: true,
                  })
                  anime({
                    targets: Scenes.items.slide_15_page_3_1_white.item,
                    keyframes: [
                      {translateX: 81, width: 0, duration: timeFrame-300},
                      {width:81, duration: 0},
                    ],
                    easing: "easeInQuad",
                    loop: true,
                  })
                  anime({
                    delay: timeFrame,
                    duration: 2000,
                    begin(){
                      fadeAnime(Scenes.items.slide_15_page_3_2_graph.zIndex(zIndex))
                    },
                    complete(){
                      fadeAnime(Scenes.items.slide_15_page_3_3_text.zIndex(zIndex),
                      ()=>{},
                      ()=>{
                        nextBtnToggle()
                        Scenes.items.btn_next.show()
                        Scenes.items.btn_transparent.hide()
                        // for going to next animation
                        anime({
                          duration:40, 
                          complete(){
                            setIsProcessRunning(false);
                            Dom.setBlinkArrow(true, 790, 414).play();
                            setCC("Click 'Next' to go to next step");
                          }
                        })
                      })
                    }
                  })
                }
              })
            },
          ]
 
          pagesNextBtn()
        }, 
      ]

      let i=0;
      slides[i]()
      resetNextBtn()


        
      return true;
    }),  
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.slider_box.hide()

      Scenes.setStepHeading("Step-1", "Circuit Formulation");

      // let vertexBox = new Dom(".vertex-box")
      // vertexBox.show()

      //! Required positions
      // let tConst = -10
      // let lConst = 0
      // Scenes.items.component_battery.set(20+lConst, 30+tConst, 180);
      // Scenes.items.component_inductor.set(200+lConst, 260+tConst, 132);
      // Scenes.items.component_diode.set(380+lConst, 282+tConst, 70);
      // Scenes.items.component_mosfet.set(420+lConst, -40+tConst, 750);
      // Scenes.items.component_capacitor.set(640+lConst, 20+tConst, 230);
      // Scenes.items.btn_check_connections.set(770, 250);
      // Scenes.items.btn_circuit_diagram.set(780, 330);
      // Scenes.items.part_1_text_for_crrct.set(585,340, 40).hide()
      // Scenes.items.part_1_text_for_wrong.set(630,310, 110).hide()

      // Scenes.items.slider_box.hide();
222
      //! Required positions
      let reset = function(){
        Scenes.steps[2]()  
      }

      let checkCnnctn = ""
      let check = function(){
        console.log(checkCnnctn)
        if(checkCnnctn == "111111"){
      Scenes.items.part1_crrct_text.set(10,40, null, 790)
        }
        else{
      Scenes.items.part1_incrrct_text.set(10,40, null, 790) 
        }
     
      }

      let hint = function(){

        //hide previous components
        
      Scenes.items.part1_circuit.set(140,180,220).hide()
      Scenes.items.box1.set(100,230,90).zIndex(2).hide()
      Scenes.items.box2.set(185,140,80,135).zIndex(2).hide()
      Scenes.items.box3.set(295,245,95).zIndex(2).hide()
      Scenes.items.box4.set(360,140,80,115).zIndex(2).hide()
      Scenes.items.box5.set(475,250,85).zIndex(2).hide()
      Scenes.items.box6.set(588,250,95).zIndex(2).hide()

      Scenes.items.part1_component_voltage.set(5+40,-20,150).zIndex(3).hide()
      Scenes.items.part1_component_inductor.set(85+70,-20,120).zIndex(3).hide()
      Scenes.items.part1_component_capacitor.set(85+190+70,-20,130).zIndex(3).hide()
      Scenes.items.part1_component_mosfet.set(250+160,-40, 140).zIndex(3).hide()
      Scenes.items.part1_component_diode.set(85+190+270+70,-20,120).zIndex(3).hide()
      Scenes.items.part1_component_resistance.set(85+190+350+70,-31,132).zIndex(3).hide()

      Scenes.items.ee3_btn_check.set(720-80,-70,null, 90).hide()
      Scenes.items.ee3_btn_reset.set(720-80+100,-70, null, 90).hide()
      Scenes.items.ee3_btn_hint.set(720-80+200,-70, null, 90).hide()

      Scenes.items.part1_crrct_text.set(10,40, null, 790).hide()

      Scenes.items.part1_crrct_circuit.set(210,120, 250)

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)

      }

      Scenes.items.ee3_btn_check.set(720-80,-70,null, 90).item.onclick = check
      Scenes.items.ee3_btn_reset.set(720-80+100,-70, null, 90).item.onclick = reset
      Scenes.items.ee3_btn_hint.set(720-80+200,-70, null, 90).item.onclick = hint

      // Scenes.items.part1_crrct_text.set(10,40, null, 790)
      // Scenes.items.part1_incrrct_text.set(10,40, null, 790)
      // Scenes.items.part1_crrct_circuit.set(210,120, 250)


      Scenes.items.part1_circuit.set(140,180,220)
      Scenes.items.box1.set(100,230,90).zIndex(2)
      Scenes.items.box2.set(185,140,80,135).zIndex(2)
      Scenes.items.box3.set(295,245,95).zIndex(2)
      Scenes.items.box4.set(360,140,80,115).zIndex(2)
      Scenes.items.box5.set(475,250,85).zIndex(2)
      Scenes.items.box6.set(588,250,95).zIndex(2)
      

      //!Correct positons

      // Scenes.items.part1_component_voltage.set(118.5,180,150)
      // Scenes.items.part1_component_inductor.set(165,90,120)
      // Scenes.items.part1_component_mosfet.set(340,130,660)
      // Scenes.items.part1_component_diode.set(322,229,120)
      // Scenes.items.part1_component_capacitor.set(497,220,120)
      // Scenes.items.part1_component_resistance.set(604,222,120)
      
      Scenes.items.part1_component_voltage.set(5+40,-20,150).zIndex(3)
      Scenes.items.part1_component_inductor.set(85+70,-20,120).zIndex(3)
      Scenes.items.part1_component_capacitor.set(85+190+70,-20,130).zIndex(3)
      Scenes.items.part1_component_mosfet.set(250+160,-40, 140).zIndex(3)
      Scenes.items.part1_component_diode.set(85+190+270+70,-20,120).zIndex(3)
      Scenes.items.part1_component_resistance.set(85+190+350+70,-31,132).zIndex(3)

      
          let compo = {
            box : null,
            item : null,
          }
      // box clicked
      let box1 = Scenes.items.box1
      box1.item.onclick = ()=>{
        console.log("box1 clicked")
        box1.scale(1.1)
        compo.box = box1
      }
      let box2 = Scenes.items.box2
      box2.item.onclick = ()=>{
        box2.scale(1.1)
        console.log("box2 clicked")
        compo.box = box2
      }
      let box3 = Scenes.items.box3
      box3.item.onclick = ()=>{
        box3.scale(1.1)
        console.log("box3 clicked")
        compo.box = box3
      }
      let box4 = Scenes.items.box4
      box4.item.onclick = ()=>{
        box4.scale(1.1)
        console.log("box4 clicked")
        compo.box = box4
      }
      let box5 = Scenes.items.box5
      box5.item.onclick = ()=>{
        box5.scale(1.1)
        console.log("box5 clicked")
        compo.box = box5
      }
      let box6 = Scenes.items.box6
      box6.item.onclick = ()=>{
        box6.scale(1.1)
        console.log("box6 clicked")
        compo.box = box6
      }

      //item click
      let item1 = Scenes.items.part1_component_voltage
      item1.item.onclick = ()=>{
        console.log("item1 clicked")
        compo.item = item1
        toSet();
      }
      let item2 = Scenes.items.part1_component_inductor
      item2.item.onclick = ()=>{
        console.log("item2 clicked")
        compo.item = item2
        toSet();
      }
      let item3 = Scenes.items.part1_component_capacitor
      item3.item.onclick = ()=>{
        console.log("item3 clicked")
        compo.item = item3
        toSet();
      }
      let item4 = Scenes.items.part1_component_mosfet
      item4.item.onclick = ()=>{
        console.log("item4 clicked")
        compo.item = item4
        toSet();
      }
      let item5 = Scenes.items.part1_component_diode
      item5.item.onclick = ()=>{
        console.log("item5 clicked")
        compo.item = item5
        toSet();
      }
      let item6 = Scenes.items.part1_component_resistance
      item6.item.onclick = ()=>{
        console.log("item6 clicked")
        compo.item = item6
        toSet();
      }



    //! function to set the element
    let toSet = function(){
      let boxName = compo.box
      let itemName = compo.item


      //if item1 clicked
      if(itemName == item1 && boxName == box1){
        box1.hide()
        item1.set(118.5,178,150)
        checkCnnctn+="1"
        console.log(checkCnnctn)

      }
      if(itemName == item1 && boxName == box2){
        item1.styles({
          rotate: "90deg"
        })
        box2.hide()
        item1.set(242,73,225)
      }
      if(itemName == item1 && boxName == box3){
          box3.hide()
        item1.set(307, 193,150)
      }
      if(itemName == item1 && boxName == box4){
        item1.styles({
          rotate: "90deg"
        })
        // box4.hide()
        item1.set(415, 109)
      }
      if(itemName == item1 && boxName == box5){
        // box5.hide()
        item1.set(485, 194)
      }
      if(itemName == item1 && boxName == box6){
            box6.hide()
        item1.set(588, 194)
      }

      //if item2 clicked
      if(itemName == item2 && boxName == box1){
        item2.styles({
          rotate: "90deg"
        })
        box1.hide()
        item2.set(100, 212)
      }
      if(itemName == item2 && boxName == box2){
        box2.hide()
        item2.set(171, 90)
      }
      if(itemName == item2 && boxName == box3){
        item2.styles({
          rotate: "90deg"
        })
        box3.hide()
        item2.set(288, 230)
      }
      if(itemName == item2 && boxName == box4){
        box4.hide()
        item2.set(339, 90)
        checkCnnctn+="1"
        console.log(checkCnnctn)

      }
      if(itemName == item2 && boxName == box5){
        item2.styles({
          rotate: "90deg"
        })
        box5.hide()
        item2.set(467, 230)

      }
      if(itemName == item2 && boxName == box6){
        item2.styles({
          rotate: "90deg"
        })
        box6.hide()
        item2.set(569, 230)
      }

      
      //if item3 clicked
      if(itemName == item3 && boxName == box1){
        box1.hide()
        item3.set(129, 195)
      }
      if(itemName == item3 && boxName == box2){
        item3.styles({
          rotate: "90deg"
        })
        box2.hide()
        item3.set(235,133)
      }
      if(itemName == item3 && boxName == box3){
        box3.hide()
        item3.set(318, 213)
      }
      if(itemName == item3 && boxName == box4){
        item3.styles({
          rotate: "90deg"
        })
        box4.hide()
        item3.set(399, 133)
      }
      if(itemName == item3 && boxName == box5){
        box5.hide()
        item3.set(496, 213)
        checkCnnctn+="1"
        console.log(checkCnnctn)
      }
      if(itemName == item3 && boxName == box6){
        box6.hide()
        item3.set(599, 213)
      }

       //if item4 clicked
       if(itemName == item4 && boxName == box1){
        item4.styles({
          rotate: "90deg"
        })
        box1.hide()
        item4.set(55, 205)
     }
      if(itemName == item4 && boxName == box2){
        box2.hide()
        item4.set(171, 124)
        checkCnnctn+="1"
        console.log(checkCnnctn)


      }
      if(itemName == item4 && boxName == box3){
        item4.styles({
          rotate: "90deg"
        })
        box3.hide()
        item4.set(243, 221)
      }
      if(itemName == item4 && boxName == box4){
        box4.hide()
        item4.set(346, 124)
      }
      if(itemName == item4 && boxName == box5){
        item4.styles({
          rotate: "90deg"
        })
        box5.hide()
        item4.set(420, 221)
      }
      if(itemName == item4 && boxName == box6){
        item4.styles({
          rotate: "90deg"
        })
        box6.hide()
        item4.set(525, 221)
      }

      //if item5 clicked
      if(itemName == item5 && boxName == box1){
        box1.hide()
        item5.set(134, 214)
      }
      if(itemName == item5 && boxName == box2){
        item5.styles({
          rotate: "90deg"
        })
        box2.hide()
        item5.set(222, 144)
      }
      if(itemName == item5 && boxName == box3){
            box3.hide()
        item5.set(322, 230)
        checkCnnctn+="1"
        console.log(checkCnnctn)

      }
      if(itemName == item5 && boxName == box4){
        item5.styles({
          rotate: "90deg"
        })
          box4.hide()
        item5.set(387, 144)
      }
      if(itemName == item5 && boxName == box5){
            box5.hide()
        item5.set(500, 230)
      }
      if(itemName == item5 && boxName == box6){
          box6.hide()
        item5.set(604, 230)
      }


      //if item6 clicked
      if(itemName == item6 && boxName == box1){
        box1.hide()
        item6.set(132, 198)
      }
      if(itemName == item6 && boxName == box2){
        item6.styles({
          rotate: "90deg"
        })
        box2.hide()
        item6.set(239, 129)
      }
      if(itemName == item6 && boxName == box3){
            box3.hide()
        item6.set(321, 214)
      }
      if(itemName == item6 && boxName == box4){
        item6.styles({
          rotate: "90deg"
        })
          box4.hide()
        item6.set(402, 129)
      }
      if(itemName == item6 && boxName == box5){
            box5.hide()
        item6.set(498, 214)
      }
      if(itemName == item6 && boxName == box6){
            box6.hide()
            item6.set(601, 214)
            checkCnnctn+="1"
      }


    }
      // ------ end



      return true
    }),
    (step2 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "Step-2",
        "Voltage and current waveforms."
      )
      Dom.setBlinkArrowRed(true, 80, -5, null, 35, 270).play();
      setCC("Select the value of V<sub>in</sub>", 5);
      Scenes.items.btn_next.show();

      Scenes.items.slider_vIn.item.onclick = ()=>{
        Dom.setBlinkArrowRed(true, 240, -5, null, 35, 270).play();
        setCC("Select the value of R", 5);

      }

  //! Required Items
  Scenes.items.record_btn.set(355, -60, 70)
  Scenes.items.slider_box.set(0,25)
  Scenes.items.part_2_circuit.set(10,200, 200)
  Scenes.items.slider_box.item.style.scale = "0.9";
  Scenes.items.slider_C.item.st
  // Scenes.items.hea.item.style.display = "none"
  // Scenes.items.slider_box.show("flex").set(-120, -40);

  Scenes.items.part_2_graph_empty.set(660, -30, 350, 280);
  Scenes.items.part_2_graph_1.set(660, -30, 350, 280).hide();
  Scenes.items.part_2_graph_2.set(660, -30, 350, 280).hide();
  Scenes.items.part_2_graph_3.set(660, -30, 350, 280).hide();
       
 
      // temp text on required positions
      // let allTempTitles = [

      //   //temp titles for inductor
      //   Scenes.items.tempTitle1.setContent("0").set(554+4, -23+25),
      //   Scenes.items.tempTitle2.setContent("0").set(634+4, -23+25),
      //   Scenes.items.tempTitle3.setContent("0").set(690+4, -23+25),
      //   Scenes.items.tempTitle4.setContent("0").set(548+4+2, -3+22),
      //   Scenes.items.tempTitle5.setContent("0").set(548+4+2, 14+22),
      //   Scenes.items.tempTitle6.setContent("0").set(620+4+2, -3+22),
      //   Scenes.items.tempTitle7.setContent("0").set(620+4+2, 14+22),
      //   Scenes.items.tempTitle8.setContent("0").set(694+4, 4+25-3),

      //   //temp titles for switch
      //   Scenes.items.tempTitle9.setContent("0").set(550, 100+16),
      //   Scenes.items.tempTitle10.setContent("0").set(618+6, 102+12),
      //   Scenes.items.tempTitle11.setContent("0").set(702+6, 100+14),
      //   Scenes.items.tempTitle12.setContent("0").set(547+6, 125+11),
      //   Scenes.items.tempTitle13.setContent("0").set(550+6, 141+11),
      //   Scenes.items.tempTitle14.setContent("0").set(615, 134+9),
      //   Scenes.items.tempTitle15.setContent("0").set(693+4, 132+10),

      //   //for diode d
      //   Scenes.items.tempTitle16.setContent("0").set(555+5, 228+1),
      //   Scenes.items.tempTitle17.setContent("0").set(618, 228),
      //   Scenes.items.tempTitle18.setContent("0").set(695+5, 228),
      //   Scenes.items.tempTitle19.setContent("0").set(548+6, 255),
      //   Scenes.items.tempTitle20.setContent("0").set(617+6, 249),
      //   Scenes.items.tempTitle21.setContent("0").set(618+6, 266-1),
      //   Scenes.items.tempTitle22.setContent("0").set(703+5, 257),
                
      //   //for capacitor
      //   Scenes.items.tempTitle23.setContent("0").set(553+7, 355-10),
      //   Scenes.items.tempTitle24.setContent("0").set(625+7, 355-10),
      //   Scenes.items.tempTitle25.setContent("0").set(698+4, 355-10),
      //   Scenes.items.tempTitle26.setContent("0").set(552+7, 385-13),
      //   Scenes.items.tempTitle27.setContent("0").set(627+6, 376-13),
      //   Scenes.items.tempTitle28.setContent("0").set(629+7, 393-14),
      //   Scenes.items.tempTitle29.setContent("0").set(690+3, 384-13),
        
      //   //source maasurements
      //   Scenes.items.tempTitle30.setContent("0").set(268+11, 230),
      //   Scenes.items.tempTitle31.setContent("0").set(340+11, 230),
      //   Scenes.items.tempTitle32.setContent("0").set(412+8, 230),
      //   Scenes.items.tempTitle33.setContent("0").set(264+11+1, 252-2),
      //   Scenes.items.tempTitle34.setContent("0").set(266+11, 269-2),
      //   Scenes.items.tempTitle35.setContent("0").set(264 + 72+11, 252-2),
      //   Scenes.items.tempTitle36.setContent("0").set(266 + 72+11, 269-2),
      //   Scenes.items.tempTitle37.setContent("0").set(411+11-2, 259-1),

      //   //load measurements
      //   Scenes.items.tempTitle38.setContent("0").set(268+9, 230+128-12+2),
      //   Scenes.items.tempTitle39.setContent("0").set(340+9, 230+128-12+2),
      //   Scenes.items.tempTitle40.setContent("0").set(412+9, 230+128-12+2),
      //   Scenes.items.tempTitle41.setContent("0").set(268+9-3+3, 230+128+25-12-2+2),
      //   Scenes.items.tempTitle42.setContent("0").set(340+9-3, 230+128+25-12-2+2),
      //   Scenes.items.tempTitle43.setContent("0").set(412+9-3, 230+128+25-12-2+2),
      // ];
      // allTempTitles.forEach(ele=>{
      //   ele.styles({
      //     color : "white",
      //     backgroundColor : "black",
      //     fontSize: "0.8em",
      //     width : "28px",
      //   })
      // })
 
       let currentGraph = Scenes.items.part_2_graph_empty

       
      // *  chage the step size of the sliders
      // let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
      let dutyRatioSlider = Scenes.items.slider_D.item;
      dutyRatioSlider.min = "0.25";
      dutyRatioSlider.max = "0.75";
      dutyRatioSlider.step = "0.25";
      Scenes.items.slider_D.item.value = "0.25";
      
 
      // ! onclick for record
      Scenes.items.record_btn.item.onclick = function () {
        // ! Activate the next btn right after the click
        // setCC("Click 'Next' to go to next step");
        // setIsProcessRunning(false);
        
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        // let allSliderValue = $(".range-slider__value");
        
        // let vInValue = Number(allSliderValue[0].innerHTML);
        // let dutyRatioValue = Number(allSliderValue[1].innerHTML);
        // let resistanceValue = Number(allSliderValue[2].value);
        
        
        // Scenes.items.tempTitle2.setContent(v0);
        
        // let dutyRatioValue = Number(sliders.d.value);
        // let resistanceValue = Number(sliders.r.value);
        // let vG = Number(sliders.v.value);
        // updateValues(vG, dutyRatioValue, resistanceValue);
        
        // let v0 = Number(Formulas.step2.v0(values)).toFixed(1);
        // let iIn = Number(Formulas.step2.iIn(values)).toFixed(1);
        // let i0 = Number(Formulas.step2.i0(values)).toFixed(1);
        // let i1 = Number(Formulas.step2.i0(values)).toFixed(1);
        // let i2 = Number(Formulas.step2.i0(values)).toFixed(1);
        
        // if (dutyRatioValue == 0.25) {
        //   updateValues(vG, dutyRatioValue, resistanceValue);


        // //temp titles for inductor
        // Scenes.items.tempTitle1.setContent(vG)
        // Scenes.items.tempTitle2.setContent(v0 - vG)
        // Scenes.items.tempTitle3.setContent("0")
        // Scenes.items.tempTitle4.setContent(i1)
        // Scenes.items.tempTitle5.setContent(i2)
        // Scenes.items.tempTitle6.setContent(i2)
        // Scenes.items.tempTitle7.setContent(i1)
        // Scenes.items.tempTitle8.setContent(iIn)

        // //temp titles for switch
        // Scenes.items.tempTitle9.setContent("0")
        // Scenes.items.tempTitle10.setContent(v0)
        // Scenes.items.tempTitle11.setContent((1-dutyRatioValue) * v0)
        // Scenes.items.tempTitle12.setContent(i1)
        // Scenes.items.tempTitle13.setContent(i2)
        // Scenes.items.tempTitle14.setContent("0")
        // Scenes.items.tempTitle15.setContent(dutyRatioValue * iIn)

        // //for diode d
        // Scenes.items.tempTitle16.setContent(v0)
        // Scenes.items.tempTitle17.setContent("0")
        // Scenes.items.tempTitle18.setContent(dutyRatioValue*v0)
        // Scenes.items.tempTitle19.setContent("0")
        // Scenes.items.tempTitle20.setContent(i2)
        // Scenes.items.tempTitle21.setContent(i1)
        // Scenes.items.tempTitle22.setContent((1-dutyRatioValue) * iIn)
                
        // //for capacitor
        // Scenes.items.tempTitle23.setContent(v0)
        // Scenes.items.tempTitle24.setContent(v0)
        // Scenes.items.tempTitle25.setContent(v0)
        // Scenes.items.tempTitle26.setContent(i0)
        // Scenes.items.tempTitle27.setContent(i2-i0)
        // Scenes.items.tempTitle28.setContent(i1-i0)
        // Scenes.items.tempTitle29.setContent("0")
        
        // //source maasurements
        // Scenes.items.tempTitle30.setContent(vG)
        // Scenes.items.tempTitle31.setContent(vG)
        // Scenes.items.tempTitle32.setContent(vG)
        // Scenes.items.tempTitle33.setContent(i1)
        // Scenes.items.tempTitle34.setContent(i2)
        // Scenes.items.tempTitle35.setContent(i2)
        // Scenes.items.tempTitle36.setContent(i1)
        // Scenes.items.tempTitle37.setContent(iIn)

        // //load measurements
        // Scenes.items.tempTitle38.setContent(v0)
        // Scenes.items.tempTitle39.setContent(v0)
        // Scenes.items.tempTitle40.setContent(v0)
        // Scenes.items.tempTitle41.setContent(i0)
        // Scenes.items.tempTitle42.setContent(i0)
        // Scenes.items.tempTitle43.setContent(i0)

          

        //   currentGraph.hide();
        //   Scenes.items.part_2_graph_1.show();
        //   currentGraph = Scenes.items.part_2_graph_1;
        // }

        // if (dutyRatioValue == 0.5) {

        //   updateValues(vG, dutyRatioValue, resistanceValue);


        //   //temp titles for inductor
        //   Scenes.items.tempTitle1.setContent(vG)
        //   Scenes.items.tempTitle2.setContent(v0 - vG)
        //   Scenes.items.tempTitle3.setContent("0")
        //   Scenes.items.tempTitle4.setContent(i1)
        //   Scenes.items.tempTitle5.setContent(i2)
        //   Scenes.items.tempTitle6.setContent(i2)
        //   Scenes.items.tempTitle7.setContent(i1)
        //   Scenes.items.tempTitle8.setContent(iIn)
  
        //   //temp titles for switch
        //   Scenes.items.tempTitle9.setContent("0")
        //   Scenes.items.tempTitle10.setContent(v0)
        //   Scenes.items.tempTitle11.setContent((1-dutyRatioValue) * v0)
        //   Scenes.items.tempTitle12.setContent(i1)
        //   Scenes.items.tempTitle13.setContent(i2)
        //   Scenes.items.tempTitle14.setContent("0")
        //   Scenes.items.tempTitle15.setContent(dutyRatioValue * iIn)
  
        //   //for diode d
        //   Scenes.items.tempTitle16.setContent(v0)
        //   Scenes.items.tempTitle17.setContent("0")
        //   Scenes.items.tempTitle18.setContent(dutyRatioValue*v0)
        //   Scenes.items.tempTitle19.setContent("0")
        //   Scenes.items.tempTitle20.setContent(i2)
        //   Scenes.items.tempTitle21.setContent(i1)
        //   Scenes.items.tempTitle22.setContent((1-dutyRatioValue) * iIn)
                  
        //   //for capacitor
        //   Scenes.items.tempTitle23.setContent(v0)
        //   Scenes.items.tempTitle24.setContent(v0)
        //   Scenes.items.tempTitle25.setContent(v0)
        //   Scenes.items.tempTitle26.setContent(i0)
        //   Scenes.items.tempTitle27.setContent(i2-i0)
        //   Scenes.items.tempTitle28.setContent(i1-i0)
        //   Scenes.items.tempTitle29.setContent("0")
          
        //   //source maasurements
        //   Scenes.items.tempTitle30.setContent(vG)
        //   Scenes.items.tempTitle31.setContent(vG)
        //   Scenes.items.tempTitle32.setContent(vG)
        //   Scenes.items.tempTitle33.setContent(i1)
        //   Scenes.items.tempTitle34.setContent(i2)
        //   Scenes.items.tempTitle35.setContent(i2)
        //   Scenes.items.tempTitle36.setContent(i1)
        //   Scenes.items.tempTitle37.setContent(iIn)
  
        //   //load measurements
        //   Scenes.items.tempTitle38.setContent(v0)
        //   Scenes.items.tempTitle39.setContent(v0)
        //   Scenes.items.tempTitle40.setContent(v0)
        //   Scenes.items.tempTitle41.setContent(i0)
        //   Scenes.items.tempTitle42.setContent(i0)
        //   Scenes.items.tempTitle43.setContent(i0)

        //   // updateValues(vInValue, dutyRatioValue, resistanceValue);

        //   // Scenes.items.tempTitle1.setContent(vInValue);
        //   // Scenes.items.tempTitle2.setContent(Number(v0 - iIn).toFixed(1));
        //   // Scenes.items.tempTitle3.setContent(iIn);
        //   // Scenes.items.tempTitle4.setContent(iIn);

        //   // Scenes.items.tempTitle5.setContent(v0);
        //   // Scenes.items.tempTitle6.setContent(iIn);

        //   // Scenes.items.tempTitle7.setContent(v0);
        //   // Scenes.items.tempTitle8.setContent(v0);
        //   // Scenes.items.tempTitle9.setContent(Number(iIn - i0).toFixed(1));

        //   // Scenes.items.tempTitle10.setContent(vInValue);
        //   // Scenes.items.tempTitle11.setContent(vInValue);
        //   // Scenes.items.tempTitle12.setContent(iIn);
        //   // Scenes.items.tempTitle13.setContent(iIn);

        //   // Scenes.items.tempTitle14.setContent(v0);
        //   // Scenes.items.tempTitle15.setContent(iIn);

        //   // Scenes.items.tempTitle16.setContent(v0);
        //   // Scenes.items.tempTitle17.setContent(v0);
        //   // Scenes.items.tempTitle18.setContent(i0);
        //   // Scenes.items.tempTitle19.setContent(i0);

        //   currentGraph.hide();
        //   Scenes.items.part_2_graph_2.show();
        //   currentGraph = Scenes.items.part_2_graph_2;
        // }

        // if (dutyRatioValue == 0.75) {

        //   updateValues(vG, dutyRatioValue, resistanceValue);


        //   //temp titles for inductor
        //   Scenes.items.tempTitle1.setContent(vG)
        //   Scenes.items.tempTitle2.setContent(v0 - vG)
        //   Scenes.items.tempTitle3.setContent("0")
        //   Scenes.items.tempTitle4.setContent(i1)
        //   Scenes.items.tempTitle5.setContent(i2)
        //   Scenes.items.tempTitle6.setContent(i2)
        //   Scenes.items.tempTitle7.setContent(i1)
        //   Scenes.items.tempTitle8.setContent(iIn)
  
        //   //temp titles for switch
        //   Scenes.items.tempTitle9.setContent("0")
        //   Scenes.items.tempTitle10.setContent(v0)
        //   Scenes.items.tempTitle11.setContent((1-dutyRatioValue) * v0)
        //   Scenes.items.tempTitle12.setContent(i1)
        //   Scenes.items.tempTitle13.setContent(i2)
        //   Scenes.items.tempTitle14.setContent("0")
        //   Scenes.items.tempTitle15.setContent(dutyRatioValue * iIn)
  
        //   //for diode d
        //   Scenes.items.tempTitle16.setContent(v0)
        //   Scenes.items.tempTitle17.setContent("0")
        //   Scenes.items.tempTitle18.setContent(dutyRatioValue*v0)
        //   Scenes.items.tempTitle19.setContent("0")
        //   Scenes.items.tempTitle20.setContent(i2)
        //   Scenes.items.tempTitle21.setContent(i1)
        //   Scenes.items.tempTitle22.setContent((1-dutyRatioValue) * iIn)
                  
        //   //for capacitor
        //   Scenes.items.tempTitle23.setContent(v0)
        //   Scenes.items.tempTitle24.setContent(v0)
        //   Scenes.items.tempTitle25.setContent(v0)
        //   Scenes.items.tempTitle26.setContent(i0)
        //   Scenes.items.tempTitle27.setContent(i2-i0)
        //   Scenes.items.tempTitle28.setContent(i1-i0)
        //   Scenes.items.tempTitle29.setContent("0")
          
        //   //source maasurements
        //   Scenes.items.tempTitle30.setContent(vG)
        //   Scenes.items.tempTitle31.setContent(vG)
        //   Scenes.items.tempTitle32.setContent(vG)
        //   Scenes.items.tempTitle33.setContent(i1)
        //   Scenes.items.tempTitle34.setContent(i2)
        //   Scenes.items.tempTitle35.setContent(i2)
        //   Scenes.items.tempTitle36.setContent(i1)
        //   Scenes.items.tempTitle37.setContent(iIn)
  
        //   //load measurements
        //   Scenes.items.tempTitle38.setContent(v0)
        //   Scenes.items.tempTitle39.setContent(v0)
        //   Scenes.items.tempTitle40.setContent(v0)
        //   Scenes.items.tempTitle41.setContent(i0)
        //   Scenes.items.tempTitle42.setContent(i0)
        //   Scenes.items.tempTitle43.setContent(i0)

        //   // updateValues(vInValue, dutyRatioValue, resistanceValue);

        //   // Scenes.items.tempTitle1.setContent(vInValue);
        //   // Scenes.items.tempTitle2.setContent(Number(v0 - iIn).toFixed(1));
        //   // Scenes.items.tempTitle3.setContent(iIn);
        //   // Scenes.items.tempTitle4.setContent(iIn);

        //   // Scenes.items.tempTitle5.setContent(v0);
        //   // Scenes.items.tempTitle6.setContent(iIn);

        //   // Scenes.items.tempTitle7.setContent(v0);
        //   // Scenes.items.tempTitle8.setContent(v0);
        //   // Scenes.items.tempTitle9.setContent(Number(iIn - i0).toFixed(1));

        //   // Scenes.items.tempTitle10.setContent(vInValue);
        //   // Scenes.items.tempTitle11.setContent(vInValue);
        //   // Scenes.items.tempTitle12.setContent(iIn);
        //   // Scenes.items.tempTitle13.setContent(iIn);

        //   // Scenes.items.tempTitle14.setContent(v0);
        //   // Scenes.items.tempTitle15.setContent(iIn);

        //   // Scenes.items.tempTitle16.setContent(v0);
        //   // Scenes.items.tempTitle17.setContent(v0);
        //   // Scenes.items.tempTitle18.setContent(i0);
        //   // Scenes.items.tempTitle19.setContent(i0);

        //   currentGraph.hide();
        //   Scenes.items.part_2_graph_3.show();
        //   currentGraph = Scenes.items.part_2_graph_3;

        //   // completed
        // }
        
        let dutyRatioValue = Number(Scenes.items.slider_D.item.value);

        if (dutyRatioValue == 0.25){
          currentGraph.hide();
          Scenes.items.part_2_graph_1.show();
          currentGraph = Scenes.items.part_2_graph_1;
        }
        if (dutyRatioValue == 0.5){
          currentGraph.hide();
          Scenes.items.part_2_graph_2.show();
          currentGraph = Scenes.items.part_2_graph_2;
        }
        if (dutyRatioValue == 0.75){
          currentGraph.hide();
          Scenes.items.part_2_graph_3.show();
          currentGraph = Scenes.items.part_2_graph_3;
        }
        setIsProcessRunning(false);
        Dom.setBlinkArrow(true, 630, 315)
      };
      


      
      return true
    }),
    (step3 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      
      // todo all previous elements hide
      Dom.hideAll();
      Scenes.items.contentAdderBox.item.innerHTML = ""

      Scenes.setStepHeading("Step-3", "Performance Analysis.");
      setCC("Click on the 'ICON' to plot the performance characteristics.")
      
      // * remove all previous restrictions
      
      // * Required Elements

      // Scenes.items.circuit_full_2.set(6,40,230)
      Scenes.items.part_3_option_select.set(225, -20, 430)
      Scenes.items.part_3_option_1.set(230,180,95, 170).zIndex(2)
      Scenes.items.part_3_option_2.set(288,-19, 105, 170).zIndex(2)
      Scenes.items.part_3_option_3.set(560, -15, 105, 170).zIndex(2)
      Scenes.items.part_3_option_4.set(610,180, 105, 178).zIndex(2)
      Scenes.items.part_3_option_5.set(420,290, 100, 170).zIndex(2)
      // hide the slider
      Scenes.items.slider_box.hide()

      let rightTicks = [
        Scenes.items.right_tick_1.set(20,280).hide(),
        Scenes.items.right_tick_2.set(208,280).hide().zIndex(2001),
        Scenes.items.right_tick_3.set(435,280).hide(),
        Scenes.items.right_tick_4.set(630,280).hide()
      ]

      // hide all tables
      // Scenes.items.part3_table_one.hide()
      // Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      // Scenes.items.part3_table_four.hide()
      // Scenes.items.part3_table_four_2.hide()

      // active all sliders
      

      // * showing right tick if done
      for(let i in rightTicks){
        if(Scenes.optionsDone[i] == 1){
          rightTicks[i].show()
        }
      }

      resetSliderValue()
      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.part_3_option_1,
        Scenes.items.part_3_option_2,
        Scenes.items.part_3_option_3,
        Scenes.items.part_3_option_4,
      ]

      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        

        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.steps[0+5]()
      }
      const opTwo = ()=>{
       

        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.steps[1+5]()
      }
      const opThree = ()=>{
        

        Scenes.optionsDone[2]=1;
        Scenes.forMathematicalExpressionBtn = 3
        Scenes.steps[2+5]()
      }
      const opFour = ()=>{
        

        Scenes.optionsDone[3]=1;
        Scenes.forMathematicalExpressionBtn = 4
        Scenes.steps[3+5]()
      }
      options[0].item.onclick = opOne
      rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      rightTicks[1].item.onclick = opTwo

      options[2].item.onclick =  opThree
      rightTicks[2].item.onclick = opThree

      options[3].item.onclick =  opFour
      rightTicks[3].item.onclick = opFour

      // ! if all options done then exit
      let exit = true
      for(let i of Scenes.optionsDone){
        if(i==0){
          exit = false
          break
        }
      }      

      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulator Done");
        setIsProcessRunning(false);
      }

      return true;

    }),
    (step4 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        "Ideal voltage gain plot."
      )
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
      Scenes.items.slider_box.set(0,-10)
      Scenes.items.btn_next.show()

      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_3.set(-30, 155)
       Scenes.items.part3_table_one.set(0,160, null).scale(0.9)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.record_btn.set(770,220,70)
      Scenes.items.btn_delete.set(785,290)
      Scenes.items.btn_reset.set(787,350)
      // Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_one.item
       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
      

      // generate option
      sliders.generateOptionsFor(0)

       // ! graph
      Scenes.items.graph4.set(null,null,220,355)
      let ctx = Scenes.items.graph4.item
      
      // let xLabel = "Output Power (Po)"
      let xLabel = ""
      let yLabel = "Efficiency (%)"
      function plotGraph(data,label,xLabel,yLabel,beginAtZero=false){
        let x = new Chart(ctx, {
          type: "scatter",
          plugins: [{
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
            
          }],
          data: {
            datasets: [
                {
                  label: label,
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
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,50,-50,30,30,-90).play()
        setCC("Select the value of V<sub>g</sub>")

        sliders.vImg.onclick = ()=>{
          sliderV()
          sliders.vImg.click()
          Dom.setBlinkArrowRed(true,215,110,null,null,90).play()
          setCC("Set the value of D",5)

          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,560,75).play()
            setCC("Set the value of R")

            sliders.r.onclick = ()=>{
              Dom.setBlinkArrowRed(true,894,226).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
          }
        }
      }
      if(recordBtnClickIdx == 0){
        // stepTutorial2()
      }

      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

       
          let graphData = []
          var rows = table.tBodies[0].rows
          let n = 8
          for(let i=0;i<n;i++){
            let x = rows[i].cells[3].innerHTML
            ,y=null
            ,labely = null
            ,labelx = "Duty Ratio (D)"
            switch(characteristicsValue){
              case  'D-vs-M': 
                y = rows[i].cells[5].innerHTML
                labely = "Voltage Gain (M)"
                break
              case  'D-vs-I': 
                y = rows[i].cells[7].innerHTML
                labely = "I (A)"
                break
              case  'D-vs-V': 
                y = rows[i].cells[4].innerHTML
                labely = "V (V)"
                break
            }
            graphData.push(
              {
                x: rows[i].cells[3].innerHTML,
                y: rows[i].cells[5].innerHTML
              }
            )
          }
          plotGraph(graphData,"Efficiency","",yLabel)
          Scenes.items.graph4.set(null,null,220,355)

      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 4

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
        let n=7
        // * to get old values from table for matching
        for(let i=0;i<n;i++){
          let val = rows[i].cells[2].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph([{}],"Efficiency","",yLabel,true) 
        Scenes.items.graph4.set(null,null,220,355)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let row = table.tBodies[0].rows
        let n=11
        
        for(let i=1;i<n;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          disableSlider("reset")
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=11
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        // reset all the parameters
        // so just simply call this step again
        sliders.reset()
        Scenes.steps[7]()        
        
      }

      // ! onclick for record
      Scenes.items.record_btn.item.onclick = function(){ 
         // for arrow system
         if(recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,560,75).play()
            setCC("Change the value of D and Record it")

              Scenes.items.slider_R.onclick = ()=>{
              Dom.setBlinkArrowRed(true,894,226).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
        }else{
          Dom.setBlinkArrowRed(-1)
        }
        
        let vInValue = Number(Scenes.items.slider_vIn.item.value)
        let dutyRatioValue = Number(Scenes.items.slider_D.item.value)
        let resistanceValue = Number(Scenes.items.slider_R.item.value)
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // ! Can't select same values
        if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=8){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=8
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[8].innerHTML)
                    let val2 = Number(rows[j+1].cells[8].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

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
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }


        

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = resistanceValue
        tableRow.cells[3].innerHTML = dutyRatioValue
        tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

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
        if(recordBtnClickIdx==8){
          setCC("Press Record")
        }
      }    
       
      

      
      return true
    }),
    // (step4 = function () {
    //   Dom.hideAll(); 
    //   // optionsDone
    //   setIsProcessRunning(true);
    //   Scenes.items.btn_next.show()
    //   Scenes.items.contentAdderBox.setContent("");
    //   Scenes.setStepHeading(
    //     "",
    //     "Ideal voltage gain plot."
    //   );
    //   // ! show the slider
    //   Scenes.items.slider_box.set(0, 0)
    //   // setCC("Record  7 reading for different Duty Ratio.")
      
    //   // ! required item
    //   // circuit full 3 replaced by 2 because of changes
    //   // Scenes.items.circuit_full_2.set(230,-50,175)
    //   // Scenes.items.part_3_option_1.set(10, 170-15)
    //   // Scenes.items.right_tick_1.set(-12,185-15)
    //   // Scenes.items.graph1_arrow.set(-5,6)
    //   Scenes.items.part3_table_one.set(10).show("flex")
    //   Scenes.items.record_btn.set(610,365,60)
    //   Scenes.items.btn_delete.set(730,365)
    //   Scenes.items.btn_reset.set(820,365)
    //   let valuesToMatch = [
    //     [],
    //     [],
    //     []
    //   ]

    //   let table = Scenes.items.part3_table_three.item
    //   // let table1 = table.children[0]
    //   // let table2 = table.children[1]
    //   // let table3 = table.children[2] 
    //   // let tablesBody = [
    //   //   table.children[0].tBodies[0],
    //   //   table.children[1].tBodies[0],
    //   //   table.children[2].tBodies[0]
    //   // ]    
    //   // let tableHeadTitle = getAll(".part3_table_one .title")
    //    // * index to handle records
    //   let recordBtnClickIdx = (table3.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

    //   // disable voltage slider
    //   disableSlider("v")

     
    //   // ! Tutorial Function

    //   function stepTutorial2(){
        
    //     Dom.setBlinkArrowRed(true,570,75).play()
    //     setCC("Set the value of R")

    //     sliders.r.onclick = ()=>{
    //       Dom.setBlinkArrowRed(true,642,330,null,null,-90).play()
    //       setCC("Press Record")

    //       sliders.d.onclick = ()=>{
    //         Dom.setBlinkArrowRed(true,642,330,null,null,-90).play()
    //         setCC("Press Record")
    //       }
    //     }
    //   }
    //   if(recordBtnClickIdx == 0){
    //     stepTutorial2()
    //   }
      


    //   // ! graph
    //   // * add x,y parameters for graph
    //   // let graphData = []
      
    //   let graph_box1 = new Dom(".graph_box1")
    //   let graph_box2 = new Dom(".graph_box2")

    //   Scenes.items.graph1.set(null,null,210,330)
    //   Scenes.items.graph2.set(null,null,210,330)
    //   graph_box2.set(null,145)

    //   let ctx1 = Scenes.items.graph1.item
    //   let ctx2 = Scenes.items.graph2.item

    //   let chart1 = Scenes.items.chart.graph1
    //   let chart2 = Scenes.items.chart.graph2
    //   let isDataDeleteable = true
    //   if(chart1==null){
    //     isDataDeleteable = true
    //   }else{
    //     isDataDeleteable = false
    //   }
    //   // temp text for adding zero
    //   Scenes.items.tempText.setContent(0).set(565,-89).styles({
    //     rotate: "-90deg",
    //     backgroundColor: "transparent",
    //     fontSize: "10px",
    //   })

    //   function plotGraph(data1=[[],[],[]],data2=[[],[],[]]){
    //     if(chart1!=null){
    //       chart1.destroy()
    //     }
    //     if(chart2!=null){
    //       chart2.destroy()
    //     }
    //     chart1 = new Chart(ctx1, {
    //       type: "scatter",
    //       data: {
    //         datasets: [
    //             {
    //               label: "24 V",
    //               fill: false,
    //               borderColor: "red",
    //               backgroundColor: "red",
    //               data: data1[0],
    //             },
    //             {
    //               label: "48 V",
    //               fill: false,
    //               borderColor: "green",
    //               backgroundColor: "green",
    //               data: data1[1],
    //             },
    //             {
    //               label: "72 V",
    //               fill: false,
    //               borderColor: "blue",
    //               backgroundColor: "blue",
    //               data: data1[2],
    //             },
    //         ],
    //       },
    //       options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //           yAxes: [
    //             {
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: "Load Voltage (V )",
    //                 fontColor: 'black',
    //                 fontSize: 17,
  
    //               },
    //               ticks: { 
    //                 beginAtZero:true,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //           xAxes: [
    //             {
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: "Duty Ratio (D)",
    //                 fontColor: 'black',
    //                 fontSize: 17,
    //               },
    //               ticks: { 
    //                 beginAtZero:true,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //                }
    //             },
    //           ],
    //         },
    //       },
    //     })
       
    //     chart2 = new Chart(ctx2, {
    //       type: "scatter",
    //       data: {
    //         datasets: [
    //             {
    //               label: "24 V",
    //               fill: false,
    //               borderColor: "red",
    //               backgroundColor: "red",
    //               data: data2[0],
    //             },
    //             {
    //               label: "48 V",
    //               fill: false,
    //               borderColor: "green",
    //               backgroundColor: "green",
    //               data: data2[1],
    //             },
    //             {
    //               label: "72 V",
    //               fill: false,
    //               borderColor: "blue",
    //               backgroundColor: "blue",
    //               data: data2[2],
    //             },
    //         ],
    //       },
    //       options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //           yAxes: [
    //             {
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: "Voltage Gain (M)",
    //                 fontColor: 'black',
    //                 fontSize: 17,
  
    //               },
    //               ticks: { 
    //                 beginAtZero:true,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //               }
    //             },
    //           ],
    //           xAxes: [
    //             {
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: "Duty Ratio (D)",
    //                 fontColor: 'black',
    //                 fontSize: 17,
    //               },
    //               ticks: { 
    //                 beginAtZero:true,
    //                 fontColor: 'black',
    //                 fontSize: 14,
    //                }
    //             },
    //           ],
    //         },
    //       },
    //     })
       
    //     Scenes.items.chart.graph1 = chart1
    //     Scenes.items.chart.graph2 = chart2
    //     graph_box1.set(null,null,210,330)
    //     graph_box2.set(null,null,210,330)
    //     // Scenes.items.graph1.set(null,null,210,330)
    //     // Scenes.items.graph2.set(null,null,210,330)

    //   }
      

    //   // get data
    //   function setDataToGraph(){
    //     Dom.setBlinkArrowRed(-1)
    //     sliders.d.onclick = ()=>{}
    //     isDataDeleteable = false
    //     let data1 = [
    //       [],
    //       [],
    //       [],
    //     ]
    //     let data2 = [
    //       [],
    //       [],
    //       [],
    //     ]

    //     tablesBody.forEach((table,idx)=>{
    //       let axes1 = []
    //       let axes2 = []
    //       for(let i=0;i<table.rows.length;i++){
    //         let x = table.rows[i].cells[0].innerHTML
    //         let y1 = table.rows[i].cells[1].innerHTML
    //         let y2 = table.rows[i].cells[2].innerHTML
        
    //         // x is same for both
    //         axes1.push({x:x,y:y1})
    //         axes2.push({x:x,y:y2})
    //       }
    //       data1[idx] = axes1
    //       data2[idx] = axes2
    //     })

      
    //     plotGraph(data1,data2)
    //   }

    //   // to active the table header portion
    //   function activePortion(idx=0){
    //       let thead =   getAll(".part3_table_one .table-title")
    //       thead.forEach(ele=>{
    //         ele.classList.add("deactive")
    //       })
    //       if(idx!=-1)
    //         thead[idx].classList.remove("deactive")
    //   }
    //   activePortion(0)

    //   // ! ------------> If data already present plot the graph
    //   if(table3.tBodies[0].rows[6].cells[2].innerHTML !== ""){
    //     // setDataToGraph()= 
    //       setIsProcessRunning(false)
    //       Scenes.currentStep  = 4

    //       recordBtnClickIdx = 21
    //       let r=7
    //       let tab=3
    //       // * to get old values from table for matching
    //       for(let i=0;i<tab;i++){
    //         let arr = []
    //         for(let j=0;j<r;j++){
    //           arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
    //         }
    //         valuesToMatch.push(arr)
    //       }

    //       disableSlider("r")
    //       disableSlider("v")
    //       setDataToGraph()
    //   }else{
    //     plotGraph()
    //   }
       
    //   //!onclick for delete btn
    //   Scenes.items.btn_delete.item.onclick =  function(){
    //     if((recordBtnClickIdx <= 0 || recordBtnClickIdx > 21) || !isDataDeleteable){
    //       return
    //     }

    //     if(recordBtnClickIdx==0){
    //       activePortion(0)
    //     }else if(recordBtnClickIdx==7){
    //       activePortion(0)
    //       sliders.vImg.click()
    //       sliders.vImg.click() 
    //       currentTableIdx = 0
    //     }else if(recordBtnClickIdx==14){
    //       activePortion(1)
    //       sliders.vImg.click()
    //       sliders.vImg.click()
    //       currentTableIdx = 1
    //     }
    //       if((recordBtnClickIdx-1)%7==0 || (recordBtnClickIdx-2)%7==0){
    //         tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
    //         tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
    //       }else{
    //         tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[0].innerHTML = "" ;
    //         tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
    //         tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
    //       }
    //     recordBtnClickIdx = recordBtnClickIdx-1
    //     if(recordBtnClickIdx==0){
    //       disableSlider("reset")
    //       disableSlider("v")
    //     }
    //     valuesToMatch[currentTableIdx].pop()
    //   }

    //   //! onclick for reset 
    //   Scenes.items.btn_reset.item.onclick = function(){
    //     function tableReset(){
    //       tablesBody.forEach((table,idx)=>{
    //         for(let i=0;i<table.rows.length;i++){
    //           table.rows[i].cells[0].innerHTML = ""
    //           table.rows[i].cells[1].innerHTML = ""
    //           table.rows[i].cells[2].innerHTML = ""
    //         }

    //         table.rows[0].cells[0].innerHTML = "0.1"
    //         table.rows[1].cells[0].innerHTML = "0.9"
    //       })

    //     }
    //     tableReset()

    //     // reseting the graph
    //     Scenes.items.chart.graph1.destroy()
    //     Scenes.items.chart.graph2.destroy()

    //     // reset all the parameters
    //     // so just simply call this step again
    //     sliders.reset()
    //     Scenes.steps[5]() 
        
    //   }

    //   let currentTableIdx = 0
    //   // ! onclick for record
    //   Scenes.items.record_btn.item.onclick = function(){
    //     // for arrow system
    //     if(
    //       recordBtnClickIdx%7 == 0 || (recordBtnClickIdx-1)%7==0
    //       || recordBtnClickIdx == 20
    //     ){
    //       // Dom.setBlinkArrowRed(-1)
    //       // slidersBox[1].onclick = ()=>{}
    //       Dom.setBlinkArrowRed(true,642,330,null,null,-90).play()
    //       setCC("Press Record")
    //     }else{
    //       Dom.setBlinkArrowRed(true,295,75).play()
    //       setCC("Change the value of Duty ratio (D) in steps and record it")
    //       // slidersBox[1].onclick = ()=>{
    //       //   Dom.setBlinkArrowRed(true,180,280).play()
    //       //   setCC("Press record button",7)
    //       // }
    //     }

    //     let vInValue = Number(sliders.v.value)
    //     let dutyRatioValue = Number(sliders.d.value)
    //     let resistanceValue = Number(sliders.r.value)

    //     if(recordBtnClickIdx<7){
    //       vInValue = 24
    //       currentTableIdx = 0
    //     }else if(recordBtnClickIdx<14){
    //       vInValue = 48
    //       currentTableIdx = 1
    //     }else if(recordBtnClickIdx<21){
    //       vInValue = 72
    //       currentTableIdx = 2
    //     }
    //     if(recordBtnClickIdx==0){
    //       activePortion(0)
    //     }else if(recordBtnClickIdx==6){
    //       activePortion(1)
    //       sliders.vImg.click()
    //     }else if(recordBtnClickIdx==13){
    //       activePortion(2)
    //       sliders.vImg.click()
    //     }
    //     if(recordBtnClickIdx%7==0){
    //       dutyRatioValue = 0.1
    //     }else if((recordBtnClickIdx-1)%7==0){
    //       dutyRatioValue = 0.9
    //     }
    //     // diable resistance
    //     if(recordBtnClickIdx==0){
    //       disableSlider("r")
    //     }
        
    //     updateValues(vInValue,dutyRatioValue,resistanceValue)

    //     // ! Can't select same values
    //     // todo do it <21 back 
    //     if(recordBtnClickIdx < 21 && valuesToMatch[currentTableIdx].indexOf(dutyRatioValue)!=-1){
    //       setCC("Please select different value.")
    //       return
    //     }else if(recordBtnClickIdx < 21){
    //       valuesToMatch[currentTableIdx].push(dutyRatioValue)
    //     }
        
    //     // ! sort the data
    //     if(recordBtnClickIdx==21){
    //       var rows = null

    //       function sortTable(){
    //         function so(){
    //           let n=7
    //           for(let i=0;i<n;i++){
    //               for(let j=0;j<n-i-1;j++){
    //                   if(rows[j].cells[0].innerHTML > rows[j+1].cells[0].innerHTML){
    //                       let temp = rows[j].innerHTML
    //                       rows[j].innerHTML = rows[j+1].innerHTML
    //                       rows[j+1].innerHTML = temp
    //                   }
    //               }
    //           }
    //         }
    //         for(let i=0;i<3;i++){
    //           rows = tablesBody[i].rows
    //           so()
    //         }
            
    //       }
    //       sortTable()

    //       // * plot the graph
    //       // adding parameter to x,y graph
    //       // ! calling the graph update function
    //       setDataToGraph()

    //       // after complete
    //       Dom.setBlinkArrow(true, 790, 408).play()
    //       setCC("Click 'Next' to go to next step")
    //       setIsProcessRunning(false)
    //       Scenes.currentStep = 4
    //     }

    //     if(recordBtnClickIdx < 21){
    //       let tableRow = tablesBody[currentTableIdx].rows[recordBtnClickIdx++%7]
    //       tableRow.cells[0].innerHTML = dutyRatioValue
    //       tableRow.cells[1].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
    //       tableRow.cells[2].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)
    //     }

    //     // warning for sorting the data
    //     if(recordBtnClickIdx==7){
    //       setCC("Click 'Record' to sort the table according to D and plot the graph.")
    //     }

        
    //   }    

    //   return true;

    // }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "",
        "Non-ideal gain."
      );
      // setCC("Record 7 reading for 3 different load resistances.")
      // ! show the slider
      Scenes.items.slider_box.set(10,-10).scale(0.9)
      Scenes.items.btn_next.show()
      
      
      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_2.set(-20, 170-120).zIndex(2000)
      // Scenes.items.right_tick_1.set(-3,185-120).zIndex(2000)
      Scenes.items.part3_table_one.set(10,140).scale(0.98)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.record_btn.set(770,220,70)
      Scenes.items.btn_delete.set(785,290)
      Scenes.items.btn_reset.set(787,350)
      // Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_one.item
       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
      


       // ! graph
      Scenes.items.graph4.set(null,null,220,355)
      let ctx = Scenes.items.graph4.item
      
      // let xLabel = "Output Power (Po)"
      let xLabel = ""
      let yLabel = "Efficiency (%)"
      function plotGraph(data,label,xLabel,yLabel,beginAtZero=false){
        let x = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            afterDraw: chart => {
              var ctx = chart.chart.ctx;
              ctx.save();
              ctx.textAlign = 'center';
              ctx.font = '18px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              ctx.textAlign = 'left';
              ctx.font = '10px Arial';
              ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              ctx.restore();
            },
            
          }],
          data: {
            datasets: [
                {
                  label: label,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,50,-50,30,30,-90).play()
        setCC("Select the value of V<sub>g</sub>")

        sliders.vImg.onclick = ()=>{
          sliderV()
          sliders.vImg.click()
          Dom.setBlinkArrowRed(true,215,110,null,null,90).play()
          setCC("Set the value of D",5)

          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,560,75).play()
            setCC("Set the value of R")

            sliders.r.onclick = ()=>{
              Dom.setBlinkArrowRed(true,894,226).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
          }
        }
      }
      if(recordBtnClickIdx == 0){
        // stepTutorial2()
      }

      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

        if(characteristicsValue == "D-vs-M"){
          let graphData = []
          var rows = table.tBodies[0].rows
          let n = 7
          for(let i=0;i<n;i++){
            graphData.push(
              {
                x: rows[i].cells[3].innerHTML,
                y: rows[i].cells[5].innerHTML
              }
            )
          }
          plotGraph(graphData,"Efficiency","",yLabel)
          Scenes.items.graph4.set(null,null,220,355)

        }
        if(characteristicsValue == "D-vs-I"){
          let graphData = []
          var rows = table.tBodies[0].rows
          let n = 7
          for(let i=0;i<n;i++){
            graphData.push(
              {
                x: rows[i].cells[3].innerHTML,
                y: rows[i].cells[7].innerHTML
              }
            )
          }
          plotGraph(graphData,"Efficiency","",yLabel)
          Scenes.items.graph4.set(null,null,220,355)

        }
        if(characteristicsValue == "D-vs-V"){
          let graphData = []
          var rows = table.tBodies[0].rows
          let n = 7
          for(let i=0;i<n;i++){
            graphData.push(
              {
                x: rows[i].cells[3].innerHTML,
                y: rows[i].cells[4].innerHTML
              }
            )
          }
          plotGraph(graphData,"Efficiency","",yLabel)
          Scenes.items.graph4.set(null,null,220,355)

        }
       
      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 4

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
        let n=7
        // * to get old values from table for matching
        for(let i=0;i<n;i++){
          let val = rows[i].cells[2].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph([{}],"Efficiency","",yLabel,true) 
        Scenes.items.graph4.set(null,null,220,355)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let row = table.tBodies[0].rows
        let n=11
        
        for(let i=1;i<n;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          disableSlider("reset")
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=11
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        // reset all the parameters
        // so just simply call this step again
        sliders.reset()
        Scenes.steps[7]()        
        
      }

      // ! onclick for record
      Scenes.items.record_btn.item.onclick = function(){ 
         // for arrow system
         if(recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,560,75).play()
            setCC("Change the value of D and Record it")

              Scenes.items.slider_R.onclick = ()=>{
              Dom.setBlinkArrowRed(true,894,226).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
        }else{
          Dom.setBlinkArrowRed(-1)
        }
        
        let vInValue = Number(Scenes.items.slider_vIn.item.value)
        let dutyRatioValue = Number(Scenes.items.slider_D.item.value)
        let resistanceValue = Number(Scenes.items.slider_R.item.value)
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // ! Can't select same values
        if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=8){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=8
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[8].innerHTML)
                    let val2 = Number(rows[j+1].cells[8].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

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
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }


        

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = resistanceValue
        tableRow.cells[3].innerHTML = dutyRatioValue
        tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        // tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        // tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

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
        if(recordBtnClickIdx==8){
          setCC("Press Record")
        }
      }    
       
      

      
      return true;
    }),
    (step6 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        "Efficiency Plot."
      )
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
      Scenes.items.slider_box.set(10,-10).scale(0.9)
      Scenes.items.btn_next.show()

      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_3.set(-30, 155)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.record_btn.set(770,220,70)
      Scenes.items.btn_delete.set(785,290)
      Scenes.items.btn_reset.set(787,350)
      Scenes.items.part3_table_three.set(-20,140).scale(0.9)
       let table = Scenes.items.part3_table_three.item
       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[6].cells[4].innerHTML==""?0:7)
      
      // * Generate option in select charactersits
      let v = Scenes.items.slider_vIn.item
      let c = Scenes.items.slider_C.item
      let r = Scenes.items.slider_R.item
      generateOption(c,[
        "Po-vs-Losses",
        "Po-vs-Efficiency",
      ])
      generateOption(v,[
        "24",
        "36",
        "48",
      ])
      generateOption(r,[
        "0.25",
        "0.50",
        "0.75",
      ])
      let slider_ = document.querySelector(".slider-box-container-4")
      slider_.children[0].innerHTML = "R"
      slider_.children[1].min = 10
      slider_.children[1].max = 100
      slider_.children[1].step = 1

      // ! graph
      Scenes.items.graph4.set(null,null,220,355)
      let ctx = Scenes.items.graph4.item
      
      // let xLabel = "Output Power (Po)"
      let xLabel = ""
      let yLabel = "Efficiency (%)"
      function plotGraph(data,label,xLabel,yLabel,beginAtZero=false){
        let x = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            afterDraw: chart => {
              var ctx = chart.chart.ctx;
              ctx.save();
              ctx.textAlign = 'center';
              ctx.font = '18px Arial';
              ctx.fillStyle = 'black';
              ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
              ctx.textAlign = 'left';
              ctx.font = '10px Arial';
              ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
              ctx.restore();
            },
            
          }],
          data: {
            datasets: [
                {
                  label: label,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,50,-50,30,30,-90).play()
        setCC("Select the value of V<sub>g</sub>")

        sliders.vImg.onclick = ()=>{
          sliderV()
          sliders.vImg.click()
          Dom.setBlinkArrowRed(true,215,110,null,null,90).play()
          setCC("Set the value of D",5)

          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,560,75).play()
            setCC("Set the value of R")

            sliders.r.onclick = ()=>{
              Dom.setBlinkArrowRed(true,894,226).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
          }
        }
      }
      if(recordBtnClickIdx == 0){
        // stepTutorial2()
      }

      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

        if(characteristicsValue == "Po-vs-Losses"){
          let graphData = []
          var rows = table.tBodies[0].rows
          let n = 8
          for(let i=0;i<n;i++){
            graphData.push(
              {
                x: rows[i].cells[8].innerHTML,
                y: rows[i].cells[9].innerHTML
              }
            )
          }
          plotGraph(graphData,"Efficiency","",yLabel)
          Scenes.items.graph4.set(null,null,220,355)

        }
        if(characteristicsValue == "Po-vs-Efficiency"){
          let graphData = []
          var rows = table.tBodies[0].rows
          let n = 8
          for(let i=0;i<n;i++){
            graphData.push(
              {
                x: rows[i].cells[8].innerHTML,
                y: rows[i].cells[10].innerHTML
              }
            )
          }
          plotGraph(graphData,"Efficiency","",yLabel)
          Scenes.items.graph4.set(null,null,220,355)

        }

       
      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 4

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
        let n=7
        // * to get old values from table for matching
        for(let i=0;i<n;i++){
          let val = rows[i].cells[2].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph([{}],"Efficiency","",yLabel,true) 
        Scenes.items.graph4.set(null,null,220,355)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > 8){
          return
        }
        let row = table.tBodies[0].rows
        let n=11
        
        for(let i=1;i<n;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          disableSlider("reset")
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
        let n=7
        let m=11
  
        for(let i=0;i<n;i++){
          for(let j=1;j<m;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        // reset all the parameters
        // so just simply call this step again
        sliders.reset()
        Scenes.steps[7]()        
        
      }

      // ! onclick for record
      Scenes.items.record_btn.item.onclick = function(){ 
         // for arrow system
         if(recordBtnClickIdx < 6){
            Dom.setBlinkArrowRed(true,560,75).play()
            setCC("Change the value of D and Record it")

              Scenes.items.slider_R.onclick = ()=>{
              Dom.setBlinkArrowRed(true,894,226).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
        }else{
          Dom.setBlinkArrowRed(-1)
        }
        
        let vInValue = Number(Scenes.items.slider_vIn.item.value)
        let dutyRatioValue = Number(Scenes.items.slider_D.item.value)
        let resistanceValue = Number(Scenes.items.slider_R.item.value)
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // ! Can't select same values
        if(recordBtnClickIdx < 8 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=8){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=8
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[8].innerHTML)
                    let val2 = Number(rows[j+1].cells[8].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

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
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }


        

        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          // disableSlider("v")
          // disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = resistanceValue
        tableRow.cells[3].innerHTML = dutyRatioValue
        tableRow.cells[4].innerHTML = Number(Formulas.efficiencyPlot.v0(values)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.efficiencyPlot.M(values)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.efficiencyPlot.iIn(values)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.efficiencyPlot.i0(values)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.efficiencyPlot.pIn(values)).toFixed(2)
        tableRow.cells[9].innerHTML = Number(Formulas.efficiencyPlot.p0(values)).toFixed(2)
        tableRow.cells[10].innerHTML = Number(Formulas.efficiencyPlot.eff(values)).toFixed(2)

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
        if(recordBtnClickIdx==8){
          setCC("Press Record")
        }
      }    
       
      
      return true
    }),
    (step7 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        "Component Stress"
      )
        // ! show the slider
      Scenes.items.slider_box.set(-70)
      Scenes.items.btn_next.show()

      //! Required Items
      // Scenes.items.circuit_full_2.set(270,0,160)
      //  Scenes.items.part_3_option_4.set(-30, 170,100,220)
      // Scenes.items.right_tick_1.set(-12,185)
      Scenes.items.part3_table_four.set(10,170)
      Scenes.items.part3_table_four_2.set(10,240)
      Scenes.items.record_btn.set(465,180,60)
      //  Scenes.items.part_3_option_4_graph.set(295,-60,60)
      disableSlider("reset")


      let styles = {
        color: "black",
        backgroundColor: "white!important",
        width: "80px",
        rotate: "-90deg"
      }
      Scenes.items.tempTitle1.set(548,25).zIndex(4000).setContent("Switch").styles(styles)
      Scenes.items.tempTitle2.set(548,150).zIndex(4000).setContent("Diode").styles(styles)
      Scenes.items.tempTitle3.set(548,290).zIndex(4000).setContent("Capacitor").styles(styles)
       let graph_box5 = new Dom(".graph_box5")
       // ! graph
      // Scenes.items.graph4.set(null,null,190,290)
      Scenes.items.graph5.set(null,0,390,320).styles({marginLeft: "15px"})
      graph_box5.set(575,-70,475,365)
      let table = Scenes.items.part3_table_four.item

      let ctx2 = Scenes.items.graph5.item
      let chart2 = Scenes.items.chart.graph5
      
      function plotGraph(){
        let data = {
          labels: ['Switch', 'Diode', 'Capacitor'],
          datasets: [
              {
                  label: 'Voltage Stress',
                  backgroundColor: 'rgba(255, 0, 0, 1)',
                  borderColor: 'rgba(255, 0, 0, 1)',
                  borderWidth: 1,
                  data: []
              },
              {
                  label: 'Current Stress',
                  backgroundColor: 'rgba(0, 0, 255, 1)',
                  borderColor: 'rgba(0, 0, 255, 1)',
                  borderWidth: 1,
                  data: []
              },
              {
                  label: 'Power',
                  backgroundColor: 'rgba(0, 128, 0, 1)',
                  borderColor: 'rgba(0, 128, 0, 1)',
                  borderWidth: 1,
                  data: [],
              }
          ]
      };

      let options = {
          maintainAspectRatio: false,
          scales: {
              xAxes: [{
                  ticks: {
                      fontSize: 17,
                      fontWeight: 'bold',
                      fontColor: 'black',
                      beginAtZero: true
                  }
              }],
              yAxes: [{
                  ticks: {
                      display: false,
                      // fontSize: 17,
                      // fontWeight: 'bold',
                      // fontColor: 'black',
                      // beginAtZero: true,
                      // autoSkip: false,
                      // position: "right",
                      // maxRotation: 90, // Rotate labels to 90 degrees
                      // minRotation: 90,
                      // callback: function(value) {
                      //   return value // You can add custom formatting here if needed
                      // }
                  }
              }]
          }
      };

      chart2 = new Chart(ctx2, {
          type: 'horizontalBar',
          data: data,
          options: options
      });
      Scenes.items.chart.graph5 = chart2
      Scenes.items.graph5.set(0,0,475,345)
    }

      // let slidersBox = document.querySelectorAll(".slider")
      let slidersBox = document.querySelectorAll(".range-slider__range")
      function stepTutorial2(){

        
        Dom.setBlinkArrowRed(true,50,-50,30,30,-90).play()
        setCC("Select the value of V<sub>g</sub>")

        sliders.vImg.onclick = ()=>{
          sliderV()
          sliders.vImg.click()
          Dom.setBlinkArrowRed(true,215,110,null,null,90).play()
          setCC("Set the value of D",5)

          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,560,75).play()
            setCC("Set the value of R")

            sliders.r.onclick = ()=>{
              Dom.setBlinkArrowRed(true,504,140,30,30,-90).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
          }
        }

      }
      if(table.tBodies[0].rows[0].cells[3].innerHTML == ""){
        stepTutorial2()
      }
      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          console.log(data)
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

       // ! ------------> If data already present plot the graph
        if(table.tBodies[0].rows[0].cells[6].innerHTML !== ""){
          setIsProcessRunning(false)
          Scenes.items.graph5.set(0,0,475,345)
          Scenes.currentStep = 4
        }else{
          plotGraph()
        }   

       
       // ! onclick for record
       Scenes.items.record_btn.item.onclick = function(){
        Dom.setBlinkArrowRed(-1)

         let vInValue = Number(sliders.v.value)
         let dutyRatioValue = Number(sliders.d.value)
         let resistanceValue = Number(sliders.r.value)

         updateValues(vInValue,dutyRatioValue,resistanceValue)
 
         let tableRow = table.tBodies[0].rows[0]
         tableRow.cells[1-1].innerHTML = vInValue
         tableRow.cells[2-1].innerHTML = dutyRatioValue
         tableRow.cells[3-1].innerHTML = resistanceValue
         tableRow.cells[4-1].innerHTML = Number(Formulas.stress.v0(values)).toFixed(2)
         tableRow.cells[5-1].innerHTML = Number(Formulas.stress.M(values)).toFixed(2)
         tableRow.cells[6-1].innerHTML = Number(Formulas.stress.i2(values)).toFixed(2)
         tableRow.cells[7-1].innerHTML = Number(Formulas.stress.i0(values)).toFixed(2)


         let v0 = Number(Formulas.stress.v0(values)).toFixed(2)
         let i2 = Number(Formulas.stress.i2(values)).toFixed(2)
         let ic = Number(Formulas.stress.i2(values) - Formulas.stress.i0(values)).toFixed(2)
         let pSw = Number(Formulas.stress.pSw(values)).toFixed(2)
         let pDi = Number(Formulas.stress.pDi(values)).toFixed(2)
         
         // table two changes
         let table2Row = Scenes.items.part3_table_four_2.item.tBodies[0].rows
        table2Row[0].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
        table2Row[1].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
        table2Row[2].cells[1].innerHTML = `> v<sub>0</sub> (${v0})`
        
        table2Row[0].cells[2].innerHTML = `> i<sub>2</sub> (${i2})`
        table2Row[1].cells[2].innerHTML = `> i<sub>2</sub> (${i2})`
        table2Row[2].cells[2].innerHTML = `> (i<sub>2</sub>-i<sub>0</sub>)(${ic})`

        table2Row[0].cells[3].innerHTML = `> P<sub>Sw</sub> (${pSw})`
        table2Row[1].cells[3].innerHTML = `> i<sub>2</sub> (${pDi})`

        // ! add values to graph
        let graph2_voltageStress = [v0,v0,v0]
        let graph2_currentStress = [i2,i2,ic]
        let graph2_power = [pSw,pDi]

        // ! destroy and show new graph
        // plotGraph()
        graph.addData(chart2,0,graph2_voltageStress)
        graph.addData(chart2,1,graph2_currentStress)
        graph.addData(chart2,2,graph2_power)
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          // setCC("Click 'Next' to go to next step");
          setIsProcessRunning(false); 
          Scenes.currentStep = 4

          // ! fix resistance value to its original
          // resistanceSlider.min = 10
          // resistanceSlider.max = 500
          // resistanceSlider.step = 1        
          // resistanceSlider.value = 10
          // resistanceSlider.oninput = ()=>{}
       }    
      

      
      return true
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
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
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
}

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
Scenes.currentStep = 5

Scenes.next()
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
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

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