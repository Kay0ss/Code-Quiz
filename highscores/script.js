var nameSlot = document.getElementById("name-name");

var localname = localStorage.getItem("usernames");
if(localname !== null ){
var parsedData = JSON.parse(localname);}

nameSlot.innerText = localname;
console.log(localname);