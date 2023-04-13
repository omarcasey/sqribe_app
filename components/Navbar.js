import Image from "next/image"

const Navbar = () => {
    return (
        <header className="bg-white bg-opacity-5 text-white shadow-lg hidden md:block">
            <div className="container mx-auto flex items-center h-24">
                <a href="" className="flex items-center justify-center">
                    <Image className="h-16 w-16" src="/logo.png" alt="" width={1000} height={1000} />
                    <span className="ml-4 uppercase font-black">Sqribe.ai</span>
                </a>
                <nav className="contents font-semibold text-base lg:text-lg">
                    <ul className="mx-auto flex items-center">
                        <li className="p-5 xl:p-8 active">
                            <a href="">
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="p-5 xl:p-8">
                            <a href="">
                                <span>About</span>
                            </a>
                        </li>
                        <li className="p-5 xl:p-8">
                            <a href="">
                                <span>Projects</span>
                            </a>
                        </li>
                        <li className="p-5 xl:p-8">
                            <a href="">
                                <span>Services</span>
                            </a>
                        </li>
                        <li className="p-5 xl:p-8">
                            <a href="">
                                <span>Blog</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <div class="relative inline-flex items-center justify-center group">
                    <div class="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                    <a href="#" title="" class="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full" role="button"> Sign Up </a>
                </div>
            </div>
        </header>
    )
}

export default Navbar