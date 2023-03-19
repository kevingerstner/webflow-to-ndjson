import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export default function Message({ open, type = "notice", title, message, stateHandler }) {

    let boxClasses = classNames({
        "rounded-sm py-3 px-8 flex flex-row items-center justify-center gap-5 shadow-md": true,
        "bg-primary-300": type === "notice",
        "bg-red-200": type === "error",
    });

    function renderIcon() {
        switch (type) {
            case "error":
                return <FontAwesomeIcon icon={faXmarkCircle} className="text-red-600" size="2xl" />
            default:
                return <FontAwesomeIcon icon={faCircleInfo} className="text-primary-600" size="2xl" />
        }
    }

    if (open) return (
        <div className="absolute bottom-5 right-5">
            <FontAwesomeIcon icon={faXmark} className="absolute top-2 right-2 cursor-pointer" onClick={() => stateHandler(false)} />
            <div className={boxClasses}>
                {
                    renderIcon()
                }
                <div className="">
                    <p className="text-xl font-bold">{title}</p>
                    <p>{message}</p>
                </div>
            </div>
        </div >
    )
}