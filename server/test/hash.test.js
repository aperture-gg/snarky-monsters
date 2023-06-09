const fs = require('node:fs/promises');
const path = require('node:path');

const CryptoJS = require('crypto-js');

const hash = require('../src/hash.js');
const Engine = require('../src/engine.js');
const Model = require('../src/model.js');


const feedEngineData = async (dataName) => {
    return fs.readFile(path.join(__dirname, 'data', dataName)).then((content) => {
        const input = JSON.parse(content);
        return Engine.rehydrateCompletedGame(input)
    });

}

test('hashes array, acc test', () => {
    return expect(hash.mimcHashArray(testArraySmol)).resolves.toBe("2727128833082136532729970726000305889483000326748968077653713722825225095805");    
});

test('hashes array, perf test', () => {
    return expect(hash.mimcHashArray(testArrayBig)).resolves.toBe("17446969593660877771359094965958784803427043937083498145407095230194754007071");
});

test('encrypts and decrypts randomness', () => {
    const { key, ciphertext } = hash.createEncryptedSecret('not actually random');
    const result = hash.decryptSecret(key, ciphertext, { enc: CryptoJS.enc.Utf8 });
    expect(ciphertext).not.toEqual(result);
    expect(result).toEqual('not actually random');
});

test('combines randomness determinstically', () => {
    const randomness = hash.generateRandomness();
    const e = hash.createEncryptedSecret(randomness);
    const decrypted = hash.decryptSecret(e.key, e.ciphertext);

    const randomness2 = hash.generateRandomness();
    const e2 = hash.createEncryptedSecret(randomness2);
    const decrypted2 = hash.decryptSecret(e2.key, e2.ciphertext);

    const oneway = hash.calculateCombinedRandomness(decrypted, randomness2);
    const otherway = hash.calculateCombinedRandomness(randomness, decrypted2);

    return expect(oneway).toEqual(otherway);
});

test('test the randomness is combined properly', () => {
    const d = "23f3e884a09dbffb79b357a630ee3efc"
    const randomness = "6faa995dd1e47cd138b5e540d4cc7e42"

    const r = hash.calculateCombinedRandomness(d, randomness);

    expect(r >= 0).toEqual(true)
})

test('the combined randomness is decently distributed', () => {
    let average = 0;
    for (var i = 0; i < 10000; i++) {
        average += hash.calculateCombinedRandomness(hash.generateRandomness(), hash.generateRandomness())
    }
    average = average/10000;
    expect(Math.round(average)).toEqual(50)
})

//** this test was mostly for debugging */
// test('test game hash', () => {
//     return expect(feedEngineData('bad_input_2.json').then((engine) => hash.hashGameState(engine))).resolves.toBe("15080711618435363877749354773142612365775164170498976319737660533904581088277");    
// });

const testArraySmol = [
    33, 64, 42, 17, 2, 80, 26, 74, 29, 65, 40, 21, 87, 53, 90, 45, 54, 81, 82, 51, 12, 18, 30, 55, 11, 78, 13, 96, 41, 76, 8, 84, 79, 28, 91, 94, 77, 52, 19, 57,
    13, 33, 36, 20, 71, 98, 48, 51, 92, 91, 84, 1, 18, 68, 40, 23, 63, 87, 95, 83, 12, 37, 43, 75, 85, 27, 35, 49, 56, 28, 99, 81, 16, 86, 7, 32, 96, 72, 64, 25
];
const testArrayBig = [
    33, 64, 42, 17, 2, 80, 26, 74, 29, 65, 40, 21, 87, 53, 90, 45, 54, 81, 82, 51, 12, 18, 30, 55, 11, 78, 13, 96, 41, 76, 8, 84, 79, 28, 91, 94, 77, 52, 19, 57,
    13, 33, 36, 20, 71, 98, 48, 51, 92, 91, 84, 1, 18, 68, 40, 23, 63, 87, 95, 83, 12, 37, 43, 75, 85, 27, 35, 49, 56, 28, 99, 81, 16, 86, 7, 32, 96, 72, 64, 25,
    23, 13, 95, 33, 89, 75, 62, 100, 97, 14, 45, 49, 10, 46, 64, 57, 31, 67, 43, 15, 34, 56, 94, 81, 83, 29, 93, 86, 1, 99, 53, 4, 5, 32, 21, 80, 6, 72, 51, 48,
    19, 42, 61, 96, 70, 21, 94, 38, 64, 26, 86, 45, 52, 92, 20, 44, 48, 13, 50, 7, 17, 60, 57, 36, 74, 37, 62, 35, 33, 23, 53, 41, 72, 6, 27, 83, 34, 98, 16, 87,
    1, 98, 24, 29, 22, 44, 75, 81, 45, 20, 37, 67, 89, 28, 60, 56, 48, 58, 64, 42, 73, 65, 91, 49, 3, 30, 61, 54, 7, 21, 2, 18, 15, 38, 46, 88, 57, 70, 17, 26,
    80, 33, 76, 89, 69, 75, 6, 27, 37, 95, 72, 21, 71, 17, 57, 65, 99, 92, 22, 66, 35, 23, 81, 90, 78, 3, 52, 77, 60, 44, 73, 28, 54, 68, 45, 64, 34, 58, 62, 42,
    100, 25, 60, 5, 37, 28, 66, 61, 18, 95, 65, 83, 13, 44, 99, 46, 85, 32, 16, 54, 53, 87, 19, 35, 20, 73, 49, 11, 98, 29, 67, 88, 10, 76, 58, 63, 71, 59, 97, 52,
    14, 73, 47, 88, 50, 48, 68, 75, 39, 20, 80, 94, 12, 100, 61, 9, 64, 96, 40, 37, 32, 92, 43, 22, 10, 13, 6, 58, 24, 87, 8, 53, 62, 63, 23, 46, 83, 76, 28, 15,
    51, 31, 27, 79, 23, 32, 94, 18, 70, 91, 75, 37, 34, 39, 69, 44, 52, 71, 28, 4, 99, 10, 82, 19, 55, 47, 5, 81, 77, 35, 84, 73, 29, 42, 60, 50, 17, 96, 92, 57,
    32, 34, 5, 35, 19, 86, 25, 38, 13, 94, 73, 63, 45, 66, 15, 72, 78, 64, 95, 81, 98, 77, 84, 22, 28, 9, 61, 8, 99, 83, 18, 43, 56, 65, 90, 80, 49, 42, 69, 74,
    32, 34, 5, 35, 19, 86, 25, 38, 13, 94, 73, 63, 45, 66, 15, 72, 78, 64, 95, 81, 98, 77, 84, 22, 28, 9, 61, 8, 99, 83, 18, 43, 56, 65, 90, 80, 49, 42, 69, 74,
    32, 34, 5, 35, 19, 86, 25, 38, 13, 94, 73, 63, 45, 66, 15, 72, 78, 64, 95, 81, 98, 77, 84, 22, 28, 9, 61, 8, 99, 83, 18, 43, 56, 65, 90, 80, 49, 42, 69, 74
];

