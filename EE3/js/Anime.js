const Anime = {
    // time in second
    fade(target,duration=1,endDelay=10,complete=null,begin=null){
        duration = duration * 1000
        endDelay = endDelay * 1000
        anime({
            targets: target,
            duration: duration,
            easing: "linear",
            delay: 2000,
            opacity: [0,1],
            complete(){
                if(complete)
                    complete()
                if(begin)
                    begin()

                setTimeout(()=>{
                    anime({
                    targets: target,
                    duration: duration,
                    easing: "linear",
                    opacity: 0,
                    })
                },endDelay)
            }
          })
    },
    fadeIn(target,duration=1,endDelay=10,complete=null,begin=null){
        duration = duration * 1000
        endDelay = endDelay * 1000
        anime({
            targets: target,
            duration: duration,
            easing: "linear",
            delay: 2000,
            opacity: [0,1],
            complete(){
                if(complete)
                    complete()
                if(begin)
                    begin()
            }
          })
    }
}