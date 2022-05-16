export default function UpdateControlPanel({ updateHandler }: { updateHandler: () => void; }) {
  return (
    <div className="h-16 w-full border-t-[1px] border-0 border-gray-300 dark:border-gray-700 dark:focus:border-blue-600 flex items-center justify-end">
      <button
        onClick={(e) => { e.stopPropagation(); updateHandler() }}
        className="border-0 bg-green-600 hover:bg-green-700 text-white px-12 rounded-sm mr-4 text-white focus:bg-green-700 h-8"
      >
        Actualizar
      </button>
    </div>
  );
}

