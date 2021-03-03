// Variables
let type = ["delta", "Square"];
let mainMath = document.querySelector(".mainMath");
let buttonCal = document.querySelector("#cal");
let inputA = document.querySelector("#inputA");
let inputB = document.querySelector("#inputB");
let inputC = document.querySelector("#inputC");
let deltaRadio = document.querySelector("#delta");
let squareRadio = document.querySelector("#square");
let inputDiv = document.querySelector(".inputDiv");

// EL
const EL = () => {
  buttonCal.addEventListener("click", getValue);
};
EL();

// functions

function getValue() {
  if (inputA.value == "" || inputB.value == "" || inputC.value == "") {
    alert("لطفا تمامی مقادیر را به صورت کامل وارد کنید");
  } else {
    let num;
    deltaRadio ? (num = 0) : (num = 1);
    console.log(inputA.value, inputB.value, inputC.value, num);
    machine(inputA.value, inputB.value, inputC.value, type[num]);
  }
}

const rootOfEquationDelta = (a, b, c, numberNROE, delta) => {
  let result;
  let answerOne = (-b + Math.sqrt(delta)) / (2 * a);
  let answerTwo = (-b - Math.sqrt(delta)) / (2 * a);
  let elementDeltaRound2 = `<p>x = (${-b} ± ${Math.sqrt(delta)}) / 2(${a})</p>`;
  // To be right or not Equation
  if (numberNROE == 2) {
    // set answers to variables
    result = `${elementDeltaRound2}
                  <div class="result">
                    x<sub>1</sub> = ${Number(answerOne.toFixed(5))}
                      <br/> 
                    x<sub>2</sub> = ${Number(answerTwo.toFixed(5))} 
                  </div>`;
  } else if (numberNROE == 1) {
    result = `${elementDeltaRound2}
                  <div class="result">
                    x<sub>1</sub> = ${Number(answerTwo.toFixed(5))}
                  </div>`;
  } else {
    // set Error
    result = `<h4 class="err-math">این معادله در اعداد حقیقی دارای جواب نمیباشد</h4>`;
  }

  // set solution
  let mathWay = `<h2>معادله درجه دوم با روش دلتا</h2>
                 <p> ${a}x<sup>2</sup> + ${b}x + ${c} = 0 </p>
                 <p> ${a} ( x<sup>2</sup> + ${b}/${a}x + ${c}/${a} ) = 0 </p>
                 <p>∆ = ${b}<sup>2</sup> - 4 ( ${a} ) ( ${c} ) = ${delta}</p>
                 ${result}`;
  return mathWay;
};

const rootOfEquationSquare = (a, b, c, numberNROE) => {
  // calculate answers
  let ab = b / a,
    ac = c / a;
  let halfX2 = Math.pow(ab / 2, 2);
  let elementSquareRound2 = `<p>x + ${Number(
    Math.sqrt(halfX2).toFixed(5)
  )} = ±${Math.sqrt((halfX2 * 100 - ac * 100) / 100)}</p>`;
  let jahat1 = 1;
  let jahat2 = 1;
  if (b > 0) {
    jahat1 = -1;
    jahat2 = -1;
  } else if (b == 0) {
    jahat1 = 1;
    jahat2 = -1;
  }
  if (numberNROE == 2) {
    result = `${elementSquareRound2}
                <div class="result">
                  x<sub>1</sub> = ${jahat1 *  Number(((Math.sqrt(halfX2) * 1000 + Math.sqrt((halfX2 * 100 - ac * 100) / 100) * 1000) / 1000 ).toFixed(5))}
                    <br/>
                  x<sub>2</sub> = ${jahat2 * Number(((Math.sqrt(halfX2) * 1000 - Math.sqrt((halfX2 * 100 - ac * 100) / 100) * 1000) / 1000 ).toFixed(5))}
                </div>
              `;
  } else if (numberNROE == 1) {
    result = ` ${elementSquareRound2}
                <div class="result">
                x<sub>2</sub> = ${jahat1 * Number(((Math.sqrt(halfX2) * 1000 - Math.sqrt((halfX2 * 100 - ac * 100) / 100) * 1000) / 1000).toFixed(5))} 
                </div>
              `;
  } else {
    result = `<h4 class="err-math">این معادله در اعداد حقیقی دارای جواب نمیباشد</h4>`;
  }
  let mathWay = ` 
              <h2>معادله درجه دوم با روش مربع کامل</h2> 
              <p> ${a}x<sup>2</sup> + ${b}x + ${c} = 0 </p>
              <p> ${a} ( x<sup>2</sup> + ${b}/${a}x + ${c}/${a} ) = 0 </p>
              <p> x<sup>2</sup> + ${b}/${a}x + ${c}/${a} = -${c}/${a} + ${c}/${a} </p>
              <p>( x + ${Number(Math.sqrt(halfX2).toFixed(5))})<sup>2</sup> = -${Number(halfX2.toFixed(5))} + ${Number(halfX2.toFixed(5))}</p>
              <p>( x + ${Number(Math.sqrt(halfX2).toFixed(5))} )<sup>2</sup> = ${(halfX2 * 100 - ac * 100) / 100}</p>
              ${result}`;
  return mathWay;
};

const NumberRootOfEquation = (delta) => {
  if (delta > 0) {
    return 2;
  } else if (delta == 0) {
    return 1;
  } else {
    return 0;
  }
};
const machine = (a, b, c, type) => {
  // answers of Equation
  let mathWay;
  let delta = Math.pow(b, 2) - 4 * a * c;

  // call NumberRootOfEquation to get Number of root
  let numberNROE = NumberRootOfEquation(delta);

  if (type == "delta") {
    mathWay = rootOfEquationDelta(a, b, c, numberNROE, delta);
  } else if (type == "Square") {
    mathWay = rootOfEquationSquare(a, b, c, numberNROE);
  }
  inputDiv.style.display = "none";
  mainMath.innerHTML = mainMath.innerHTML + mathWay;
};
