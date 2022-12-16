import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export default function CPSCounter() {
    const [shouldShowPopup, setShowPopup] = useState(false);
    const [leftClicks, setLeftClicks] = useState(0);
    const [rightClicks, setRightClicks] = useState(0);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (window.matchMedia("only screen and (max-width: 750px)").matches) return;
            const buttonCallback = (setter: Dispatch<SetStateAction<number>>) => {
                setter(c => c + 1);
                setTimeout(() => setter(c => c - 1), 1000);
            }

            switch (e.button) {
                case 0: // left click
                    buttonCallback(setLeftClicks);
                    break;
                case 2: // right click
                    buttonCallback(setRightClicks);
                    break;
            }
        }

        document.addEventListener("mouseup", onClick);
        return () => document.removeEventListener("mouseup", onClick);
    }, [shouldShowPopup, leftClicks, rightClicks]);

    if (!shouldShowPopup && (leftClicks > 4 || rightClicks > 4)) setShowPopup(true);
    else if (shouldShowPopup && (leftClicks < 2 && rightClicks < 2)) setShowPopup(false);

    return (
        <div className={`cpsContainer${shouldShowPopup ? " inDisplay" : " "}`}>
            click fass
            <span>{`${leftClicks} | ${rightClicks} cps`}</span>
        </div>
    );
}
