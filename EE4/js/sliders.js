const sliders = {
  slider_vIn: new Dom(".slider_vIn"),
  slider_vGs: new Dom(".slider_vGs"),
  slider_R: new Dom(".slider_R"),

  slider_vIn_label: new Dom(".temp-title5"),
  slider_vGs_label: new Dom(".temp-title6"),
  slider_R_label: new Dom(".temp-title7"),

  //! we using temptitle10 as a record btn
  // show we can update the table according to the button click
  btn_record: new Dom(".temp-title10"),


  init(){
    this.updateLabels()
    let styles = {
      fontSize: "small",
      padding: "0 5px",
      textAlign: "center",
      width: "fit-content",
      color: "black",
      border: "2px solid black",
      backgroundColor: "white",
    }
    this.slider_vIn_label.styles(styles)
    this.slider_vGs_label.styles(styles)
    this.slider_R_label.styles(styles)
  },
  
  // part: 1_1, 1_2, 2
  showSliderFor(part){
    switch(part){
      case "1_1":

        break

      case "1_2":

        break
        
      case "2":
        this.slider_vIn.set(34,33,23).zIndex(10)
        this.slider_vGs.set(4,364,23).zIndex(10)
        this.slider_R.set(329,362,23).zIndex(10)

        this.slider_vIn_label.set(185,65)
        this.slider_vGs_label.set(242,364)
        this.slider_R_label.set(502,364)
        
        // ! vGs onclick
        var differences = [69, 27, 26, 28, 25, 25, 19];
        var currentDifferenceIndex = 0;
        // for the slider vgs
        let value_vGs = 0
        this.slider_vGs.item.onclick = ( )=>{
          if (currentDifferenceIndex < differences.length) {
            // Get the current difference
            var currentDifference = differences[currentDifferenceIndex];
            if(currentDifferenceIndex==0)
              value_vGs = 4
            else
              value_vGs++
    
            // Animate the translation on each click
            this.sliderAnime(this.slider_vGs,currentDifference,value_vGs)
            currentDifferenceIndex++;

            // !we using temptitle10 as a record btn
            this.btn_record.item.click()
          }
        }

        // ! vIn onclick 
        this.slider_vIn.item.onclick = ()=>{
          let value_vIn = 200
          this.sliderAnime(this.slider_vIn,0,value_vIn,159)
        }

        // ! R onclick 
        this.slider_R.item.onclick = ()=>{
          let value_R = 50
          this.sliderAnime(this.slider_R,0,value_R,376)
        }
        break
    }
  },
  sliderAnime(target,translateX,value,left="",complete=null){
    anime({
      targets: target.item,
      translateX: `+=${translateX}`, 
      left: left,
      easing: 'easeInOutQuad', 
      duration: 600, 
      complete: ()=> {
        this.updateLabels()
        if(complete!=null){
          complete()
        }
      }
    });
    // set value of slider
    target.item.attributes['value'].value = value
  },
  updateLabels(){
    this.slider_vIn_label.setContent(
      `${this.getVal(this.slider_vIn)}<br>volts`
    )
    this.slider_vGs_label.setContent(
      `${this.getVal(this.slider_vGs)}<br>volts`
    )
    this.slider_R_label.setContent(
      `${this.getVal(this.slider_R)}<br>ohms`
    )
  },
  labelAnime(target,value){
    // let currentValue = Number(target.item.innerHTML.slice(0,target.item.innerHTML.indexOf("<")))

    // anime({
    //   targets: target.item,
    //   duration: 600,
    //   easing: "linear",
    //   innerHTML: [currentValue,]
    // })
  },
  getVal(dom){
    return dom.item.attributes['value'].value
  }
}

setTimeout(() => {
  sliders.init()
  // Change this for your step
  sliders.showSliderFor("2")
}, 1000);

