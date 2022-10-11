import { useState, useEffect, MouseEvent } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    show: boolean;
    onModalClose: () => void;
    children?: React.ReactNode;
};

export default function Modal({ show, onModalClose, children }: ModalProps) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleModalClosed = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onModalClose();
    };

    const modalContent: React.ReactNode = show ? (
        <div className="fixed overflow-hidden top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 z-30">
            <div className="bg-[#F9A48A] w-full max-w-xl h-[30rem] p-5">
                <div className="flex justify-end">
                    <a
                        className="uppercase underline font-lato text-sm cursor-pointer"
                        onClick={handleModalClosed}
                    >
                        Close
                    </a>
                </div>
                {children}
            </div>
        </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root") as HTMLElement
        );
    }

    return null;
}
