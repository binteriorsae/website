// Photo viewer for the "more photos" grid on project pages:
// click a photo to enlarge it, then move between photos with the arrows
// (or the keyboard arrow keys, or a swipe). Esc / click outside / x closes it.
(function () {
  var dataEl = document.getElementById('gal-data');
  var lb = document.getElementById('lb');
  if (!dataEl || !lb) return;

  var items = JSON.parse(dataEl.textContent);
  var thumbs = [].slice.call(document.querySelectorAll('.gal-item'));
  var img = lb.querySelector('.lb-img');
  var cap = lb.querySelector('.lb-cap');
  var count = lb.querySelector('.lb-count');
  var toggle = lb.querySelector('.lb-toggle');
  var toggleBtns = [].slice.call(toggle.querySelectorAll('button'));
  var rtl = document.documentElement.dir === 'rtl';
  var cur = 0, view = 'after', lastFocus = null;

  function show(i) {
    cur = (i + items.length) % items.length;
    view = 'after';
    var it = items[cur];
    img.src = it.after;
    img.alt = it.caption;
    cap.textContent = it.caption;
    count.textContent = (cur + 1) + ' / ' + items.length;
    toggle.hidden = !it.before;
    toggleBtns.forEach(function (b) { b.classList.toggle('on', b.dataset.v === 'after'); });
    // warm up the neighbours so the arrows feel instant
    [cur - 1, cur + 1].forEach(function (n) {
      var o = items[(n + items.length) % items.length];
      if (o) { var pre = new Image(); pre.src = o.after; }
    });
    var single = items.length < 2;
    lb.querySelector('.lb-prev').hidden = single;
    lb.querySelector('.lb-next').hidden = single;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add('open'); });
    document.body.classList.add('lb-lock');
    lb.querySelector('.lb-close').focus();
  }
  function close() {
    lb.classList.remove('open');
    document.body.classList.remove('lb-lock');
    setTimeout(function () { lb.hidden = true; }, 200);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  // "next" is the right arrow in English and the left arrow in Arabic (mirrored)
  function step(dir) { show(cur + dir); }

  thumbs.forEach(function (t) { t.addEventListener('click', function () { open(+t.dataset.i); }); });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', function () { step(-1); });
  lb.querySelector('.lb-next').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  toggleBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var it = items[cur];
      view = b.dataset.v;
      img.src = view === 'before' && it.before ? it.before : it.after;
      toggleBtns.forEach(function (x) { x.classList.toggle('on', x === b); });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') step(rtl ? -1 : 1);
    else if (e.key === 'ArrowLeft') step(rtl ? 1 : -1);
  });

  // swipe on touch screens
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) < 50) return;
    step((dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
  });
})();
