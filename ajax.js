const table_data = document.getElementById("table_data");

// fetch('https://www.metaweather.com/api/location/2487956/')

fetch('https://api.publicapis.org/entries')
    .then(result => {
        // console.log(result);
        return result.json();
    })
    .then(data => {
        const all_data = [];
        for (let x of data.entries) {
            all_data.push(new obj_formate(x.API, x.Category, x.Cors, x.Description))
        }

        for (let i = 0; i < all_data.length; i++) {
            x = all_data[i];
            const raw = table_data.insertRow(i + 1);
            const API = raw.insertCell(0).innerHTML = x.API;
            const Category = raw.insertCell(1).innerHTML = x.Category;
            const Cors = raw.insertCell(2).innerHTML = x.Cors;
            const Description = raw.insertCell(3).innerHTML = x.Description;
        }

        console.log(all_data);
    })
    .catch(err => {

        console.log(err);
    })

function obj_formate(API, Category, Cors, Description) {
    this.API = API;
    this.Category = Category;
    this.Cors = Cors;
    this.Description = Description;

}

// document.onreadystatechange = () => {
//     if (document.readyState == "complete")
//         alert(document.readyState);
// }

// window.load = () => {
//     alert("load");
// }