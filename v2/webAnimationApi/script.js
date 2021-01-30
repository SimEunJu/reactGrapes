// Demo by Kevin Ellis
// https://codepen.io/kevers-google/full/NWGVBKv

const box = document.getElementById('box');
document.body.onclick = evt => {
  box.style.transform =
    `translateX(${evt.clientX - 50}px) translateY(${evt.clientY - 50}px)`;
}

box.addEventListener('transitionrun', evt => {
  if (evt.propertyName !== 'transform')
    return;
  const transition =
        evt.target.getAnimations().
  find(anim => anim.transitionProperty === 'transform');
  const keyframes =
        transition.effect.getKeyframes();
  const boxCopy = document.createElement('div');
  boxCopy.classList.add('block');
  document.body.appendChild(boxCopy);
  boxCopy.style.transform = keyframes[0].transform;
  const duration = transition.effect.getTiming().duration;
  box.animate({ opacity: [0, 1 ] },
              { duration: duration, easing: 'ease-in' });
  boxCopy.animate({ opacity: [1, 0 ] },
                  {duration: duration, easing: 'ease-out', fill: 'forwards' })
    .finished.then(() => {
    document.body.removeChild(boxCopy);
  });
});
