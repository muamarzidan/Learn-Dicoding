class TypedText {
    constructor(element, phrases, periode) {
        this.element = element;
        this.phrases = phrases;

        this.periode = parseInt(periode, 100) || 3000;

        this.currentText = '';
        this.currentIndex = 0;
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const fullText = this.phrases[this.currentIndex];
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        this.element.innerHTML = `<span class="wrap">${this.currentText}</span>`;

        let delta = this.isDeleting ? 150 : 200 - Math.random() * 200;

        if (!this.isDeleting && this.currentText === fullText) {
            this.isDeleting = true;
            delta = this.periode;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
            delta = 1000; 
        }
        setTimeout(() => this.tick(), delta);
    }
}

window.onload = function () {
    const elements = document.getElementsByClassName('txt-rotate');

    for (const element of elements) {
        const phrases = JSON.parse(element.getAttribute('data-rotate'));
        const periode = element.getAttribute('data-period');
        if (phrases) {
            new TypedText(element, phrases, periode);
        }
    }

    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};


document.addEventListener("DOMContentLoaded", function () {
    const listFooter = document.querySelectorAll('.animasi');
    let index = 0;

    function toggleAnimasi() {
        listFooter.forEach(item => {
            item.classList.remove('active');
        });
        listFooter[index].classList.add('active');
        index = (index + 1) % listFooter.length;
    }

    setInterval(toggleAnimasi, 1000);
});



