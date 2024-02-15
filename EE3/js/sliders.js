//to catch the select option header

let first_header = document.querySelector(".header_v");
let second_header = document.querySelector(".header_r");
let third_header = document.querySelector(".header_c");

console.log(first_header);
//first_header.innerHTML = "snhea";

//to change the header of option
let changeHeader = function (selectEleOpn, newHeaderName) {
  selectEleOpn.innerHTML = newHeaderName;
};

//changeHeader(third_header, "duty ration")

//to catch the select option
let vIn = document.querySelector(".slider_vIn");
let R = document.querySelector(".slider_R");
let C = document.querySelector(".slider_C");

//generateOption(v, ["10", "12", "33"]);
//v.innerHTML = generateOption(["10", "20", "29"]);

//to change the option in select
function generateOption(selectEleOpn, opsArr) {
  let strOps = "";
  for (let ops of opsArr) {
    strOps += `<option value="${ops}">${ops}</option>`;
  }
  selectEleOpn.innerHTML = strOps;
}

let d = document.querySelector(".slider_D");
let d_input = document.querySelector(".slider_D_input");

//console.log(d.value)
//console.log(d_input.value)

let changeValue = function () {
  d_input.value = d.value;
};

d.addEventListener("input", changeValue);

d_input.addEventListener("keyup", () => {
  if (d.value > 0.9) {
    d.value = 0.9;
  }
  d.value = d_input.value;
})

let disable = function (selectEleOpn) {
  selectEleOpn.item.disabled = "true";
}

function resetSliderValue(){
    d.min = 0.1
    d.max = 0.9
    d.step = 0.1
    d.value = 0.1
}
