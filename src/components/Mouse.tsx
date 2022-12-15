import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type MouseProps from "../types/Mouse";

export default function Mouse({ delay = 0, n }: MouseProps) {
    const [ready, setReady] = useState(false);
    const [shouldShowMouse, setShowMouse] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setReady(true);
        const onMouseMove = (e: MouseEvent) => setTimeout(() => {
            if (!ref.current) return;

            ref.current.style.top = `${e.clientY}px`;
            ref.current.style.left = `${e.clientX}px`;
        }, delay);
        document.addEventListener("pointermove", onMouseMove);

        const setCursorColour = (val: string): void => {
            const bs = window.getComputedStyle(document.body);
            document.body.style.setProperty("--cursor-tint", bs.getPropertyValue(val));
        }
        const onPointerDown = (_: PointerEvent) => setCursorColour("--aqua");
        const onPointerUp = (_: PointerEvent) => setCursorColour("--green");
        document.addEventListener("pointerdown", onPointerUp);
        document.addEventListener("pointerup", onPointerDown);

        return () => {
            document.removeEventListener("pointermove", onMouseMove);
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("pointerup", onPointerUp);
        }
    }, [delay]);

    useEffect(() => {
        const onPointerMove = () => {
            if (
                !shouldShowMouse &&
                !window.matchMedia("only screen and (max-width: 750px)").matches
            ) {
                setTimeout(() => setShowMouse(true), 69);
            }
        }

        window.addEventListener("pointermove", onPointerMove);

        return () => {
            document.removeEventListener("pointermove", onPointerMove);
        }
    }, [shouldShowMouse]);

    return ready ? createPortal(
        <div
            className={`mouse m${n}`}
            ref={ref}
            style={{
                transform: `scale(${1.4 - n * 0.2})`,
                opacity: shouldShowMouse ? 1 / n : 0,
            }}/>,
        document.getElementById("customMouse") as HTMLDivElement
    ) : null;
}
