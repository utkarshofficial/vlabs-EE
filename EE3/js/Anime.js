const Anime = {
    fade(target,duration,complete=null,begin=null){
        anime({
            targets: target,
            duration: duration,
            easing: "linear",
            complete(){
                if(complete)
                    complete()
            },
            begin(){
                if(begin)
                    begin()
            }
        })
    }
}