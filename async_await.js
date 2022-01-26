const getId = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve("111")
    }, 2000)
});

const getName = new Promise(function(resolve, reject) {
    setTimeout(() => {
        resolve("Daxesh");
    }, 2000)
});

async function getReciptId() {

    const ID = await getId;
    console.log(ID);

    const Name = await getName;
    console.log(Name);

}

getReciptId();