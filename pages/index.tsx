import React from 'react'
import Home from '../components/Home';

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/config`)
    const config = await res.json();
    return { props: { config } }
  } catch (error) {
    console.log("error", error);
  }
}

const HomeIndex = (props: { config: { menu: { lobby: { items: CategoryItem[] } } } }) => {
  const { config } = props
  return (
    <React.Suspense fallback="Loading....">
      <Home config={config} />
    </React.Suspense>
  )
}

export default HomeIndex