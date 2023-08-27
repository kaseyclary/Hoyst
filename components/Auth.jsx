import {signIn, signOut } from 'next-auth/react';

const SignInWithGoogleButton = () => {
    return (
        <div>
            <button className="btn-primary" onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
    )
}

const SignOutButton = () => {
    return (
        <div>
            <button className="btn-secondary" onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

const ShadowSignInButton = () => {
    return (
        <div>
            <button className="px-2 py-1 border text-white rounded font-medium bg-orange-500 hover:text-slate-600 transition-colors duration-200 ease-in-out" onClick={() => signIn('google')}>Sign In</button>
        </div>
    )
}

const SignUpWithGoogleButton = () => {
    return (
        <div>
            <button className="text-lg max-md:w-full px-5 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-white hover:text-orange-600 transition-colors duration-150 ease-in-out" onClick={() => signIn('google')}>Sign up with Google</button>
        </div>
    )
}

const ShadowSignOutButton = () => {
    return (
        <div>
            <button className="btn-ghost-secondary-sm" onClick={() => signOut()}>Sign Out</button>
        </div>
    )
}




export { SignInWithGoogleButton, ShadowSignInButton, SignOutButton, SignUpWithGoogleButton, ShadowSignOutButton}