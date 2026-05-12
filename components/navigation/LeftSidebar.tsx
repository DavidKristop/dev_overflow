import NavLinks from "@/components/navigation/navbar/NavLinks";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const LeftSidebar = () => {
    return (
        <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex flex-col justify-between overflow-y-auto border-r p-6 pt-24 shadow-light-300 dark:shadow-none max-lg:hidden lg:w-[266px]">
            <div className="flex flex-1 flex-col gap-4">
                <NavLinks />
            </div>

            <div className="flex flex-col gap-5 pt-4 justify-center">
                <Button className="small-medium btn-secondary min-h-[41px] w-[90%] rounded-lg px-4 py-3 shadow-none mx-5" asChild>
                    <Link href={ROUTES.SIGN_IN}>
                        <Image
                            src="/icons/account.svg"
                            alt="Account"
                            width={20}
                            height={20}
                            className="invert-colors lg:hidden"
                        />
                        <span className="primary-text-gradient max-lg:hidden">Log In</span>
                    </Link>
                </Button>

                <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-[90%] rounded-lg border px-4 py-3 shadow-none mx-5 mb-5" asChild>
                    <Link href={ROUTES.SIGN_UP}>
                        <Image
                            src="/icons/sign-up.svg"
                            alt="Sign-Up"
                            width={20}
                            height={20}
                            className="invert-colors lg:hidden"
                        />
                        <span className="text-shadow-white max-lg:hidden">Sign Up</span>
                    </Link>
                </Button>
            </div>
        </section>
    )
}
export default LeftSidebar
