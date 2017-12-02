namespace Day02 {

    const SAMPLE_PROBLEM_01 = `5 1 9 5
    7 5 3
    2 4 6 8`;

    const SAMPLE_ANSWER_01 = 18;

    const SAMPLE_PROBLEM_02 = `5 9 2 8
    9 4 7 3
    3 8 6 5`;

    const SAMPLE_ANSWER_02 = 9;

    const BIG_PROBLEM = `179	2358	5197	867	163	4418	3135	5049	187	166	4682	5080	5541	172	4294	1397
    2637	136	3222	591	2593	1982	4506	195	4396	3741	2373	157	4533	3864	4159	142
    1049	1163	1128	193	1008	142	169	168	165	310	1054	104	1100	761	406	173
    200	53	222	227	218	51	188	45	98	194	189	42	50	105	46	176
    299	2521	216	2080	2068	2681	2376	220	1339	244	605	1598	2161	822	387	268
    1043	1409	637	1560	970	69	832	87	78	1391	1558	75	1643	655	1398	1193
    90	649	858	2496	1555	2618	2302	119	2675	131	1816	2356	2480	603	65	128
    2461	5099	168	4468	5371	2076	223	1178	194	5639	890	5575	1258	5591	6125	226
    204	205	2797	2452	2568	2777	1542	1586	241	836	3202	2495	197	2960	240	2880
    560	96	336	627	546	241	191	94	368	528	298	78	76	123	240	563
    818	973	1422	244	1263	200	1220	208	1143	627	609	274	130	961	685	1318
    1680	1174	1803	169	450	134	3799	161	2101	3675	133	4117	3574	4328	3630	4186
    1870	3494	837	115	1864	3626	24	116	2548	1225	3545	676	128	1869	3161	109
    890	53	778	68	65	784	261	682	563	781	360	382	790	313	785	71
    125	454	110	103	615	141	562	199	340	80	500	473	221	573	108	536
    1311	64	77	1328	1344	1248	1522	51	978	1535	1142	390	81	409	68	352`;


    function solve(input: string, checksumFunction: Function): number {
        // calculate a specified checksum for every line in a "spreadsheet" string, then sum the results.

        return input.split('\n') 
            .map(l => l.split(/\s+/).filter(x => x).map(n => +n)) // convert lines to number arrays
            .map(v => checksumFunction(v)) 
            .reduce((x, y) => x + y); 
    }

    function checksum01(input: number[]): number {
        // Checksum for Part 01: find the max and min in the sequence and subtract them from each other.

        // by using a two-element array as the accumulator we can track the min and max in one pass.
        let initialValue = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
        let minmax = input
            .reduce((x: number[], y: number) => [Math.min(x[0], y), Math.max(x[1], y)], initialValue);

        return minmax[1] - minmax[0];
    }

    function checksum02(input: number[]): number {
        // Checksum for Part 02: find the first two numbers a,b in a row such 
        // that a / b is a whole number and return the quotient.

        input.sort((a, b) => a - b).reverse();

        // with the list sorted (descending), we only have to check each element
        // against its subsequent elements.
        for (let i = 0; i < input.length; i++) {
            for (let j = i + 1; j < input.length; j++) {
                let quotient = input[i] / input[j];
                if (quotient % 1 === 0) {
                    return quotient;
                }
            }
        }

        /*
            Notes:
            Even with the optimization above, this is O(N^2):
                f(4) = (3 checks) + (2 checks) + (1 check) -> worst case
                f(n) = (n-1) + (n-2) + [...] + 1 -> sum of 1 to n-1.
                     = E(i=1, n-1)
                     = ((n-1)*(n-1+1)) / 2
                     = ((n-1)*n) / 2
            
            Which looks like this: https://www.desmos.com/calculator/iyu8ltj7g3
            TODO: find non-universe-destroying algorithm.                
        */

        // implementation 2: use hash lookups

        // get max number in sequence (O(n))

        // create a hashset

        // for each number x, add x*n to the hashset for n=2+ until x*n is greater than max.
        // -> this is the tricky bit. O(n) assuming there is some upper bound on possible element values, otherwise
        //    complexity will grow with the maximum value of elements.

        // for each number x, check if x exists in the hashset. (O(n))

        // for the found number x, check against all other numbers until the dividend y is found. (O(n))

        // return x/y

        throw new Error('No dividable combination found.');
    }

    // check and calculate: Part 01
    let sampleResult01 = solve(SAMPLE_PROBLEM_01, checksum01);
    var pass01 = sampleResult01 == SAMPLE_ANSWER_01;

    console.log(`01 Sample result: ${sampleResult01} (${pass01 ? 'pass' : 'fail'})`);
    if (pass01) {
        console.log(`01 Final result: ${solve(BIG_PROBLEM, checksum01)}`);
    }

    // check and calculate: Part 02
    let sampleResult02 = solve(SAMPLE_PROBLEM_02, checksum02);
    var pass02 = sampleResult02 == SAMPLE_ANSWER_02;

    console.log(`02 Sample result: ${sampleResult02} (${pass02 ? 'pass' : 'fail'})`);
    if (pass02) {
        console.log(`02 Final result: ${solve(BIG_PROBLEM, checksum02)}`);
    }
}