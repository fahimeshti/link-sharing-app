import { IoIosAdd } from "react-icons/io";
import Button from "../Button";
import { useFieldArray, useForm } from "react-hook-form";
import LinksCard from "../molecules/LinksCard";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import DeviceFrame from "../molecules/DeviceFrame";
import SubTitle from "../atoms/SubTitle";
import { saveToLocalStorage } from "@/utils/storage";
import { LINK_LIST } from "@/constants/keys";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLinks } from "@/context/linksContext";

const LinksTab = () => {
    const [loading, setLoading] = useState(false);
    const { addLink, links } = useLinks();

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "links",
    });

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        move(result.source.index,
            result.destination.index);

    };

    function addNewField() {
        append({ link: '', platform: 'GitHub' });
    }

    function onSubmitForm(data: any) {
        const linksList = data.links;
        setLoading(true);
        // add to global state
        addLink(linksList);
        // add to localstorage
        saveToLocalStorage(LINK_LIST, linksList);
        setTimeout(() => {
            setLoading(false);
            toast.success("Success! Your link has been saved.");
        }, 1000);
    }

    useEffect(() => {
        append(links?.length > 0 ? links : [{ link: '', platform: 'GitHub' }]);
    }, [])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DeviceFrame />

            <div className="bg-white shadow-md rounded-lg p-6 pb-3 h-fit">
                <h2 className="font-bold text-2xl">Customize your links</h2>
                <SubTitle>
                    Add/edit/remove links below and then share all your profiles with the world!
                </SubTitle>
                <Button
                    variant='outline'
                    onClick={addNewField}
                    className="w-full my-6 font-semibold" StartIcon={IoIosAdd}
                    disabled={getValues()?.links?.length >= 3}
                >
                    Add new Link
                </Button>

                <form className="space-y-4">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`w-full ${snapshot.isDraggingOver ? "bg-gray-100 rounded-md" : ""}`}
                                >
                                    {fields.map((field, index) => (
                                        <Draggable key={field.id} draggableId={field.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="w-full mb-4"
                                                >
                                                    <LinksCard
                                                        remove={remove}
                                                        errors={errors}
                                                        defaultPlatform={links[index]?.platform}
                                                        {...{ control, index, field }}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <div className="border-t mt-32 pt-6 py-4 px-6 -mx-6 sticky bottom-0 bg-white">
                        <Button
                            disabled={loading}
                            onClick={handleSubmit(onSubmitForm)}
                            className="w-fit ml-auto px-6"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LinksTab;
