import Sister from 'sister';

const TouchEvents = (element) => {
  let eventEmitter;

  const construct = () => {
    eventEmitter = Sister();

    let touchWrapper = element
    let dragged = false;
    let baseCoord = null;
    let x;
    let y;
    let start = (e) => {
      let coords = e.touches ? e.touches[0] : e;
      dragged = false;
      baseCoord = coords;
      x = y = 0;
    }
    touchWrapper.addEventListener("touchstart", start);
    touchWrapper.addEventListener("mousedown", start);

    let move = (e) => {
      if(!baseCoord) return;
      let coords = e.touches ? e.touches[0] : e;

      x = coords.clientX - baseCoord.clientX;
      y = coords.clientY - baseCoord.clientY;
      if(Math.abs(x) >= 2 || Math.abs(y) >= 2) {
        if(!dragged) {
          dragged = true;
          eventEmitter.trigger('panstart');
        }
      }

      if(dragged) {
          eventEmitter.trigger('panmove', {
            deltaX: x,
            deltaY: y
          })
      }
    }
    touchWrapper.addEventListener("touchmove", move);
    touchWrapper.addEventListener("mousemove", move);

    let up = (e) => {
      if(!baseCoord || !dragged) return;
      baseCoord = null
      eventEmitter.trigger('panend', {
        deltaX: x,
        deltaY: y
      });

    }
    touchWrapper.addEventListener("touchend", up);
    touchWrapper.addEventListener("mouseup", up);
    touchWrapper.addEventListener("mouseleave", up);
  };

  construct();

  var on = eventEmitter.on;

  return {
    on: on
  };
};

export default TouchEvents;
