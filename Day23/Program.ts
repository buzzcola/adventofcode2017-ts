namespace Day23 {

    export class Program {

        constructor(input: string, initialA: number = 0) {
            this.instructions = input.split('\n').map(d => ({
                "name": d.substring(0, 3),
                "args": d.substring(4).split(' ')
            }));

            'abcdefgh'.split('').forEach(c => this.registers[c] = 0);
            this.registers['a'] = initialA;
        }

        instructions: { name: string, args: string[] }[] = [];
        registers: { [name: string]: number } = {};
        position = 0;

        commands: { [name: string]: Function } = {
            "set": (a: string, b: string) => { this.registers[a] = this.parse(b); this.position++; },
            "sub": (a: string, b: string) => { this.registers[a] -= this.parse(b); this.position++; },
            "mul": (a: string, b: string) => { this.registers[a] *= this.parse(b); this.position++; },
            "jnz": (a: string, b: string) => { this.position += this.parse(a) != 0 ? this.parse(b) : 1; },
        }

        execute() {
            let instruction = this.instructions[this.position];
            this.commands[instruction.name](...instruction.args);
            return instruction.name;
        }

        get next() {
            let i = this.instructions[this.position];
            if(i) {
                return i.name + ' ' + i.args;
            } else {
                return '<none>';
            }
        }

        parse(arg: string) {
            return isNaN(Number(arg)) ? this.registers[arg] : parseInt(arg);
        }

        get finished() {
            return this.position < 0 || this.position >= this.instructions.length;
        }
    }
}