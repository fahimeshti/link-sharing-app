'use client'
import Topbar from "@/components/Topbar";
import LinksList from "@/components/molecules/LinksList";
import { useLinks } from "@/context/linksContext";

const PreviewPage = () => {
    const { profileInfo } = useLinks();

    return (
        <div className="relative before:h-[50vh] before:rounded-bl-3xl p-0 md:p-4 before:z-[-1] before:rounded-br-3xl before:md:bg-primary before:absolute before:inset-0">
            <Topbar />
            <div className="flex items-center justify-center mt-4 md:mt-4 mb-10 min-h-screen">
                <div className="bg-white shadow-lg rounded-3xl w-full max-w-sm flex items-center justify-center flex-col p-8 py-12">
                    {profileInfo?.image ?
                        <div className="relative w-28 h-28 rounded-full bg-gray-100 overflow-hidden border border-gray-50">
                            <img src={profileInfo?.image} alt="" className="w-full h-full" />
                        </div>
                        :
                        <div className="w-28 h-28 rounded-full bg-gray-100"></div>
                    }

                    <div className="flex flex-col items-center gap-4 mt-4 md:mt-8">
                        {profileInfo?.first_name ?
                            <span className="font-bold text-3xl text-center">{`${profileInfo?.first_name} ${profileInfo?.last_name}`}</span>
                            :
                            <div className="w-56 h-4 rounded-full bg-gray-100 mt-2"></div>
                        }
                        {profileInfo?.email ?
                            <span className="font-normal text-sm text-center text-[#888]">{profileInfo?.email}</span>
                            :
                            <div className="w-1/3 h-2 rounded-full bg-gray-100 mt-1"></div>
                        }
                    </div>

                    <LinksList />
                </div>
            </div>
        </div>
    );
}

export default PreviewPage;