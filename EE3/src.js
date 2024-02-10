const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),

  set() {
    this.allItems = {
      arrowRound: this.allImgsDom[0],
      blinkArrow: this.allImgsDom[1],
      laerrow: this.allImgsDom[2],
      laerrow2: this.allImgsDom[3],
      logo: this.allImgsDom[4],
      man: this.allImgsDom[5],
      measurearrow: this.allImgsDom[6],
      measurearrow2: this.allImgsDom[7],
      redsize: this.allImgsDom[8],                                         
      speech_off_btn: this.allImgsDom[9],
      speech_on_btn: this.allImgsDom[10],
      talk_cloud: this.allImgsDom[11],
      iit_delhi_logo: this.allImgsDom[12],

      
      box_img:this.allImgsDom[13],
component_battery:this.allImgsDom[14],
component_capacitor:this.allImgsDom[15],
component_diode:this.allImgsDom[16],
component_inductor:this.allImgsDom[17],
component_mosfet:this.allImgsDom[18],
component_register:this.allImgsDom[19],
full_circuit:this.allImgsDom[20],
full_circuit2:this.allImgsDom[21],

circuit_full_2:this.allImgsDom[22],
circuit_full_3:this.allImgsDom[23],
part_3_graph_arrow:this.allImgsDom[24],
part_3_option_1:this.allImgsDom[25],
part_3_option_2:this.allImgsDom[26],
part_3_option_3:this.allImgsDom[27],
part_3_option_4:this.allImgsDom[28],
record_btn:this.allImgsDom[29],

part_2_circuit:this.allImgsDom[30],
part_2_graph_1:this.allImgsDom[31],
part_2_graph_2:this.allImgsDom[32],
part_2_graph_3:this.allImgsDom[33],
run_btn:this.allImgsDom[34],
right_tick_1:this.allImgsDom[35],
right_tick_2:this.allImgsDom[36],
right_tick_3:this.allImgsDom[37],
right_tick_4:this.allImgsDom[38],
graph1_arrow:this.allImgsDom[40],
graph2_arrow:this.allImgsDom[41],
part_2_graph_empty:this.allImgsDom[42],
part_3_option_4_graph:this.allImgsDom[43],

// Theory

slide_1:this.allImgsDom[44],
slide_2:this.allImgsDom[45],
slide_3_page_1:this.allImgsDom[46],
slide_3_page_2:this.allImgsDom[47],
slide_3_page_3:this.allImgsDom[48],
slide_3_page_4:this.allImgsDom[49],
slide_4_page_1:this.allImgsDom[50],
slide_4_page_1_fan:this.allImgsDom[51],
slide_4_page_2_battery_1:this.allImgsDom[52],
slide_4_page_2_battery_2:this.allImgsDom[53],
slide_4_page_2_battery_3:this.allImgsDom[54],
slide_4_page_2_volt_text:this.allImgsDom[55],
slide_4_page_3_text_1:this.allImgsDom[56],
slide_4_page_3_text_2:this.allImgsDom[57],
slide_4_page_3_wire:this.allImgsDom[58],
slide_5_page_1:this.allImgsDom[59],
slide_5_page_2_text_1:this.allImgsDom[60],
slide_5_page_2_volt_text:this.allImgsDom[61],
slide_5_page_3_1_text_1:this.allImgsDom[62],
slide_5_page_3_2_wire:this.allImgsDom[63],
slide_5_page_3_3_light:this.allImgsDom[64],
slide_5_page_3_4_blast:this.allImgsDom[65],
slide_5_page_3_5_cross:this.allImgsDom[66],
slide_5_page_3_6_emoji:this.allImgsDom[67],
slide_5_page_3_7_text_2:this.allImgsDom[68],
slide_5_page_3_8_text_3:this.allImgsDom[69],
slide_5_page_4_1_text_1:this.allImgsDom[70],
slide_6_page_1:this.allImgsDom[71],
slide_6_page_2_1_text_1:this.allImgsDom[72],
slide_6_page_2_2_emoji_blink:this.allImgsDom[73],
slide_6_page_3_1_text_1:this.allImgsDom[74],
slide_6_page_3_2_emoji_blink:this.allImgsDom[75],
slide_7_page_1_1:this.allImgsDom[76],
slide_7_page_1_2:this.allImgsDom[77],
slide_7_page_1_3:this.allImgsDom[78],
slide_8_page_1:this.allImgsDom[79],
slide_8_page_2_and_rotate_the_fan:this.allImgsDom[80],
slide_8_page_3_1:this.allImgsDom[81],
slide_8_page_3_2_light:this.allImgsDom[82],
slide_8_page_3_3_blank:this.allImgsDom[83],
slide_8_page_3_4_emoji:this.allImgsDom[84],
slide_8_page_3_5_text:this.allImgsDom[85],
slide_9:this.allImgsDom[86],
slide_10_page_1:this.allImgsDom[87],
slide_10_page_2:this.allImgsDom[88],
slide_10_page_3:this.allImgsDom[89],
slide_10_page_4_1:this.allImgsDom[90],
slide_10_page_4_2_plus:this.allImgsDom[91],
slide_10_page_4_3_minus:this.allImgsDom[92],
slide_10_page_4_4_arrow:this.allImgsDom[93],
slide_10_page_4_5_text:this.allImgsDom[94],
slide_11_page_1:this.allImgsDom[95],
slide_11_page_2_1:this.allImgsDom[96],
slide_11_page_2_2_blink:this.allImgsDom[97],
slide_11_page_3_1:this.allImgsDom[98],
slide_11_page_3_2_rotate_it:this.allImgsDom[99],
slide_11_page_3_3_text_and_arrow:this.allImgsDom[100],
slide_12_page_1:this.allImgsDom[101],
slide_12_page_2_1_pwm_blink:this.allImgsDom[102],
slide_12_page_2_2:this.allImgsDom[103],
slide_12_page_2_3_text:this.allImgsDom[104],
slide_12_page_3_1_pwn_blink:this.allImgsDom[105],
slide_12_page_3_2:this.allImgsDom[106],
slide_12_page_3_3_text:this.allImgsDom[107],
slide_12_page_3_4_text_2:this.allImgsDom[108],
slide_13_page_1:this.allImgsDom[109],
slide_13_page_2:this.allImgsDom[110],
slide_13_page_3_1_plus:this.allImgsDom[111],
slide_13_page_3_2_minus_rotate_both:this.allImgsDom[112],
slide_13_page_3_4:this.allImgsDom[113],
slide_13_page_3_5_text:this.allImgsDom[114],
slide_14_helper:this.allImgsDom[115],
slide_14_page_1:this.allImgsDom[116],
slide_14_page_1_ball:this.allImgsDom[117],
slide_14_page_2_1_blink:this.allImgsDom[118],
slide_14_page_2_2_text:this.allImgsDom[119],
slide_14_page_3_1_symbols:this.allImgsDom[120],
slide_14_page_3_2_green_graph_and_start_ball:this.allImgsDom[121],
slide_14_page_3_3_white_image_for_blue_line:this.allImgsDom[122],
slide_15_page_1:this.allImgsDom[123],
slide_15_page_1_ball:this.allImgsDom[124],
slide_15_page_1_green_graph:this.allImgsDom[125],
slide_15_page_1_minus:this.allImgsDom[126],
slide_15_page_1_plus:this.allImgsDom[127],
slide_15_page_2_1_blink:this.allImgsDom[128],
slide_15_page_2_2_text:this.allImgsDom[129],
slide_15_page_3_1_arrow_and_text:this.allImgsDom[130],
slide_15_page_3_1_white:this.allImgsDom[131],
slide_15_page_3_2_graph:this.allImgsDom[132],
slide_15_page_3_3_text:this.allImgsDom[133],

formulas_component_stress:this.allImgsDom[134],
formulas_efficiency:this.allImgsDom[135],
formulas_ideal:this.allImgsDom[136],
formulas_nomenclautre:this.allImgsDom[137],
formulas_non_ideal:this.allImgsDom[138],
formulas_procedure:this.allImgsDom[139],
formulas_universal:this.allImgsDom[140],


//EE2 imgs added
part_3_option_select:this.allImgsDom[141],
part_1_text_for_crrct:this.allImgsDom[142],
part_1_text_for_wrong:this.allImgsDom[143],


//EE3 imgs added
box1:this.allImgsDom[144],
box2:this.allImgsDom[145],
box3:this.allImgsDom[146],
box4:this.allImgsDom[147],
box5:this.allImgsDom[148],
box6:this.allImgsDom[149],
part1_circuit:this.allImgsDom[150],
part1_component_capacitor:this.allImgsDom[151],
part1_component_diode:this.allImgsDom[152],
part1_component_inductor:this.allImgsDom[153],
part1_component_mosfet:this.allImgsDom[154],
part1_component_resistance:this.allImgsDom[155],
part1_component_voltage:this.allImgsDom[156],



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
