const menu = document.getElementById('menu');
const close = document.getElementById('close')
const classAdd = document.getElementById('right-side');

menu.addEventListener('click', () => {
    if (classAdd) {
        classAdd.classList.add('show')
    }
});
close.addEventListener('click', () => {
    if (classAdd) {
        classAdd.classList.remove('show')
    }
})

// create slider----------------


const slides = Array.from(document.querySelectorAll('.slide'));
let lineArray = [];
let timeSet = 5000 ;

const set_slide_inde = () => {
    const lines = document.getElementById('lines');
    for (let i = 0; i < slides.length; i++) {
        if (i == slides.length - 1) {
            lines.insertAdjacentHTML('afterbegin', `<div id='line' class='slide-line active-line'></div>`);
        } else {
            lines.insertAdjacentHTML('afterbegin', `<div id='line' class='slide-line'></div>`);
        }
    }
    lineArray = Array.from(document.querySelectorAll('.slide-line'));
}
const current_nextLine_preLine = () => {

    const activeLine = document.querySelector('.slide-line.active-line');
    const active_line_Index = lineArray.indexOf(activeLine);

    let nextLine, preLine;

    if (active_line_Index === lineArray.length - 1) {
        nextLine = lineArray[0];
    } else {
        nextLine = lineArray[active_line_Index + 1];
    }
    if (active_line_Index === 0) {
        preLine = lineArray[lineArray.length - 1];
    } else {
        preLine = lineArray[active_line_Index - 1];
    }
    return { nextLine, preLine };

}
const current_nextSlide_preSlide = () => {

    const activeSlide = document.querySelector('.slide-active');
    const active_slide_Index = slides.indexOf(activeSlide);

    let nextSlide, preSlide;

    if (active_slide_Index === slides.length - 1) {
        nextSlide = slides[0];
    } else {
        nextSlide = slides[active_slide_Index + 1];
    }
    if (active_slide_Index === 0) {
        preSlide = slides[slides.length - 1];
    } else {
        preSlide = slides[active_slide_Index - 1];
    }
    return { nextSlide, preSlide };
}

const slide_position_set = () => {

    const activeSlide = document.querySelector('.slide-active');
    const active_slide_Index = slides.indexOf(activeSlide);

    const activeLine = document.querySelector('.slide-line.active-line');
    const active_line_Index = lineArray.indexOf(activeLine);

    const { nextSlide, preSlide } = current_nextSlide_preSlide();

    slides.forEach((slide, index) => {
        if (index === active_slide_Index) {
            slide.style.transform = "translateX(0)";
        }
        else if (slide === nextSlide) {
            slide.style.transform = "translateX(100%)";
        } else if (slide === preSlide) {
            slide.style.transform = "translateX(-100%)";
        } else {
            slide.style.transform = "translateX(100%)";
        }
    });

    const { nextLine, preLine } = current_nextLine_preLine();
    lineArray.forEach((line, index) => {
        if (index === active_line_Index) {
            line.style.backgroundColor = "rgb(13, 9, 36)";
        }
        else if (line === nextLine) {
            line.style.backgroundColor = "#fff";
        } else if (line === preLine) {
            line.style.backgroundColor = "#fff";
        } else {
            line.style.backgroundColor = "#fff";
        }
    });
}

const next = () => {
    timeSet = 0 ;
    const current_active_slide = document.querySelector(".slide-active");
    const current_active_line = document.querySelector('.slide-line.active-line');

    const {nextSlide } = current_nextSlide_preSlide();
    const {nextLine } = current_nextLine_preLine();

    current_active_slide.style.transform = "translateX(-100%)";
    current_active_slide.classList.remove('slide-active');
    nextSlide.style.transform = "translateX(0)";
    nextSlide.classList.add('slide-active');

    nextLine.style.backgroundColor = "rgb(13, 9, 36)";
    current_active_line.classList.remove('active-line');
    nextLine.classList.add('active-line');

    slide_position_set();
}

const pre = () => {

    const current_active_slide = document.querySelector(".slide-active");
    const current_active_line = document.querySelector('.slide-line.active-line');

    const { preSlide} = current_nextSlide_preSlide();
    const {preLine } = current_nextLine_preLine();

    current_active_slide.classList.remove('slide-active');
    preSlide.classList.add('slide-active');

    preLine.style.backgroundColor = "rgb(13, 9, 36)";
    current_active_line.classList.remove('active-line');
    preLine.classList.add('active-line');
    
    slide_position_set();
}
const auto = ()=>{
    setInterval(()=>{
        next();
    },timeSet)
}
set_slide_inde();
slide_position_set();
auto();