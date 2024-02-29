function sliderR(reset=false){
    let slider_R = document.querySelector(".slider_R")
    let sliderImg = document.querySelector(".slider-R-arrow")
    let sliderValueInput = document.querySelector(".r .value-box input")
    // ratio to move 450/50 = 1:10
    // max img 71px -> min 120px
    let val = 0
    let constVal = 550
    
    // slider function  
    function slide(e){
        e = e instanceof Event
        if(e){
            sliderValueInput.value = constVal - slider_R.value 
        }
        else{
            slider_R.value = constVal - sliderValueInput.value
        }
        val = (slider_R.value / 9.3) - 5
        sliderImg.style.top = `${120 - val}px`
    }

    const slideInput = ()=>{
        let val = sliderValueInput.value
        if(val > 500){
            val = 500
        }
        sliderValueInput.value = val
        slide(false)
    }

    if(reset){
        sliderValueInput.value = 50
        slide()
    }

    slider_R.oninput = slide
    slider_R.oninput()
    sliderValueInput.onkeyup = slideInput
    sliderValueInput.addEventListener("focusout",()=>{
        if(sliderValueInput.value < 50){
            sliderValueInput.value = 50
        }
        slide(false)
    })
}
function sliderD(reset=false){
    let slider_D = document.querySelector(".slider_D")
    let sliderImg = document.querySelector(".slider-D-arrow")
    let sliderValueInput = document.querySelector(".d .value-box input")
    let val = 0
    
   

    // slider function  
    function slide(e){
        e = e instanceof Event
        if(e){
            sliderValueInput.value = slider_D.value 
        }
        else{
            slider_D.value = sliderValueInput.value
        }
        val = ((slider_D.value*100) / 1.7) - 5
        sliderImg.style.left = `${218 + val}px`
    }

    const slideInput = ()=>{
        let val = sliderValueInput.value
        if(val > 0.95){
            val = 0.95
        }
        sliderValueInput.value = val
        slide(false)
    }

    if(reset){
        sliderValueInput.value = 0.1    
        slide()
    }

    slider_D.oninput = slide
    sliderValueInput.onkeyup = slideInput
    sliderValueInput.addEventListener("focusout",()=>{
        if(sliderValueInput.value < 0.1){
            sliderValueInput.value = 0.1
        }
        slide(false)
    })
}
function sliderV(reset=false){
    let sliderArrow = document.querySelector(".slider-V-arrow")
    let sliderValueInput = document.querySelector(".v .value-box input")

    // slider function  
    function rotateArrow(rot=0){
        if(sliderArrow.classList.contains("slider-v-r3")){
            sliderArrow.classList.remove("slider-v-r3")
            sliderArrow.classList.add("slider-v-r1")
            sliderValueInput.value = 24
            
        }else if(sliderArrow.classList.contains("slider-v-r1")){
            sliderArrow.classList.remove("slider-v-r1")
            sliderArrow.classList.add("slider-v-r2")
            sliderValueInput.value = 48
        }else if(sliderArrow.classList.contains("slider-v-r2")){
            sliderArrow.classList.remove("slider-v-r2")
            sliderArrow.classList.add("slider-v-r3")
            sliderValueInput.value = 72
        }
    }

    
    if(reset){
        sliderArrow.classList.remove("slider-v-r3")
        sliderArrow.classList.remove("slider-v-r2")
        sliderArrow.classList.add("slider-v-r1")
        sliderValueInput.value = 24
    }

    sliderArrow.onclick = rotateArrow
}

sliderV()
sliderR()
sliderD()

// for disabling the slider
function disableSlider(sliderName){
    // slider name r d v
    function applyDisableStyle(slider,valueBoxInput,sliderBox){
        if(sliderBox != ".v")
            document.querySelector(slider).disabled = true
        document.querySelector(valueBoxInput).disabled = true
        document.querySelector(sliderBox).style.opacity = "0.6"
    }
    function applyEnableStyle(slider,valueBoxInput,sliderBox){
        if(sliderBox != ".v")
            document.querySelector(slider).disabled = false
        document.querySelector(valueBoxInput).disabled = false
        document.querySelector(sliderBox).style.opacity = 1
    }
    switch(sliderName){
        case "r"||"R":
            applyDisableStyle(".r .slider_R",".r .value-box",".slider_R")
            break
        case "d"||"D":
            applyDisableStyle(".d .slider_D",".d .value-box",".d")
            break
        case "v"||"V":
            applyDisableStyle(".v .slider_V",".r .value-box",".v")
            break
        case "reset":
            // todo
            applyEnableStyle(".r .slider_R",".r .value-box",".slider_R")
            applyEnableStyle(".d .slider_D",".d .value-box",".d")
            applyEnableStyle(".v .slider_V",".r .value-box",".v")
            break
    }
}

let sliders = {
    vImg: document.querySelector(".slider-V-arrow"),
    v: document.querySelector(".v input"),
    d: document.querySelector(".d input"),
    r: document.querySelector(".r input"),
    reset: ()=>{
        sliderV(true)
        sliderD(true)
        sliderR(true)
        sliders.d.min = "0.1";
        sliders.d.max = "0.9";
        sliders.d.step = "0.01";
        sliders.d.value = "0.01";
        document.querySelector(".d .value-box input").readonly = false
        document.querySelector(".slider-D-arrow").style.left = "218px"
        disableSlider("reset")
    },
    clearOnclick: ()=>{
        sliders.vImg.onclick = ()=>{}
        sliders.d.onclick = ()=>{}
        sliders.r.onclick = ()=>{}
    }
}

