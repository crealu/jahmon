async function sendPassword() {
  var attempt = document.getElementsByTagName('input')[0].value;
  var res = await fetch('/pass', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({word: attempt})
  })
  .then(res => { return res.json() })
  .then(data => { return data })
  .catch(err => console.error(err) )

  document.getElementsByClassName('res-msg')[0].textContent = res.msg + '... redirecting';

  if (res.msg == 'Password correct') {
    setTimeout(() => { window.location = '/app' }, 1000);
  }
}
