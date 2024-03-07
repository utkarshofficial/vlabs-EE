const Formulas = {  
    one_minus_D(D){
        return 1 - D
    },
    step2:{
        v0(values){
            let ans = values.D * values.vIn;
            return Number(ans.toFixed(4))
        },
        i0(values){
            let ans = (values.vIn * values.D) / values.R
            return Number(ans.toFixed(4))
        },
    },
    ideal:{
        // v0(values){
        //     let ans = values.vIn / Formulas.one_minus_D(values.D)
        //     return Number(ans.toFixed(4))
        // },

        v0(values){
            let ans = values.D * values.vIn;
            return Number(ans.toFixed(4))
        },

        // M(values){
        //     let ans = 1 / Formulas.one_minus_D(values.D)
        //     return Number(ans.toFixed(4))
        // },

        M(values){
            return (values.D.toFixed(4))
        },
        iIn(values){
            let ans = values.vIn / ( Math.pow(Formulas.one_minus_D(values.D),2) * values.R )
            return Number(ans.toFixed(4))
        },
    
        // i0(values){
        //     let ans = values.vIn / (Formulas.one_minus_D(values.D) * values.R)
        //     return Number(ans.toFixed(4))
        // },
    
        i0(values){
            let ans = values.vIn * (values.D) / values.R
            return Number(ans.toFixed(4))
        },
    },
    nonIdeal:{
        
        M(values){
            // const rl = 1, rSW = 0.4, vFD = 0.7, rc = 0.45
            
            // * these values are in final change ppt
            // old values
            // const L=1, C=100, R=48, rD=2, rL=0.2, rS=3, vFD=0.2, vSFD = 0.2;
            // new 
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

            const L= 1 * mini, C=100 * micro, R=48, rD=2 * mini, rL=1, rS=0.3, vFD=0.7, vSFD = 0.2;


            // let upper = 1 - ((vFD * Formulas.one_minus_D(values.D)) /  values.vIn)
            // let bottom = Formulas.one_minus_D(values.D) * (1 + (( rl + rSW * values.D) /  (values.R * Math.pow(Formulas.one_minus_D(values.D),2)) ) )

            let upper1 = values.R * values.D 
            let upper2 = vFD * Formulas.one_minus_D(values.D)
            let upper3 = vSFD * values.D

            let bottom1 = values.R + rD + rL - (values.D * rD) + (values.D * rS)
            
            let ans1 = upper1 / bottom1 
            let ans2 = upper2 / values.vIn 
            let ans3 = upper3 / values.vIn 
    
            let ans = ans1 - ans2 - ans3 
            return Number(ans.toFixed(4))
        },
        v0(values){

            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

            const L= 1 * mini, C=100 * micro, R=48, rD=2 * mini, rL=1, rS=0.3, vFD=0.7, vSFD = 0.2;

            let upper1 = values.vIn * values.D * values.R
            let bottom1 =  values.R + rD + rL - (values.D * rD) + (values.D * rS)

            let ans1 = upper1/ bottom1
            let ans2 = vFD * Formulas.one_minus_D(values.D)
            let ans3 = vSFD * values.D

            let ans = ans1 - ans2 - ans3

            return Number(ans.toFixed(4))
        },
        i0(values){
                        
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

            const L= 1 * mini, C=100 * micro, R=48, rD=2 * mini, rL=1, rS=0.3, vFD=0.7, vSFD = 0.2;

            let upper1 = values.vIn * values.D
            let bottom1 =  values.R + rD + rL - (values.D * rD) + (values.D * rS)

            let ans1 = upper1/ bottom1
            let ans2 = (vFD * Formulas.one_minus_D(values.D)) / values.R
            let ans3 = (vSFD * values.D) / values.R

            let ans = ans1 - ans2 - ans3
            
            return Number(ans.toFixed(4))
        }
    },
    efficiencyPlot:{

        //! Requires v0, M, iIn, i0, p0, Losses, efficiency 
    
        v0(values){
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

            const L= 1 * mini, C=100 * micro, R=48, rD=2 * mini, rL=1, rS=0.3, vFD=0.7, vSFD = 0.2;

            let upper1 = values.vIn * values.D * values.R
            let bottom1 =  values.R + rD + rL - (values.D * rD) + (values.D * rS)

            let ans1 = upper1 / bottom1
            let ans2 = vFD * Formulas.one_minus_D(values.D)
            let ans3 = vSFD * values.D

            let ans = ans1 - ans2 - ans3

            return Number(ans.toFixed(4))
        },
        M(values){
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

            const L= 1 * mini, C=100 * micro, R=48, rD=2 * mini, rL=1, rS=0.3, vFD=0.7, vSFD = 0.2;

            let upper1 = values.R * values.D 
            let upper2 = vFD * Formulas.one_minus_D(values.D)
            let upper3 = vSFD * values.D

            let bottom1 = values.R + rD + rL - (values.D * rD) + (values.D * rS)
            
            let ans1 = upper1 / bottom1 
            let ans2 = upper2 / values.vIn 
            let ans3 = upper3 / values.vIn 
    
            let ans = ans1 - ans2 - ans3 
            return Number(ans.toFixed(4))
        },
        iIn(values){
            let ans = (values.D * this.v0(values)) / values.R
            return Number(ans.toFixed(4))
        },
        i0(values){
            // value type conversion
            let mini = Math.pow(10,-3) // mini
            let micro = Math.pow(10,-6) // micro

            const L= 1 * mini, C=100 * micro, R=48, rD=2 * mini, rL=1, rS=0.3, vFD=0.7, vSFD = 0.2;

            let upper1 = values.vIn * values.D
            let bottom1 =  values.R + rD + rL - (values.D * rD) + (values.D * rS)

            let ans1 = upper1/ bottom1
            let ans2 = (vFD * Formulas.one_minus_D(values.D)) / values.R
            let ans3 = (vSFD * values.D) / values.R

            let ans = ans1 - ans2 - ans3
            
            return Number(ans.toFixed(4))
        },
        pIn(values){
            let ans = values.vIn * this.iIn(values)
            return Number(ans.toFixed(4))
        },
        p0(values){
            let ans = this.v0(values) * this.i0(values)
            return Number(ans.toFixed(4))
        },
        losses(values){
            let ans = this.pIn(values ) - this.p0(values)
            return Number(ans.toFixed(4))
        },
        eff(values){
            let ans = (this.p0(values) * 100) / this.pIn(values)
            return Number(ans.toFixed(4))
        }
    },
    stress:{
        v0(values){
            // let ans = this.M(values) * values.vIn
            let ans = values.D * values.vIn
            return Number(ans.toFixed(4))
        },

        i0(values){
            // let ans = this.v0(values) / values.R
            let ans = (values.vIn * values.D) /  values.R
            return Number(ans.toFixed(4))
        },

        iL(values){
            let ans = 0.2 * this.i0(values) 
            return Number(ans.toFixed(4));
        },

        iLP(values){
            let ans = this.i0(values) + (this.iL(values) / 2)
            return Number(ans.toFixed(4));
        }, 
        // M(values){
        //     const rl = 1, rSW = 0.4, vFD = 0.7, rc = 0.45
            
        //     let upper = 1 - ((vFD * Formulas.one_minus_D(values.D)) /  values.vIn)
        //     let bottom = Formulas.one_minus_D(values.D) * (1 + (( rl + rSW * values.D) /  (values.R * Math.pow(Formulas.one_minus_D(values.D),2)) ) )
    
        //     let ans = upper / bottom
        //     return Number(ans.toFixed(4))
        // },
        // i_In(values){
        //     let ans = this.i0(values) / Formulas.one_minus_D(values.D)
        //     return Number(ans.toFixed(4))
        // },
       
        // i2(values){
        //     let L = 2 * Math.pow(10,-3)
        //     let fs = 50 * Math.pow(10,3)

        //     let upper = values.D * values.vIn
        //     let lower = 2 * L * fs

        //     let ans = this.i_In(values) + (upper / lower)

        //     return Number(ans.toFixed(4))
        // },
        // pSw(values){
        //     let ans = this.v0(values) * this.i0(values)
        //     return Number(ans.toFixed(4))
        // },
        // pDi(values){
        //     let ans = this.v0(values) * this.i0(values)
        //     return Number(ans.toFixed(4))
        // },
        
    },
}

let values = {
    vIn:0,
    D:0,
    R:0,
}

function updateValues(vIn,D,R){
    values = {
        vIn:vIn,
        D:D,
        R:R,
    }
}