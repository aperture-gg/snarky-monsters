import Game from '../model/model'
import { helloWorld } from './apiClient';

export const ACTION_TYPES = {}

// We want to attach the available moves to the monster, which doesn't get attached natively in the model
function hydrateMonster(id) {
  const monsterState = { ...Game.Monsters[id - 1] }
  monsterState.moves = Game.Moves.filter((move) => {
    // Add the monster's unique moves plus universal moves (re-train and heal)
    return (
      move.category === monsterState.category ||
      move.id === 0 ||
      (move.category === 0 && move.id != 6)
    )
  })
  return monsterState
}
export const playerSelectMonster = (dispatch, getState) => (monsterId) => {
  const animationQueue = getState().animationQueue
  animationQueue.push({
    type: 'visual',
    animation: 'animatePlayerEntry',
  })
  animationQueue.push({
    type: 'dialogue',
    content:
      "You were minding your own business and catching up on Vitalik's blog, when suddenly...",
  })

  dispatch({
    payload: {
      playerState: hydrateMonster(monsterId),
      animationQueue: animationQueue,
    },
  })
}

export const fetchNPC = (dispatch, getState) => () => {
  setTimeout(() => {
    // TODO: tell the server the current state.
    // TODO: handle server response with sessionId and new state.
    // Mock it for now.
    var npcState = {
      ...Game.Monsters.filter(
        (monster) => monster.id != getState().playerState.id,
      )[Math.floor(Math.random() * (Game.Monsters.length - 1))],
    }
    npcState = hydrateMonster(npcState.id)
    const animationQueue = getState().animationQueue

    animationQueue.push({
      type: 'dialogue',
      content: `A wild ${npcState.categoryName} appeared!`,
    })
    animationQueue.push({
      type: 'visual',
      animation: 'animateNPCEntry',
    })
    animationQueue.push({
      type: 'dialogue',
      content: 'What will you do?',
    })
    animationQueue.push({
      type: 'showMoveBox',
    })
    dispatch({
      payload: {
        npcState: npcState,
        sessionID: '07554609-60f4-4edb-a6de-c7fab54f5b2b',
        animationQueue: animationQueue,
      },
    })
  }, 1500)
}

