import { ReactElement, useEffect } from 'react'
import Layout from 'layouts/MainLayout'
import useDeckStore from 'stores/decks'

export default function Page() {
  const decks = useDeckStore(state => state.decks)
  const fetchDecks = useDeckStore(state => state.fetch)

  useEffect(() => {
    fetchDecks().catch((err) => console.log(err))
  })
  return (
  <div className="text-red-400">hi</div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
