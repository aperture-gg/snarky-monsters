import styled from 'styled-components'
import { useState, useEffect } from 'react'
import BattleScreen from '@/components/BattleScreen.js'
import MoveBox from '@/components/MoveBox'
import LoadingMoves from './LoadingMoves'

const Container = styled.div`
  height: 100%;
`

export default function Battle({
  playerState,
  npcState,
  Game,
  selectMove,
  report,
  reportCounter,
  animationQueue,
  shiftAnimationQueue,
}) {
  const [showMoveBox, setShowMoveBox] = useState(false)
  const [showGameOver, setShowGameOver] = useState(false)

  const [savedReportCounter, setSavedReportCounter] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (animationQueue[0]) {
      setLoading(false)
      setShowMoveBox(animationQueue[0].type === 'showMoveBox')
      setShowGameOver(animationQueue[0].type === 'gameOver')
    } else {
      setLoading(true)
      setShowMoveBox(false)
    }
  })
  return (
    <Container>
      <BattleScreen
        playerState={playerState}
        npcState={npcState}
        setShowMoveBox={setShowMoveBox}
        nextAnimation={animationQueue[0]}
        shiftAnimationQueue={shiftAnimationQueue}
      />
      {loading && <LoadingMoves />}
      {showMoveBox && (
        <MoveBox
          Game={Game}
          selectMove={selectMove}
          playerState={playerState}
          setShowMoveBox={setShowMoveBox}
          shiftAnimationQueue={shiftAnimationQueue}
        />
      )}
    </Container>
  )
}
