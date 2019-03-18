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

let fetchApi = document.getElementById("fetchBtn");

//https://trefle.io/some-url?token=ak9DWGxJYmNsNXRqRHZPT3M0V0twZz09
//https://developer.napster.com/examples
fetchApi.addEventListener("click",getDataFromApi);
function getDataFromApi() {
    fetch("https://restcountries.eu/rest/v2/all")
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            console.log(data[0]);
            console.log(data[0].name);

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
            <h2>Country ${arr[i].name}</h2>
            <div class="leftB">
            <div>Language ${arr[i]["languages"][0].name}</div>
            <div>Short Name ${arr[i]["altSpellings"][0]}</div>
            <div>Currency ${arr[i]["currencies"][0].code}</div>
            <div>Area ${arr[i]["area"]}</div>
            </div>
    `;
}