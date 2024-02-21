const sliders = {
  //to catch the select option header
  selectOpHeader1: document.querySelector(".header_c"),
  selectOpHeader2: document.querySelector(".header_v"),
  selectOpHeader3: document.querySelector(".header_r"),
  selectContainers: document.querySelectorAll(".select-container"),
  //to catch the select option
  selectOp1: document.querySelector(".slider_C"),
  selectOp2: document.querySelector(".slider_vIn"),
  selectOp3: document.querySelector(".slider_R"),
  selectOptions: [],
  selectOpHeaders: [],
  slider: document.querySelector(".slider_D"),
  sliderInput: document.querySelector(".slider_D_input"),
  sliderHeader: document.querySelector(".header_d"),
  
  init(){
    this.selectOptions = [this.selectOp1,this.selectOp2,this.selectOp3]
    this.changeValue()
    this.selectOpHeaders = [this.selectOpHeader1, this.selectOpHeader2, this.selectOpHeader3]
  },
  //to change the header of option
  changeHeader(idx, headerTitle) {
    this.selectOpHeaders[idx].innerHTML = headerTitle
  },
  //to change the option in select
  generateOptionsFor(stepIndex) {
    function genOptions(selectEleOpn,opsArr,opsArr2=null){
      let strOps = `<option value="">Select</option>`;
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
        this.enableAll()
        this.changeHeader(0,"Characteristics")
        genOptions(this.selectOptions[0],["D-vs-M","D-vs-I","D-vs-V"],
        ["D-vs-M","D-vs-I&#x2080;","D-vs-V&#x2080;"])

        this.changeHeader(1,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[1],[24,36,48])
        
        this.changeHeader(2,"R (Ω)")
        genOptions(this.selectOptions[2],[12,24,36])

        this.setSlider(0.1,0.9,0.01,"D")
        this.enableAll()
        break

      case 2:
        this.enableAll()
        this.changeHeader(0,"Characteristics")
        genOptions(this.selectOptions[0],["P-vs-Losses","P-vs-Efficiency"],
        ["P&#x2080;-vs-Losses","P&#x2080;-vs-Efficiency"])

        this.changeHeader(1,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[1],[24,36,48])
        
        this.changeHeader(2,"D")
        genOptions(this.selectOptions[2],[0.25,0.50,0.75])

        this.setSlider(10, 100, 1, "R (Ω)")
        this.enableAll()
        break
      
      case 3:
        this.enableAll()
        this.changeHeader(0,"V<sub>in</sub> (V)")
        genOptions(this.selectOptions[0],[24,36,48])
        
        this.changeHeader(1,"R")
        genOptions(this.selectOptions[1],[20,30,40])

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

  disable(...selectIndex) {
    selectIndex.forEach(index=>{
      if(index==3){
        this.slider.disabled = true
        this.sliderInput.disabled = true
        this.selectContainers[index].classList.add("disabled")
      }else{
        this.selectOptions[index].disabled = true
        this.selectContainers[index].classList.add("disabled")
      }
    })
  },
  enableAll(){
    this.selectOptions.forEach(ele=>{
      ele.disabled = false
    })
    this.selectContainers.forEach(ele=>{
      ele.classList.remove("disabled")
    })
    this.slider.disabled = false
    this.sliderInput.disabled = false
    this.showSliderAndOptions()
  },
  hideSliderAndOption(opsIdx){
    let sliderArr = document.querySelectorAll(".select-container")
    sliderArr[opsIdx].style.display="none"
  },
  showSliderAndOptions(){
    for(let i =0; i<3;i++){
      this.selectContainers[i].style.display = "block"
    }
    this.selectContainers[3].style.display = "flex"
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
  },
}

sliders.init()
