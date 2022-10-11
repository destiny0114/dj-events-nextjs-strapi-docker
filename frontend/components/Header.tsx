import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAuth } from "@context/AuthContext";
import { User } from "@tstypes/User";
import React from "react";

type AuthRouteProps = {
    children: React.ReactNode;
    user: User | null;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ user, children }) => {
    if (!user) return null;

    return <>{children}</>;
};

export default function Header() {
    const router = useRouter();
    const { auth, logout } = useAuth();

    const handleLogOutClicked = () => {
        logout();
        router.push("/");
    };

    return (
        <header className="container mx-auto my-2 flex justify-around items-center">
            <nav className="w-1/3">
                <ul className="flex gap-x-8">
                    <li>
                        <Link href="/about">
                            <a className="font-lato">About This Project</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/events">
                            <a className="font-lato">Events</a>
                        </Link>
                    </li>

                    <AuthRoute user={auth.user}>
                        <li>
                            <Link href="/events/add">
                                <a className="font-lato">Add Event</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/dashboard">
                                <a className="font-lato">Dashboard</a>
                            </Link>
                        </li>
                    </AuthRoute>
                </ul>
            </nav>

            <section className="flex-1 flex items-center justify-center">
                <Link href="/">
                    <a>
                        <Image src="/assets/logo.svg" alt="logo" width={50} height={50} layout="fixed" priority />
                    </a>
                </Link>
            </section>

            <section className="w-1/3">
                <ul className="flex justify-end gap-x-8">
                    <li>
                        {auth.user ? (
                            <a onClick={handleLogOutClicked} className="font-lato text-white uppercase bg-black px-6 py-2 cursor-pointer">
                                Logout
                            </a>
                        ) : (
                            <Link href="/login">
                                <a className="font-lato text-white uppercase bg-black px-6 py-2">Login</a>
                            </Link>
                        )}
                    </li>

                    {auth.user && <li>Welcome, {auth.user.username} </li>}

                    {!auth.user && (
                        <li>
                            <Link href="/register">
                                <a className="font-lato uppercase border border-black px-4 py-2">Register</a>
                            </Link>
                        </li>
                    )}
                </ul>
            </section>
        </header>
    );
}
