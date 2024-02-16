const sliders = {
  //to catch the select option header
  selectOpHeader1: document.querySelector(".header_v"),
  selectOpHeader2: document.querySelector(".header_r"),
  selectOpHeader3: document.querySelector(".header_c"),
  //to catch the select option
  selectOp1: document.querySelector(".slider_C"),
  selectOp2: document.querySelector(".slider_vIn"),
  selectOp3: document.querySelector(".slider_R"),
  selectOptions: [],
  slider: document.querySelector(".slider_D"),
  sliderInput: document.querySelector(".slider_D_input"),
  sliderHeader: document.querySelector(".header_d"),
  
  init(){
    this.selectOptions = [this.selectOp1,this.selectOp2,this.selectOp3]
    this.changeValue()
  },
  //to change the header of option
  changeHeader(idx, headerTitle) {
    this.selectOptions[idx].innerHTML = headerTitle
  },
  //to change the option in select
  generateOptionsFor(stepIndex) {
    function genOptions(selectEleOpn,opsArr,opsArr2=null){
      let strOps = "";
      for (let ops in opsArr) {
        let ops2 = opsArr[ops]
        if(opsArr2!=null){
          ops2 = opsArr2[ops]
        }
        strOps += `<option value="${opsArr[ops]}">${ops2}</option>`;
      }
      selectEleOpn.innerHTML = strOps;
    }
    switch(stepIndex){
      case 0:
      case 1:
        this.changeHeader(0,"Characteristics")
        genOptions(this.selectOptions[0],["D-vs-M","D-vs-I","D-vs-V"],
        ["D-vs-M","D-vs-I&#x2080;","D-vs-V&#x2080;"])

        this.changeHeader(1,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[1],[24,36,48])
        
        this.changeHeader(2,"R (Ω)")
        genOptions(this.selectOptions[2],[12,24,36])

        this.setSlider(0.1,0.9,0.01,"D")
        break

      case 2:
        this.changeHeader(0,"Characteristics")
        genOptions(this.selectOptions[0],["P-vs-Losses","P-vs-Efficiency"],
        ["P&#x2080;-vs-Losses","P&#x2080;-vs-Efficiency"])

        this.changeHeader(1,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[1],[24,36,48])
        
        this.changeHeader(2,"D")
        genOptions(this.selectOptions[2],[0.25,0.50,0.75])

        this.setSlider(10, 100, 1, "R (Ω)")
        break
      
      case 3:
        this.changeHeader(0,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[1],[24,36,48])
        
        this.changeHeader(1,"R")
        genOptions(this.selectOptions[2],[20,30,40])

        this.changeHeader(2,"D")
        genOptions(this.selectOptions[2],[0.25,0.50,0.75])

        this.hideSliderAndOption(3)
        break
    }
  },

  changeValue(maxValue) {
    this.slider.oninput = () => {
      this.sliderInput.value = this.slider.value;
    }

    this.sliderInput.onkeyup = () => {
      if (this.slider.value > maxValue) {
        this.slider.value = maxValue;
      }
      this.slider.value = this.sliderInput.value;
    }
  },

  disable(selectEleOpn) {
    selectEleOpn.item.disabled = "true";
  },
  hideSliderAndOption(opsIdx){
    let sliderArr = document.querySelectorAll(".select-container")
    sliderArr[opsIdx].style.display="none"
  },

  setSlider(min,max,step,title){
    this.slider.value = min
    this.slider.min = min
    this.slider.max = max
    this.slider.step = step

    this.sliderInput.value = min
    this.sliderInput.min = min
    this.sliderInput.max = max

    this.sliderHeader.innerHTML = title

    this.changeValue(max)
  }
}

sliders.init()
