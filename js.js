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