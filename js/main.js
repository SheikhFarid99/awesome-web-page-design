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
