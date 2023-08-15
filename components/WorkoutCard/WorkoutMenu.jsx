export default function WorkoutMenu ({isOpen, handleToggleConfirmDelete}) {

    const menuClass = isOpen
    ? "absolute z-30 h-fit w-[100px] max-w-full right-[10px] text-sm transition-all duration-500 ease-in-out font-semibold rounded shadow px-3 py-4 transform translate-x-0 opacity-100 visible origin-right"
    : "absolute z-30 h-fit w-[100px] max-w-full right-[10px] text-sm transition-all duration-500 ease-in-out font-semibold rounded shadow px-3 py-4 transform opacity-0 invisible origin-right";

    return (
        <div className={menuClass}>            
            <p className="mb-4">Edit</p>
            <p className="text-red-600" onClick={handleToggleConfirmDelete}>Delete</p>
        </div>
    )
}