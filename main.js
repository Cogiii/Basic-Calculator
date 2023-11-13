const display = document.querySelector('.Display');
const buttons = document.querySelectorAll('button');
const specialChar = ["÷", "x", "+", "=", "%"];
let output = "";

function calculate(btnValue) {



    if (btnValue === "=" && output !== "") {

        try {
            blinkDisplay();
            output = safeEval(allReplace(output, {'÷': '/', 'x': '*', '%': '/100'}));
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

    if (btnValue === "=" || output === "Syntax Error") {
        output = "";
    }

}

function blinkDisplay() {
    const blinkClass = 'blink'; // Define the CSS class for blinking
    display.classList.add(blinkClass); // Add the class

    // Remove the class after a short delay
    setTimeout(() => {
        display.classList.remove(blinkClass);
    }, 500); // Adjust the delay as needed (500 milliseconds in this example)
}

function safeEval(expression) {
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
