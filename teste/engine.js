var dpad, joy, buttons, start;

document.addEventListener ('DOMContentLoaded', function (){
    console.log ('content loaded')

    canvas = document.querySelector('canvas');
    ctx    = canvas.getContext ('2d');

    print = function (txt, x, y) {
        ctx.save();
        ctx.fillStyle = '#333'
        ctx.font = '40px VT323';
        ctx.fillText (txt, x, y);
        ctx.restore();
    }

    print ('[ GAME ]', 200, 250);

    start = document.querySelector('start button');

    buttons = document.querySelectorAll ('buttons button');

    buttons[0].ontouchstart = function (e) {
        ctx.clearRect(0,0,500,500);
        print ('Y clicked', 190, 250)
    }

    buttons[0].ontouchend = function () {
        ctx.clearRect(0,0,500,500);
        print ('Y released', 180, 250)
    };

    buttons[1].ontouchstart = function (e) {
        ctx.clearRect(0,0,500,500);
        print ('X clicked', 190, 250)
    }

    buttons[1].ontouchend = function () {
        ctx.clearRect(0,0,500,500);
        print ('X released', 180, 250)
    };

    buttons[2].ontouchstart = function (e) {
        ctx.clearRect(0,0,500,500);
        print ('B clicked', 190, 250)
    }

    buttons[2].ontouchend = function () {
        ctx.clearRect(0,0,500,500);
        print ('B released', 180, 250)
    };

    buttons[3].ontouchstart = function (e) {
        ctx.clearRect(0,0,500,500);
        print ('A clicked', 190, 250)
    }

    buttons[3].ontouchend = function () {
        ctx.clearRect(0,0,500,500);
        print ('A released', 180, 250)
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
        ctx.clearRect(0,0,500,500);
        print ('start clicked', 150, 250)
    }

    start.ontouchend = function () {
        ctx.clearRect(0,0,500,500);
        print ('start released', 140, 250)
    }

    start.oncontextmenu = function (e) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation();
        return false;
    }

    dpad = document.querySelector ('controls dpad');
    joy  = document.querySelector ('controls dpad joy');

    var x=0, y=0;

    joy.ontouchstart = function (e) {
        initialX = Math.round (e.touches[0].clientX);
        initialY = Math.round (e.touches[0].clientY);
        //console.log (`initialX: ${initialX}\ninitialY: ${initialY}`)
        joy.ontouchmove = function (e) {
            x = Math.round (e.touches[0].clientX-initialX);
            y = Math.round (e.touches[0].clientY-initialY);
            console.log (`x: ${x}\ny: ${y}`)
            if ((x >= -32 && y >= -32) && (x <= 32 && y <= 32) ) {
                joy.style.transform='translate3d('+x+'px,'+y+'px,0)';
                ctx.clearRect (0,0,500,500);
                print (`joystick`,200,225);
                print (`x: ${x}`,220,260);
                print (`y: ${y}`,220,285)
            }
        }
    }

    joy.ontouchend = function () {
        x=0;
        y=0;
        joy.style.transform='translate3d('+x+'px,'+y+'px,0)';
        ctx.clearRect (0,0,500,500);
        print (`joystick`,200,225);
        print (`x: ${x}`,220,260);
        print (`y: ${y}`,220,285)
    }

}, false)
