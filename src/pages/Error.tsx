import { FC } from 'react';
import { Section } from '../components/Layout';

export const Error: FC = () => {
  return (
    <Section id="not-found">
      <div className="w-full min-h-screen bg-base-100 text-base-content flex justify-center items-center">
        <p className="text-5xl tracking-wider font-extrabold">NOT FOUND</p>
      </div>
    </Section>
  );
};

export default Error;
