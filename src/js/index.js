import '/scss/main.scss';
console.log('I have loaded')

import Splide from '@splidejs/splide';
document.addEventListener( 'DOMContentLoaded', function () {
    console.log(Splide)
    new Splide('#card-slider', {
        type: 'loop',
	    perPage: 1,
        width: '100%',
        height: '600px',
        gap: '200px',
        breakpoints: {
            480: {
                width: '100%',
                height: '650px'
            }
        },
        classes: {
            arrows: 'splide__arrows your-class-arrows',
            arrow : 'splide__arrow your-class-arrow',
            prev  : 'splide__arrow--prev your-class-prev',
            next  : 'splide__arrow--next your-class-next',
        },
        //arrowPath: 'm15.5 0.921232-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.600z',
    }).mount();
})

import {gsap, TimelineMax} from "gsap";
let tl = gsap.timeline({paused: true, onComplete: () => {
    tl.restart()
    console.log('completed')
}})
tl.fromTo('.banner', {x: 0}, {x: -2000, duration: 40, ease: 'none'})

document.addEventListener( 'DOMContentLoaded', function () {
    // const banner = document.querySelector('.banner')
    // banner.style.transform = `translateX(-1750px)`;
    tl.play()
    // banner.addEventListener('transitionend', () => {

    //     banner.style.transition = "none"
    //     banner.style.transform = `translateX(0px)`
    // })
})