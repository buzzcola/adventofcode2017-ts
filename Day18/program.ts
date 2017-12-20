namespace Day18 {

    export class Program {

        constructor(id: number, input: string) {
            this.instructions = input.split('\n').map(d => ({
                "name": d.substring(0, 3),
                "args": d.substring(4).split(' ')
            }));

            this.registers['p'] = id;
            this.id = id;
        }

        instructions: { name: string, args: string[] }[] = [];
        registers: { [name: string]: number } = {};
        queue: number[] = [];
        position = 0;
        id: number;
        sent = 0;
        friend: Program;

        commands: { [name: string]: Function } = {
            "set": (a: string, b: string) => { this.registers[a] = this.parse(b); this.position++; },
            "mul": (a: string, b: string) => { this.registers[a] *= this.parse(b); this.position++; },
            "add": (a: string, b: string) => { this.registers[a] += this.parse(b); this.position++; },
            "mod": (a: string, b: string) => { this.registers[a] = this.registers[a] % this.parse(b); this.position++; },
            "jgz": (a: string, b: string) => { this.position += this.parse(a) > 0 ? this.parse(b) : 1; },
            "snd": (a: string) => { this.friend.queue.push(this.parse(a)); this.position++; this.sent++; },
            "rcv": (a: string) => { if (this.queue.length > 0) { this.registers[a] = this.queue.shift(); this.position++; } }
        }

        execute() {
            let instruction = this.instructions[this.position];
            return this.commands[instruction.name](...instruction.args);
        }

        parse(arg:string) {
            return isNaN(Number(arg)) ? this.registers[arg] : parseInt(arg);
        }

        get finished() {
            return this.position < 0 || this.position >= this.instructions.length;
        }

        get waiting() {
            return (this.instructions[this.position].name == 'rcv' && this.queue.length == 0);
        }
    }

}