export const selectMove = (dispatch, getState) => (
  move,
  attemptedSwapTarget,
) => {
  // TODO: generate randomness
  // TODO: make a commitment to randomness
  // TODO: send player move & a commitment to randomness to the server
  setTimeout(() => {
    console.log('generating randomness, sending m + r to server...')
  }, 1000)
  // TODO: handle server's response that includes new randomness
  setTimeout(() => {
    console.log('receiving randomness from server')
  }, 1000)
  // TODO: send key to server
  // TODO: calculate final randomness and add to state
  // TODO: handle server's response that includes new playerState or npcState and report, and also includes new npcMove and new commitment to randomness
  // Mock it for now:
  setTimeout(() => {
    var playerState = getState().playerState
    if (attemptedSwapTarget) {
      const target = hydrateMonster(attemptedSwapTarget.id)
      playerState = target
    }
    var npcState = getState().npcState
    npcState.hp = npcState.hp - 5
    function randomBoolean() {
      return Math.random() < 0.2
    }
    var didMiss = randomBoolean()
    var didCrit = randomBoolean() && !didMiss
    var goodGame = npcState.hp <= 0
    var npcMove = npcState.moves[0]
    const mockServerResponse1 = {
      newState: {
        playerState: playerState,
        npcState: npcState,
        report: {
          lastMove: move,
          didMiss: didMiss,
          didCrit: didCrit,
          attkEff: [0, 2, 3][Math.floor(Math.random() * 3)],
          defEff: 1,
        },
      },
      npcMove: npcMove,
      commitment: '',
      goodGame: true,
    }

    var report = mockServerResponse1.newState.report

    var animationQueue = getState().animationQueue

    if (report.lastMove.name === 'Heal') {
      animationQueue.push({
        type: 'dialogue',
        content: `You used ${report.lastMove.name}!`,
      })
      if (report.didMiss) {
        animationQueue.push({
          type: 'dialogue',
          content: "But it didn't work this time. Bad luck.",
        })
      } else {
        animationQueue.push({
          type: 'visual',
          animation: 'animatePlayerHeal',
        })
        animationQueue.push({
          type: 'visual',
          animation: 'animatePlayerHP',
        })
        if (report.didCrit) {
          animationQueue.push({
            type: 'dialogue',
            content: `Critical heal! You received extra HP.`,
          })
        }
      }
    } else if (report.lastMove.name === 'Re-train') {
      animationQueue.push({
        type: 'dialogue',
        content: `You took the plunge and decided to re-train and achieve your dream of becoming a...`,
      })
      animationQueue.push({
        type: 'dialogue',
        content: `...${attemptedSwapTarget.categoryName}!`,
      })
      animationQueue.push({
        type: 'visual',
        animation: 'animatePlayerPulse',
      })
      if (report.didMiss) {
        animationQueue.push({
          type: 'dialogue',
          content:
            'But it was too hard and you got distracted. Better luck next time! #PersistencePays.',
        })
      } else {
        animationQueue.push({
          type: 'visual',
          animation: 'animatePlayerExit',
        })
        dispatch({
          payload: {
            playerState: mockServerResponse1.newState.playerState,
          },
        })
        animationQueue.push({
          type: 'visual',
          animation: 'animatePlayerEntry',
        })
        animationQueue.push({
          type: 'dialogue',
          content: `You successfully re-trained and re-branded as a ${playerState.categoryName}. Have you updated your Twitter yet?`,
        })
      }
    } else {
      animationQueue.push({
        type: 'dialogue',
        content: `You used ${report.lastMove.name}!`,
      })
      animationQueue.push({
        type: 'visual',
        animation: 'animatePlayerAttack',
      })
      if (report.didMiss) {
        animationQueue.push({
          type: 'dialogue',
          content: 'But it missed. Bad luck.',
        })
      } else {
        animationQueue.push({
          type: 'visual',
          animation: 'animateNPCFlash',
        })
        animationQueue.push({
          type: 'visual',
          animation: 'animateNPCHP',
        })
        if (report.didCrit) {
          animationQueue.push({
            type: 'dialogue',
            content: `It's a critical hit!`,
          })
        }
        switch (report.attkEff) {
          case 0:
            animationQueue.push({
              type: 'dialogue',
              content: `But ${playerState.categoryName}'s moves are not very effective against ${npcState.categoryName}.`,
            })
            animationQueue.push({
              type: 'dialogue',
              content: `Maybe you should retrain to another profession...`,
            })
            break
          case 2:
            animationQueue.push({
              type: 'dialogue',
              content: `${playerState.categoryName}'s moves are quite effective against ${npcState.categoryName}.`,
            })
            break
          case 3:
            animationQueue.push({
              type: 'dialogue',
              content: `${playerState.categoryName}'s moves are super effective against ${npcState.categoryName}!`,
            })
            break
        }
      }
    }

    // TODO: Update internal Game Hash with new state, including hashing state, randomness, move, attackEff, defEff.
    // TODO: Dispatch for internal state update to propagate to components
    dispatch({
      payload: {
        playerState: mockServerResponse1.newState.playerState,
        npcState: mockServerResponse1.newState.npcState,
        report: mockServerResponse1.newState.report,
        reportCounter: getState().reportCounter + 1,
        animationQueue: animationQueue,
      },
    })
    // TODO: implement logic to handle if server says game is over
    if (mockServerResponse1.goodGame) {
      animationQueue.push({
        type: 'gameOver',
        outcome: playerState.hp > 0 ? 'Victory' : 'Defeat',
      })
      dispatch({
        payload: {
          animationQueue: animationQueue,
          gameOver: true,
        },
      })
    }
    // TODO: Generate more randomness to send to server
    // TODO: Handle server's response with key and new state
    setTimeout(() => {
      console.log('receiving NPC move and updating state')
      playerState.hp = playerState.hp - 5
      didMiss = randomBoolean()
      didCrit = randomBoolean() && !didMiss
      goodGame = playerState.hp <= 0
      const mockServerResponse2 = {
        newState: {
          playerState: playerState,
          npcState: npcState,
          report: {
            lastMove: npcMove,
            didMiss: didMiss,
            didCrit: didCrit,
            attkEff: [0, 2, 3][Math.floor(Math.random() * 3)],
            defEff: 1,
          },
        },
        key: '',
        goodGame: true,
      }

      report = mockServerResponse2.newState.report
      if (report.lastMove.name === 'Heal') {
        animationQueue.push({
          type: 'dialogue',
          content: `${npcState.categoryName} used ${report.lastMove.name}!`,
        })
        if (report.didMiss) {
          animationQueue.push({
            type: 'dialogue',
            content: "But it didn't work!",
          })
        } else {
          animationQueue.push({
            type: 'visual',
            animation: 'animateNPCHeal',
          })
          animationQueue.push({
            type: 'visual',
            animation: 'animateNPCHP',
          })
          if (report.didCrit) {
            animationQueue.push({
              type: 'dialogue',
              content: `Critical heal! ${npcState.categoryName} received extra HP.`,
            })
          }
        }
      } else if (report.lastMove.name === 'Re-train') {
        animationQueue.push({
          type: 'dialogue',
          content: `${npcState.categoryName} took the plunge and decided to re-train.`,
        })
        animationQueue.push({
          type: 'visual',
          animation: 'animateNPCPulse',
        })
        if (report.didMiss) {
          animationQueue.push({
            type: 'dialogue',
            content: `But it was too hard and they got distracted. It's a tough world out there...`,
          })
        } else {
          animationQueue.push({
            type: 'visual',
            animation: 'animateNPCExit',
          })
          dispatch({
            payload: {
              npcState: mockServerResponse2.newState.npcState,
            },
          })
          animationQueue.push({
            type: 'visual',
            animation: 'animateNPCEntry',
          })
          animationQueue.push({
            type: 'dialogue',
            content: `They successfully re-trained and re-branded as a ${npcState.categoryName}. Maybe they'll blog about it.`,
          })
        }
      } else {
        animationQueue.push({
          type: 'dialogue',
          content: `${npcState.categoryName} used ${report.lastMove.name}!`,
        })
        animationQueue.push({
          type: 'visual',
          animation: 'animateNPCAttack',
        })
        if (report.didMiss) {
          animationQueue.push({
            type: 'dialogue',
            content: 'But they missed. You lucky thing.',
          })
        } else {
          animationQueue.push({
            type: 'visual',
            animation: 'animatePlayerFlash',
          })
          animationQueue.push({
            type: 'visual',
            animation: 'animatePlayerHP',
          })
          if (report.didCrit) {
            animationQueue.push({
              type: 'dialogue',
              content: `Ouch! It's a critical hit!`,
            })
          }
          switch (report.attkEff) {
            case 0:
              animationQueue.push({
                type: 'dialogue',
                content: `But ${npcState.categoryName}'s moves are not very effective against ${playerState.categoryName}.`,
              })
              break
            case 2:
              animationQueue.push({
                type: 'dialogue',
                content: `${npcState.categoryName}'s moves are quite effective against ${playerState.categoryName}.`,
              })
              break
            case 3:
              animationQueue.push({
                type: 'dialogue',
                content: `${npcState.categoryName}'s moves are super effective against ${playerState.categoryName}. Maybe you should retrain to another profession...`,
              })
              break
          }
        }
      }
      animationQueue.push({
        type: 'dialogue',
        content: 'What will you do?',
      })
      animationQueue.push({
        type: 'showMoveBox',
      })
      // TODO: Decrypt randomness
      // TODO: Update internal Game Hash with new state, including hashing state, randomness, move, attackEff, defEff.
      dispatch({
        payload: {
          playerState: mockServerResponse2.newState.playerState,
          npcState: mockServerResponse2.newState.npcState,
          report: mockServerResponse2.newState.report,
          reportCounter: getState().reportCounter + 1,
        },
      })
      // TODO: implement logic to handle if server says game is over
      if (mockServerResponse2.goodGame) {
        animationQueue.push({
          type: 'gameOver',
          outcome: playerState.hp > 0 ? 'Victory' : 'Defeat',
        })
        dispatch({
          payload: {
            animationQueue: animationQueue,
            gameOver: true,
          },
        })
      }
    }, 2000)
  }, 3000)
}

export const shiftAnimationQueue = (dispatch, getState) => () => {
  const animationQueue = getState().animationQueue
  animationQueue.shift()
  dispatch({
    payload: {
      animationQueue: animationQueue,
    },
  })
}
