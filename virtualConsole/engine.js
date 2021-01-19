round = function (x, lim) {
    return (Math.abs (x) >= lim ? (x > 0 ? Math.ceil (x) : Math.floor(x)) : 0)
}

function reset () {
    if (confirm ('Deseja reiniciar a aplicação?')) {
        location.reload ();
    }
}

controller = {
    dpad : {
        up    : false,
        down  : false,
        left  : false,
        right : false
    },

    reset : false,
    start : false,

    btnY : false,
    btnB : false,
    btnY : false,
    btnA : false
}



dpad = document.querySelector ('dpad')

dpad.ontouchstart = function (e) {
    l = dpad.offsetLeft;
    t = dpad.offsetTop;

    h = (dpad.clientHeight)/2;
    w = (dpad.clientWidth)/2;

    initialX = (e.touches[0].clientX - l);
    initialY = (e.touches[0].clientY - t);
    dx  = round ((initialX / w) - 1, 0.35);
    dy  = round ((initialY / h) - 1, 0.35);

    switch (dx) {
        case -1:
            dpad.querySelector('#btnLEFT').classList.add ('btnPressed');
            controller.dpad.left = true;
        break;
        case 1:
            dpad.querySelector('#btnRIGHT').classList.add ('btnPressed');
            controller.dpad.right = true;
        break;
        default:
            controller.dpad.left = false;
            controller.dpad.right = false;
            dpad.querySelector('#btnLEFT').classList.remove ('btnPressed');
            dpad.querySelector('#btnRIGHT').classList.remove ('btnPressed');
        break;
    }

    switch (dy) {
        case -1:
            dpad.querySelector('#btnUP').classList.add ('btnPressed');
            controller.dpad.up = true;
        break;
        case 1:
            dpad.querySelector('#btnDOWN').classList.add ('btnPressed');
            controller.dpad.down = true;
        break;
        default:
            controller.dpad.up = false;
            controller.dpad.down = false;
            dpad.querySelector('#btnUP').classList.remove ('btnPressed');
            dpad.querySelector('#btnDOWN').classList.remove ('btnPressed');
        break;
    }

    this.ontouchmove = function (e) {
        dx= round (((e.touches[0].clientX - l) / w) - 1, 0.35);
        dy= round (((e.touches[0].clientY - t) / h) - 1, 0.35);

        if (Math.abs (dx) > 1 || Math.abs (dy) > 1) {
            dx = 0
            dy = 0;
            console.log ('fora do dpad');
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            
            dpad.querySelectorAll ('button').forEach (function (button){
                button.classList.remove ('btnPressed')
            })
            
            for (dir in controller.dpad) {
                controller.dpad[dir] = false
            }
            
            return;
        } else {
            switch (dx) {
                case -1:
                    dpad.querySelector('#btnLEFT').classList.add ('btnPressed');
                    controller.dpad.left = true;
                break;
                case 1:
                    dpad.querySelector('#btnRIGHT').classList.add ('btnPressed');
                    controller.dpad.right = true;
                break;
                default:
                    controller.dpad.left = false;
                    controller.dpad.right = false;
                    dpad.querySelector('#btnLEFT').classList.remove ('btnPressed');
                    dpad.querySelector('#btnRIGHT').classList.remove ('btnPressed');
                break;
            }

            switch (dy) {
                case -1:
                    dpad.querySelector('#btnUP').classList.add ('btnPressed');
                    controller.dpad.up = true;
                break;
                case 1:
                    dpad.querySelector('#btnDOWN').classList.add ('btnPressed');
                    controller.dpad.down = true;
                break;
                default:
                    controller.dpad.up = false;
                    controller.dpad.down = false;
                    dpad.querySelector('#btnUP').classList.remove ('btnPressed');
                    dpad.querySelector('#btnDOWN').classList.remove ('btnPressed');
                break;
            }
        }
    }

    this.ontouchend = function () {
        dpad.querySelectorAll ('button').forEach (function (button){
            button.classList.remove ('btnPressed')
            for (dir in controller.dpad) {
                controller.dpad[dir] = false
            }
        })
    }
}

reset = document.querySelectorAll('span button')[0]
start = document.querySelectorAll('span button')[1]

dpad.oncontextmenu = function (e) {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    return false;
}
