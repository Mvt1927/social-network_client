import { Suspense } from 'react';
import Loading from './loading';
import HomePage from './HomePage';

export default function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <HomePage />
    </Suspense>
  )
}
