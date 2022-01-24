/*****************************
  Java Script part
****************************/

// Set Title On load 
window.onload = function() {
    document.getElementById("Heading").innerHTML = "Staring Javascript";

    info_variable();

    console.log("\n\n");
    info_operator();

    console.log("\n\n");
    info_dataType();

    console.log("\n\n");
    info_string();

    console.log("\n\n");
    info_templateLiterals();

    console.log("\n\n");
    info_Array();

    console.log("\n\n");
    info_Map();

    console.log("\n\n");
    info_set();

    console.log("\n\n");
    info_condition();

    console.log("\n\n");
    info_switch();

    console.log("\n\n");
    info_this();

    console.log("\n\n");
    info_obj();

    console.log("\n\n");
    info_fun();

    console.log("\n\n");
    info_classes();

    console.log("\n\n");
    info_asynk();




}

//********** Variables
function info_variable() {

    // Normal 
    const ADD = 10;
    let a = 5,
        b = 6;
    console.log("a + b = " +
        a + b);

    if (a < b) {
        var c = ADD + a + b;
    }
    console.log("a + b + ADD = " +
        c);

    // JavaScript Hoisting
    console.log("\n\n\n");
    console.log("-> JavaScript Hoisting");
    d = 5;
    var d;
    console.log("Variable without identifier : " +
        d);


    console.log("I return in function scop befor assign = " + i);
    var i = 10;
    // if (true) {
    //     var i = 10;
    // }
    console.log("I return in function scop after assign = " + i);
}

//********** Operator
function info_operator() {
    let a = 5,
        b = 6;

    console.log("-> Operator");
    console.log("A + B : " + (a + b));
    console.log("A - B : " + (a - b));
    console.log("A * B : " + a * b);
    console.log("A ** B : " + a ** b);
    console.log("A / B : " + a / b);
    console.log("A % B : " + a % b);
    console.log("A ++ : " + a++);
    console.log("B -- : " + b--);
    console.log("A : " + a);
    console.log("B : " + b);
    console.log("++A + --B : " + (++a + --b));
}

//********** dataType
function info_dataType() {
    console.log("-> Data Type");

    // Number
    let a = 5;
    console.log("Number : " + a);

    // String 
    let fruit = "Apple";
    console.log("String : " + fruit);


    // Object
    let Student = {
        Name: "Daxesh",
        Post: "Intern",
        info: function() {
            return "\nName :" + Student.Name + "\nPost :" + Student.Post;
        }
    };
    console.log("Object : " + Student.info());
}

//********** String
function info_string() {

    console.log("-> String");
    let a = "Hello";
    console.log("size of a : " + a.length);
    console.log("Type of a : " + typeof a);
    let b = new String("hi");
    console.log("size of b : " + b.length);
    console.log("Type of b : " + typeof b);

    // Escape Character
    console.log("Print \" ");
    console.log("Print \\ .");
    console.log("Print \b .");
    console.log("Print \f .");
    console.log("Print \n .");
    console.log("Print \r .");
    console.log("Print \t .");
    console.log("Print \v .");

    // Methods 
    console.log("\n-> String Method");
    let str = "Hello I am Daxesh ";
    console.log("String : Hello I am Daxesh ");
    console.log("Positive slice : " + str.slice(0, 5));
    console.log("Negative slice : " + str.slice(-7, -1));

    console.log("Positive SubString : " + str.substring(5, 10));

    console.log("Positive substr : " + str.substr(0, 5));

    console.log("String Replace : " + str.replace("Daxesh", "Maruti"));

    console.log("String Index Of Daxesh : " + str.indexOf("Daxesh"));

    console.log("String serch Of Daxesh : " + str.search("I"));

    console.log("String include : " + str.includes("I"));

    console.log("String include : " + str.includes("I", 5));

    console.log("String start with : " + str.startsWith("Hello", 0));

    console.log("String end with : " + str.endsWith("Daxesh", 0));


}

//********** Template Literals
function info_templateLiterals() {
    console.log(`-> Template Literals`);
    console.log(`He's "Jonny"
    new line`);

    // Variable Substitution
    let fName = "Daxesh";
    let sName = "Italiya";

    console.log(`I am ${fName} ${sName}`);

    // Expression Substitution 
    let proice = 10;
    let product = 30;

    console.log(`proice ${proice}`);
    console.log(`product ${product}`);
    console.log(`Total Prise is ${proice * product}`);

}


