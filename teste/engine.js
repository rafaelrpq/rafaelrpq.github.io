var dpad, joy, buttons, start;

var controller = {
    stick : {
        x : 0,
        y : 0
    },
    btnStart : false,
    btnY     : false,
    btnX     : false,
    btnB     : false,
    btnA     : false
}

start = document.querySelector('start button');

buttons = document.querySelectorAll ('buttons button');

buttons[0].ontouchstart = function (e) {
    controller.btnY = true;
}

buttons[0].ontouchend = function () {
    controller.btnY = false;
};

buttons[1].ontouchstart = function (e) {
    controller.btnX = true;
}

buttons[1].ontouchend = function () {
    controller.btnX = false;
};

buttons[2].ontouchstart = function (e) {
    controller.btnB = true;
}

buttons[2].ontouchend = function () {
    controller.btnB = false;
};

buttons[3].ontouchstart = function (e) {
    controller.btnA = true;
}

buttons[3].ontouchend = function () {
    controller.btnA = false;
};

buttons.forEach (function (){
    this.oncontextmenu = function (e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation();
        return false;
    }
})

start.ontouchstart = function (e) {
    controller.btnStart = true;
}

start.ontouchend = function () {
    controller.btnStart = false;
}

start.oncontextmenu = function (e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation();
    return false;
}

joy  = document.querySelector ('controls dpad joy');

joy.ontouchstart = function (e) {
    initialX = Math.round (e.touches[0].clientX);
    initialY = Math.round (e.touches[0].clientY);
    //console.log (`initialX: ${initialX}\ninitialY: ${initialY}`)
    joy.ontouchmove = function (e) {
        x = Math.round (e.touches[0].clientX-initialX);
        y = Math.round (e.touches[0].clientY-initialY);
        if ((x >= -32 && x <= 32 ) && (y >= -32 && y <= 32) ) {
            joy.style.transform='translate3d('+x+'px,'+y+'px,0)';
            controller.stick = {'x':x,'y':y};
        }
    }
}

joy.ontouchend = function () {
    controller.stick = {'x':0,'y':0}
    joy.style.transform='translate3d(0px,0px,0)';
}
