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
        var temp2 = -10
        var temp1 = -62
        this.slider_vIn.set(34+temp2,33+temp1,23).zIndex(10)
        this.slider_vIn_label.set(185+temp2,65+temp1)

        this.slider_vGs.set(10,369,23).zIndex(10)
        this.slider_vGs_label.set(168,325)
        
        this.slider_R.set(266,365,23).zIndex(10)
        this.slider_R_label.set(446,360)

        
        // ! vGs onclick
        var differences = [65, 89, 113, 138, 187];
        var vals = [4,6,8,10,15]
        var currentDifferenceIndex_vGs = 0;
        // for the slider vgs
        var value_vGs = 0
        this.slider_vGs.item.onclick = ( )=>{
          if (currentDifferenceIndex_vGs < differences.length) {
            // Get the current difference
            var currentDifference = differences[currentDifferenceIndex_vGs];
            
            // setting the value of label
            value_vGs = vals[currentDifferenceIndex_vGs]

            // Animate the translation on each click
            this.sliderAnime(this.slider_vGs,null,value_vGs,currentDifference)
            currentDifferenceIndex_vGs++;

            // !we using temptitle10 as a record btn
            this.btn_record.item.click()
          }
        }

        // ! vIn onclick 
        var defaultLeftPos = 24
        differences = [53,76,101,126,152,175];
        vals = [40,80,120,160,200,240]
        currentDifferenceIndex_vIn = 0;
        // for slider vIn
        this.slider_vIn.item.onclick = ()=>{
          if (currentDifferenceIndex_vIn < differences.length) {
            // Get the current difference
            var currentDifference = differences[currentDifferenceIndex_vIn];
            
            // setting the value of label
            var value = vals[currentDifferenceIndex_vIn]

            // Animate the translation on each click
            this.sliderAnime(this.slider_vIn,null,value,currentDifference)
            currentDifferenceIndex_vIn++;

            // !we using temptitle10 as a record btn
            this.btn_record.item.click()
          }
        }

        // ! R onclick 
        this.slider_R.item.onclick = ()=>{
          let value_R = 50
          var left = 317
          this.sliderAnime(this.slider_R,0,value_R,left)
        }
        break

      case "1_2":

        break
        
      case "2":
        this.slider_vIn.set(34,-44,23).zIndex(10)
        this.slider_vIn_label.set(185,-10)

        this.slider_vGs.set(4,364-18,23).zIndex(10)
        this.slider_vGs_label.set(242,364-18)
        
        this.slider_R.set(329,362-18,23).zIndex(10)
        this.slider_R_label.set(502,364-18)

        
        // ! vGs onclick
        var differences = [69, 27, 26, 28, 25, 25, 19];
        var currentDifferenceIndex = 0;
        // for the slider vgs
        var value_vGs = 0
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
  },
  showSlider(part){
    setTimeout(() => {
      sliders.init()
      // Change this for your step
      sliders.showSliderFor(part)
    }, 1000); 
  }
}

sliders.init()


