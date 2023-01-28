import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons';
import InputButton from './InputButton';
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
const style = {
  height: '10%',
  margin: 'inherit',
  display: 'inherit',
  width: '75%',
};
const logIn = (provider) => {
  signIn(provider, { callbackUrl: 'http://localhost:3000/' });
};
const LogInCard = () => {
  const [shown, changeShown] = useState(false);
  return !shown ? (
    <></>
  ) : (
    <div className="h-screen w-screen fixed flex justify-center items-center bg-gray-400/90 z-10 ">
      <form className="w-80 h-[27rem]  flex flex-col bg-slate-200 rounded-xl shadow-md justify-center gap-2 items-center">
        <button
          onClick={() => {
            //signOut({ redirect: false });
            changeShown(false);
          }}
          className=" p-1 absolute self-end w-8 bg-white rounded-full -translate-y-48 mr-2 hover:bg-slate-200 focus:bg-slate-300 focus:border"
        >
          <img src="./close.png" alt="" />
        </button>

        <img className="w-1/5" src="/Mascot.png" alt="" />
        <h1>Sign in</h1>
        <InputButton type="email" placeholder="email" />
        <InputButton type="password" placeholder="password" />
        <input
          className="w-1/4 h-[7%] rounded-xl bg-white shadow-md hover:bg-slate-200 focus:bg-slate-300 focus:border "
          type="submit"
          value="Log in"
        />
        <FacebookLoginButton
          style={style}
          onClick={() => {
            logIn('facebook');
          }}
        >
          <span>Sign in with Facebook</span>
        </FacebookLoginButton>
        <GoogleLoginButton
          style={style}
          onClick={() => {
            logIn('google');
          }}
        >
          <span>Sign in with Google</span>
        </GoogleLoginButton>
        <GithubLoginButton
          style={style}
          onClick={() => {
            logIn('github');
          }}
        >
          <span>Sign in with Github</span>
        </GithubLoginButton>
      </form>
    </div>
  );
};
export default LogInCard;
