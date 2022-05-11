import { ReactSetState } from "types";

export default function Title({title, setTitle}: {title: string; setTitle: ReactSetState<string>;}) {
    return (
        <div>
            <label htmlFor="Title">
                <h1 className="text-sm font-bold text-gray-200">Title</h1>
            </label>
            <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-gray-200 bg-inherit outline focus:outline-2 focus:outline-blue-600 outline-1 outline-gray-400 w-full py-1 pl-4 mt-2 dark:outline-gray-700  dark:focus:outline-blue-600"
            />
        </div>
    );
}

