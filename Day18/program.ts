namespace Day18 {

    export class Program {
        constructor(public id: number, input: string) {
            this.instructions = input.split('\n');
            this.registers['p'] = id;
        }

        friend: Program;
        instructions: string[];
        queue: number[] = [];
        position = 0;
        sentCount = 0;
        waiting = false;
        registers: { [name: string]: number } = {};
        get finished() { return (this.position < 0) || (this.position >= this.instructions.length); }

        execute() {
            if (this.finished) return;

            let [command, r, arg2] = /^(\w{3}) (\w)(?: (-?\w*))?$/.exec(this.instructions[this.position]).slice(1);
            if (!this.registers.hasOwnProperty(r)) this.registers[r] = 0;
            let value: number;
            if (arg2) {
                value = isNaN(Number(arg2)) ? this.registers[arg2] : +arg2;
            }

            this.waiting = false;
            switch (command) {
                case 'set': { this.registers[r] = value; } break;
                case 'add': { this.registers[r] += value; } break;
                case 'mul': { this.registers[r] *= value; } break;
                case 'mod': { this.registers[r] = this.registers[r] % value; } break;
                case 'jgz': { if (this.registers[r]) this.position += (value - 1); } break;
                case 'snd': {
                    value = isNaN(Number(r)) ? this.registers[r] : +r;
                    this.friend.queue.unshift(value);
                    this.sentCount++;
                } break;
                case 'rcv': {
                    if (this.queue.length) {
                        this.registers[r] = this.queue.pop();
                    } else {
                        this.waiting = true;
                    }
                } break;
            }
            if (!this.waiting) {
                this.position++;
            }
        }

    }

}