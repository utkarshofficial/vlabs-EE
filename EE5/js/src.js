const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),

  set() {
    let index = 0
    this.allItems = {

      // * Tempalte Buttons
      arrowRound: this.allImgsDom[index++],
      blinkArrow: this.allImgsDom[index++],
      laerrow: this.allImgsDom[index++],
      laerrow2: this.allImgsDom[index++],
      logo: this.allImgsDom[index++],
      man: this.allImgsDom[index++],
      measurearrow: this.allImgsDom[index++],
      measurearrow2: this.allImgsDom[index++],
      redsize: this.allImgsDom[index++],                                         
      speech_off_btn: this.allImgsDom[index++],
      speech_on_btn: this.allImgsDom[index++],
      talk_cloud: this.allImgsDom[index++],
      iit_delhi_logo: this.allImgsDom[index++],
      // * --xx Tempalte Buttons Ended xx--


      // !EE 4 images added
   
 
   
      // part2

  

      //* new images added
      


      // part2 calculation 
      

      
      //part3 images added
     
      
      
      
      // * for PROCEDURE and instruction NOMENCLATURE
      
      //* useful images from previous experiment

      btn_connections:this.allImgsDom[index++],
      btn_connectons_completed:this.allImgsDom[index++],
      btn_instructions:this.allImgsDom[index++],
      btn_nomenclature:this.allImgsDom[index++],
      // btn_plot:this.allImgsDom[index++],
      btn_procedure:this.allImgsDom[index++],
      btn_reset:this.allImgsDom[index++],
      btn_start_experiment:this.allImgsDom[index++],

      part_1_slide_3_compo_1_off:this.allImgsDom[index++],
      part_1_slide_3_compo_1_on:this.allImgsDom[index++],
      part_1_slide_3_compo_1_text:this.allImgsDom[index++],
      part_1_slide_3_compo_2_off:this.allImgsDom[index++],
      part_1_slide_3_compo_2_on:this.allImgsDom[index++],
      part_1_slide_3_compo_2_text:this.allImgsDom[index++],

      part_1_incomplete_connection:this.allImgsDom[index++],

      part_2_conncection_supply_1_red_button:this.allImgsDom[index++],
      part_2_conncection_supply_2_red_button:this.allImgsDom[index++],
      
      
      // ! Slider Thumbs
      slider_vGs: this.allImgsDom[index++],
      slider_vIn: this.allImgsDom[index++],
      slider_R: this.allImgsDom[index++],
      
            niddle_vGs: this.allImgsDom[index++],
            niddle_vIn: this.allImgsDom[index++],


      //* EE5 images added
arrow_black:this.allImgsDom[index++],
btn_plot:this.allImgsDom[index++],
btn_zoomed_in_plot:this.allImgsDom[index++],
part_1_cable_a2:this.allImgsDom[index++],
part_1_cable_ac2:this.allImgsDom[index++],
part_1_cable_k:this.allImgsDom[index++],
part_1_cable_k_ac1:this.allImgsDom[index++],
part_1_cable_p:this.allImgsDom[index++],
part_1_cable_p1:this.allImgsDom[index++],
part_1_cable_r2:this.allImgsDom[index++],
part_1_cable_rg2:this.allImgsDom[index++],
part_1_cable_v1:this.allImgsDom[index++],
part_1_cable_v2:this.allImgsDom[index++],
part_1_calculations:this.allImgsDom[index++],
part_1_components:this.allImgsDom[index++],
part_1_instruction_box:this.allImgsDom[index++],
part_1_nomenclature_box:this.allImgsDom[index++],
part_1_procedure_box:this.allImgsDom[index++],
part_2_cable_a2:this.allImgsDom[index++],
part_2_cable_ac1:this.allImgsDom[index++],
part_2_cable_cp:this.allImgsDom[index++],
part_2_cable_dvp:this.allImgsDom[index++],
part_2_cable_k:this.allImgsDom[index++],
part_2_cable_k_n:this.allImgsDom[index++],
part_2_cable_p:this.allImgsDom[index++],
part_2_cable_p1:this.allImgsDom[index++],
part_2_cable_r2:this.allImgsDom[index++],
part_2_cable_rg2:this.allImgsDom[index++],
part_2_cable_v1:this.allImgsDom[index++],
part_2_cable_v2:this.allImgsDom[index++],
part_2_calculation:this.allImgsDom[index++],
part_2_components:this.allImgsDom[index++],
part_2_instruction_box:this.allImgsDom[index++],
part_2_procedure_box:this.allImgsDom[index++],
select_option_1:this.allImgsDom[index++],
select_option_2:this.allImgsDom[index++],
select_option_full:this.allImgsDom[index++],


      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
