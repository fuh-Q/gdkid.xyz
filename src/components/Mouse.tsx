import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type MouseProps from "../types/Mouse";

interface HoverEvent extends MouseEvent { target: HTMLElement }

export default function Mouse({ mouseN }: MouseProps) {
    const [ready, setReady] = useState(false);
    const [shouldShowMouse, setShowMouse] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => setReady(true), []);
    useEffect(() => {
        const delay = 50 * (mouseN - 1);
        const onMouseMove = (e: MouseEvent) => setTimeout(() => {
            if (!ref.current) return;

            ref.current.style.top = `${e.clientY}px`;
            ref.current.style.left = `${e.clientX}px`;
        }, delay);

        const onPointerDown = (_: PointerEvent) => setCursorColour("--green");
        const onPointerUp = (_: PointerEvent) => setCursorColour("--aqua");
        const onMouseEnter = (_: MouseEvent) => setCursorColour("--nitro-pink");
        const onMouseLeave = (_: MouseEvent) => setCursorColour("--aqua");
        const setCursorColour = (val: string): void => {
            const bs = window.getComputedStyle(document.body);
            document.body.style.setProperty("--cursor-tint", bs.getPropertyValue(val));
        }

        document.addEventListener("pointermove", onMouseMove);
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("pointerup", onPointerUp);

        const hoverables = document.querySelectorAll<HTMLElement>(".hoverable");
        hoverables.forEach(hoverable => {
            hoverable.addEventListener("mouseenter", onMouseEnter);
            hoverable.addEventListener("mouseleave", onMouseLeave);
        });

        return () => {
            document.removeEventListener("pointermove", onMouseMove);
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("pointerup", onPointerUp);

            hoverables.forEach(hoverable => {
                hoverable.removeEventListener("mouseenter", onMouseEnter);
                hoverable.removeEventListener("mouseleave", onMouseLeave);
            });
        }
    });

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
            className="mouse"
            ref={ref}
            style={{
                transform: `scale(${1.4 - mouseN * 0.2})`,
                opacity: shouldShowMouse ? 1 / mouseN : 0,
            }}/>,
        document.getElementById("customMouse") as HTMLDivElement
    ) : null;
}