//********* * Template Array
function info_Array() {
    console.log(`-> Array`);

    const cars = ["Saab", "Volvo", "BMW"];
    console.log(cars);

    cars[3] = "Maruti";
    cars.push("Zen")
    console.log(cars);

    cars.forEach(function(value) {
        console.log(value)
    })

    const Bike = new Array("Spelnder", "FZ5", "R15");
    console.log("new Array Bike :" + Bike);
    console.log("Bike[0] :" + Bike[0]);

    cars.forEach(function(vale, index, array) {
        console.log("Index " + index)
        console.log("value " + vale)
        console.log("Array " + array)
    })

    console.log("Shorted Array : " + cars.sort());


    console.log(`-> Array Methods`);

    console.log("to Strings : " + Bike.toString());
    console.log("joni : " + Bike.join("  "));
    console.log("POP : " + Bike.pop() + " -> Bike : " + Bike);
    console.log("Push : " + Bike.push("BMW") + " -> Bike : " + Bike);
    console.log("shift : " + Bike.shift() + " -> Bike : " + Bike);
    console.log("unshift : " + Bike.unshift("new") + " -> Bike : " + Bike);
    console.log("Delete : " + delete Bike[0] + " -> Bike : " + Bike);
    console.log("Concatenating bike + car : " + Bike.concat(cars));
    console.log("Splice : " + Bike.splice(2, 1, "Activa", "Pleasure") + " -> Bike : " + Bike);
    console.log("Splice Remove Element : " + Bike.splice(0, 1) + " -> Bike : " + Bike);
    console.log("Slice : " + Bike.slice(1) + " -> Bike : " + Bike);

    console.log("Array Sort : " + Bike.sort());
    console.log("Array reverse : " + Bike.reverse());

    const arr = new Array(1, 2, 3, 4, 5, 6, "11", 7, 8, 9, 10)
    console.log("Array sort Desc : " + arr.sort((a, b) => b - a));
    console.log("Array sort Ase : " + arr.sort((a, b) => a - b));


    console.log("Array Min : " + Math.max.apply(null, arr));
    console.log("Array Min : " + Math.min.apply(null, arr));


    console.log("Array Map : " + arr.map((value) => value * 2));

    console.log("Array filter >2 : " + arr.filter((value) => value > 2));

    console.log("Array Reduce >2 : " + arr.reduce((total, value) => total + value));

    console.log("Array every > 0: " + arr.every((value) => value > 0));
    console.log("Array some > 20 : " + arr.some((value) => value > 20));

    console.log("Array Index of Activa : " + Bike.indexOf("Activa"));

    console.log("Array find : " + arr.find((value) => value > 5));







}

//********** Template Array
function info_Map() {
    const fruit = new Map(
        [
            ["Apple", 50],
            ["Banana", 20],
            ["Orange", 10],
            ["Gvava", 60],
        ]
    );

    console.log(fruit);

    fruit.set("Mengo", 40)
    fruit.set("Banana", 80)

    console.log(fruit);

    fruit.forEach((value, key) => console.log(key + " " + value));
    for (const x of fruit.entries()) {
        console.log(x);
    }
}

//********** Template Set
function info_set() {

    console.log(" Set ");

    const letter = new Set();
    letter.add("b");
    letter.add("a");
    letter.add("a");
    letter.add("b");
    letter.add("c");

    console.log(letter);

    const name = Array.from("Daxesh Italiya");

    const r_name = new Set();
    name.forEach((value) => r_name.add(value));


    console.log(r_name);
}

//********** Template Condition
function info_condition() {
    console.log("-> Condition");

    const time = new Date().getHours();

    if (time < 10) {
        console.log("Good morning");
    } else if (time < 20) {
        console.log("Good Afternoon");
    } else {
        console.log("Good evening");
    }
}

//********** Template switch
function info_switch() {
    console.log("-> Condition");

    const Day = new Date().getDay();
    switch (Day - 1) {
        case 0:
            console.log("Mon");
            break;
        case 1:
            console.log("Tue");
            break;
        case 2:
            console.log("Wed");
            break;
        case 3:
            console.log("Thu");
            break;
        case 4:
            console.log("Fri");
            break;
        case 5:
            console.log("Sat");
            break;
        case 6:
            console.log("Sun");
            break;
    }
}


//********** Template This
function info_this() {

    console.log("-> This Keyword");
    const x = 10;

    function check() {
        const X = 10;
        console.log(this.x);
    }
    check();

}

