import Settings from "@/app/(site)/home/settings";
import { handleFormSubmit } from "@/app/(site)/home/actions/shortenaction";

import { useFormState } from "react-dom";

const initialState = {
    message: "",
};

export default function URLTab() {
    const [state, formAction] = useFormState(handleFormSubmit, initialState);
    return (
        <form action={formAction}>
            <div className="mb-10">
                <label
                    htmlFor="original-url"
                    className="mb-1 ml-1.5 flex gap-2 text-sm font-medium text-gray-700"
                >
                    Original URL
                </label>
                <input
                    placeholder="https://your.very.long.url/..."
                    maxLength={256}
                    type="text"
                    name="original-url"
                    id="original-url"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
            </div>

            <div className="mb-8">
                <label
                    htmlFor="custom-url"
                    className="mb-1 ml-1.5 flex gap-2 text-sm font-medium text-gray-700"
                >
                    Custom URL
                    <span className="block text-sm font-medium text-gray-400">
                        Optional
                    </span>
                </label>

                <div className="flex items-center rounded-md border">
                    <div className="rounded-l-md border bg-gray-50 px-3 py-2.5 text-gray-400">
                        docudump.url/
                    </div>
                    <input
                        maxLength={256}
                        type="text"
                        name="custom-url"
                        id="custom-url"
                        className="w-full rounded-r-lg border border-gray-300 bg-gray-50 bg-transparent p-2.5 pl-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>
            </div>
            <Settings />

            <button
                type="submit"
                className="h-10 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto"
            >
                Shorten
            </button>
            <p>{state?.message}</p>
        </form>
    );
}
