'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import {Button} from "@/components/ui/button";
import NavLinks from "@/components/navigation/navbar/NavLinks";

const MobileNavigation = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    src="/icons/hamburger.svg"
                    width={36}
                    height={36}
                    alt="Menu"
                    className="invert-colors sm:hidden"
                />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="background-light900_dark200 border-none"
            >
                <SheetTitle className="hidden">Navigation</SheetTitle>
                <Link href="/" className="flex items-center gap-1 m-5">
                    <Image
                        src="/images/site-logo.svg"
                        width={23}
                        height={23}
                        alt="Logo"
                    />

                    <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
                        Dev<span className="text-primary-500">Overflow</span>
                    </p>
                </Link>

                <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-evenly overflow-y-auto">
                    <SheetClose asChild>
                        <section className="flex h-full flex-col gap-6 m-5">
                            <NavLinks isMobileNav />
                        </section>
                    </SheetClose>

                    <div className="flex flex-col gap-5">
                        <SheetClose asChild>
                            <Link href={ROUTES.SIGN_IN}>
                                <Button className="small-medium btn-secondary min-h-[41px] w-[90%] rounded-lg px-4 py-3 shadow-none mx-5">
                                    <span className="primary-text-gradient">Log In</span>
                                </Button>
                            </Link>
                        </SheetClose>

                        <SheetClose asChild>
                            <Link href={ROUTES.SIGN_UP}>
                                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-[90%] rounded-lg border px-4 py-3 shadow-none mx-5 mb-5">
                                    <span className="text-shadow-white">Sign Up</span>
                                </Button>
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default MobileNavigation
