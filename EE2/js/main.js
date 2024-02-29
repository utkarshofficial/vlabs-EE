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
      .zIndex(5000);
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
part_2_circuit : new Dom("part_2_circuit"),
part_2_graph_1 : new Dom("part_2_graph_1"),
part_2_graph_2 : new Dom("part_2_graph_2"),
part_2_graph_3 : new Dom("part_2_graph_3"),
run_btn : new Dom("run_btn"),
slider_box : new Dom(".universal-slider"),
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
btn_reset_connections: new Dom(".btn-connections"),
part_1_text_for_circuit_diagram: new Dom("part_1_text_for_circuit_diagram"),

concept_development: new Dom(".concept_development"), 
        

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
        Scenes.items.slider_box.hide()
        
        let btn_transparent = Scenes.items.btn_transparent.set().item;
  
        Scenes.items.concept_development.set().styles({
          zIndex: "5000",
          scale: "1 0.9",
          top: "-140px",
          position: "absolute",
        })
  
        // ! Slide ended enable the button next button
        function checkIsSlideEnded(){
          let isSlideEnded = localStorage.getItem("isSlideEnded")
          if(isSlideEnded=="true"){
            btn_transparent.disabled = false
            setIsProcessRunning(false)
            btn_transparent.classList.remove("btn-disabled")
            // setCC("Click next to goto next slide.")
            Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
            btn_transparent.onclick = ()=>{
              Scenes.next()
              localStorage.setItem("isSlideEnded",false)
              window.clearInterval(interval)
            }
          }
        }
        var interval = window.setInterval(checkIsSlideEnded, 1000)
          
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
      Scenes.items.btn_reset_connections.styles({
        position: "absolute",
        right: 0,
        top: "195px",
        backgroundColor: "blue",
        color: "white",
      })

      Scenes.setStepHeading("Step-1", "Circuit Formulation");
      setCC("Connect the terminals for boost converter")

      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      let tConst = -10
      let lConst = 0
      Scenes.items.component_battery.set(20+lConst, 30+tConst, 180)
      Scenes.items.component_inductor.set(200-40+lConst, 260+tConst, 132)
      Scenes.items.component_diode.set(380+50+lConst, 282+tConst, 70)
      Scenes.items.component_mosfet.set(420+lConst, -40+tConst, 750)
      Scenes.items.component_capacitor.set(640+lConst, 20+tConst, 230)
      Scenes.items.btn_check_connections.set(770, 250)
      Scenes.items.btn_reset_connections.set()
      Scenes.items.btn_circuit_diagram.set(780, 330).item.classList.add("btn-deactive")
      Scenes.items.part_1_text_for_crrct.set(585,340, 40).hide()
      Scenes.items.part_1_text_for_wrong.set(630,310, 110).hide()
      Scenes.items.part_1_text_for_circuit_diagram.set(0,0).zIndex(2000).hide()

      // * Circuit Diagram Btn
      // Scenes.items.btn_circuit_diagram.item.classList.add("btn-deactive")
      Scenes.items.btn_circuit_diagram.item.onclick = ()=>{
        if(Scenes.items.part_1_text_for_circuit_diagram.item.style.display=="none"){
          Scenes.items.part_1_text_for_circuit_diagram.show()
          Scenes.items.btn_circuit_diagram.styles({
            boxShadow: "none"
          })
        }else{
          Scenes.items.part_1_text_for_circuit_diagram.hide()
          Scenes.items.btn_circuit_diagram.styles({
            boxShadow: "3px 2px 4px 0px black"
          })
        }
      }
     

      function isConnectionsRight(connections){
        let target = null
        if(connections){
          target = Scenes.items.part_1_text_for_crrct.set(585,340, 40).show()
          Scenes.items.part_1_text_for_wrong.set(630,310, 110).hide()
        }
        else{
          Scenes.items.part_1_text_for_crrct.set(585,340, 40).hide()
          target = Scenes.items.part_1_text_for_wrong.set(630,310, 110).show()
        }
        anime({
          targets: target.item,
          duration: 2000,
          easing: "easeInOutExpo",
          opacity: 0,
          complete: () => {
            target.hide()
          }
        })
      }


      Scenes.items.slider_box.hide();
      // ! JSPLumb cable 
      function cable(){
        
        let a = new Dom(".btn-check-connections")
        a.get().onclick = checkCableConnection

        // ! check
        function checkCableConnection() {
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }

          if (connections.length < 6) {
            // alert("Wrong Connections\nPlease go through the instructions once");
            isConnectionsRight(false)
            return false;
          }
          let isConnectionRight = false
          if (connections.length >= 6) {
            let matrixForCheckGraph = [
            // 0 1 2 3 4 5 6 7 8 9 10
              [0,0,0,0,0,0,0,0,0,0,0], // 0
              [0,0,0,1,0,0,0,0,0,0,0], // 1
              [0,0,0,0,0,0,1,0,1,0,0], // 2
              [0,1,0,0,0,0,0,0,0,0,0], // 3
              [0,0,0,0,0,0,0,1,0,1,0], // 4
              [0,0,0,0,0,0,0,0,0,0,1], // 5
              [0,0,1,0,0,0,0,0,1,0,0], // 6
              [0,0,0,0,1,0,0,0,0,1,0], // 7
              [0,0,1,0,0,0,1,0,0,0,0], // 8
              [0,0,0,0,1,0,0,1,0,0,0], // 9
              [0,0,0,0,0,1,0,0,0,0,0], // 10
            ]
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            for(let i=0;i<listDiv.length;i++){
              // substr is so i can extract the number from the id
              let vertex1 = parseInt(listDiv[i][0].substr(-1))
              let vertex2 = parseInt(listDiv[i][1].substr(-1))

              if(vertex1 == 0){
                vertex1 = 10
              }else if(vertex2 == 0){
                vertex2 = 10
              }


              if(matrixForCheckGraph[vertex1][vertex2]==1){
                isConnectionRight = true
              }
              else{
                isConnectionRight = false
                // * for connection wrong
                isConnectionsRight(false)
                Scenes.items.btn_circuit_diagram.item.classList.remove("btn-deactive")
                // alert("wrong")
                return false
              }
            }
            // * for right connection note
            isConnectionsRight(true)
            setIsProcessRunning(false);

          }
          
        }

        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) connections.push(conn);
          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };
            let radius = 14
            var exampleEndpoint1 = {
              endpoint: ["Dot", { radius: radius }],
              paintStyle: { fill: "pink" },
              isSource: true,
              scope: "green",
              connectorStyle: { stroke: "pink", strokeWidth: 6 },
              connector: ["Bezier", { curviness: 10 }],
              maxConnections: 1,
              isTarget: true,
              dropOptions: exampleDropOptions,
            };
            var exampleEndpoint2 = {
              endpoint: ["Dot", { radius: radius }],
              paintStyle: { fill: "black" },
              isSource: true,
              scope: "green",
              connectorStyle: { stroke: "black", strokeWidth: 6 },
              connector: ["Bezier", { curviness: -50 }],
              maxConnections: 2,
              isTarget: true,
              dropOptions: exampleDropOptions,
            };
            var exampleEndpoint3 = {
              endpoint: ["Dot", { radius: radius }],
              paintStyle: { fill: "red" },
              isSource: true,
              scope: "green",
              connectorStyle: { stroke: "red", strokeWidth: 6 },
              connector: ["Bezier", { curviness: -30 }],
              maxConnections: 2,
              isTarget: true,
              dropOptions: exampleDropOptions,
            };
            var exampleEndpoint4 = {
              endpoint: ["Dot", { radius: radius }],
              paintStyle: { fill: "green" },
              isSource: true,
              scope: "green",
              connectorStyle: { stroke: "green", strokeWidth: 6 },
              connector: ["Bezier", { curviness: -50 }],
              maxConnections: 1,
              isTarget: true,
              dropOptions: exampleDropOptions,
            };
            // conn 1
            instance.addEndpoint(
              "vertex1",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint1
            );
            instance.addEndpoint(
              "vertex3",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint1
            );

            // conn 2
            instance.addEndpoint(
              "vertex4",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint2
            );
            instance.addEndpoint(
              "vertex7",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint2
            );
            instance.addEndpoint(
              "vertex9",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint2
            );

            // conn 3
            instance.addEndpoint(
              "vertex8",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint3
            );
            instance.addEndpoint(
              "vertex6",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint3
            );
            instance.addEndpoint(
              "vertex2",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint3
            );

            // conn 4
            instance.addEndpoint(
              "vertex10",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint4
            );
            instance.addEndpoint(
              "vertex5",
              { anchor: [0.75, 0, 0, -1] },
              exampleEndpoint4
            );
            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset_connections.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),
    (step2 = function () {
      setIsProcessRunning(true);
      // destory all the connection 
      Scenes.items.btn_reset_connections.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })
      
      // * for setting the slider to its default value
      let sliderValueInput = document.querySelector(".r .value-box input")
      sliderValueInput.value = 50
      sliderValueInput.onkeyup()

      Scenes.setStepHeading(
        "Step-2",
        "Voltage and current waveforms."
      )
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,30,-15,30,30,-90).play()
        setCC("Select the value of V<sub>g</sub>")

        sliders.vImg.onclick = ()=>{
          sliderV()
          sliders.vImg.click()
          Dom.setBlinkArrowRed(true,185,114,null,null,90).play()
          setCC("Set the value of D",5)

          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,440,40).play()
            setCC("Set the value of R")

            sliders.r.onclick = ()=>{
              Dom.setBlinkArrowRed(true,405,-12,30,30,90).play()
              setCC("Press Record")

              // sliders.clearOnclick()
            }
          }
        }
      }
      stepTutorial2()
      Scenes.items.btn_next.show();

      //! Required Items
      Scenes.items.record_btn.set(355, -60, 70)
      Scenes.items.slider_box.item.style.scale = "0.8";
      Scenes.items.slider_box.show("flex").set(-120, -40);

      Scenes.items.part_2_graph_empty.set(0, -150, 572, 950);
      Scenes.items.part_2_graph_1.set(0, -150, 572, 950).hide();
      Scenes.items.part_2_graph_2.set(0, -150, 560, 950).hide();
      Scenes.items.part_2_graph_3.set(0, -150, 560, 950).hide();
       
 
      // temp text on required positions
      let allTempTitles = [

        //temp titles for inductor
        Scenes.items.tempTitle1.setContent("0").set(554+4, -23+25),
        Scenes.items.tempTitle2.setContent("0").set(634+4, -23+25),
        Scenes.items.tempTitle3.setContent("0").set(690+4, -23+25),
        Scenes.items.tempTitle4.setContent("0").set(548+4+2, -3+22),
        Scenes.items.tempTitle5.setContent("0").set(548+4+2, 14+22),
        Scenes.items.tempTitle6.setContent("0").set(620+4+2, -3+22),
        Scenes.items.tempTitle7.setContent("0").set(620+4+2, 14+22),
        Scenes.items.tempTitle8.setContent("0").set(694+4, 4+25-3),

        //temp titles for switch
        Scenes.items.tempTitle9.setContent("0").set(550, 100+16),
        Scenes.items.tempTitle10.setContent("0").set(618+6, 102+12),
        Scenes.items.tempTitle11.setContent("0").set(702+6, 100+14),
        Scenes.items.tempTitle12.setContent("0").set(547+6, 125+11),
        Scenes.items.tempTitle13.setContent("0").set(550+6, 141+11),
        Scenes.items.tempTitle14.setContent("0").set(615, 134+9),
        Scenes.items.tempTitle15.setContent("0").set(693+4, 132+10),

        //for diode d
        Scenes.items.tempTitle16.setContent("0").set(555+5, 228+1),
        Scenes.items.tempTitle17.setContent("0").set(618, 228),
        Scenes.items.tempTitle18.setContent("0").set(695+5, 228),
        Scenes.items.tempTitle19.setContent("0").set(548+6, 255),
        Scenes.items.tempTitle20.setContent("0").set(617+6, 249),
        Scenes.items.tempTitle21.setContent("0").set(618+6, 266-1),
        Scenes.items.tempTitle22.setContent("0").set(703+5, 257),
                
        //for capacitor
        Scenes.items.tempTitle23.setContent("0").set(553+7, 355-10),
        Scenes.items.tempTitle24.setContent("0").set(625+7, 355-10),
        Scenes.items.tempTitle25.setContent("0").set(698+4, 355-10),
        Scenes.items.tempTitle26.setContent("0").set(552+7, 385-13),
        Scenes.items.tempTitle27.setContent("0").set(627+6, 376-13),
        Scenes.items.tempTitle28.setContent("0").set(629+7, 393-14),
        Scenes.items.tempTitle29.setContent("0").set(690+3, 384-13),
        
        //source maasurements
        Scenes.items.tempTitle30.setContent("0").set(268+11, 230),
        Scenes.items.tempTitle31.setContent("0").set(340+11, 230),
        Scenes.items.tempTitle32.setContent("0").set(412+8, 230),
        Scenes.items.tempTitle33.setContent("0").set(264+11+1, 252-2),
        Scenes.items.tempTitle34.setContent("0").set(266+11, 269-2),
        Scenes.items.tempTitle35.setContent("0").set(264 + 72+11, 252-2),
        Scenes.items.tempTitle36.setContent("0").set(266 + 72+11, 269-2),
        Scenes.items.tempTitle37.setContent("0").set(411+11-2, 259-1),

        //load measurements
        Scenes.items.tempTitle38.setContent("0").set(268+9, 230+128-12+2),
        Scenes.items.tempTitle39.setContent("0").set(340+9, 230+128-12+2),
        Scenes.items.tempTitle40.setContent("0").set(412+9, 230+128-12+2),
        Scenes.items.tempTitle41.setContent("0").set(268+9-3+3, 230+128+25-12-2+2),
        Scenes.items.tempTitle42.setContent("0").set(340+9-3, 230+128+25-12-2+2),
        Scenes.items.tempTitle43.setContent("0").set(412+9-3, 230+128+25-12-2+2),
      ];
      allTempTitles.forEach(ele=>{
        ele.styles({
          color : "white",
          backgroundColor : "black",
          fontSize: "0.8em",
          width : "28px",
        })
      })
 
      let currentGraph = Scenes.items.part_2_graph_empty

       
      // *  chage the step size of the sliders
      // let dutyRatioSlider = Scenes.items.slider_D.item.children[1].children[0];
      let dutyRatioSlider = Scenes.items.slider_D.item;
      let valueInput = document.querySelector(".d .value-box input")
      valueInput.readonly = true
      dutyRatioSlider.min = "0.25";
      dutyRatioSlider.max = "0.75";
      dutyRatioSlider.step = "0.25"
      dutyRatioSlider.value = "0.25"
      valueInput.value = 0.25

      // ! fixing d slider
      dutyRatioSlider.oninput = ()=>{
        let sliderImg = document.querySelector(".slider-D-arrow")
        let dVal = dutyRatioSlider.value
        switch(dVal){
          case "0.25":
            sliderImg.style.left = "218px"
            valueInput.value = 0.25
            break
          case "0.5":
            sliderImg.style.left = "242.4px"
            valueInput.value = 0.5
            break
          case "0.75":
            sliderImg.style.left = "269px"
            valueInput.value = 0.75
            break

        }
      }
      dutyRatioSlider.oninput()
      
      function arrowBlinkForAll(){
        setCC("Change the parameters to see the effect")
        anime.timeline({
          easing: "linear",
          duration: 1500,
        })
        .add({
          delay: 3000,
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,30,-15,30,30,-90).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,185,114,null,null,90).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,440,40).play()
          }
        })
        .add({
          begin(){
            Dom.setBlinkArrowRed(true,405,-12,30,30,90).play()
          }
        })
      }
 
      // ! onclick for record
      let isClicked = false
      Scenes.items.record_btn.item.onclick = function () {
        Dom.setBlinkArrowRed(-1)
        if(isClicked == false){
          arrowBlinkForAll()
          isClicked = true
        }
        // ! Activate the next btn right after the click
        // setCC("Click 'Next' to go to next step");
        
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        // let allSliderValue = $(".range-slider__value");
        
        // let vInValue = Number(allSliderValue[0].innerHTML);
        // let dutyRatioValue = Number(allSliderValue[1].innerHTML);
        // let resistanceValue = Number(allSliderValue[2].value);
        
        
        // Scenes.items.tempTitle2.setContent(v0);
        
        let dutyRatioValue = Number(sliders.d.value);
        let resistanceValue = Number(sliders.r.value);
        let vG = Number(sliders.v.value);
        updateValues(vG, dutyRatioValue, resistanceValue);
        
        let v0 = Number(Formulas.step2.v0(values)).toFixed(1);
        let iIn = Number(Formulas.step2.iIn(values)).toFixed(1);
        let i0 = Number(Formulas.step2.i0(values)).toFixed(1);
        let i1 = Number(Formulas.step2.i0(values)).toFixed(1);
        let i2 = Number(Formulas.step2.i0(values)).toFixed(1);

        // ! Calculate And set
        function calculateAndUpdateTempTitles(){
           //temp titles for inductor
           Scenes.items.tempTitle1.setContent(vG)
           Scenes.items.tempTitle2.setContent(Number(v0 - vG).toFixed(1))
           Scenes.items.tempTitle3.setContent("0")
           Scenes.items.tempTitle4.setContent(i1)
           Scenes.items.tempTitle5.setContent(i2)
           Scenes.items.tempTitle6.setContent(i2)
           Scenes.items.tempTitle7.setContent(i1)
           Scenes.items.tempTitle8.setContent(iIn)
 
           //temp titles for switch
           Scenes.items.tempTitle9.setContent("0")
           Scenes.items.tempTitle10.setContent(v0)
           Scenes.items.tempTitle11.setContent(Number((1-dutyRatioValue) * v0).toFixed(1))
           Scenes.items.tempTitle12.setContent(i1)
           Scenes.items.tempTitle13.setContent(i2)
           Scenes.items.tempTitle14.setContent("0")
           Scenes.items.tempTitle15.setContent(Number(dutyRatioValue * iIn).toFixed(1))
 
           //for diode d
           Scenes.items.tempTitle16.setContent(v0)
           Scenes.items.tempTitle17.setContent("0")
           Scenes.items.tempTitle18.setContent(Number(dutyRatioValue*v0).toFixed(1))
           Scenes.items.tempTitle19.setContent("0")
           Scenes.items.tempTitle20.setContent(i2)
           Scenes.items.tempTitle21.setContent(i1)
           Scenes.items.tempTitle22.setContent(Number((1-dutyRatioValue) * iIn).toFixed(1))
                   
           //for capacitor
           Scenes.items.tempTitle23.setContent(v0)
           Scenes.items.tempTitle24.setContent(v0)
           Scenes.items.tempTitle25.setContent(v0)
           Scenes.items.tempTitle26.setContent(i0)
           Scenes.items.tempTitle27.setContent(Number(i2-i0).toFixed(1))
           Scenes.items.tempTitle28.setContent(Number(i1-i0).toFixed(1))
           Scenes.items.tempTitle29.setContent("0")
           
           //source maasurements
           Scenes.items.tempTitle30.setContent(vG)
           Scenes.items.tempTitle31.setContent(vG)
           Scenes.items.tempTitle32.setContent(vG)
           Scenes.items.tempTitle33.setContent(i1)
           Scenes.items.tempTitle34.setContent(i2)
           Scenes.items.tempTitle35.setContent(i2)
           Scenes.items.tempTitle36.setContent(i1)
           Scenes.items.tempTitle37.setContent(iIn)
 
           //load measurements
           Scenes.items.tempTitle38.setContent(v0)
           Scenes.items.tempTitle39.setContent(v0)
           Scenes.items.tempTitle40.setContent(v0)
           Scenes.items.tempTitle41.setContent(i0)
           Scenes.items.tempTitle42.setContent(i0)
           Scenes.items.tempTitle43.setContent(i0)
        }
        
        if (dutyRatioValue == 0.25) {
          updateValues(vG, dutyRatioValue, resistanceValue);

          calculateAndUpdateTempTitles()
          
          currentGraph.hide();
          Scenes.items.part_2_graph_1.show();
          currentGraph = Scenes.items.part_2_graph_1;
        }

        if (dutyRatioValue == 0.5) {

          updateValues(vG, dutyRatioValue, resistanceValue);

          calculateAndUpdateTempTitles()

          currentGraph.hide();
          Scenes.items.part_2_graph_2.show();
          currentGraph = Scenes.items.part_2_graph_2;
        }

        if (dutyRatioValue == 0.75) {

          updateValues(vG, dutyRatioValue, resistanceValue);

          calculateAndUpdateTempTitles()

          currentGraph.hide();
          Scenes.items.part_2_graph_3.show();
          currentGraph = Scenes.items.part_2_graph_3;

          
        }
        // completed
        setIsProcessRunning(false);
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

      Scenes.items.circuit_full_2.set(6,40,230)
      Scenes.items.part_3_option_select.set(650-70, 0, 350)
      Scenes.items.part_3_option_1.set(709-70, 30, 60).zIndex(2)
      Scenes.items.part_3_option_2.set(725-70, 100, 60).zIndex(2)
      Scenes.items.part_3_option_3.set(725-70, 175, 60).zIndex(2)
      Scenes.items.part_3_option_4.set(712-70, 248, 60).zIndex(2)
      // hide the slider
      Scenes.items.slider_box.hide()
      // resloving the step to css
      Scenes.items.slider_box.item.style.scale = "1";


      let rightTicks = [
        Scenes.items.right_tick_1.set(640,35,44).zIndex(2000).hide(),
        Scenes.items.right_tick_2.set(655,105,44).zIndex(2001).hide(),
        Scenes.items.right_tick_3.set(655,180,44).zIndex(2000).hide(),
        Scenes.items.right_tick_4.set(645,255,44).zIndex(2000).hide()
      ]

      // hide all tables
      Scenes.items.part3_table_one.hide()
      Scenes.items.part3_table_two.hide()
      Scenes.items.part3_table_three.hide()
      Scenes.items.part3_table_four.hide()
      Scenes.items.part3_table_four_2.hide()

      // active all sliders
      

      // * showing right tick if done
      for(let i in rightTicks){
        if(Scenes.optionsDone[i] == 1){
          rightTicks[i].show()
        }
      }


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
      sliders.reset()
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
      Dom.hideAll(); 
      // optionsDone
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      Scenes.items.contentAdderBox.setContent("");
      Scenes.setStepHeading(
        "",
        "Ideal voltage gain plot."
      );
      // ! show the slider
      Scenes.items.slider_box.set(-50,-60).show("flex")
      // setCC("Record  7 reading for different Duty Ratio.")
      
      // ! required item
      // circuit full 3 replaced by 2 because of changes
      // Scenes.items.circuit_full_2.set(230,-50,175)
      // Scenes.items.part_3_option_1.set(10, 170-15)
      // Scenes.items.right_tick_1.set(-12,185-15)
      // Scenes.items.graph1_arrow.set(-5,6)
      Scenes.items.part3_table_one.set(10).show("flex")
      Scenes.items.record_btn.set(610,365,60)
      Scenes.items.btn_delete.set(730,365)
      Scenes.items.btn_reset.set(820,365)
      let valuesToMatch = [
        [],
        [],
        []
      ] 

      let table = Scenes.items.part3_table_one.item
      let table1 = table.children[0]
      let table2 = table.children[1]
      let table3 = table.children[2] 
      let tablesBody = [
        table.children[0].tBodies[0],
        table.children[1].tBodies[0],
        table.children[2].tBodies[0]
      ]    
      let tableHeadTitle = getAll(".part3_table_one .title")
       // * index to handle records
      let recordBtnClickIdx = (table3.tBodies[0].rows[6].cells[2].innerHTML==""?0:7)

      // disable voltage slider
      disableSlider("v")

     
      // ! Tutorial Function

      function stepTutorial2(){
        
        Dom.setBlinkArrowRed(true,570,20).play()
        setCC("Set the value of R")

        sliders.r.onclick = ()=>{
          Dom.setBlinkArrowRed(true,642,330,null,null,-90).play()
          setCC("Press Record")

          sliders.d.onclick = ()=>{
            Dom.setBlinkArrowRed(true,642,330,null,null,-90).play()
            setCC("Press Record")
          }
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      


      // ! graph
      // * add x,y parameters for graph
      // let graphData = []
      
      let graph_box1 = new Dom(".graph_box1")
      let graph_box2 = new Dom(".graph_box2")

      Scenes.items.graph1.set(null,null,210,330)
      Scenes.items.graph2.set(null,null,210,330)
      graph_box2.set(null,145)

      let ctx1 = Scenes.items.graph1.item
      let ctx2 = Scenes.items.graph2.item

      let chart1 = Scenes.items.chart.graph1
      let chart2 = Scenes.items.chart.graph2
      let isDataDeleteable = true
      if(chart1 == null){
        isDataDeleteable = true
      }else{
        isDataDeleteable = false
      }
      // temp text for adding zero
      Scenes.items.tempText.setContent(0).set(565,-89).styles({
        rotate: "-90deg",
        backgroundColor: "transparent",
        fontSize: "10px",
      })

      function plotGraph(data1=[[],[],[]],data2=[[],[],[]]){
        if(chart1!=null){
          chart1.destroy()
        }
        if(chart2!=null){
          chart2.destroy()
        }
        chart1 = new Chart(ctx1, {
          type: "scatter",
          data: {
            datasets: [
                {
                  label: "24 V",
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data1[0],
                },
                {
                  label: "48 V",
                  fill: false,
                  borderColor: "green",
                  backgroundColor: "green",
                  data: data1[1],
                },
                {
                  label: "72 V",
                  fill: false,
                  borderColor: "blue",
                  backgroundColor: "blue",
                  data: data1[2],
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
                    display: true,
                    labelString: "Load Voltage (V )",
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Duty Ratio (D)",
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                   }
                },
              ],
            },
          },
        })
       
        chart2 = new Chart(ctx2, {
          type: "scatter",
          data: {
            datasets: [
                {
                  label: "24 V",
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2[0],
                },
                {
                  label: "48 V",
                  fill: false,
                  borderColor: "green",
                  backgroundColor: "green",
                  data: data2[1],
                },
                {
                  label: "72 V",
                  fill: false,
                  borderColor: "blue",
                  backgroundColor: "blue",
                  data: data2[2],
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
                    display: true,
                    labelString: "Voltage Gain (M)",
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Duty Ratio (D)",
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                   }
                },
              ],
            },
          },
        })
       
        Scenes.items.chart.graph1 = chart1
        Scenes.items.chart.graph2 = chart2
        graph_box1.set(null,null,210,330)
        graph_box2.set(null,null,210,330)
        // Scenes.items.graph1.set(null,null,210,330)
        // Scenes.items.graph2.set(null,null,210,330)

      }
      

      // get data
      function setDataToGraph(){
        Dom.setBlinkArrowRed(-1)
        sliders.d.onclick = ()=>{}
        isDataDeleteable = false
        let data1 = [
          [],
          [],
          [],
        ]
        let data2 = [
          [],
          [],
          [],
        ]

        tablesBody.forEach((table,idx)=>{
          let axes1 = []
          let axes2 = []
          for(let i=0;i<table.rows.length;i++){
            let x = table.rows[i].cells[0].innerHTML
            let y1 = table.rows[i].cells[1].innerHTML
            let y2 = table.rows[i].cells[2].innerHTML
        
            // x is same for both
            axes1.push({x:x,y:y1})
            axes2.push({x:x,y:y2})
          }
          data1[idx] = axes1
          data2[idx] = axes2
        })

      
        plotGraph(data1,data2)
      }

      // to active the table header portion
      function activePortion(idx=0){
          let thead =   getAll(".part3_table_one .table-title")
          thead.forEach(ele=>{
            ele.classList.add("deactive")
          })
          if(idx!=-1)
            thead[idx].classList.remove("deactive")
      }
      activePortion(0)

      // ! ------------> If data already present plot the graph
      if(table3.tBodies[0].rows[6].cells[2].innerHTML !== ""){
        // setDataToGraph()= 
          setIsProcessRunning(false)
          Scenes.currentStep  = 4

          recordBtnClickIdx = 21
          let r=7
          let tab=3
          // * to get old values from table for matching
          for(let i=0;i<tab;i++){
            let arr = []
            for(let j=0;j<r;j++){
              arr.push(Number(tablesBody[i].rows[j].cells[0].innerHTML))
            }
            valuesToMatch.push(arr)
          }

          disableSlider("r")
          disableSlider("v")
          setDataToGraph()
      }else{
        plotGraph()
      }
       
      //!onclick for delete btn
      Scenes.items.btn_delete.item.onclick =  function(){
        if((recordBtnClickIdx <= 0 || recordBtnClickIdx > 21) || !isDataDeleteable){
          return
        }

        if(recordBtnClickIdx==0){
          activePortion(0)
        }else if(recordBtnClickIdx==7){
          activePortion(0)
          sliders.vImg.click()
          sliders.vImg.click() 
          currentTableIdx = 0
        }else if(recordBtnClickIdx==14){
          activePortion(1)
          sliders.vImg.click()
          sliders.vImg.click()
          currentTableIdx = 1
        }
          if((recordBtnClickIdx-1)%7==0 || (recordBtnClickIdx-2)%7==0){
            tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
            tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
          }else{
            tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[0].innerHTML = "" ;
            tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[1].innerHTML = "" ;
            tablesBody[currentTableIdx].rows[(recordBtnClickIdx-1)%7].cells[2].innerHTML = "" ;
          }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          disableSlider("reset")
          disableSlider("v")
        }
        valuesToMatch[currentTableIdx].pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        function tableReset(){
          tablesBody.forEach((table,idx)=>{
            for(let i=0;i<table.rows.length;i++){
              table.rows[i].cells[0].innerHTML = ""
              table.rows[i].cells[1].innerHTML = ""
              table.rows[i].cells[2].innerHTML = ""
            }

            table.rows[0].cells[0].innerHTML = "0.1"
            table.rows[1].cells[0].innerHTML = "0.9"
          })

        }
        tableReset()

        // reseting the graph
        Scenes.items.chart.graph1.destroy()
        Scenes.items.chart.graph2.destroy()

        // reset all the parameters
        // so just simply call this step again
        sliders.reset()
        Scenes.steps[5]() 
        
      }

      let currentTableIdx = 0
      // ! onclick for record
      Scenes.items.record_btn.item.onclick = function(){
        console.log(recordBtnClickIdx)
        // ! for arrow system
        switch(recordBtnClickIdx){
          case 0:
          case 6:
          case 7:
          case 13:
          case 14:
            Dom.setBlinkArrowRed(true,642,330,null,null,-90).play()
            setCC("Press Record")
            break
          
          default:
            Dom.setBlinkArrowRed(true,295,75).play()
            setCC("Change the value of D")
            break
        }
        // if(
        //   recordBtnClickIdx%7 == 0 || (recordBtnClickIdx)%7==0
        //   || recordBtnClickIdx == 20
        // ){
        //   // Dom.setBlinkArrowRed(-1)
        //   // slidersBox[1].onclick = ()=>{}
        //   Dom.setBlinkArrowRed(true,642,330,null,null,-90).play()
        //   setCC("Press Record")
        // }else{
        //   Dom.setBlinkArrowRed(true,295,75).play()
        //   setCC("Change the value of D")
        //   // slidersBox[1].onclick = ()=>{
        //   //   Dom.setBlinkArrowRed(true,180,280).play()
        //   //   setCC("Press record button",7)
        //   // }
        // }

        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        let resistanceValue = Number(sliders.r.value)

        if(recordBtnClickIdx<7){
          vInValue = 24
          currentTableIdx = 0
        }else if(recordBtnClickIdx<14){
          vInValue = 48
          currentTableIdx = 1
        }else if(recordBtnClickIdx<21){
          vInValue = 72
          currentTableIdx = 2
        }
        if(recordBtnClickIdx==0){
          activePortion(0)
        }else if(recordBtnClickIdx==6){
          activePortion(1)
          sliders.vImg.click()
        }else if(recordBtnClickIdx==13){
          activePortion(2)
          sliders.vImg.click()
        }
        if(recordBtnClickIdx%7==0){
          dutyRatioValue = 0.1
        }else if((recordBtnClickIdx-1)%7==0){
          dutyRatioValue = 0.9
        }
        // diable resistance
        if(recordBtnClickIdx==0){
          disableSlider("r")
        }
        
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // ! Can't select same values
        // todo do it <21 back 
        if(recordBtnClickIdx < 21 && valuesToMatch[currentTableIdx].indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else if(recordBtnClickIdx < 21){
          valuesToMatch[currentTableIdx].push(dutyRatioValue)
        }
        
        // ! sort the data
        if(recordBtnClickIdx==21){
          var rows = null

          function sortTable(){
            function so(){
              let n=7
              for(let i=0;i<n;i++){
                  for(let j=0;j<n-i-1;j++){
                      if(rows[j].cells[0].innerHTML > rows[j+1].cells[0].innerHTML){
                          let temp = rows[j].innerHTML
                          rows[j].innerHTML = rows[j+1].innerHTML
                          rows[j+1].innerHTML = temp
                      }
                  }
              }
            }
            for(let i=0;i<3;i++){
              rows = tablesBody[i].rows
              so()
            }
            
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // ! calling the graph update function
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 4
        }

        if(recordBtnClickIdx < 21){
          let tableRow = tablesBody[currentTableIdx].rows[recordBtnClickIdx++%7]
          tableRow.cells[0].innerHTML = dutyRatioValue
          tableRow.cells[1].innerHTML = Number(Formulas.ideal.v0(values)).toFixed(2)
          tableRow.cells[2].innerHTML = Number(Formulas.ideal.M(values)).toFixed(2)
        }

        // warning for sorting the data
        if(recordBtnClickIdx==7){
          setCC("Click 'Record' to sort the table according to D and plot the graph.")
        }

        
      }    

      return true;

    }),
    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      Scenes.setStepHeading(
        "",
        "Non-ideal gain."
      );
      // setCC("Record 7 reading for 3 different load resistances.")
      // ! show the slider
      Scenes.items.slider_box.set(-50,-60)
      Scenes.items.btn_next.show()
      
      
      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_2.set(-20, 170-120).zIndex(2000)
      // Scenes.items.right_tick_1.set(-3,185-120).zIndex(2000)
      Scenes.items.part3_table_two.show("flex")
      // Scenes.items.graph2_arrow.set(-5,0)
      Scenes.items.record_btn.set(750,270,70)
      Scenes.items.btn_reset.set(770,350)

      
      // Scenes.items.btn_delete.set(100+20,350)

      // to access thead of the table 
      // Scenes.items.part3_table_two.item.children[0].tHead.rows[0].innerHTML

       let table = Scenes.items.part3_table_two.item
       let table1 = table.children[0]
       let table2 = table.children[1]
       let table3 = table.children[2]
       let tableSliderInput = getAll(".table-slider-box input")

       // for toggle the deactive section of slider 
        function activeSlider(num){
          let tableSlider = getAll(".table-slider")
          tableSlider.forEach(ele=>{
            ele.classList.add("deactive")
          })
          tableSlider[num].classList.remove("deactive")
        }

      // to handle records
      let recordBtnClickIdx = (table3.rows[8].cells[1].innerHTML==""?0:1)

      if(table3.rows[8].cells[1].innerHTML==""){
        // initially active first slider
        activeSlider(0)
      }



      // hide side bar
      // Scenes.items.slider_R.item.style.opacity = 0
      // Scenes.items.slider_D.item.style.opacity = 0
      // Scenes.items.slider_R.hide()
      // Scenes.items.slider_D.hide()
      


       // ! graph
      Scenes.items.graph3.set(null,null,200,340)
      let ctx = Scenes.items.graph3.item

      let xLabel = "Duty Ratio (D)"
      let yLabel = "Voltage Gain (M)"
      let chart = null

      function plotGraph(){
        chart = new Chart(ctx,{
          type: "scatter",
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
                    beginAtZero:true,
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
                    beginAtZero:true,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
      }

      const graph = {
        addDataset: (label,bgColor,data)=>{
          chart.data.datasets.push(
            {
              label: label,
              fill: false,
              borderColor: bgColor,
              backgroundColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(index,data){
          if(data==undefined){
            return
          }
          chart.data.datasets[index].data.push(data)
          chart.update()
        },
        removeData(index){
          chart.data.datasets[index].data.pop()
          chart.update()
        }
      }
      // ! Tutorial Function
          function stepTutorial2(){
            Dom.setBlinkArrowRed(true,60,-50,30,30,-90).play()
            setCC("Select the value V<sub>g</sub>",6)
    
            sliders.vImg.onclick = ()=>{
              sliderV()
              sliders.vImg.click()
              Dom.setBlinkArrowRed(true,125,110,null,null,-90).play()
              setCC("Select the value of R<sub>1</sub>",5)
    
              tableSliderInput[0].onclick = ()=>{
                Dom.setBlinkArrowRed(true,795,235,null,null,-90).play()
                setCC("Press Record")
    
                tableSliderInput[1].onclick = ()=>{
                  Dom.setBlinkArrowRed(true,795,235,null,null,-90).play()
                  setCC("Press Record")

                  tableSliderInput[2].onclick = ()=>{
                    Dom.setBlinkArrowRed(true,795,235,null,null,-90).play()
                    setCC("Press Record")
      
                    tableSliderInput.forEach(ele=>{
                      ele.onclick = ()=>{}
                    })
                  }
                }
              }
            }
          }
          if(recordBtnClickIdx == 0){
            stepTutorial2()
          }

      
      // stepTutorial()

      // ! ------------> If data already present plot the graph
      if(table3.rows[8].cells[1].innerHTML !== ""){
          setIsProcessRunning(false)
          Scenes.currentStep = 4
      }else{
        plotGraph()
        Scenes.items.graph3.set(null,null,200,340)
      }   

       // ! 7 fixed dutry ration
       let dutyRatio = [0.1,0.5,0.8,0.84,0.87,0.9,0.93]

       // duty ratio will be disabled for all
       disableSlider("r")
       disableSlider("d")
      
       

      
      //  console.log("sneha")
      //  console.log(table1.tHead.rows[0])
      // ! Reset Button onclick
      const resetAll = ()=>{
        // todo reset the button style 5,10,15...
        // and table data
      }
      
      // //!onclick for delete btn
      // Scenes.items.btn_delete.item.onclick =  function(){
      //   if(recordBtnClickIdx == 0 || recordBtnClickIdx > 7){
      //     return
      //   }
      //   let row = table.tBodies[0].rows
      //   let n=11
        
      //   for(let i=1;i<n;i++){
      //     row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
      //   }
      //   recordBtnClickIdx = recordBtnClickIdx-1
      // }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        // reset table slider
        tableSliderInput.forEach(ele=>{
          ele.disabled = false
          ele.value = ele.min
        })
        
        var tables = [
          table1.tBodies[0].rows,
          table2.tBodies[0].rows,
          table3.tBodies[0].rows
        ]

        // to empty cells of table
        for(let table of tables){
          for(let row of table){
            row.cells[1].innerHTML = ""
            row.cells[2].innerHTML = ""
          }
        }

        // deactive others
        activeSlider(0)
        disableSlider("reset")

        // active v
        

        Scenes.steps[6]()        
        
      }

       // ! onclick for record
       Scenes.items.record_btn.item.onclick = function(){
         Dom.setBlinkArrow(-1)
        
        //  let allSliderValue = $(".range-slider__value");



        //  tableHead1.innerHTML = resistanceValue
        //  tableHead2.innerHTML = resistanceValue
        //  tableHead3.innerHTML = resistanceValue
         
          if(recordBtnClickIdx < 7){

            let vInValue = Number(sliders.v.value)
            let resistanceValue = Number(tableSliderInput[0].value)  
            tableSliderInput[0].disabled = true                  

            if(recordBtnClickIdx==0){

              // ! add dataset to graph
              graph.addDataset(
                `R = ${resistanceValue}`,
                "red",
                []
              ) 

              // disable the vIn slider after first click
              disableSlider("v")

              // tableHead1.cells[0].innerHTML = `R1 = ${resistanceValue} Ω`
              // Scenes.items.slider_R.item.children[1].children[0].disabled = true
              // Scenes.items.slider_R.item.classList.add("deactive")
            }



            updateValues(
              vInValue,
              dutyRatio[(recordBtnClickIdx)%7],
              resistanceValue
            )
            
            let tableRow = table1.tBodies[0].rows[recordBtnClickIdx++]
            tableRow.cells[1].innerHTML = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
            tableRow.cells[2].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            let x = tableRow.cells[0].innerHTML
            let y = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            // ! add data to graph
            graph.addData(0,{x:x,y:y})

            if(recordBtnClickIdx==7){
              // Scenes.items.slider_R.item.children[1].children[0].disabled = false
              // Scenes.items.slider_R.item.classList.remove("deactive")
              activeSlider(1)

              // show arrow
              Dom.setBlinkArrowRed(true,350,110,null,null,-90).play()
              setCC("Select the value of R<sub>2</sub>",5)

              
            }
          }
          else if(recordBtnClickIdx < 14){

            let vInValue = Number(sliders.v.value)
            let resistanceValue = Number(tableSliderInput[1].value)  
            tableSliderInput[1].disabled = true   

            if(recordBtnClickIdx==7){
              // ! add dataset to graph
              graph.addDataset(
                `R = ${resistanceValue}`,
                "green",
                []
              )
            }

            if(recordBtnClickIdx%7==0){

              // tableHead2.cells[0].innerHTML =  `R2 = ${resistanceValue} Ω`
              // Scenes.items.slider_R.item.children[1].children[0].disabled = true
              // Scenes.items.slider_R.item.classList.add("deactive")
            }
            

            updateValues(
              vInValue,
              dutyRatio[(recordBtnClickIdx)%7],
              resistanceValue
            )

            let tableRow = table2.tBodies[0].rows[recordBtnClickIdx++%7]
            console.log(table2.tBodies[0].rows.innerHTML)
            tableRow.cells[1].innerHTML = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
            tableRow.cells[2].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            let x = tableRow.cells[0].innerHTML
            let y = Number(Formulas.nonIdeal.M(values)).toFixed(2)

            // ! add data to graph
            graph.addData(1,{x:x,y:y})

            if(recordBtnClickIdx==14){
              // Scenes.items.slider_R.item.children[1].children[0].disabled = false
              // Scenes.items.slider_R.item.classList.remove("deactive")
              activeSlider(2)

              // show arrow
              Dom.setBlinkArrowRed(true,600,110,null,null,-90).play()
              setCC("Select the value of R<sub>3</sub>",5)
            }
          } 
          else if(recordBtnClickIdx < 21){
            
            let vInValue = Number(sliders.v.value)
            let resistanceValue = Number(tableSliderInput[2].value)  
            tableSliderInput[2].disabled = true  

              if(recordBtnClickIdx==15){
                // ! add dataset to graph
                graph.addDataset(
                  `R = ${resistanceValue}`,
                  "blue",
                  []
                )
              }
 
             if(recordBtnClickIdx == 15){
              //  tableHead3.cells[0].innerHTML =  `R3 = ${resistanceValue} Ω`
              //  Scenes.items.slider_R.item.children[1].children[0].disabled = true
              //  Scenes.items.slider_R.item.classList.add("deactive")
             }
             
 
             updateValues(
              vInValue,
              dutyRatio[(recordBtnClickIdx)%7],
              resistanceValue
            )
 
            let tableRow = table3.tBodies[0].rows[recordBtnClickIdx++%7]
            tableRow.cells[1].innerHTML = Number(Formulas.nonIdeal.v0(values)).toFixed(2)
            tableRow.cells[2].innerHTML = Number(Formulas.nonIdeal.M(values)).toFixed(2)

             let x = tableRow.cells[0].innerHTML
             let y = Number(Formulas.nonIdeal.M(values)).toFixed(2)
 
             // ! add data to graph
             graph.addData(2,{x:x,y:y})

             if(recordBtnClickIdx==21){
              // after complete
              Dom.setBlinkArrowRed(-1)
              Dom.setBlinkArrow(true, 790, 408).play();
              setCC("Click 'Next' to go to next step");
              setIsProcessRunning(false); 
              Scenes.currentStep = 4
             }
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
      Scenes.items.slider_box.set(-65,-60)
      Scenes.items.btn_next.show()

      //! Required Items
      // Scenes.items.circuit_full_3.set(230,-50,150)
      // Scenes.items.part_3_option_3.set(-30, 155)
       Scenes.items.part3_table_three.show()
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.record_btn.set(770,220,70)
      Scenes.items.btn_delete.set(785,290)
      Scenes.items.btn_reset.set(787,350)
      Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_three.item
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
            Dom.setBlinkArrowRed(true,560,20).play()
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
        stepTutorial2()
      }

      
      function setDataToGraph(){
        let graphData = []
        var rows = table.tBodies[0].rows
        let n = 7
        for(let i=0;i<n;i++){
          graphData.push(
            {
              x: rows[i].cells[9].innerHTML,
              y: rows[i].cells[10].innerHTML
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
        disableSlider("reset")
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
            setCC("Change the value of R and Record it")

            sliders.r.onclick = ()=>{
              Dom.setBlinkArrowRed(true,894,226).play()
              setCC("Press Record")

              sliders.clearOnclick()
            }
        }else{
          Dom.setBlinkArrowRed(-1)
        }
        
        let vInValue = Number(sliders.v.value)
        let dutyRatioValue = Number(sliders.d.value)
        let resistanceValue = Number(sliders.r.value)
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // ! Can't select same values
        if(recordBtnClickIdx < 7 && valuesToMatch.indexOf(resistanceValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(resistanceValue)
        }

        // ! sort the data
        if(recordBtnClickIdx==7){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let n=7
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[9].innerHTML)
                    let val2 = Number(rows[j+1].cells[9].innerHTML)
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
          disableSlider("v")
          disableSlider("d")
        }
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = dutyRatioValue
        tableRow.cells[3].innerHTML = resistanceValue
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
        if(recordBtnClickIdx==7){
          setCC("Click 'Record' to sort the table according to D and plot the graph.")
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
      Scenes.items.slider_box.set(-70,-60)
      Scenes.items.btn_next.show()

      //! Required Items
      // Scenes.items.circuit_full_2.set(270,0,160)
      //  Scenes.items.part_3_option_4.set(-30, 170,100,220)
      // Scenes.items.right_tick_1.set(-12,185)
      Scenes.items.part3_table_four.set(10,170)
      Scenes.items.part3_table_four_2.set(10,240)
      Scenes.items.record_btn.set(465,180,60)
      //  Scenes.items.part_3_option_4_graph.set(295,-60,60)

      let styles = {
        color: "black",
        backgroundColor: "white",
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
            Dom.setBlinkArrowRed(true,560,20).play()
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
Scenes.currentStep = 3

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