class TypedTeks {
    constructor(Compo, Bolbal, Times) {
        this.Bolbal = Bolbal;
        this.Compo = Compo;
        this.Start = 0;
        this.Times = parseInt(Times, 10) || 2000;
        this.textLoop = '';
        this.Deleted = false;
        this.tick();
    }

    tick() {
        const i = this.Start % this.Bolbal.length;
        const fullText = this.Bolbal[i];

        if (this.Deleted) {
            this.textLoop = fullText.substring(0, this.textLoop.length - 1);
        } else {
            this.textLoop = fullText.substring(0, this.textLoop.length + 1);
        }

        this.Compo.innerHTML = `<span class="wrap">${this.textLoop}</span>`;

        const delta = this.Deleted ? 150 : 100 - Math.random() * 100;

        if (!this.Deleted && this.textLoop === fullText) {
            this.Deleted = true;
            return setTimeout(() => this.tick(), this.Times);
        } else if (this.Deleted && this.textLoop === '') {
            this.Deleted = false;
            this.Start++;
            return setTimeout(() => this.tick(), 400);
        }

        return setTimeout(() => this.tick(), delta);
    }
}

window.onload = function () {
    const Elements = document.getElementsByClassName('txt-rotate');
    for (const Element of Elements) {
        const Bolbal = JSON.parse(Element.getAttribute('data-rotate'));
        const Times = Element.getAttribute('data-period');
        if (Bolbal) {
            new TypedTeks(Element, Bolbal, Times);
        }
    }

    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

document.addEventListener("DOMContentLoaded", function () {
    const listItems = document.querySelectorAll('.animation');
    let currentIndex = 0;

    function toggleAnimation() {
        listItems.forEach(item => {
            item.classList.remove('active');
        });
        listItems[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % listItems.length;
    }

    setInterval(toggleAnimation, 1000);
});



