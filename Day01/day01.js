const BIG_PROBLEM = '525544371475555531777715244182678432191828'; // truncated
function solve(input, offset) {
    let digits = Array.from(input).map(c => +c);
    return digits.map((v, i) => i) // i.e. range(0, digits.length);
        .filter(i => digits[i] === digits[(i + offset) % digits.length])
        .map(i => digits[i])
        .reduce((a, c) => a + c, 0);
}
["1122", "1111", "1234", "91212129", BIG_PROBLEM].forEach(problem => {
    console.log(solve(problem, 1));
});
["1212", "1221", "123425", "123123", "12131415", BIG_PROBLEM].forEach(problem => {
    console.log(solve(problem, problem.length / 2));
});
