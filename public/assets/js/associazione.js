jQuery(document).ready(function() {
 fetch(`/whoweare`)
 .then(function(response) {
     console.log("/whoweare fetched");
     return response.json();
 })
 .then(function(data) {
     console.log(data[0].info);
     document.getElementById('WhoWeAreText').textContent = data[0].info;
 }).catch(function(err) {
     // Gets called if request fails, or even if .then fails
     return badRequest();
 });
});
