(function () {
  const countEls = document.querySelectorAll('.count');
  countEls.forEach((el) => {
    animate(el)
  });


  function animate(el) {
    const count = Number(el.dataset.count) || 0;
    let current = 0;
    const increment = count / 180;
    return function c() {
      if(current < count) {
        current += Math.ceil(increment)
        setTimeout(c,10)
      }else { 
        current = count;
      }
      el.textContent = current;

    }()
  }

})();
