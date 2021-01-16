canvas = document.querySelector ('canvas')
ctx    = canvas.getContext('2d')
ctx.font = '30px VT323';

var ponto = {
    x     : 0,
    y     : 0,
    w     : 10,
    h     : 10,
    color : '#f00'
}

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
    ctx.fillStyle = '#666';
    ctx.fillText (`joystick : [ x: ${controllerX}, y: ${controllerY} ]`, 80, 50);
    ctx.fillStyle = '#aaa';
    ctx.fillText (`   start : ${controller.btnStart}`, 80, 80);
    ctx.fillStyle = '#0f5';
    ctx.fillText (`       Y : ${controller.btnY}`, 80, 110);
    ctx.fillStyle = '#05f';
    ctx.fillText (`       X : ${controller.btnX}`, 80, 140);
    ctx.fillStyle = '#fd0';
    ctx.fillText (`       B : ${controller.btnB}`, 80, 170);
    ctx.fillStyle = '#f00';
    ctx.fillText (`       A : ${controller.btnA}`, 80, 200);
    ctx.fillStyle = '#aaa';
    ctx.fillText ('+---------------------------------------+',5,250);
    ctx.fillText (`[ ${horas}:${minutos}.${segundos} ]`, 180,280)

    
    
    
    ctx.strokeStyle = '#aaa';
    ctx.strokeRect (218, 350, 64,64);
    
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,0,1)';
    ponto.x = 213 + controller.stick['x'] + 32;
    ponto.y = 345 + controller.stick['y'] + 32;
    
    ctx.fillRect (ponto.x, ponto.y, ponto.w, ponto.h);
    ctx.restore();

}, 1000/60);
