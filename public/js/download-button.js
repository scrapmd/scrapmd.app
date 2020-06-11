(async function() {
  if (navigator.userAgent.indexOf('Mac OS X 10_15_') === -1) return;
  const updateButton = (({ url, version, size }) => {
    Array.from(document.querySelectorAll('.direct-link a')).forEach(link => {
      link.setAttribute('href', url);
      link.innerHTML = `<i class="far fa-cloud-download"></i>&nbsp;Download&nbsp;&nbsp;<span class="badge">${version} / ${Math.floor(size / 100000) / 10}MB</span>`;
      link.parentNode.setAttribute('class', 'direct-link d-none d-md-inline-block d-lg-inline-block d-xl-inline-block')
    });
  })
  
  const cookieKey = '_dlbutton';
  const m = document.cookie.match(new RegExp(`${cookieKey}=([^;]+)`));

  if (m) {
    updateButton(JSON.parse(atob(m[1])));
    return;
  }
  
  const res = await fetch('https://api.github.com/repos/ngs/ci2go/releases?sort=created&direction=desc');
  const json = await res.json();
  const release = json.filter(({tag_name}) => /^v\d+\.\d+\.\d+$/.test(tag_name))[0];
  if (!release) return;
  const asset = release.assets.find(({name}) => name === 'CI2Go.app.zip');
  if (!asset) return;
  const expires = new Date(new Date().getTime() + 3600000);
  const data = {
    url: asset.browser_download_url,
    version: release.tag_name,
    size: asset.size
  };
  document.cookie = `${cookieKey}=${btoa(JSON.stringify(data))};expires=${expires.toGMTString()};path=/`
  updateButton(data);
})();