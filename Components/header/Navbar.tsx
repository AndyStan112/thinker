import Pages from './Pages';
import { useState } from 'react';

export default function Navbar({ session }) {
  const [currExp, setCurrExp] = useState(70);
  const [nextExp, setNextExp] = useState(158);
  return (
    <div className="flex w-screen h-16 bg-purple-600 -z-10 [p]:z-10">
      <div className="flex items-center w-[50em] ml-3">
        <img
          className="h-4/5 rounded-3xl z-10"
          src={session?.user?.image ? session?.user?.image : 'Avatar_1.jpg'}
        />
        <div className="flex items-center -translate-x-1 h-2/5 w-3/5">
          <div className="flex w-full justify-center h-full bg-neutral-400">
            <div
              className={`absolute bg-cyan-400 left-0  h-full z-10`}
              style={{ width: (currExp / nextExp) * 100 + '%' }}
            ></div>
            <div className="flex text-center ">
              <p className="text-gray-700 z-20">23/</p>
              <p className="text-yel z-20">158 XP</p>
            </div>
          </div>
          <div className="aspect-square h-full bg-yellow-900 text-green-500 flex justify-center font-bold">
            <p>5</p>
          </div>
        </div>
      </div>
      <Pages />
    </div>
  );
}
