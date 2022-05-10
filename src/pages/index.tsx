import type { ReactElement } from 'react'
import Layout from 'layouts/PlayGame'

export default function Page() {
  return (
  <div className="text-red-400">hiiii</div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
