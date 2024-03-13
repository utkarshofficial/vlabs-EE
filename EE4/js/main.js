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

// ! class Dom{} is send to seperate file
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
    slider_vGs: new Dom(".slider_vGs"),
    slider_R: new Dom(".slider_R"),
   
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
    part_1_1_connections_box: new Dom(".part_1_1_connections_box"),
    part_1_2_connections_box: new Dom(".part_1_2_connections_box"),

    //new images added for part1 
    part_1_1_cable_a2 : new Dom("part_1_1_cable_a2"),
    part_1_1_cable_n2 : new Dom("part_1_1_cable_n2"),
    part_1_1_cable_p1 : new Dom("part_1_1_cable_p1"),
    part_1_1_cable_p2 : new Dom("part_1_1_cable_p2"),
    part_1_1_cable_r2 : new Dom("part_1_1_cable_r2"),
    part_1_1_cable_s : new Dom("part_1_1_cable_s"),
    part_1_1_cable_v1 : new Dom("part_1_1_cable_v1"),
    part_1_1_cable_v2 : new Dom("part_1_1_cable_v2"),
    part_1_2_cable_a1 : new Dom("part_1_2_cable_a1"),
    part_1_2_cable_cp : new Dom("part_1_2_cable_cp"),
    part_1_2_cable_dvp : new Dom("part_1_2_cable_dvp"),
    part_1_2_cable_n2 : new Dom("part_1_2_cable_n2"),
    part_1_2_cable_p1 : new Dom("part_1_2_cable_p1"),
    part_1_2_cable_p2 : new Dom("part_1_2_cable_p2"),
    part_1_2_cable_r1 : new Dom("part_1_2_cable_r1"),
    part_1_2_cable_s : new Dom("part_1_2_cable_s"),
    part_1_2_cable_v1 : new Dom("part_1_2_cable_v1"),
    part_1_2_cable_v2 : new Dom("part_1_2_cable_v2"),
    part_1_components_1 : new Dom("part_1_components_1"),
    part_1_components_2 : new Dom("part_1_components_2"),

    // part2 calculation
    part_2_calculation_components : new Dom("part_2_calculation_components"),
 

    //* 29 feb new imgs
    
    part_1_1_calculations : new Dom("part_1_1_calculations"),
    part_1_2_calculations : new Dom("part_1_2_calculations"),

    //* part3 images added
    part_3_components : new Dom("part_3_components"),
    part_3_graph : new Dom("part_3_graph"),
    part_3_off_button : new Dom("part_3_off_button"),
    part_3_table_1 : new Dom("part_3_table_1"),
    part_3_table_2 : new Dom("part_3_table_2"),
    part_3_table_3 : new Dom("part_3_table_3"),
    part_3_text : new Dom("part_3_text"),

    niddle_vGs: new Dom("niddle_vGs"),
    niddle_vIn: new Dom("niddle_vIn"),
    
      // * for PROCEDURE and instruction NOMENCLATURE
    nomenclature_popup : new Dom("nomenclature_popup"),
    part_1_1_instruction_popup : new Dom("part_1_1_instruction_popup"),
    part_1_1_procedure_popup : new Dom("part_1_1_procedure_popup"),
    part_1_2_instruction_popup : new Dom("part_1_2_instruction_popup"),
    part_1_2_procedure_popup : new Dom("part_1_2_procedure_popup"),
    part_2_instruction_popup : new Dom("part_2_instruction_popup"),
    part_2_procedure_popup : new Dom("part_2_procedure_popup"),
    part_3_procedure_popup : new Dom("part_3_procedure_popup"),



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
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    data,
    dataLabel,
    xLabel = null,
    yLabel = null,
    beginAtZero = false,
    startEmpty = false,
  ) {
    // for label
    Scenes.items.yLabel.set(504, 263).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      width: "170px",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(664, 375).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset 
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ]

    if(startEmpty){
        datasets=[]
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
        datasets: datasets
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
    return graphRef
  },

  // for adding new datasets to graph
  graphFeatures: {
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
    getSizeOfDatasets(chart){
      return chart.data.datasets.length
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
  setStepHeading(step, description,hide) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
    if(hide){
      let st={
        visibility: "hidden"
      }
      Scenes.items.stepTitle.styles(st)
      Scenes.items.stepDescription.styles(st)
    }
  },

  //*for instruction button onclick

  // start
  showPopup(step){
    let instructionBtn = Scenes.items.btn_instructions.item
    let instructionImg, procedureImg, nomenclatureImg= Scenes.items.nomenclature_popup;
    switch(step){
      case 0:
        instructionImg = Scenes.items.part_1_1_instruction_popup
        procedureImg = Scenes.items.part_1_1_procedure_popup
        break;
      case 1:
        instructionImg = Scenes.items.part_1_2_instruction_popup
        procedureImg = Scenes.items.part_1_2_procedure_popup
        break;
      case 2:
        instructionImg = Scenes.items.part_2_instruction_popup
        procedureImg = Scenes.items.part_2_procedure_popup
        break;
      case 3:
        procedureImg = Scenes.items.part_3_procedure_popup
        break;

    }

    instructionBtn.onclick = show

    let show = function(){
      instructionImg.show()
      procedureImg.show()
      nomenclatureImg.show()
    }

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
        setCC("Simulation Done");
        setIsProcessRunning(false);
      }

      return true;
    }),
  
    (step2 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading("", "using meteres",true);
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
        Scenes.items.part_1_components_1.set(0,-70,495,975).zIndex(1),
        Scenes.items.part_2_conncection_supply_1_red_button.set(171,76,28,25).zIndex(10),
        Scenes.items.part_2_conncection_supply_2_red_button.set(178,312,29,25).zIndex(10),
        Scenes.items.part_1_1_connections_box,
      ]

      let cables = [
        Scenes.items.part_1_1_cable_p1.set(0,0).zIndex(2).hide(),
        Scenes.items.part_1_1_cable_s.set(0,0).zIndex(3).hide(),
        Scenes.items.part_1_1_cable_a2.set(0,0).zIndex(4).hide(),
        Scenes.items.part_1_1_cable_r2.set(0,0).zIndex(5).hide(),
        Scenes.items.part_1_1_cable_p2.set(0,0).zIndex(6).hide(),
        Scenes.items.part_1_1_cable_n2.set(0,0).zIndex(7).hide(),
        Scenes.items.part_1_1_cable_v1.set(0,0).zIndex(8).hide(),
        Scenes.items.part_1_1_cable_v2.set(0,0).zIndex(9).hide(),
      ]

      // ! for increasing the size
      let l = 0,t = -70, h = 495, w = 975 
      Scenes.items.part_1_components_1.set(l,t,h,w).zIndex(1)
      cables.forEach(ele=>{
        ele.set(l,t,h,w).hide()
      })

      let cables_color = [
          "#970101",
          "#1a2f55",
          "#186a3b",
          "#181818",
          "#ffd90e",
          "#181818",
          "#cf426d",
          "#560056",
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
      // to enable startExp Button
      let partConnectionsIsComplete = false
      function partConnections(){
         // Connection Logic
        Scenes.items.part_1_1_connections_box.set(514,-70).hide()

        // ! btn_reset onclick
        Scenes.items.btn_reset.item.onclick = ()=>{
          let box_buttons_reset = document.querySelectorAll(".part_1_1_connections_box button")
          let temps = {
            textShadow: "none",
            color: "black",
            backgroundColor: "transparent"
          }
          box_buttons_reset.forEach(ele=>{
            let ele_Dom = new Dom(ele)
            ele_Dom.styles(temps)
          })
          Scenes.steps[3]()
        }

        //! connection box onclick
        Scenes.items.btn_connections.item.onclick = ()=>{
          Scenes.items.part_1_1_connections_box.show("flex")
          // ! connection table arrow move
          Dom.setBlinkArrowRed(true,580,5,35,null,90).play()
          setCC("")
        }
        let box_buttons = document.querySelectorAll(".part_1_1_connections_box button")

        //! connection box onclick
        let btnClickedCount = 0
        let connectionBtnArrow = 580
        let arrowLeftGap = 46
        box_buttons.forEach((ele,i)=>{
          ele.onclick = ()=>{
            // increasing count of complete connection
            if(ele.style.color!="white"){
              btnClickedCount++
              //! move arrow 
              connectionBtnArrow += arrowLeftGap
              Dom.setBlinkArrowRed(true,connectionBtnArrow,5,35,null,90).play()
              
              if(btnClickedCount==8){
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
          
          if(btnClickedCount==8){
            
            //! First red button click 
            Scenes.items.part_1_slide_3_compo_1_text.set(208,114,50).zIndex(10)
            Dom.setBlinkArrowRed(true,206,73).play()
            setCC("Switch on Main Supply")
            Scenes.items.part_2_conncection_supply_1_red_button.item.onclick = ()=>{
              
              Scenes.items.part_2_conncection_supply_1_red_button.hide()
              Scenes.items.part_1_slide_3_compo_1_text.hide()
              //! Second red button click
              
              Scenes.items.part_1_slide_3_compo_2_text.set(212,348,56).zIndex(10)
              Dom.setBlinkArrowRed(true,206,308).play()
              setCC("Switch on Gate Supply")

              Scenes.items.part_2_conncection_supply_2_red_button.item.onclick = ()=>{
                Scenes.items.part_2_conncection_supply_2_red_button.hide()
                Scenes.items.part_1_slide_3_compo_2_text.hide()

                Dom.setBlinkArrowRed(true,748,360,35,null,180).play()
                setCC("Click on Start Experiment")
                partConnectionsIsComplete = true
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
        // for recrod btn
        let recordBtnIdx = 0
        Scenes.items.part_1_1_calculations.set(-15,-70,480,983)
        Scenes.items.btn_procedure.set(790,132,37).zIndex(10)
        Scenes.items.btn_nomenclature.set(610,132,37,160).zIndex(10)
        Scenes.items.btn_plot.set(512,129,43,80).zIndex(10)
        // * Calling slider
        sliders.showSliderFor("1_1")

        // * Graph section
        Scenes.items.graph_box_1.set(514,174,null,428).zIndex(10)
        let ctx = Scenes.items.graph1.item
        let graphIdx = 0
        let xLabel = "Gate to source voltage (V<sub>GS</sub>)"
        let yLabel = "Drain Current (I<sub>D</sub>)"
        let dataLabel = ""
        // for setting xy label of graph in position
        function setXYLabel(){
          Scenes.items.xLabel.set(633,387)
          Scenes.items.yLabel.set(443,277)
        }
        // ploting empty graph
        let graphRef = Scenes.plotGraph(ctx,graphIdx,[],dataLabel,xLabel,yLabel,true,true)
        setXYLabel()
        
        // let table = new Dom(".part_2_table").set(600,-76).item

        let table = new Dom(".part3_table_two").set(513,-76).zIndex(10).item

        // * assume tempTitle10 as a btn record
        let btn_record = sliders.btn_record.item
        
        // * StepTutorial
        // show arrow for R
        Dom.setBlinkArrowRed(true,254,320,35,null,-90).play()
        setCC("Select R")
        // and other blink arrow is on sliders.js
        
        // ! btn_record onclick
        recordBtnIdx = 0
        btn_record.onclick = ()=>{
          let rows = table.tBodies[0].rows
          if(recordBtnIdx > rows.length){
            return
          }

          // * Filling Table
          let colIdx = {
            4:1,
            6:2,
            8:3,
            10:4,
            15:5,
          }
          let first_vGs_value = 4
          let last_vGs_value = 15
          let vGs_value = sliders.slider_vGs.getValue()
          let vIn_value = sliders.slider_vIn.getValue()
          let R_value = sliders.slider_R.getValue()

          // seting column index for filling the table
          if(vGs_value == first_vGs_value){
            rows[recordBtnIdx+1].cells[0].innerHTML = "10"
          }
          rows[recordBtnIdx+1].cells[colIdx[vGs_value]].innerHTML = vIn_value
          recordBtnIdx++
          console.log(colIdx[vGs_value])
          // to plot the data
          if(recordBtnIdx == rows.length - 1){
            
            
            // ! btn Plot onclick
            Scenes.items.btn_plot.item.onclick = ()=>{
              // shwo arrwo for vGs
              Dom.setBlinkArrowRed(true,0,320,35,null,-90).play()
              setCC("Select V<sub>GS</sub>")

              // goto default position for vIn value and recordBtnIdx = 0
              function resetFun(){
                recordBtnIdx=0
                let defaultLeftPos = 24
                Anime.moveLeft(sliders.slider_vIn.item,defaultLeftPos)
              }
              // for adding data to graph
              function addDataToGraph(){
                let data = []
                for(let row of rows){
                  let x = vGs_value
                  let y = row.cells[colIdx[vGs_value]].innerHTML
                  data.push({x,y})
                }
                let bgColors = [
                  "-",
                  "#da120f",
                  "#0607c2",
                  "#e413e6",
                  "#25de22",
                  "#000000"
                ]
                let bgColor = bgColors[colIdx[vGs_value]]
                let labelForDataSet = `Vgs = ${vGs_value}V`

                // add data set
                Scenes.graphFeatures.addDataset(graphRef,labelForDataSet,bgColor,data)
              }              
              
              if(vGs_value!=last_vGs_value){
                resetFun()
              }
              let totalDatasets = 5
              if(Scenes.graphFeatures.getSizeOfDatasets(graphRef) < totalDatasets){
                addDataToGraph()
              }

              // end the slide
              if(vGs_value==last_vGs_value){
                Dom.setBlinkArrowRed(-1)
                Dom.setBlinkArrow(true, 790, 544).play();
                setCC("Click 'Next' to go to next step");
                setIsProcessRunning(false);
                // for going to the second step
                Scenes.currentStep = 2
              }
            }
          }
        }

      }

      //! onclick start btn
      Scenes.items.btn_start_experiment.item.onclick = ()=>{
        // to enable the button
        if(partConnectionsIsComplete){
          // * Hide preivous
          hideConnectionStepImgs()
          // * calculation part
          partCalculation()
        }
      }

      return true
    }),

    (step3 = function () {
      setIsProcessRunning(true);
      Scenes.setStepHeading("", "using oscilloscope",true)
      Scenes.items.btn_next.show();
      // ! Step Connection

      // required elements 
      let temp = 16
      let btns = [
        Scenes.items.btn_instructions.set(750 + 75, 10-temp, 40).zIndex(20),
        Scenes.items.btn_connections.set(750 + 75, 55-temp, 40).zIndex(20),
        Scenes.items.btn_connectons_completed
          .set(750 + 75, 100-temp, 50, 120)
          .zIndex(20),
        Scenes.items.btn_start_experiment
          .set(750 + 75, 153-temp, 50, 120)
          .zIndex(20),
        Scenes.items.btn_reset.set(730, 175-temp, 30).zIndex(20),
      ]

      // required images
      let images = [
        Scenes.items.part_1_components_2.set(0,0).zIndex(1),
        Scenes.items.part_2_conncection_supply_1_red_button.set(144,68,24,22).zIndex(20),
        Scenes.items.part_2_conncection_supply_2_red_button.set(140,306,27,23).zIndex(20),
        Scenes.items.part_1_2_connections_box,
      ]

      let cables = [
        Scenes.items.part_1_2_cable_p1.set(0,0).zIndex(10).hide(),
        Scenes.items.part_1_2_cable_s.set(0,0).zIndex(11).hide(),
        Scenes.items.part_1_2_cable_r1.set(0,0).zIndex(12).hide(),
        Scenes.items.part_1_2_cable_p2.set(0,0).zIndex(13).hide(),
        Scenes.items.part_1_2_cable_n2.set(0,0).zIndex(14).hide(),
        Scenes.items.part_1_2_cable_dvp.set(0,0).zIndex(15).hide(),
        Scenes.items.part_1_2_cable_cp.set(0,0).zIndex(16).hide(),
        Scenes.items.part_1_2_cable_a1.set(0,0).zIndex(17).hide(),
        Scenes.items.part_1_2_cable_v1.set(0,0).zIndex(18).hide(),
        Scenes.items.part_1_2_cable_v2.set(0,0).zIndex(19).hide(),
      ]

      // ! for increasing the size
      let l = 0,t = -70, h = 485, w = 945 
      Scenes.items.part_1_components_2.set(l,t,h,w).zIndex(1)
      cables.forEach(ele=>{
        ele.set(l,t,h,w).hide()
      })


      let cables_color = [
        "#e40d0d",
        "#162848",
        "#037c3a",
        "#020202",
        "#ffe714",
        "#555252",
        "#9d9d9d",
        "#0f1f3b",
        "#974f1e",
        "#670202",
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
      // to enable startExp Button
      let partConnectionsIsComplete = false
      function partConnections(){
        // Connection Logic
        Scenes.items.part_1_2_connections_box.set(442,-78).hide()

        // ! btn_reset onclick
        Scenes.items.btn_reset.item.onclick = ()=>{
          let box_buttons_reset = document.querySelectorAll(".part_1_2_connections_box button")
          let temps = {
            textShadow: "none",
            color: "black",
            backgroundColor: "transparent"
          }
          box_buttons_reset.forEach(ele=>{
            let ele_Dom = new Dom(ele)
            ele_Dom.styles(temps)
          })
          Scenes.steps[4]()
        }

        //! connection box onclick
        Scenes.items.btn_connections.item.onclick = ()=>{
          Scenes.items.part_1_2_connections_box.show("flex")
          // ! connection table arrow move
          Dom.setBlinkArrowRed(true,513,-4,35,null,90).play()
          setCC("")
        }
        let box_buttons = document.querySelectorAll(".part_1_2_connections_box button")

        //! connection box onclick
        let btnClickedCount = 0
        let connectionBtnArrow = 513
        let arrowLeftGap = 43
        box_buttons.forEach((ele,i)=>{
          ele.onclick = ()=>{
            // increasing count of complete connection
            if(ele.style.color!="white"){
              btnClickedCount++
              //! move arrow 
              connectionBtnArrow += arrowLeftGap
              Dom.setBlinkArrowRed(true,connectionBtnArrow,-4,35,null,90).play()
              
              if(btnClickedCount==10){
                Dom.setBlinkArrowRed(true,778,105-temp,35,null,180).play()
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

        Dom.setBlinkArrowRed(true,778,55-temp,35,null,180).play()
        setCC("Click on Connections")

        //! Onclick for check connections
        Scenes.items.btn_connectons_completed.item.onclick = ()=>{
          
          if(btnClickedCount==10){
            
            //! First red button click 
            Scenes.items.part_1_slide_3_compo_1_text.set(178,96,50).zIndex(20)
            Dom.setBlinkArrowRed(true,170,65).play()
            setCC("Switch on Main Supply")
            Scenes.items.part_2_conncection_supply_1_red_button.item.onclick = ()=>{
              
              Scenes.items.part_2_conncection_supply_1_red_button.hide()
              Scenes.items.part_1_slide_3_compo_1_text.hide()
              //! Second red button click
              
              Scenes.items.part_1_slide_3_compo_2_text.set(168,338,56).zIndex(20)
              Dom.setBlinkArrowRed(true,166,306).play()
              setCC("Switch on Gate Supply")

              Scenes.items.part_2_conncection_supply_2_red_button.item.onclick = ()=>{
                Scenes.items.part_2_conncection_supply_2_red_button.hide()
                Scenes.items.part_1_slide_3_compo_2_text.hide()

                Dom.setBlinkArrowRed(true,778,165-temp,35,null,180).play()
                setCC("Click on Start Experiment")
                partConnectionsIsComplete = true
              }
            }
            
          }
          else{
            Scenes.items.part_1_incomplete_connection.set(660,100,50).zIndex(10)
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
        // show arrow for R
        Dom.setBlinkArrowRed(true,254,310,35,null,-90).play()
        setCC("Select R")
        
        Scenes.items.part_1_2_calculations.set(3,-70,480,963)
        Scenes.items.btn_procedure.set(790-10,90,37).zIndex(10)
        Scenes.items.btn_nomenclature.set(610-10,90,37,160).zIndex(10)
        // Scenes.items.btn_plot.set(512-10,88,43,80).zIndex(10)

        // neddle vGs rotate (-1,multipoint) deg
        Scenes.items.niddle_vGs.set(536,29,74).rotate(-1).zIndex(10)
        // neddle vIn rotate (-1,126) deg
        Scenes.items.niddle_vIn.set(755,29,74).rotate(-1).zIndex(10)


        // * Calling slider
        sliders.showSliderFor("1_2")

        // * Graph section
        Scenes.items.graph_box_2.set(499,138,270,440).zIndex(10)
        let ctx = Scenes.items.graph2.item
        let graphIdx = 1
        let xLabel = "Dra to source voltage (V<sub>DS</sub>)"
        let yLabel = "Drain Current (I<sub>D</sub>)"
        let dataLabel = ""
        // for setting xy label of graph in position
        function setXYLabel(){
          Scenes.items.xLabel.set(615,377)
          Scenes.items.yLabel.set(428,257)
        }
        // ploting empty graph
        let graphRef = Scenes.plotGraph(ctx,graphIdx,[],dataLabel,xLabel,yLabel,true,true)
        setXYLabel()
        
        // let table = new Dom(".part_2_table").set(600,-76).item

        let table = null

        // * assume tempTitle10 as a btn record
        let btn_record = sliders.btn_record.item

        // ! btn_record onclick
        let recordBtnIdx = 0
        // ! calculation value object
        let calculationValues = {
          vDs: [],
          iD: [],
        }
        btn_record.onclick = ()=>{
          let vGs_value = sliders.slider_vGs.getValue()
          let vIn_value = Math.round(sliders.slider_vIn.getValue())
          let R_value = sliders.slider_R.getValue()
          let firstValue = 0

          let vGs_idx = {
            5:0,
            6:1,
            8:2,
            10:3,
          }

          // vIn values
          let vIn_accept_range = [0,40,80,120,160,200,240]  
          let acceptedValueIndex = vIn_accept_range.indexOf(vIn_value)
          
          // for the first value add data set
          if(vIn_value==firstValue){
            // add datasets to graph
            let bgColors = [
              "#ff0000",
              "#375623",
              "#7030a0",
              "#ffc000",
            ]
            let bgColor = bgColors[vGs_idx[vGs_value]]
            let labelForDataSet = `Vgs = ${vGs_value}V`

            // add data set
            Scenes.graphFeatures.addDataset(graphRef,labelForDataSet,bgColor,[])            
          }
          else{
            // adding data to graph
            let datasetIndex = vGs_idx[vGs_value]
            let temp_vDs = [10,20,30,40,50,60]

            //! add formula value here
            calculationValues.vDs.push(temp_vDs[acceptedValueIndex-1])
            calculationValues.iD.push(vIn_value)

            let x = calculationValues.vDs[acceptedValueIndex-1]
            let y = calculationValues.iD[acceptedValueIndex-1] * vGs_value
            let data = {x,y}

            Scenes.graphFeatures.addData(graphRef,datasetIndex,data)                        
          }
        }

      }

      //! onclick start btn
      Scenes.items.btn_start_experiment.item.onclick = ()=>{
        // to enable the button
        if(partConnectionsIsComplete){
          // * Hide preivous
          hideConnectionStepImgs()
          // * calculation part
          partCalculation()
        }
      }

      return true
    }),

    (step4 = function () {
      setIsProcessRunning(true);

      Scenes.setStepHeading("Step-2", "Transfer Characteristics.",true);
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
        Scenes.items.part_2_conncection_supply_1_red_button.set(153,60,24,23).zIndex(10),
        Scenes.items.part_2_conncection_supply_2_red_button.set(158,296,27,23).zIndex(10),
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

      // ! for increasing the size
      let l = 0,t = -85, h = 495, w = 965 
      Scenes.items.part_2_connections_components.set(l,t,h,w).zIndex(1)
      cables.forEach(ele=>{
        ele.set(l,t,h,w).hide()
      })

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
      // to enable startExp Button
      let partConnectionsIsComplete = false
      function partConnections(){
         // Connection Logic
        Scenes.items.part_2_connections_box.set(442,-84).hide()

        // ! btn_reset onclick
        Scenes.items.btn_reset.item.onclick = ()=>{
          let box_buttons_reset = document.querySelectorAll(".part_2_connections_box button")
          let temps = {
            textShadow: "none",
            color: "black",
            backgroundColor: "transparent"
          }
          box_buttons_reset.forEach(ele=>{
            let ele_Dom = new Dom(ele)
            ele_Dom.styles(temps)
          })
          Scenes.steps[5]()
        }

        //! connection box onclick
        Scenes.items.btn_connections.item.onclick = ()=>{
          Scenes.items.part_2_connections_box.show("flex")
          // ! connection table arrow move
          Dom.setBlinkArrowRed(true,510,-7,35,null,90).play()
          setCC("")
        }
        let box_buttons = document.querySelectorAll(".part_2_connections_box button")

        //! connection box onclick
        let btnClickedCount = 0
        let connectionBtnArrow = 510
        let arrowLeftGap = 43
        box_buttons.forEach((ele,i)=>{
          ele.onclick = ()=>{
            // increasing count of complete connection
            if(ele.style.color!="white"){
              btnClickedCount++
              //! move arrow 
              connectionBtnArrow += arrowLeftGap
              Dom.setBlinkArrowRed(true,connectionBtnArrow,-7,35,null,90).play()
              
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
            Scenes.items.part_1_slide_3_compo_1_text.set(178,144-55,50).zIndex(10)
            Dom.setBlinkArrowRed(true,186,113-55).play()
            setCC("Switch on Main Supply")
            Scenes.items.part_2_conncection_supply_1_red_button.item.onclick = ()=>{
              
              Scenes.items.part_2_conncection_supply_1_red_button.hide()
              Scenes.items.part_1_slide_3_compo_1_text.hide()
              //! Second red button click
              
              Scenes.items.part_1_slide_3_compo_2_text.set(178,338-13,56).zIndex(10)
              Dom.setBlinkArrowRed(true,186,306-13).play()
              setCC("Switch on Gate Supply")

              Scenes.items.part_2_conncection_supply_2_red_button.item.onclick = ()=>{
                Scenes.items.part_2_conncection_supply_2_red_button.hide()
                Scenes.items.part_1_slide_3_compo_2_text.hide()

                Dom.setBlinkArrowRed(true,745,360,35,null,180).play()
                setCC("Click on Start Experiment")
                partConnectionsIsComplete = true
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
        // show arrow for R
        Dom.setBlinkArrowRed(true,317,302,35,null,-90).play()
        setCC("Select R")

        Scenes.items.part_2_calculation_components.set(0,-85,475,950)
        Scenes.items.btn_nomenclature.set(785,-75,30).zIndex(10)
        Scenes.items.btn_procedure.set(785,-10,33).zIndex(10)
        Scenes.items.btn_plot.set(785,70,50).zIndex(10)
        // * Calling slider
        sliders.showSliderFor("2")

        // * Graph section
        Scenes.items.graph_box_3.set(580,162,242,365).zIndex(10)
        let ctx = Scenes.items.graph3.item
        let graphIdx = 2
        let xLabel = "Gate to source voltage (V<sub>GS</sub>)"
        let yLabel = "Drain Current (I<sub>D</sub>)"
        let dataLabel = "vDS = 50"
        // ploting empty graph
        let graphRef = Scenes.plotGraph(ctx,graphIdx,[],dataLabel,xLabel,yLabel,true)
        // for setting xy label of graph in position
        function setXYLabel(){
          Scenes.items.xLabel.set(664, 375)
          Scenes.items.yLabel.set(507, 263)
        }
        setXYLabel()

        let table = new Dom(".part_2_table").set(600,-76).item
        // * assume tempTitle10 as a btn record
        let btn_record = sliders.btn_record.item

        // ! btn_record onclick
        let recordBtnIdx = 0
        btn_record.onclick = ()=>{
          let rows = table.tBodies[0].rows
          if(recordBtnIdx >= rows.length){
            return
          }

          // * Filling Table
          rows[recordBtnIdx].cells[0].innerHTML = "10"
          rows[recordBtnIdx].cells[1].innerHTML = "12"
          recordBtnIdx++

          // to plot the data
          if(recordBtnIdx == rows.length){
            // ! btn Plot onclick
            Scenes.items.btn_plot.item.onclick = ()=>{
              let data = []
              for(let row of rows){
                let x = row.cells[0].innerHTML
                let y = row.cells[1].innerHTML
                data.push({x,y})
              }

              Scenes.graphFeatures.addData(graphRef,0,data)

              Dom.setBlinkArrowRed(-1)
              Dom.setBlinkArrow(true, 790, 544).play();
              setCC("Click 'Next' to go to next step");
              setIsProcessRunning(false);
              // for going to the second step
              Scenes.currentStep = 2
            }
          }
        }

      }

      //! onclick start btn
      Scenes.items.btn_start_experiment.item.onclick = ()=>{
        // to enable the button
        if(partConnectionsIsComplete){
          // * Hide preivous
          hideConnectionStepImgs()
          // * calculation part
          partCalculation()
        }
      }

      return true
    }),

    (step5 = function () {
      setIsProcessRunning(true);
      Dom.hideAll();
      Scenes.setStepHeading("Step-3", "Switching Characteristics.");
      // setCC("Record 7 reading for 3 different load resistances.")
      // ! show the slider
      // Scenes.items.slider_box.set(25, 15).scale(0.95);
      Scenes.items.btn_next.show();

      //! Required Items
      Scenes.items.part_3_components.set(0,-55,null, 950 )
      Scenes.items.part_3_off_button.set(100, 65, 42, 65)
      Scenes.items.part_3_text.set(90, 175, 80, 100)
      Scenes.items.btn_procedure.set(20,298, 38, 170)
      Scenes.items.btn_nomenclature.set(20,340, 38, 190)
      Dom.setBlinkArrowRed(true,112,115,35,null,90).play()
      
      
      
      
      let offBtn = Scenes.items.part_3_off_button.item
      
      offBtn.onclick = ()=>{
        Dom.setBlinkArrowRed(-1)   
        Scenes.items.part_3_graph.set( -10, -56, 404, 965)
        Scenes.items.part_3_off_button.hide()
        Scenes.items.part_3_text.hide()
        Scenes.items.part_3_table_1.set(220,270, 135, 300)
        Scenes.items.part_3_table_2.set(590,330, 50)
        Scenes.items.part_3_table_3.set(742,330, 50)


        
      }

      return true;
    }),
    
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
Scenes.currentStep = 2

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

