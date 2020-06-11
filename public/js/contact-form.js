async function onSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const q = Object.fromEntries(
    (document.location.search || '')
      .replace(/^\?/, '')
      .split('&')
      .map(c => c.split('='))
      .map(c => [c[0], decodeURIComponent(c[1])])
  );
  const { device, version } = q;

  const data = Object.fromEntries(
    Array.from(form.elements)
      .filter(input => !!input.name)
      .map(input => [input.name, input.value]));

  const url = form.action;

  Array.from(form.elements).forEach(input => input.disabled = true);

  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      device,
      version
    })
  })
  Array.from(form.elements).forEach(input => input.disabled = false)

  if (res.ok) {
    document.getElementById('formWrap').innerHTML = '<div class="thankyou doc"><p class="h1">Thank you.</p></div>'
  }
}