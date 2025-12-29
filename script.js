function normalCDF(x) {
    return (1 + erf(x / Math.sqrt(2))) / 2;
}

function erf(x) {
    let sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    let a1 =  0.254829592;
    let a2 = -0.284496736;
    let a3 =  1.421413741;
    let a4 = -1.453152027;
    let a5 =  1.061405429;
    let p  =  0.3275911;

    let t = 1 / (1 + p * x);
    let y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

function calculate() {
    const price  = parseFloat(document.getElementById("price").value);
    const days   = parseFloat(document.getElementById("days").value);
    const volPct = parseFloat(document.getElementById("vol").value);
    const target = parseFloat(document.getElementById("target").value);

    if (!price || !days || !volPct || !target) {
        alert("Please fill all fields");
        return;
    }

    const T = days / 252;
    const vol = volPct / 100;

    const sigma = vol * Math.sqrt(T);

    const z = (Math.log(target / price)) / sigma;

    const probability = 1 - normalCDF(z);

    document.getElementById("result").innerText =
        (probability * 100).toFixed(2) + "%";
}

