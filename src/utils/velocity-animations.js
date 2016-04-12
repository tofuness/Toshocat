$.Velocity.RegisterEffect('toshocat.slideRightIn', {
  defaultDuration: 600,
  calls: [
    [{
      opacity: [1, 0],
      translateX: [0, -50]
    }, 1, {
      easing: 'easeOutCirc'
    }]
  ]
});

$.Velocity.RegisterEffect('toshocat.slideDownIn', {
  defaultDuration: 600,
  calls: [
    [{
      opacity: [1, 0],
      translateY: [0, -50]
    }, 1, {
      easing: 'easeOutCirc'
    }]
  ]
});
