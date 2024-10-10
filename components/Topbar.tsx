'use client'
import { Tab, TabList } from "@headlessui/react";
import { CgProfile } from "react-icons/cg";
import { RiLinksFill } from "react-icons/ri";
import Button from "./Button";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import toast from "react-hot-toast";

type Props = {
    home?: boolean;
}
const Topbar = ({ home }: Props) => {
    const copyUrlToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast.success('URL copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="bg-white rounded-lg md:shadow-md w-full h-20 p-2 md:p-4 z-50">
            <div className="flex items-center justify-between gap-4 w-full h-full px-2">
                {home &&
                    <Link href={'/'} className="flex items-center gap-2">
                        <span className="bg-violet-600 text-white w-6 h-6 rounded-md flex items-center justify-center">
                            <RiLinksFill size={20} className="rotate-45" />
                        </span>
                        <span className="font-bold text-2xl hidden md:block">devlinks</span>
                    </Link>
                }
                {!home &&
                    <Link href='/' className="w-full sm:w-fit">
                        <Button variant='outline' className="px-4 md:px-5 py-2.5 !w-full">
                            <span className="block">
                                Back to Editor
                            </span>
                        </Button>
                    </Link>
                }

                {home &&
                    <div>
                        <TabList className='flex gap-3'>
                            <Tab className='flex items-center gap-2 font-semibold data-[headlessui-state="selected"]:bg-violet-500/20 px-4 md:px-6 py-2.5 rounded-lg text-violet-800 hover:bg-violet-500/20 transition-all duration-200'>
                                <RiLinksFill size={20} />
                                <span className="hidden md:block">Links</span>
                            </Tab>
                            <Tab className='flex items-center gap-2 font-semibold data-[headlessui-state="selected"]:bg-violet-500/20 px-4 md:px-6 py-2.5 rounded-lg text-violet-800 hover:bg-violet-500/20 transition-all duration-200'>
                                <CgProfile size={20} />
                                <span className="hidden md:block">Profile Details</span>
                            </Tab>
                        </TabList>

                    </div>
                }
                <div className="w-full sm:w-fit">
                    {home &&
                        <Link href='/preview'>
                            <Button variant='outline' className="px-4 md:px-5 py-2.5">
                                <MdOutlineRemoveRedEye size={20} className="block md:hidden" />
                                <span className="hidden md:block">Preview</span>
                            </Button>
                        </Link>
                    }
                    {!home &&
                        <Button className="px-4 md:px-5 py-2.5 w-full" onClick={copyUrlToClipboard}>
                            <span className="block">Share Link</span>
                        </Button>
                    }

                </div>
            </div>
        </div>
    );
}

export default Topbar;