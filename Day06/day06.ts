namespace Day06 {

    let banks: number[] = [2, 8, 8, 5, 4, 2, 3, 1, 5, 5, 1, 2, 15, 13, 5, 14];

    function solve(input: number[]): { steps: number, banks: number[] } {        
        let makeKey = (b:number[]) => b.map(x => '' + x).join('\t');
        let banks = [...input];
        let states = new Set<string>();
        let key = makeKey(banks);
        let steps = 0;

        while(!states.has(key)){        
            states.add(key);
            redistribute(banks);
            key = makeKey(banks);
            steps++;
        }

        return { steps: steps, banks: key.split('\t').map(x => +x) };
    }

    function redistribute(banks: number[]) {
        let maxIndex = banks.indexOf(Math.max(...banks));
        let bucket = banks[maxIndex];
        banks[maxIndex] = 0;
        let index = maxIndex;
        while (bucket) {
            index = (index + 1) % banks.length;
            banks[index]++;
            bucket--;
        }
    }

    // part 1:    
    console.log(solve(banks).steps);

    // part 2:
    console.log(solve(solve(banks).banks).steps);
}