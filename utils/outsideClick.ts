import { RefObject } from "react";

export function handleClickOutside(event: MouseEvent, containerRef: RefObject<HTMLDivElement>, setPopup: any){
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setPopup(false);
    }
}