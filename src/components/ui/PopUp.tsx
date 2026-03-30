import Dialog from "@mui/material/Dialog";
import React, { useEffect, useRef, useState } from "react";

interface CustomPopupProps {
  show: boolean;
  onClose: (isOpen: boolean) => void;
  children: any;
  isDismissible: boolean;
  customStyle?: React.CSSProperties;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ show, onClose, children, isDismissible, customStyle }) => {
  const [isVisible, setIsVisible] = useState(show);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const closeHandler = () => {
    setIsVisible(false);
    onClose(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      if (isDismissible) {
        closeHandler();
      }
    }
  };

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <Dialog
      slotProps={{
        paper: {
          sx: {
            "& ._popup_1qdeu_16": {
              width: "100%",
            },
          },
        },
        backdrop: {
          sx: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        },
      }}
      open={isVisible}
      sx={{
        visibility: isVisible ? "visible" : "hidden",
        opacity: isVisible ? 1 : 0,
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          maxWidth: "100%",
          background: "white",
          ...customStyle,
        },
      }}
    >
      <div className="overlay" ref={popupRef}>
        <div className="popup">{children}</div>
      </div>
    </Dialog>
  );
};

export default CustomPopup;
