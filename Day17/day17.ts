namespace day17 {
    const SAMPLE_PROBLEM = 3;
    const SAMPLE_ANSWER_1 = 638;
    const BIG_PROBLEM = 369;

    class RingBuffer {
        position = 0;
        content = [0];
        advance(amount: number) { this.position = (this.position + amount) % this.content.length; }
        insert(value: number) {
            let left = this.content.slice(0, this.position + 1);
            let right = this.content.slice(this.position + 1, this.content.length);
            this.content = [...left, value, ...right];
            this.position++;
        }
    }

    class FakeRingBuffer {
        position = 0;
        size = 1;
        nextAfterZero: number = undefined;
        advance(amount: number) { this.position = (this.position + amount) % this.size; }
        insert(value: number) {
            if (this.position == 0)
                this.nextAfterZero = value;
            this.size++;
            this.position++;
        }
    }

    function solve1(jump: number) {
        let buffer = new RingBuffer();
        for (let i = 1; i <= 2017; i++) {
            buffer.advance(jump);
            buffer.insert(i);
        }
        buffer.advance(1);
        return buffer.content[buffer.position];
    }

    function solve2(jump: number) {
        let buffer = new FakeRingBuffer();
        for (let i = 1; i <= 50000000; i++) {
            buffer.advance(jump);
            buffer.insert(i);
        }
        return buffer.nextAfterZero;
    }

    let test1 = solve1(SAMPLE_PROBLEM);
    let pass1 = test1 === SAMPLE_ANSWER_1;
    console.log(`Part 1 Test -  ${pass1 ? 'pass' : 'fail'}: expected:${SAMPLE_ANSWER_1} actual:${test1}`);
    if (pass1) {
        console.log(`Part 1 Answer: ${solve1(BIG_PROBLEM)}`);
        console.log(`Part 2 Answer: ${solve2(BIG_PROBLEM)}`);
    }
}