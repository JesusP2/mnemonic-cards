import { ReactSetState } from "types";

export default function Description({description, setDescription}: {description: string; setDescription: ReactSetState<string>}) {
    return (
        <div className="mt-8 text-gray-200">
            <label htmlFor="Description">
                <h1 className="text-sm font-bold text-gray-200">Description</h1>
            </label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full bg-inherit outline focus:outline-2 focus:outline-blue-600 outline-1 outline-gray-400 w-full pt-1 pl-4 mt-2 dark:outline-gray-700  dark:focus:outline-blue-600"
            ></textarea>
        </div>
    );
}
