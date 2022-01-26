const table_data = document.getElementById("table_data");

const fnc = async() => {
    try {
        const data = await fetch('https://api.publicapis.org/entries');
        setData(await data.json());
        console.log(data.json());

    } catch (error) {
        console.log(error);
    }

}
fnc()

async getData => {
    try {
        const data = await fetch('https://api.publicapis.org/entries');
        setData(await data.json());
        console.log(data.json());

    } catch (error) {
        console.log(error);
    }
}

function setData(Data) {
    const all_data = [];
    for (let x of Data.entries) {
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

}

function obj_formate(API, Category, Cors, Description) {
    this.API = API;
    this.Category = Category;
    this.Cors = Cors;
    this.Description = Description;

}