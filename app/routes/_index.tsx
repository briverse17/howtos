import type { MetaFunction } from '@remix-run/node';
import { Home } from '@templates';
import '~/styles/App.css';

export const meta: MetaFunction = () => {
  return [
    { title: 'briverse17: How to...' },
    { name: 'description', content: 'How to do THAT' },
  ];
};

export default function Index() {
  return (
    <>
      <Home />
    </>
  );
}
