// Contact form: posts to the form service set in content/site.json (formEndpoint).
// Without an endpoint it only shows the thank-you message (useful while testing).
(function () {
  var form = document.getElementById('enquiry');
  if (!form) return;
  var thanks = document.querySelector('.thanks');
  var error = document.querySelector('.form-error');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var url = form.getAttribute('action');
    function ok() { form.style.display = 'none'; thanks.style.display = 'block'; }
    if (!url) { ok(); return; }
    var btn = form.querySelector('button[type=submit]');
    if (btn) btn.disabled = true;
    fetch(url, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (r.ok) ok(); else throw new Error('bad'); })
      .catch(function () { if (error) error.style.display = 'block'; if (btn) btn.disabled = false; });
  });
})();
