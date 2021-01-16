canvas = document.querySelector ('canvas')
ctx    = canvas.getContext('2d')
ctx.font = '30px VT323';


loop = setInterval (function () {
    time = new Date();
    horas    = String(time.getHours()).padStart(2,0);
    minutos  = String(time.getMinutes()).padStart(2,0);
    segundos = String(time.getSeconds()).padStart(2,0);
    
    controllerX = String(controller.stick['x']).padStart(3,' ');
    controllerY = String(controller.stick['y']).padStart(3,' ');
    
    ctx.fillStyle = '#333';
    ctx.fillRect (0,0,500,500);
    ctx.fillStyle = '#aaa';
    ctx.fillText ('[======== CONTROLLER INPUT TEST ========]',5,20);
    ctx.fillText (`joystick : [ x: ${controllerX}, y: ${controllerY} ]`, 80, 50);
    ctx.fillText (`   start : ${controller.btnStart}`, 80, 80);
    ctx.fillText (`       Y : ${controller.btnY}`, 80, 110);
    ctx.fillText (`       X : ${controller.btnX}`, 80, 140);
    ctx.fillText (`       B : ${controller.btnB}`, 80, 170);
    ctx.fillText (`       A : ${controller.btnA}`, 80, 200);
    ctx.fillText ('+---------------------------------------+',5,250);
    ctx.fillText (`[ ${horas}:${minutos}.${segundos} ]`, 190,280)
}, 1000/60)
