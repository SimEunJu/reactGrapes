// TODO: Animation 값 객체와 Serivce 객체로 나누었는데,
// 합치는 것이 나은가.. 아닌가..
// 분리한 이유: useAnimation가 내부적으로 Animation 객체를 사용하고 
// 있지 않아 분리함.
export class Animation {

    constructor(ref, keyframes, options, order=0, name=null){
        this.ref = ref;
        this.animation = null;
        this.keyframes = keyframes;
        this.options = options;   
        this.order = order;
        this.name = name; 
    }
}

export class AnimationService {
    
    static animate(animation){
        const {ref, keyframes, options} = animation;
        animation.animation = ref.current.animate( keyframes, options );
        return animation.animation;
    }

    static cancel(animation){
        animation.animation.cancel();
        return animation.animation;
    }
}