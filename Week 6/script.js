
var currentYear = new Date();   //gets current date and time
currentYear = currentYear.getFullYear();    //converts to just year

let year;
var number;
var prime;
const ageClass = document.querySelector(".age");
const primeClass = document.querySelector(".prime");

lightTheme();



function calculateAge(){    //get year you were born based on age
    year = Number(document.getElementById("birthYear").value);

    var yourAge = currentYear - year;
    document.getElementById("yearBorn").innerHTML = yourAge;

    console.log(yourAge);
}



function isPrime(number) {  //Checks if a number is prime or not

    if(number <= 1){    //1 or less, not prime
        return false;
    }

    for(let i = 2; i < number; i++){    //checks divisible by 1 or itself
        if(number % i === 0){
            return false;
        }
    }
    
    return true;
}

function displayPrime(){    //Displays if number is prime or not
    number = Number(document.getElementById("primeNumber").value);
    prime = isPrime(number);
    if(prime == true){
        document.getElementById("primeNumberText").innerHTML = "It is Prime";
    }else document.getElementById("primeNumberText").innerHTML = "It is not Prime";
}


//Wanted to experiment, added this for fun. Allows Light/Dark Toggle
function lightTheme(){
    document.body.style.backgroundColor = ("#DCDCDC");

    ageClass.style.boxShadow = ("10px 10px #585858");
    primeClass.style.boxShadow = ("10px 10px #585858");
}

function darkTheme(){
    document.body.style.backgroundColor = ("#585858");

    ageClass.style.boxShadow = ("10px 10px #787878");
    primeClass.style.boxShadow = ("10px 10px #787878");
}

function changeTheme(){     //toggle mechanism
    var themeID = document.getElementById("checkBox").checked;  //checks every time I hit toggle
    
    if(themeID === false){
        lightTheme();
    }else {darkTheme();}
    console.log(themeID);   //used for debugging, helped me figure out what to write
}



