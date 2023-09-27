import './index.css';
const ApplicationActionButton = (
    { name,
        disableNext,
        onClickButton }: {
            name: string,
            disableNext: boolean,
            onClickButton: () => void
        }) => {

    return (
        <div className="application-action-button w-full pt-10">
            <button className={disableNext ? "black-bg cursor-not-allowed cursor-pointer w-full bg-slate-100 shadow-md px-4 py-3 rounded-2xl capitalize font-semibold text-white" :"next-btn rounded-2xl cursor-pointer w-full bg-slate-100 shadow-md px-4 py-3 capitalize font-semibold text-white"} disabled={disableNext} onClick={onClickButton}> {name}</button>
        </div>
    )
}

export default ApplicationActionButton;