import { useRouter } from "next/router"
import { NotificationBellIcon } from "../icons";
import { ShadowSignInButton, ShadowSignOutButton } from "../Auth";
import { useUser } from "@/userContext";
import { toast } from "react-toastify";

export default function BottomNav ({children}) {

    const router = useRouter()

    const handleNavigation = () => {
        router.push("/AddWorkout");
    };

    const handleHomeNavigation = () => {
        router.push("/Home");
    };

    const handleFeatureComingSoon = (feature) => {
        toast.info(`The ${feature} feature is coming soon!`);
    };

    const user = useUser();

    return (
        router.pathname === "/" ? (
            <div>
                <nav className="fixed top-0 h-[50px] w-screen bg-slate-600 px-4">
                    <div className="max-w-[600px] h-full mx-auto flex items-center justify-between">
                        <h1 className="text-white font-bold text-xl">Hoyst</h1>
                        <ShadowSignInButton />
                    </div>
                </nav>
                <main>
                    {children}
                </main>
            </div>
        ) : (
        <div>
            <nav className="fixed top-0 h-[50px] w-screen bg-slate-600 px-4">
                <div className="max-w-[600px] h-full mx-auto flex items-center justify-between">
                    <h1 className="text-white font-bold text-xl">Hoyst</h1>
                    <div className="flex h-full items-center">
                        <div className="mr-5">
                            <ShadowSignOutButton />
                        </div>
                        <NotificationBellIcon height={25} width={25} color={'white'} />
                    </div>
                </div>
            </nav>
            <main>
                {children}
            </main>
                <div className="max-w-[600px] mx-auto px-6 flex justify-end">
                    {router.pathname === "/AddWorkout" || router.pathname === "/SubmitWorkout" ? null : (
                        <div onClick={() => router.push("/AddWorkout")} className="fixed bottom-20 bg-blue-500 h-[55px] w-[55px] rounded-full drop-shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-400 transition-colors duration-300 ease-in-out">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[35px] w-[35px] text-white font-bold flex items-center justify-center" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"/>
                            </svg>
                        </div>
                    )}
                </div>
            {router.pathname === "/register" ? null : (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-t-slate-200 flex justify-center items-center h-16">
                <div className="flex justify-between items-center w-full max-w-[500px] px-8 pb-3">
                    <div className="flex flex-col items-center" onClick={() => router.push('/friends')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[35px] w-[35px] text-slate-200 font-bold flex items-center justify-center" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="5" cy="6" r="2" fill="currentColor"/>
                            <path d="M5 9c-1.5 0-2.5 1-2.5 2v2h5v-2c0-1-1-2-2.5-2z" fill="currentColor"/>
                            <circle cx="10" cy="6" r="2" fill="currentColor"/>
                            <path d="M10 9c-1.5 0-2.5 1-2.5 2v2h5v-2c0-1-1-2-2.5-2z" fill="currentColor"/>
                            <circle cx="15" cy="6" r="2" fill="currentColor"/>
                            <path d="M15 9c-1.5 0-2.5 1-2.5 2v2h5v-2c0-1-1-2-2.5-2z" fill="currentColor"/>
                        </svg>
                        <p className="text-xs font-semibold text-slate-400">Friends</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => router.push("/profile")}>
                        <svg xmlns="http://www.w3.org/2000/svg"  className="h-[35px] w-[35px] text-slate-200 font-bold flex items-center justify-center" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="10" cy="6" r="4" fill="currentColor"/>
                            <path d="M10 11c-3.5 0-5 1.5-5 3v2h10v-2c0-1.5-1.5-3-5-3z" fill="currentColor"/>
                        </svg>
                        <p className="text-xs font-semibold text-slate-400">Profile</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => router.push("/Home")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[35px] w-[35px] text-slate-200 font-bold flex items-center justify-center" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2l8 8-2 2-1-1v7h-6v-4H9v4H5v-7l-1 1-2-2 8-8z" />
                        </svg>
                        <p className="text-xs font-semibold text-slate-400">Home</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => handleFeatureComingSoon("Analytics")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[35px] w-[35px] text-slate-200 font-bold flex items-center justify-center" viewBox="0 0 20 20" fill="currentColor">
                            <rect x="3" y="10" width="3" height="6"/>
                            <rect x="8" y="8" width="3" height="8"/>
                            <rect x="13" y="4" width="3" height="12"/>
                        </svg>
                        <p className="text-xs font-semibold text-slate-400">Analyze</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => handleFeatureComingSoon("Goals")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-[35px] w-[35px] text-slate-200 font-bold flex items-center justify-center" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1" fill="none"/>
                            <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1" fill="none"/>
                            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1" fill="currentColor"/>
                        </svg>
                        <p className="text-xs font-semibold text-slate-400">Goals</p>
                    </div>
                </div>
            </div>
            )}
        </div>
    ))
}