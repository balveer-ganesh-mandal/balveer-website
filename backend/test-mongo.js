const urls = ['http://localhost:5000/api/core-committee', 'http://localhost:5000/api/sub-committee', 'http://localhost:5000/api/events', 'http://localhost:5000/'];
for (const url of urls) {
  fetch(url).then(res => { console.log(url, res.status); });
}
