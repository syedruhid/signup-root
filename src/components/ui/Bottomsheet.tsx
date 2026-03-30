import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Sheet, type SheetRef } from "react-modal-sheet";

interface BottomSheetProps {
    sheetHeaderChildren?: ReactNode;
    children?: ReactNode;
    isOpen?: boolean;
    setOpen: (open: boolean) => void;
    isDismissible?: boolean;
    isFullScreen?: boolean;
    disableDrag?: boolean;
    customStyle?: React.CSSProperties;
}

const BottomSheet = (props: BottomSheetProps) => {
    const {
        sheetHeaderChildren = "",
        children = "",
        isOpen = false,
        setOpen,
        isDismissible,
        isFullScreen = false,
        disableDrag = false,
        customStyle = {},
    } = props;

    const drawer = document.getElementById("drawer-container");
    const [bottom, setBottom] = useState<string>("");
    const [left, setLeft] = useState<string>("");
    const ref = useRef<SheetRef>(null);

    useEffect(() => {
        if (drawer) {
            const bottom = "0px";
            const left = "0px";
            setLeft(left);
            setBottom(bottom);
        }
    }, [drawer]);

    return (
        <Sheet
            detent={isFullScreen ? "full-height" : "content-height"}
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            tweenConfig={{ ease: 'easeOut', duration: 0.2 }}
            disableDrag={isFullScreen || disableDrag}
        >
            <Sheet.Container
                style={{
                    width: "100%",
                    top: isFullScreen ? 0 : undefined,
                    bottom: isFullScreen ? 0 : bottom,
                    left: left,
                    backgroundColor: "white",
                    borderRadius: isFullScreen ? "0px" : "20px 20px 0px 0px",
                    ...customStyle,
                }}
            >
                {sheetHeaderChildren && (
                    <Sheet.Header>{sheetHeaderChildren}</Sheet.Header>
                )}
                {children && (
                    <Sheet.Content style={{ paddingBottom: ref.current?.y }}>
                        {children}
                    </Sheet.Content>
                )}
            </Sheet.Container>
            <Sheet.Backdrop style={{ backgroundColor: 'rgba(0, 4, 23, 0.6)' }} onTap={() => { if (isDismissible) props.setOpen(false) }} />
        </Sheet>
    );
};

export default BottomSheet