
import Image from "next/image";
import frameImg from '@/app/ios-frame.png'
import LinksList from "./LinksList";
import { useLinks } from "@/context/linksContext";

const DeviceFrame = () => {
    const { profileInfo } = useLinks();

    return (
        <div className="hidden bg-white h-fit shadow-md rounded-lg p-8 py-20 lg:flex items-start justify-center">
            <div className="relative w-full max-w-sm">
                <Image src={frameImg} alt="" className="w-full h-full" />

                <div className="absolute top-0 left-0 right-0 flex flex-col gap-1 items-center justify-center pt-24">
                    {profileInfo?.image ?
                        <div className="relative w-28 h-28 rounded-full bg-gray-100 overflow-hidden">
                            <img src={profileInfo?.image} alt="" className="w-full h-full" />
                        </div>
                        :
                        <div className="w-28 h-28 rounded-full bg-gray-100"></div>
                    }
                    {profileInfo?.first_name ?
                        <span className="font-semibold mt-4">{`${profileInfo?.first_name} ${profileInfo?.last_name}`}</span>
                        :
                        <div className="w-1/2 h-4 rounded-full bg-gray-100 mt-2"></div>
                    }
                    {profileInfo?.email ?
                        <span className="font-normal text-sm text-[#777]">{profileInfo?.email}</span>
                        :
                        <div className="w-1/3 h-2 rounded-full bg-gray-100 mt-1"></div>
                    }


                    <LinksList />
                </div>
            </div>
        </div>
    );
}

export default DeviceFrame;