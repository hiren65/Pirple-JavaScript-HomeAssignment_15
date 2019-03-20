/*
    1. Build an empty page with a button that says "fetch data"
    2. When that button is clicked, fetch data from the API you chose above,
       and display it on your webpage in any way you see fit.
    3. Above the fetched data, display a button that says "refresh data".
    4. When the refresh button is clicked, wipe the current (displayed) data
       from the screen and replace it with newly fetch data from the API.
    5. If your request fails at any point, display a popup alert that says "sorry,
       we couldn't access the API". Hint: To test this functionality,
       try using your new website with your internet connection turned off!
*/

let checkData = [];
let fetchApi = document.getElementById("fetchBtn");

//https://trefle.io/some-url?token=ak9DWGxJYmNsNXRqRHZPT3M0V0twZz09
//https://developer.napster.com/examples
fetchApi.addEventListener("click",getDataFromApi);
function getDataFromApi() {
    if (checkData.length>0){
        removeDivWithClass("box000");
        checkData = [];
        //return;
    }
    fetch("https://restcountries.eu/rest/v2/all")
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log("type "+typeof data +"and array "+Array.isArray(data));
            console.log(data[0]);
            //console.log(data[0].name);
            checkData = data;
            for (let i=0;i<data.length;i++){
                createGrid("b",data,i);
            }
        })
        .catch(function (err) {
            console.log(err)
        })
}
function createGrid(id,arr,i){

    let bb = document.getElementById("wrapper");
    let cc = document.createElement("div");
    cc.setAttribute("id",id+i+2);

    cc.setAttribute("class","box000");
    bb.appendChild(cc);
    //cc.innerText = arr[0].name;
    cc.innerHTML = `
            <h2><span class="countryHeading">Country</span> ${arr[i].name}</h2>
            <div class="flag"><img class="flagImg" src=${arr[i]["flag"]} alt="Flag"></div>
            <div class="leftB">
            <div><span class="spTi"> Language</span> ${arr[i]["languages"][0].name}</div>
            <div><span class="spTi"> Short Name</span> ${arr[i]["altSpellings"][0]}</div>
            <div><span class="spTi"> Currency</span> ${arr[i]["currencies"][0].code}</div>
            <div><span class="spTi"> Area</span> ${arr[i]["area"]} Square Kilometer</div>
            </div>
            <div class="rightB">
            <div><span class="spTi">Population</span> ${arr[i]["population"]}</div>
            <div><span class="spTi">Native Name</span> ${arr[i]["nativeName"]}</div>
            <div><span class="spTi">Capital </span>  ${arr[i]["capital"]}</div>
            <div><span class="spTi">Region </span>  ${arr[i]["region"]}</div>
            </div>
    `;
}
function removeDivWithClass(myClass) {
    let tt = document.getElementsByClassName(myClass);
    while (tt.length > 0) tt[0].remove();
}
//////button Search //////////////////
let search = document.getElementById("searchBtn");
search.addEventListener("click",searchAction);
function searchAction() {

    let inputValue = document.getElementById("input1").value;
    let text = inputValue;
    if (text === ""){
        alert("No data input!!");return;
    }

    if (checkData.length>0){
        removeDivWithClass("box000");
        checkData = [];

    }

    fetch(`https://restcountries.eu/rest/v2/name/${text}`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log("type "+typeof data +"and array "+Array.isArray(data));
            //console.log(data[0]);
            //console.log(data[0].name);
            checkData = data;
            for (let i=0;i<data.length;i++){
                createGrid("b",data,i);
            }

        })
        .catch(function (err) {
            console.log("ERR "+err)
        })

}
///////////////////selection////////////////
let selection = document.getElementById("select");


let region = document.getElementById("regional");
region.addEventListener("click",regionCountry);
function regionCountry() {
    if (checkData.length>0){
        removeDivWithClass("box000");
        checkData = [];
    }
    //fetch(`https://restcountries.eu/rest/v2/region/asia`)
    fetch("https://restcountries.eu/rest/v2/all")
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            //console.log("type "+typeof data +"and array "+Array.isArray(data));
            console.log(data[0]);
            console.log("redion "+  data[0].region);
            let text = document.getElementById("select");
            console.log("inner text "+ text.value);
            checkData = data;
            for (let i=0;i<data.length;i++){
                if (data[i].region === text.value){
                    createGrid("b",data,i);
                }

            }
        })
        .catch(function (err) {
            console.log(err)
        })
}
