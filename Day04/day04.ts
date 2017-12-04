/// <reference path="input.ts" />

namespace Day04 {

    console.log('Day 4 - Part 01\n');

    var validCount = BIG_PROBLEM
        .split('\n')
        .map(line => line.split(' '))
        .map(array => { return { "distinct": new Set<string>(array).size, "total": array.length } })
        .filter(pair => pair.distinct === pair.total)
        .length;

    console.log(`Valid passphrases: ${validCount}`);

    console.log('\nPart 02\n');

    var validCount2 = BIG_PROBLEM
        .split('\n')
        .map(line => line.split(' '))
        .map(array => array.map(word => word.split('').sort().join('')))
        .map(array => { return { "distinct": new Set<string>(array).size, "total": array.length } })
        .filter(pair => pair.distinct === pair.total)
        .length;

    console.log(`Valid passphrases (no anagrams allowed): ${validCount2}`);
}