const getIds = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve(["Daxesh", "Maruti"]);
        // reject(["Daxesh", "Maruti"]);
    }, 2000)
})

const filter = arr => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(arr[0] + " is Best"), 1000)
        console.log(arr[1] + " is Best");

    })

}

getIds.then(res => {
        console.log(res);
        return filter(res);
    })
    .then(sec => {
        console.log(sec);
    })
    .catch(err => {
        console.log(err);
    })