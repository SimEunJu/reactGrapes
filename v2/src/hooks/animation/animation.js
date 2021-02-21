// TODO: Animation 값 객체와 Serivce 객체로 나누었는데, 합치는 것이 나은가.. 아닌가..
// 분리한 이유: 
// 1. useAnimation가 내부적으로 Animation 객체를 사용하고 있지 않아 분리함.
// 2. 합치는 경우, Animation 객체를 초기화한 후 해당 객체에 의존해서 메소드 실행해야 하지만, 
// 유틸성 클래스로 분리하면 Animation 객체로 이루어진 다양한 파라미터를 받아 독립적인 수행을 할 수 있음(값과 기능을 분리)

/*
내가 만드려는 animation 관련 라이브러리가 가져야 할 기능
A. 1컴포넌트 1애니메이션
B. 1컴포넌트 n애니메이션
- 애니메이션 간 순서: 동시 또는 순차
C. n컴포넌트 n애니메이션
- 컴포넌트들과 컴포넌트 내의 애니메이션 순서: 동시 또는 순차

고민: 애니메이션용 reducer를 만드는 것에 대해
C의 경우에는 store에 의존할 수 밖에 없음

*/
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

    static animateConcurrent(animations){
        const animatedAnimations = [];
        animations.forEach(ani => {
            const animation = AnimationService.animate(ani);
            animatedAnimations.push(animation);
        });
        return animatedAnimations;
    }

    static async animateSequential(animations){
        const animatedAnimations = [];
        for (let index = 0; index < animations.length; index++) {
            const animation = await AnimationService.animate(index).finished;
            animatedAnimations.push(animation);
        }
        return animatedAnimations;
    }

    static cancel(animation){
        animation.animation.cancel();
        return animation.animation;
    }

}