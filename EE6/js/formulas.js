const Formulas = {  
    usingMeters:{
        // ! vCE is written as vDS in every formula also
        //   vGE -> vGS
        iD(values,colIdx,vDS_idx){
            
            const 
            k0_values = [25,3,2.04,2.1,2.2],
            x0_values = [3,3,3.4,3.5,3.5],
            m_values = [0,0.5179,0.3418,0.5,1.0417],
            c_values = [20,40.05,85.8,116,154.005],
            l_values = [21.646,44.235,88.47,120,161],
            vS_values = [4,4,6,8,6]
            
            colIdx = colIdx - 1
            let k0 = k0_values[colIdx],
            x0 = x0_values[colIdx],
            m = m_values[colIdx],
            c = c_values[colIdx],
            l = l_values[colIdx],
            vS = vS_values[colIdx],
            vCE = this.vDS(vDS_idx)

            
            let ans = 0
            if(0 <= vCE && vCE <= vS){
                let upper = l
                let lower = 1 + Math.exp( (-k0 * (vCE - x0)) )
                ans = upper / lower 
            }else
            if( vCE >= vS){
                ans = m * vCE + c
            }

            return Number(ans.toFixed(2))
        },
        vDS(vDS_idx){
            const vDS_values = [0,2,4,6,8,10,12,14,16,18,20]
            return vDS_values[vDS_idx]
        },
    },
    usingOscilloscope:{
        iD(values,colIdx,vDS_idx){
            
            const 
            k0_values = [25,3,2.04,2.1,2.2],
            x0_values = [3,3,3.4,3.5,3.5],
            m_values = [0,0.5179,0.3418,0.5,1.0417],
            c_values = [20,40.05,85.8,116,154.005],
            l_values = [21.646,44.235,88.47,120,161],
            vS_values = [4,4,6,8,6]
            
            colIdx = colIdx - 1
            let k0 = k0_values[colIdx],
            x0 = x0_values[colIdx],
            m = m_values[colIdx],
            c = c_values[colIdx],
            l = l_values[colIdx],
            vS = vS_values[colIdx],
            vCE = this.vDS(vDS_idx)

            
            let ans = 0
            if(0 <= vCE && vCE <= vS){
                let upper = l
                let lower = 1 + Math.exp( (-k0 * (vCE - x0)) )
                ans = upper / lower 
            }else
            if( vCE >= vS){
                ans = m * vCE + c
            }

            return Number(ans.toFixed(2))
        },
        vDS(vDS_idx){
            const vDS_values = [0,2,4,6,8,10]
            return vDS_values[vDS_idx]
        },
    },
    transferCharacteristics:{
        iD(values){           
            let upper = 251;
            let valueOfPower = (-0.9 * (values.vGS - 9))
            let lower = 1 + Math.exp(valueOfPower)
            let ans = upper / lower
             
            return Number(ans.toFixed(2))
        },
        vDS(vDS_idx){
            const vDS_values = [0,2,4,6,8,10]
            return vDS_values[vDS_idx]
        },
    }
}

let values = {
    vIn:0,
    vGS:0,
    R:0,
}

function updateValues(vIn,vGS,R){
    values = {
        vIn:vIn,
        vGS:vGS,
        R:R,
    }
}