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
        this.slider_vIn.set(10,31+temp1,23).zIndex(10)
        this.slider_vIn_label.set(180+temp2,65+temp1)

        this.slider_vGs.set(2,370,23).zIndex(10)
        this.slider_vGs_label.set(157,327)
        
        this.slider_R.set(253,365,23).zIndex(10)
        this.slider_R_label.set(433,360)

        
        // ! vGs onclick
        var differences_vGs = [80, 103, 128, 131, 175];
        var vals_vGs = [6,7,8,9,10]
        var currentDifferenceIndex_vGs = 0;
        // for the slider vgs
        var value_vGs = 0
        this.slider_vGs.item.onclick = ( )=>{
          if (currentDifferenceIndex_vGs < differences_vGs.length) {
            // Get the current difference
            var currentDifference = differences_vGs[currentDifferenceIndex_vGs];
            
            // setting the value of label
            value_vGs = vals_vGs[currentDifferenceIndex_vGs]

            // Animate the translation on each click
            this.sliderAnime(this.slider_vGs,null,value_vGs,currentDifference)
            currentDifferenceIndex_vGs++;

            // !we using temptitle10 as a record btn
            // this.btn_record.item.click()
            
            // * show arrow for vIn
            Dom.setBlinkArrowRed(true,13,-72,35,null,-90).play()
            setCC("Select V<sub>in</sub>")
          }
        }

        // ! vIn onclick 
        var defaultLeftPos = 10
        var differences_vIn = [44,67,92,116,141,165];
        var vals_vIn = [40,80,120,160,200,240]
        var currentDifferenceIndex_vIn = 0;
        // for slider vIn
        this.slider_vIn.item.onclick = ()=>{
          if (currentDifferenceIndex_vIn < differences_vIn.length) {
            // Get the current difference
            var currentDifference = differences_vIn[currentDifferenceIndex_vIn];
            
            // setting the value of label
            var value = vals_vIn[currentDifferenceIndex_vIn]

            // Animate the translation on each click
            this.sliderAnime(this.slider_vIn,null,value,currentDifference)
            currentDifferenceIndex_vIn++;

            // !we using temptitle10 as a record btn
            this.btn_record.item.click()

            // * show arrow for vIn
            Dom.setBlinkArrowRed(true,13,-72,35,null,-90).play()
            setCC("Select V<sub>in</sub>")

            if(currentDifferenceIndex_vIn == differences_vIn.length){
              // * show arrow for plot
              Dom.setBlinkArrowRed(true,529,343,35,null,-90).play()
              setCC("Click on 'Plot'")
            }
          }else{
            // reset this value because of behaviour of slide
            currentDifferenceIndex_vIn = 0 
          }
        }

        // ! R onclick 
        this.slider_R.item.onclick = ()=>{
          let value_R = 50
          var left = 304
          this.sliderAnime(this.slider_R,0,value_R,left)

          // * show arrow for vGs
          Dom.setBlinkArrowRed(true,0,320,35,null,-90).play()
          setCC("Select V<sub>GS</sub>")
          
        }
        break

      case "1_2":
        var temp2 = -23
        var temp1 = -80
        this.slider_vIn.set(62,-50,23).zIndex(10)
        this.slider_vIn_label.set(252,-56)

        this.slider_vGs.set(8,369,23).zIndex(10)
        this.slider_vGs_label.set(176,326)
        
        this.slider_R.set(275,354,23).zIndex(10)
        this.slider_R_label.set(453,348)

        
        // ! vGs onclick
        var differences_vGs = [82,104,128,151,173];
        var vals_vGs = [6,7,8,9,10]
        var niddle_vGs_deg = [63,74,84.5,96,106]
        var currentDifferenceIndex_vGs = 0;
        // for the slider vgs
        var value_vGs = 0
        this.slider_vGs.item.onclick = ( )=>{
          Dom.setBlinkArrowRed(-1)
          if (currentDifferenceIndex_vGs < differences_vGs.length) {
            // Get the current difference
            var currentDifference = differences_vGs[currentDifferenceIndex_vGs];
            
            // setting the value of label
            value_vGs = vals_vGs[currentDifferenceIndex_vGs]

            // Animate the translation on each click
            this.sliderAnime(this.slider_vGs,null,value_vGs,currentDifference)

            // ! we using temptitle10 as a record btn
            // this.btn_record.item.click()
            // * rotate neddle
            anime({
              targets: Scenes.items.niddle_vGs.item,
              easing: "linear",
              duration: 1000,
              rotate: niddle_vGs_deg[currentDifferenceIndex_vGs],
              complete(){
                // * show arrow for vIn
                Dom.setBlinkArrowRed(true,53,-89,35,null,-90).play()
                setCC("Select V<sub>in</sub>")
              }
            })

            currentDifferenceIndex_vGs++;

          }
        }

        // ! vIn onclick 
        // neddle vIn rotate (-1,126) deg
        var defaultRotatePos = -1
        // slider (11, 160)
        var defaultLeftPos = 62
        // for slider vIn
        var leftEndPixel = 212
        // 11, 160
        // label value 0 to 240
        let currentLabelValue = 0
        // vIn values
        let vIn_accept_range = [0,40,80,120,160,200,240]  
        // onclick accept range for vgs
        let vGs_accept_range = vals_vGs
        this.slider_vIn.item.onclick = ()=>{
          Dom.setBlinkArrowRed(-1)
          // vIn
          if(currentDifferenceIndex_vGs > differences_vGs.length){
              return
          }
          // rotate slider with neddle
          anime.timeline({
            easing: "linear",
            duration: 8000,
          })
          .add({
            targets: this.slider_vIn.item,
            left: [defaultLeftPos, leftEndPixel,leftEndPixel, defaultLeftPos],
            value: [0,240,240, 0],
            update: ()=>{
              let labelValue = this.slider_vIn.getValue()
              labelValue = Math.round(labelValue)
              this.slider_vIn_label.setContent(
                `${labelValue}<br>volts`
              )

              // ! click the recrod btn
              let acceptedValueIndex = vIn_accept_range.indexOf(labelValue)
              if(acceptedValueIndex!=-1){
                this.btn_record.item.click()
                // for disabling for old value      
                vIn_accept_range[acceptedValueIndex] = -1
                return
              }
            },
            complete:()=>{
              if(currentDifferenceIndex_vGs < differences_vGs.length){
                vIn_accept_range = [0,40,80,120,160,200,leftEndPixel] 

                // * show arrow for vGs
                Dom.setBlinkArrowRed(true,0,328,35,null,-90).play()
                setCC("Select V<sub>GS</sub>") 
              }
              else{
                currentDifferenceIndex_vGs++
                Dom.setBlinkArrowRed(-1)
                Dom.setBlinkArrow(true, 790, 544).play();
                setCC("Click 'Next' to go to next step");
                setIsProcessRunning(false);
                // for going to the second step
                Scenes.currentStep = 2
              }
            }
          },0)
          .add({
            targets: Scenes.items.niddle_vIn.item,
            rotate: [-1,126,126, -1]
          },0)
        }

        // ! R onclick 
        this.slider_R.item.onclick = ()=>{
          let value_R = 50
          var left = 323
          this.sliderAnime(this.slider_R,0,value_R,left)

          // * show arrow for vGs
          Dom.setBlinkArrowRed(true,0,328,35,null,-90).play()
          setCC("Select V<sub>GS</sub>")
        }
        break
        
      case "2":
        this.slider_vIn.set(34,-44,23).zIndex(10)
        this.slider_vIn_label.set(185,-10)

        this.slider_vGs.set(15,347,23).zIndex(10)
        this.slider_vGs_label.set(248,343)
        
        this.slider_R.set(329,362-18,23).zIndex(10)
        this.slider_R_label.set(502,347)

        
        // ! vGs onclick
        var differences = [43,70,96,123,150,176,202,222];
        var vals_vGs = [2,4,6,8,10,12,14,16]
        var currentDifferenceIndex = 0;
        // for the slider vgs
        var value_vGs = 0
        this.slider_vGs.item.onclick = ( )=>{
          if (currentDifferenceIndex < differences.length) {
            // Get the current difference
            var currentDifference = differences[currentDifferenceIndex];
            // vals
            value_vGs = vals_vGs[currentDifferenceIndex]
    
            // Animate the translation on each click
            this.sliderAnime(this.slider_vGs,null,value_vGs, currentDifference)

            if(currentDifferenceIndex==0){
              // * show arrow for vIn
              Dom.setBlinkArrowRed(true,22,-90,35,null,-90).play()
              setCC("Select V<sub>in</sub>")
            }
            else if(currentDifferenceIndex == differences.length - 1){
              // * show arrow for plot
              Dom.setBlinkArrowRed(true,802,30,35,null,-90).play()
              setCC("Click on 'Plot'")
            }
            else{
              // * show arrow for vGs
              Dom.setBlinkArrowRed(true,0,302,35,null,-90).play()
              setCC("Select V<sub>GS</sub>")
            }
            
            currentDifferenceIndex++;

            // !we using temptitle10 as a record btn
            this.btn_record.item.click()
          }
        }

        // ! vIn onclick 
        this.slider_vIn.item.onclick = ()=>{
          let value_vIn = 200
          let leftEndPixel = 162
          this.sliderAnime(this.slider_vIn,0,value_vIn,leftEndPixel)

          // * show arrow for vGs
          Dom.setBlinkArrowRed(true,0,302,35,null,-90).play()
          setCC("Select V<sub>GS</sub>")
        }

        // ! R onclick 
        this.slider_R.item.onclick = ()=>{
          let value_R = 50
          this.sliderAnime(this.slider_R,0,value_R,376)

          // * show arrow for vGs
          Dom.setBlinkArrowRed(true,0,302,35,null,-90).play()
          setCC("Select V<sub>GS</sub>")
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


