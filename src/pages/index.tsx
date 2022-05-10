import { ReactElement, useEffect, useState } from 'react'
import Layout from 'layouts/MainLayout'
import useDeckStore from 'stores/decks'
import useGameStore from 'stores/GameStore'
import PageIntro from 'components/PageIntro'
import DeckOverview from 'components/DeckOverview'

export default function Page() {
  const currentDeck  =useDeckStore((state) => state.currentDeck)
  const play = useGameStore((state) => state.play)

  if (!currentDeck) {
    return <PageIntro />
  } else if (!play) {
    return <DeckOverview />
  }
  
  return (
  <div className="text-red-400">{currentDeck?._id}</div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
