const { buildMimc7 } = require('circomlibjs');
const CryptoJS = require("crypto-js");

/**
 * For (i = 0; i < NMoves; i++) {
    Hash(State_i), Hash(Randomness_i), Hash(Move_i), Hash(AttackEff_i), Hash(DefEff_i)
}

Hash(State_N+1) //hash the final state object

 */
// Convert a hex string to a byte array
function hexToBytes(hex) {
    let bytes = [];
    for (let c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

/**
 * 
 * @param {*} list 
 * @returns 
 */
function intsToHex(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        result.push(list[i].toString(16));
    }
    return(result.join(""));
}

/**
 * 
 * @param {*} randomness 
 */
const createEncryptedSecret = (seed) => {
    const key = CryptoJS.lib.WordArray.random(16).toString();
    const randomness = seed ? seed : generateRandomness();
    return {
        ciphertext: CryptoJS.AES.encrypt(randomness, key),
        key,
    }
}

const generateRandomness = () => CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)

/**
 * 
 * @param {*} key 
 */
const decryptSecret = (key, encrypted, opts = { enc: CryptoJS.enc.Utf8 }) => {
    return CryptoJS.AES.decrypt(encrypted, key).toString(opts.enc);
}

const calculateCombinedRandomness = (randomness1, randomness2) => {
    return CryptoJS.SHA256(randomness1 + randomness2).words[0] % 101;
}

/**
 * Creates mimc hash of an array and represents it in a way
 * to agree with the circom hash code
 * @param {*} arr 
 * @returns 
 */
const mimcHashArray = async (arr) => {
    const mimc7 = await buildMimc7();
    const hash = mimc7.multiHash(arr, 0);
    return BigInt(mimc7.F.toObject(hash)).toString();
}



/**
 * Convenience function for hashing from the engine of the game
 * Outputs the MiMC Multihash of the game state necessary for the circuit input
 * @param {*} engine The engine should hold a completed game state. 
 */
const hashGameState = (engine) => {
    let gameArray = [];
    for (var i = 0; i < engine.moveLimit; i++) {
        const ithState = engine.previousState[i]; 
        const ithMove = engine.previousMoves[i];

        const encoding = [
            ithState.player.id, 
            ithState.player.hp, 
            ithState.player.stats.attack,
            ithState.player.stats.defense,  
            ithState.player.category,
            ithState.npc.id, 
            ithState.npc.hp, 
            ithState.npc.stats.attack,
            ithState.npc.stats.defense,
            ithState.npc.category,
            engine.prevRandomness[i],
            ithMove.id,
            ithMove.attack,
            ithMove.crit,
            ithMove.miss,
            ithMove.category,
            ithMove.type,
            engine.prevAtkEff[i],
            engine.prevDefEff[i]
        ].reduce((prev, current) => {
            return prev + current.toString();
        });

        gameArray.push(BigInt(encoding))
    }

    const encoding = [
        engine.player.id, 
        engine.player.hp, 
        engine.player.stats.attack,
        engine.player.stats.defense,
        engine.player.category,
        engine.npc.id, 
        engine.npc.hp, 
        engine.npc.stats.attack,
        engine.npc.stats.defense,
        engine.npc.category,
    ].reduce((prev, current) => {
        return prev + current.toString();
    });

    gameArray.push(BigInt(encoding));

    return mimcHashArray(gameArray);
}


module.exports = { 
    hashGameState,
    mimcHashArray,
    createEncryptedSecret,
    decryptSecret,
    calculateCombinedRandomness,
    generateRandomness
};

// const engine = new Engine(2,3,25);

// for (var i =0; i < engine.moveLimit; i++) {
//     engine.turn(Model.Moves[Model.Moves.length - 1], 0);
// }

// hashGameState(engine).then((result) => console.log(result))