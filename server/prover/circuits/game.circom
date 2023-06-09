pragma circom 2.1.4;

include "chkhash.circom";
include "turn.circom";
include "rounds.circom";

template Game() {
    //hash of all the moves, randomness, and monster choices (the ids are hashed)
    //game hash is hashed as follows H(mon1,mon2,m1,m2,swap1,r1,r2,...mn-1,mn,swapn,rn-1,rn)
    signal input gameHash;
    // the game encoding to be hashed (this is redundant, but adding on for timesake) because mimc hash doesn't match when array is too large
    signal input encodings[26];
    //this is the game state in order of player -> npc -> player -> and so forth
    signal input state[26][10];
    //the moves for each turn, makes a transition to the next state
    signal input moves[25][6];
    //the shared randomness (we assume the randomness has already been clipped)
    signal input randomness[25];
    //the attack and defense effectiveness of each move
    //this is kind of a stupid hack
    //but I'm sure there's a more clever way to incorporate
    //the model more succinctly into the game rules
    signal input atkeff[25];
    signal input defeff[25];
    
    //included to prevent man-in-middle-attacks?
    signal input sessionID;

    // signal output out;

    assert(sessionID != 0);

    component checkHash = CheckHash(26);
    checkHash.encodings <== encodings;    

    gameHash === checkHash.hash;

    component checkRounds = Rounds();
    checkRounds.state <== state;
    checkRounds.moves <== moves;
    checkRounds.randomness <== randomness;
    checkRounds.atkeff <== atkeff;
    checkRounds.defeff <== defeff;

    //we output the health of the NPC as proof of win or loss
    assert(checkRounds.out == 0);
}

component main { public [ gameHash, sessionID ] } = Game();

/* 
INPUT = {
  "gameHash": "9227155091019233402791640549839228229649429137422055527093928135043846612941",
  "encodings": [
    "31001053410010549671098103212",
    "3100105349510542900100501011",
    "310010534951054471098103212",
    "31001053495105453102098604221",
    "3100105349510549471098103212",
    "3100105349010542591098104221",
    "385105349010548071098103212",
    "3851053485105448102098604221",
    "38510534851054871098103212",
    "385105348510546791098104221",
    "370105348510548471098103212",
    "3701053480105441102098604221",
    "370105348010548571098103212",
    "370105347510546091098104221",
    "355105347510546171098103212",
    "355105347010548991098104221",
    "340105347010541971098103212",
    "340105346510541791098104221",
    "325105346510548471098103212",
    "325105346010548791098104221",
    "310105346010544882098603212",
    "310105346010542191098104221",
    "3010534601054060000611",
    "3010534601054060000611",
    "3010534601054060000611",
    "3010534601054"
  ],
  "sessionID": "0241008287272164729465721528295504357972",
  "state": [
    [
      3,
      100,
      10,
      5,
      3,
      4,
      100,
      10,
      5,
      4
    ],
    [
      3,
      100,
      10,
      5,
      3,
      4,
      95,
      10,
      5,
      4
    ],
    [
      3,
      100,
      10,
      5,
      3,
      4,
      95,
      10,
      5,
      4
    ],
    [
      3,
      100,
      10,
      5,
      3,
      4,
      95,
      10,
      5,
      4
    ],
    [
      3,
      100,
      10,
      5,
      3,
      4,
      95,
      10,
      5,
      4
    ],
    [
      3,
      100,
      10,
      5,
      3,
      4,
      90,
      10,
      5,
      4
    ],
    [
      3,
      85,
      10,
      5,
      3,
      4,
      90,
      10,
      5,
      4
    ],
    [
      3,
      85,
      10,
      5,
      3,
      4,
      85,
      10,
      5,
      4
    ],
    [
      3,
      85,
      10,
      5,
      3,
      4,
      85,
      10,
      5,
      4
    ],
    [
      3,
      85,
      10,
      5,
      3,
      4,
      85,
      10,
      5,
      4
    ],
    [
      3,
      70,
      10,
      5,
      3,
      4,
      85,
      10,
      5,
      4
    ],
    [
      3,
      70,
      10,
      5,
      3,
      4,
      80,
      10,
      5,
      4
    ],
    [
      3,
      70,
      10,
      5,
      3,
      4,
      80,
      10,
      5,
      4
    ],
    [
      3,
      70,
      10,
      5,
      3,
      4,
      75,
      10,
      5,
      4
    ],
    [
      3,
      55,
      10,
      5,
      3,
      4,
      75,
      10,
      5,
      4
    ],
    [
      3,
      55,
      10,
      5,
      3,
      4,
      70,
      10,
      5,
      4
    ],
    [
      3,
      40,
      10,
      5,
      3,
      4,
      70,
      10,
      5,
      4
    ],
    [
      3,
      40,
      10,
      5,
      3,
      4,
      65,
      10,
      5,
      4
    ],
    [
      3,
      25,
      10,
      5,
      3,
      4,
      65,
      10,
      5,
      4
    ],
    [
      3,
      25,
      10,
      5,
      3,
      4,
      60,
      10,
      5,
      4
    ],
    [
      3,
      10,
      10,
      5,
      3,
      4,
      60,
      10,
      5,
      4
    ],
    [
      3,
      10,
      10,
      5,
      3,
      4,
      60,
      10,
      5,
      4
    ],
    [
      3,
      0,
      10,
      5,
      3,
      4,
      60,
      10,
      5,
      4
    ],
    [
      3,
      0,
      10,
      5,
      3,
      4,
      60,
      10,
      5,
      4
    ],
    [
      3,
      0,
      10,
      5,
      3,
      4,
      60,
      10,
      5,
      4
    ],
    [
      3,
      0,
      10,
      5,
      3,
      4,
      60,
      10,
      5,
      4
    ]
  ],
  "randomness": [
    96,
    29,
    4,
    53,
    94,
    25,
    80,
    48,
    8,
    67,
    84,
    41,
    85,
    60,
    61,
    89,
    19,
    17,
    84,
    87,
    48,
    21,
    0,
    0,
    0
  ],
  "moves": [
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      0,
      0,
      100,
      50,
      1,
      0
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      10,
      20,
      98,
      60,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      9,
      10,
      98,
      10,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      10,
      20,
      98,
      60,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      9,
      10,
      98,
      10,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      10,
      20,
      98,
      60,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      9,
      10,
      98,
      10,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      9,
      10,
      98,
      10,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      9,
      10,
      98,
      10,
      4,
      2
    ],
    [
      7,
      10,
      98,
      10,
      3,
      2
    ],
    [
      9,
      10,
      98,
      10,
      4,
      2
    ],
    [
      8,
      20,
      98,
      60,
      3,
      2
    ],
    [
      9,
      10,
      98,
      10,
      4,
      2
    ],
    [
      6,
      0,
      0,
      0,
      0,
      6
    ],
    [
      6,
      0,
      0,
      0,
      0,
      6
    ],
    [
      6,
      0,
      0,
      0,
      0,
      6
    ]
  ],
  "atkeff": [
    1,
    1,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    1,
    1
  ],
  "defeff": [
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    2,
    1,
    1,
    1,
    1
  ]
} */