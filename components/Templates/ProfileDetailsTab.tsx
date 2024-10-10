import { IoImageOutline } from "react-icons/io5";
import SubTitle from "../atoms/SubTitle";
import DeviceFrame from "../molecules/DeviceFrame";
import InputField from "../Input";
import Button from "../Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormMessage from "../atoms/FormMessage";
import { convertToBase64 } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { saveToLocalStorage } from "@/utils/storage";
import { PROFILE_INFO } from "@/constants/keys";
import { useLinks } from "@/context/linksContext";
import toast from "react-hot-toast";


const FormSchema = z.object({
    first_name: z.string().min(1, { message: "This field is required" }),
    last_name: z.string().min(1, { message: "This field is required" }),
    email: z.string().optional(),
})

const ProfileDetailsTab = () => {
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { setProfileInfo, profileInfo } = useLinks();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
        },
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64Data = await convertToBase64(file);
            setBase64Image(base64Data);
        }
    };

    function onSubmitForm(data: any) {
        setLoading(true);
        const allData = { image: base64Image, ...data };
        setProfileInfo(allData);
        saveToLocalStorage(PROFILE_INFO, allData)
        setTimeout(() => {
            setLoading(false);
            toast.success("Success! Your Profile has been saved.");
        }, 1000);
    }

    useEffect(() => {
        if (profileInfo?.first_name) {
            setValue('first_name', profileInfo.first_name);
        }
        if (profileInfo?.last_name) {
            setValue('last_name', profileInfo.last_name);
        }
        if (profileInfo?.email) {
            setValue('email', profileInfo.email);
        }
        if (profileInfo?.image) {
            setBase64Image(profileInfo?.image);
        }
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DeviceFrame />

            <div className="bg-white w-full shadow-md rounded-lg p-6 pb-3 h-fit">
                <h2 className="font-bold text-2xl">Profile Details</h2>
                <SubTitle>
                    Add your details to create a personal touch to your profile.
                </SubTitle>

                <div className="mt-8 w-full">
                    <div className="bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-3 rounded-lg">
                        <div className="px-4 py-4 md:py-6 col-span-1 text-[#777] font-medium text-sm flex items-center justify-start">Profile picture</div>
                        <div className="px-4 py-0 pb-4 md:py-6 col-span-2 flex items-center gap-4">
                            <label className="relative w-36 h-36 rounded-md overflow-hidden flex-shrink-0 cursor-pointer">
                                <div className="bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center flex-col text-white font-medium text-xs gap-2">
                                    <IoImageOutline size={24} />
                                    <span>Change Image</span>
                                </div>
                                {base64Image ?
                                    <img src={base64Image} alt="" className="object-cover w-full h-full" />
                                    :
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FaUser size={64} />
                                    </div>
                                }
                                <input
                                    accept=".png, .jpg, .jpeg, .bmp"
                                    onChange={handleImageUpload}
                                    type="file" hidden
                                />
                            </label>
                            <span className="text-[#777] font-medium text-xs">Image must be below 1024x1024px.
                                Use PNG, JPG, or BMP format.</span>
                        </div>
                    </div>

                    <form className="bg-[#FAFAFA] w-full flex flex-col gap-0 mt-4 py-2 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <label htmlFor="first_name" className="px-4 py-0 col-span-1 text-[#777] font-medium text-sm flex items-center justify-start">
                                First Name*
                            </label>
                            <div className="px-4 col-span-2 flex flex-col gap-0">
                                <Controller
                                    control={control}
                                    name='first_name'
                                    render={({ field }) => (
                                        <InputField id="first_name" className="w-full max-w-xl" {...field} />
                                    )}
                                />
                                {errors.first_name && <FormMessage>{errors.first_name.message}</FormMessage>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <label htmlFor="last_name" className="px-4 py-0 col-span-1 text-[#777] font-medium text-sm flex items-center justify-start">
                                Last Name*
                            </label>
                            <div className="px-4 col-span-2 flex flex-col">
                                <Controller
                                    control={control}
                                    name='last_name'
                                    render={({ field }) => (
                                        <InputField id="last_name" className="w-full max-w-xl" {...field} />
                                    )}
                                />
                                {errors.last_name && <FormMessage>{errors.last_name.message}</FormMessage>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <label htmlFor="email" className="px-4 py-0 col-span-1 text-[#777] font-medium text-sm flex items-center justify-start">
                                Email
                            </label>
                            <div className="px-4 col-span-2 flex items-center gap-4">
                                <Controller
                                    control={control}
                                    name='email'
                                    render={({ field }) => (
                                        <InputField id="email" className="w-full max-w-xl" {...field} />
                                    )}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="border-t mt-10 md:mt-32 pt-6 py-4 px-6 -mx-6 sticky bottom-2 bg-white">
                        <Button
                            disabled={loading}
                            onClick={handleSubmit(onSubmitForm)}
                            className="w-fit ml-auto px-6"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetailsTab;