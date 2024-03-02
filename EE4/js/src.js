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
      btn_connections:this.allImgsDom[index++],
      btn_connectons_completed:this.allImgsDom[index++],
      btn_instructions:this.allImgsDom[index++],
      btn_nomenclature:this.allImgsDom[index++],
      btn_plot:this.allImgsDom[index++],
      btn_procedure:this.allImgsDom[index++],
      btn_reset:this.allImgsDom[index++],
      btn_start_experiment:this.allImgsDom[index++],
      method_1_cable_black_bottom:this.allImgsDom[index++],
      method_1_cable_black_top:this.allImgsDom[index++],
      method_1_cable_blue:this.allImgsDom[index++],
      method_1_cable_green:this.allImgsDom[index++],
      method_1_cable_pink:this.allImgsDom[index++],
      method_1_cable_purple:this.allImgsDom[index++],
      method_1_cable_red:this.allImgsDom[index++],
      method_1_cable_yellow:this.allImgsDom[index++],
      method_2_cable_green:this.allImgsDom[index++],
      method_2_cable_red:this.allImgsDom[index++],
      method_2_cable_yellow:this.allImgsDom[index++],
      part_1_instructions_box:this.allImgsDom[index++],
      part_1_procedure_box:this.allImgsDom[index++],
      part_1_select_option_1_1:this.allImgsDom[index++],
      part_1_select_option_1_2:this.allImgsDom[index++],
      part_1_select_option_2:this.allImgsDom[index++],
      part_1_select_option_3:this.allImgsDom[index++],
      part_1_select_option_full:this.allImgsDom[index++],
      part_1_slide_1:this.allImgsDom[index++],
      part_1_slide_2:this.allImgsDom[index++],
      part_1_slide_3:this.allImgsDom[index++],
      part_1_slide_3_compo_1_off:this.allImgsDom[index++],
      part_1_slide_3_compo_1_on:this.allImgsDom[index++],
      part_1_slide_3_compo_1_text:this.allImgsDom[index++],
      part_1_slide_3_compo_2_off:this.allImgsDom[index++],
      part_1_slide_3_compo_2_on:this.allImgsDom[index++],
      part_1_slide_3_compo_2_text:this.allImgsDom[index++],
      part_1_procedure_box_2:this.allImgsDom[index++],
      part_1_slide_4:this.allImgsDom[index++],
      part_1_incomplete_connection:this.allImgsDom[index++],

      // part2
      part_2_conncection_cable_a2:this.allImgsDom[index++],
      part_2_conncection_cable_n2:this.allImgsDom[index++],
      part_2_conncection_cable_p1:this.allImgsDom[index++],
      part_2_conncection_cable_p2:this.allImgsDom[index++],
      part_2_conncection_cable_r2:this.allImgsDom[index++],
      part_2_conncection_cable_s:this.allImgsDom[index++],
      part_2_conncection_cable_v1:this.allImgsDom[index++],
      part_2_conncection_cable_v2:this.allImgsDom[index++],
      part_2_conncection_cable_vg1:this.allImgsDom[index++],
      part_2_conncection_cable_vg2:this.allImgsDom[index++],
      part_2_conncection_supply_1_red_button:this.allImgsDom[index++],
      part_2_conncection_supply_2_red_button:this.allImgsDom[index++],
      part_2_connections_components:this.allImgsDom[index++],

      //* new images added
      

      part_1_1_cable_a2:this.allImgsDom[index++],
      part_1_1_cable_n2:this.allImgsDom[index++],
      part_1_1_cable_p1:this.allImgsDom[index++],
      part_1_1_cable_p2:this.allImgsDom[index++],
      part_1_1_cable_r2:this.allImgsDom[index++],
      part_1_1_cable_s:this.allImgsDom[index++],
      part_1_1_cable_v1:this.allImgsDom[index++],
      part_1_1_cable_v2:this.allImgsDom[index++],
      part_1_2_cable_a1:this.allImgsDom[index++],
      part_1_2_cable_cp:this.allImgsDom[index++],
      part_1_2_cable_dvp:this.allImgsDom[index++],
      part_1_2_cable_n2:this.allImgsDom[index++],
      part_1_2_cable_p1:this.allImgsDom[index++],
      part_1_2_cable_p2:this.allImgsDom[index++],
      part_1_2_cable_r1:this.allImgsDom[index++],
      part_1_2_cable_s:this.allImgsDom[index++],
      part_1_2_cable_v1:this.allImgsDom[index++],
      part_1_2_cable_v2:this.allImgsDom[index++],
      part_1_components_1:this.allImgsDom[index++],
      part_1_components_2:this.allImgsDom[index++],

      // part2 calculation 
      part_2_calculation_components:this.allImgsDom[index++],

      
      part_1_1_calculations:this.allImgsDom[index++],
      part_1_2_calculations:this.allImgsDom[index++],


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
