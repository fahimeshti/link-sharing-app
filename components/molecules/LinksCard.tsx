import { IoIosLink } from "react-icons/io";
import InputField from "../Input";
import { MdDragHandle } from "react-icons/md";
import Button from "../Button";
import { Controller } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import FormMessage from "../atoms/FormMessage";
import { useState } from "react";
import { getValidationFunction } from "@/utils/helpers";

const LinksCard = ({ control, index, remove, errors, defaultPlatform }: any) => {
    const [platform, setPlatform] = useState<"GitHub" | "YouTube" | "LinkedIn">(defaultPlatform || 'GitHub');

    return (
        <div className="bg-[#FAFAFA] rounded-lg p-4">
            <div className="flex items-center justify-between w-full">
                <span className="font-semibold text-base flex items-center gap-2 text-[#777]">
                    <MdDragHandle />
                    <span>Link#{index + 1}</span>
                </span>
                <Button
                    variant='noStyle'
                    className="font-normal md:font-medium !text-[#777] hover:!border hover:border-red-500 hover:!text-red-500 transition-all duration-300"
                    onClick={() => remove(index)}
                >
                    Remove
                </Button>
            </div>

            <div
                className='flex flex-col gap-4 py-4'
            >
                <Controller
                    control={control}
                    name={`links.${index}.platform`}
                    render={({ field }) => (
                        <CustomSelect
                            onChange={(value: any) => {
                                field.onChange(value.name);
                                setPlatform(value.name);
                            }}
                            defaultValue={platform}
                            label='Platform'
                        />
                    )}
                />

                <Controller
                    control={control}
                    name={`links.${index}.link`}
                    rules={{
                        required: 'URL is required',
                        validate: getValidationFunction(platform)
                    }}
                    render={({ field }) => (
                        <InputField
                            label='Link'
                            startIcon={<IoIosLink />}
                            placeholder='Please enter url'
                            type="url"
                            {...field}
                        />
                    )}
                />
                {!!errors.links?.[index]?.link && <FormMessage>{errors.links?.[index]?.link.message}</FormMessage>}

            </div>
        </div>
    );
}

export default LinksCard;