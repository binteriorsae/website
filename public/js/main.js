(function () {
  var header = document.querySelector('header.site');
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('nav.main');

  function onScroll() { header.classList.toggle('solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // reveal animations (GSAP + ScrollTrigger, with a plain fallback)
  var items = document.querySelectorAll('.rv');
  var heroImg = document.querySelector('.hero .right img');
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (heroImg) gsap.fromTo(heroImg, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' });
    gsap.utils.toArray('.rv').forEach(function (el) {
      gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('.hero .rv').forEach(function (el, i) {
      gsap.to(el, { opacity: 1, y: 0, duration: 1.2, delay: .15 * i, ease: 'power3.out' });
    });
    gsap.utils.toArray('img.bg').forEach(function (el) {
      gsap.fromTo(el, { yPercent: -7 }, { yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  } else {
    items.forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; });
    if (heroImg) heroImg.style.opacity = 1;
  }

  // portfolio filter
  var fb = document.querySelectorAll('.filters button');
  fb.forEach(function (b) {
    b.addEventListener('click', function () {
      fb.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.dataset.f;
      document.querySelectorAll('.card').forEach(function (c) {
        c.classList.toggle('hide', f !== 'all' && c.dataset.cat !== f);
      });
    });
  });
})();
