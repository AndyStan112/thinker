import React from 'react';

export const LandingPage = ({ session }) => {
  console.log(session, 'b');

  return (
    <div className="flex flex-col align-middle">
      <h1>Thinker</h1>
      <h2>Promoting thinking, not skimping. The future of learning.</h2>
      <h2>Thinker is the best tool to make learning fun by gamification</h2>
      <img className="w-40" src="Mascot.png" alt="Mascot" />
      <h2>{session ? session.user?.email : 'ghinion'}</h2>
      <h2>{session ? session.user?.role : 'ghinionut'}</h2>
    </div>
  );
};
