'use client'
import { useLinks } from "@/context/linksContext";
import { FaArrowRight, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const LinksList = () => {
    const { getLinkByPlatform } = useLinks();

    return (
        <ul className="flex flex-col items-center gap-4 mt-10 md:mt-16 w-full max-w-[270px]">
            <li className="w-full">
                <button
                    onClick={() => {
                        window.open(getLinkByPlatform('Github') as string, '_blank', 'noopener,noreferrer')
                    }}
                    className="group flex items-center gap-4 justify-between bg-[#181818] text-white px-4 p-3 rounded-md w-full cursor-pointer"
                >
                    <FaGithub />
                    <span className="mr-auto">Github</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
                </button>
            </li>

            <li className="w-full">
                <button
                    type="button"
                    onClick={() => {
                        window.open(getLinkByPlatform('YouTube') as string, '_blank', 'noopener,noreferrer')
                    }}
                    className="group flex items-center gap-4 justify-between bg-[#EB383E] text-white px-4 p-3 rounded-md w-full cursor-pointer"
                >
                    <FaYoutube />
                    <span className="mr-auto">YouTube</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
                </button>
            </li>

            <li className="w-full">
                <button
                    type="button"
                    onClick={() => {
                        window.open(getLinkByPlatform('LinkedIn') as string, '_blank', 'noopener,noreferrer')
                    }}
                    className="group flex items-center gap-4 justify-between bg-[#2E69FE] text-white px-4 p-3 rounded-md w-full cursor-pointer"
                >
                    <FaLinkedin />
                    <span className="mr-auto">LinkedIn</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
                </button>
            </li>
        </ul>
    );
}

export default LinksList;