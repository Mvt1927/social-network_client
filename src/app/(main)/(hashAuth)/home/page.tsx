import Loading from '@/app/loading';
import { Suspense } from 'react';
import HasAuth from './HasAuth';

export default function Home() {

  return (
    <Suspense fallback={<Loading />}>
      <HasAuth />
    </Suspense>
  )
}
