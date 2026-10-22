let values = {
    A: 0,
    B: 0,
    HA: 0,
    HB: 0,
    FA: 0,
    FB: 0,
    FC: 0
};


// OPEN SIMULATOR
function openSimulator(type) {

    document.querySelectorAll(".simulator").forEach(s => {
        s.style.display = "none";
    });

    let box = document.getElementById(type);
    box.style.display = "block";

    box.scrollIntoView({ behavior: "smooth" });

    if (type === "logic") calculateGate();
    if (type === "half") calculateHalf();
    if (type === "full") calculateFull();
}


// TOGGLE INPUT
function toggle(input) {

    values[input] = values[input] === 0 ? 1 : 0;

    document.getElementById(input).textContent = values[input];

    if (["A", "B"].includes(input)) calculateGate();
    if (["HA", "HB"].includes(input)) calculateHalf();
    if (["FA", "FB", "FC"].includes(input)) calculateFull();
}


// LOGIC GATES
function calculateGate() {

    let A = values.A;
    let B = values.B;
    let gate = document.getElementById("gate").value;
    let result;

    if (gate === "AND") result = A & B;
    if (gate === "OR") result = A | B;
    if (gate === "NOT") result = A ? 0 : 1;
    if (gate === "NAND") result = !(A & B) ? 1 : 0;
    if (gate === "NOR") result = !(A | B) ? 1 : 0;
    if (gate === "XOR") result = A ^ B;
    if (gate === "XNOR") result = A === B ? 1 : 0;

    document.getElementById("output").textContent = result;
    document.getElementById("gateName").textContent = gate;

    document.getElementById("inputB").style.display =
        gate === "NOT" ? "none" : "flex";
}


// LOGIC TRUTH TABLE
function showTruthTable() {

    let gate = document.getElementById("gate").value;
    let rows = "";

    if (gate === "NOT") {

        rows = `
        <table>
        <tr><th>A</th><th>Output</th></tr>
        <tr><td>0</td><td>1</td></tr>
        <tr><td>1</td><td>0</td></tr>
        </table>`;

    } else {

        for (let A = 0; A <= 1; A++) {
            for (let B = 0; B <= 1; B++) {

                let result = gateResult(gate, A, B);

                rows += `<tr>
                    <td>${A}</td>
                    <td>${B}</td>
                    <td>${result}</td>
                </tr>`;
            }
        }

        rows = `
        <table>
        <tr><th>A</th><th>B</th><th>Output</th></tr>
        ${rows}
        </table>`;
    }

    document.getElementById("truthTable").innerHTML = rows;
}


function gateResult(gate, A, B) {

    if (gate === "AND") return A & B;
    if (gate === "OR") return A | B;
    if (gate === "NAND") return !(A & B) ? 1 : 0;
    if (gate === "NOR") return !(A | B) ? 1 : 0;
    if (gate === "XOR") return A ^ B;
    if (gate === "XNOR") return A === B ? 1 : 0;
}


// HALF ADDER
function calculateHalf() {

    let A = values.HA;
    let B = values.HB;

    document.getElementById("sum").textContent = A ^ B;
    document.getElementById("carry").textContent = A & B;
}


function halfTable() {

    document.getElementById("halfTable").innerHTML = `
    <table>
        <tr><th>A</th><th>B</th><th>SUM</th><th>CARRY</th></tr>
        <tr><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>0</td><td>1</td><td>1</td><td>0</td></tr>
        <tr><td>1</td><td>0</td><td>1</td><td>0</td></tr>
        <tr><td>1</td><td>1</td><td>0</td><td>1</td></tr>
    </table>`;
}


// FULL ADDER
function calculateFull() {

    let A = values.FA;
    let B = values.FB;
    let C = values.FC;

    let sum = A ^ B ^ C;

    let carry =
        (A & B) |
        (B & C) |
        (A & C);

    document.getElementById("fullSum").textContent = sum;
    document.getElementById("fullCarry").textContent = carry;
}


function fullTable() {

    document.getElementById("fullTable").innerHTML = `
    <table>
        <tr>
            <th>A</th>
            <th>B</th>
            <th>Cin</th>
            <th>SUM</th>
            <th>CARRY</th>
        </tr>

        <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
        <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>
        <tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
        <tr><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
        <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
    </table>`;
}