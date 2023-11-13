const display = document.querySelector('.Display');
const buttons = document.querySelectorAll('button');
const specialChar = ["÷", "x", "+", "=", "%"];
let output = "";

function calculate(btnValue) {



    if (btnValue === "=" && output !== "") {

        try {
            blinkDisplay();
            output = evaluate(allReplace(output, {'÷': '/', 'x': '*', '%': '/100'}));


            display.scrollLeft = 0;
        } catch (error) {
            blinkDisplay();
            handleCalculationError(error);
        }



    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.slice(0, -1);
    } else {
        if (output === "" && specialChar.includes(btnValue)) return;
        output += btnValue;
    }

    display.value = output;

    if(btnValue !== "="){
        display.scrollLeft = display.scrollWidth;
    }


    if (btnValue === "=" || output === "Syntax Error") {
        output = "";
    }

}

function blinkDisplay() {
    const blinkClass = 'blink';
    display.classList.add(blinkClass);


    setTimeout(() => {
        display.classList.remove(blinkClass);
    }, 500); 
}

function evaluate(expression) {
    return new Function('return ' + expression)();
}

function handleCalculationError(error) {
    if (error instanceof SyntaxError) {
        output = "Syntax Error";
    } else {
        throw error;
    }
}

function allReplace(str, obj) {

    if (typeof str !== 'string') {
        return str;
    }

    for (const x in obj) {
        str = str.replace(new RegExp(x, 'g'), obj[x]);
    }
    return str;
}

buttons.forEach(button => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

function addCommas(num){

    num = num.toString();

    var wholeNum = "", decimalNum = "",
    dot = num.indexOf(".");

    if (dot != -1){
        wholeNum = num.substring(0, dot);
        decimalNum = num.substring(dot);
    } else {
        wholeNum = num;
    }

    if(wholeNum.length > 3){
        var temp = "", j = 0;

        for(var i = wholeNum.length-1; i >= 0; i--){
            temp = wholeNum[i] + temp;
            j++;

            if(j % 3 === 0 && i !== 0){
                temp = "," + temp;
            }

        }
        wholeNum = temp;

    }

    num = wholeNum + decimalNum;
    return num;

}