//********** Template obj
function info_obj() {
    console.log("-> Function");
    const person = { today: new Date(), firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" };

    console.log(Object.values(person));

    console.log(JSON.stringify(person));

    for (let x in person) {
        console.log(person[x]);
    }

    person.name = function() {
        return this.firstName + " " + this.lastName;
    }

    console.log(person.name());

    // stringify
    console.log(JSON.stringify(person));

    const arr = ["John", "Peter", "Sally", "Jane"];
    console.log(arr);


    // Accessors
    person.getFname = function() {
        return this.firstName;
    }

    person.setFname = function(firstName) {
        this.firstName = firstName;
    }

    person.setFname("Daxesh");

    console.log(JSON.stringify(person));

    Object.defineProperty(person, "reset", {
        get: function() { this.firstName = "Duo"; }
    });

    person.reset;
    console.log(JSON.stringify(person));

    // Constructors

    function Person(first, last, age, eye) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.eyeColor = eye;
    }

    const myFather = new Person("John", "Doe", 50, "white");
    const myMather = new Person("Jiha", "John", 50, "white");
    console.log(JSON.stringify(myFather));
    console.log(JSON.stringify(myMather));

    const x4 = {}; // new Object object
    const x5 = []; // new Array object
    const x6 = /()/ // new RegExp object
    const x7 = function() {}; // new function


    // Object Prototypes
    // --Ad property
    Person.prototype.nationality = "English";
    console.log(JSON.stringify(myFather));

    // --Ad function
    Person.prototype.name = function() {
        return this.firstName + this.lastName;
    };
    console.log(JSON.stringify(myFather.name));


    // Iterating Over a String
    for (const x of "W3Schools") {
        // code block to be executed
        console.log(JSON.stringify(x));
    }

    // Create an Object
    myNumbers = {};

    // Make it Iterable
    myNumbers[Symbol.iterator] = function() {
        let n = 0;
        done = false;
        return {
            next() {
                n += 10;
                if (n == 100) { done = true }
                return { value: n, done: done };
            }
        };
    }

    for (const num of myNumbers) {
        console.log(JSON.stringify(num));
    }

}

//********** Template Function
function info_fun() {
    console.log("-> Funtion");

    function sum(a, b) {
        return a + b;
    }

    const y = function(a, b) {
        return a - b;
    }

    const mul = new Function("a", "b", "return a*b");
    console.log(sum);
    console.log("sum is 5 and 6 is " + sum(5, 6));
    console.log("sub is 5 and 6 is " + y(5, 6));
    console.log("mul is 5 and 6 is " + mul(5, 6));


    // Function Hoisting
    console.log(myFunction(5));

    function myFunction(y) {
        return y * y;
    }

    // Self-Invoking Functions
    (function() {
        var x = "Hello!!"; // I will invoke myself
        console.log(x);
    })();

    // Function Default Parameters
    function myFunction(x, y = 2) {
        return x + y;
    }
    console.log(myFunction(1, 5));

    // The Arguments Object
    x = findMax(1, 12, 158, 12, 15, 14);

    function findMax() {
        let max = -Infinity;
        for (let x of arguments) {
            if (x > max) max = x;
        }
        return max;
    }

    console.log(x);

    // call() Method
    const person = {
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    }

    const person1 = {
        firstName: "Daxesh",
        lastName: "Italiya"
    }

    const person2 = {
        firstName: "Maruti",
        lastName: "Techlab"
    }

    console.log(person.fullName.call(person1));
    console.log(person.fullName.call(person2));

    // apply() Method
    console.log(person.fullName.apply(person1));

    let counter = 0;

    // Function to increment counter
    function add() {
        let counter = 0;
        this.counter += 1;
    }

    // Call add() 3 times
    add();
    add();
    add();

    console.log(counter);

}

//********** Template Function
function info_classes() {
    console.log("-> Classes");
    class Student {
        constructor(name, year) {
            this.name = name;
            this.year = year;
        }

        Details() {
            return this.name + " " + this.year;
        }
    }

    const s1 = new Student("Daxesh", 2000);
    const s2 = new Student("Maruti", 2010);

    console.log(s1.Details());


    // Inheritance
    class A {
        name;
        constructor(name) {
            this.name = name;
        }
        present() {
            return this.name;
        }
        static Hello() {
            console.log("Static method call");
        }
    }

    class B extends A {}

    const obj = new B("hi");
    console.log(obj.present());
    B.Hello();
}


//********** Template Function
function info_asynk() {

    // call back

    function display(message) {
        console.log(message);
    }

    function calculate(a, b, printCallback) {
        printCallback("Sum is " + (a + b));
    }

    calculate(10, 12, display);

    // Timeout
    setTimeout(myFunction, 3000);
    setInterval(myFunction, 3000);

    function myFunction() {
        console.log("Afer 3 second");
    }

}