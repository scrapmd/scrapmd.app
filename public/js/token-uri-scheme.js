function onSubmit(e) {
  e.preventDefault();
  var form = e.target
      , token = form.token.value
    , valid = /^[a-f0-9]{40}$/.test(token)
    , uri
    , qr
    ;
  if (!valid) {
    alert('Please input valid API token');
    return;
  }
  uri = 'ci2go://ci2go.app/token/' + token
  try {
    document.location = uri;
  } catch(e) {
    console.error(e);
  }
  qr = qrcode(4, 'L');
  qr.addData(uri);
  qr.make();
  document.getElementById('qrcode').innerHTML = qr.createImgTag(5);
  document.getElementById('qr').style.visibility = 'visible';
  document.location.href = '#qr';
}