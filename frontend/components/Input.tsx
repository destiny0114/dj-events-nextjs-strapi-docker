import { ChangeEvent, MouseEvent, MutableRefObject } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type Props<T extends FieldValues> = {
    type?: string;
    name: Path<T>;
    placeholder?: string;
    register: UseFormRegister<T>;

    inputFile?: File | null;
    fileInputRef?: MutableRefObject<HTMLInputElement | null>;
    handleFileChanged?: (e: ChangeEvent<HTMLInputElement>) => boolean | undefined;
    handleSelectButtonClicked?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function Input<T extends FieldValues>({
    type,
    name,
    placeholder,
    register,
    inputFile,
    fileInputRef,
    handleFileChanged,
    handleSelectButtonClicked,
}: Props<T>) {
    if (type === "date") {
        return (
            <div className="border-b border-black">
                <input
                    className="w-full font-lato font-medium text-lg placeholder:text-gray-700 outline-none bg-transparent py-1"
                    type={type}
                    {...register(name)}
                />
            </div>
        );
    }

    if (type === "textarea") {
        return (
            <div>
                <textarea
                    className="w-full font-lato font-medium text-lg placeholder:text-gray-700 resize-none outline-none bg-transparent border border-black p-3"
                    placeholder={placeholder}
                    autoComplete="off"
                    rows={13}
                    cols={20}
                    {...register(name)}
                ></textarea>
            </div>
        );
    }

    if (type === "file" && fileInputRef) {
        const { ref, ...fileRegister } = register(name);

        return (
            <div className="flex">
                <span className="flex-1 border-b border-black font-lato font-medium text-lg text-gray-700 outline-none bg-transparent">
                    {inputFile?.name ?? "No Image Selected"}
                </span>
                <button
                    onClick={handleSelectButtonClicked}
                    type="button"
                    className="ml-8 text-xl font-lato uppercase border border-black px-6 py-2 transition ease-in-out duration-150 hover:bg-black hover:text-white"
                >
                    Select
                </button>
                <input
                    className="hidden"
                    type={type}
                    {...fileRegister}
                    ref={(e) => {
                        ref(e);
                        fileInputRef.current = e as HTMLInputElement;
                    }}
                    onChange={(e) => {
                        fileRegister.onChange(e);
                        handleFileChanged && handleFileChanged(e);
                    }}
                />
            </div>
        );
    }

    return (
        <div className="border-b border-black">
            <input
                className="w-full font-lato font-medium text-lg placeholder:text-gray-700 outline-none bg-transparent py-1"
                type={type}
                placeholder={placeholder}
                autoComplete="off"
                {...register(name)}
            />
        </div>
    );
}

Input.defaultProps = {
    type: "text",
};
