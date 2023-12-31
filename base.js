class Handle {
    static v = null;
    static currentLeft = 0;
    static currentTop = 0;
    static defualtTop = "";
    static defualtLeft = "";
    static zoomOnFirstClick = true;
    static restoreOnFirst = true;
    static scale = 1.2;
    static scaled = false;
    static defualtSpeed;
    static close = true;
    static fast = 2;
    static seek = 5;
    static videos = null;
    static isEventsAdded = false;
    static readyToZoom = null;
    static BasicListener(e) {
        if (e.code === "Period" && e.altKey) {
            if (e.key !== ".") {
                alert("convert your keyboard language to English (this bug will be fixed soon)");
            }
            e.preventDefault();
            console.log("working");
            refresh();
        }
        if (e.code === "KeyF" && e.altKey) {
            e.preventDefault();
            Handle.fast = prompt("fast/playback speed(integer):") || Handle.fast;
            Handle.fast = +Handle.fast;
        }
        if (e.code === "KeyS" && e.altKey) {
            e.preventDefault();
            Handle.seek = prompt("seek value(integer):") || Handle.seek;
            Handle.seek = +Handle.seek;
        }
        if (e.code === "KeyV" && e.altKey) {
            console.log(Handle.v);
            try {
                Handle.v.style.borderTop = "10px solid #ffaa00";
                setTimeout(() => {
                    Handle.v.style.removeProperty("border-top");
                }, 2000);
            }
            catch { }
        }
        if (!Handle.isEventsAdded) {
            eventsHandlers();
        }
    }
    static KeyBoard(e) {
        if (Handle.close) {
            Handle.defualtSpeed = Handle.v.playbackRate;
            Handle.close = false;
        }
        if (e.code === "ControlLeft") {
            Handle.v.playbackRate = Handle.fast;
        }
        if (e.altKey && e.code === "Comma") {
            Handle.defualtSpeed = Handle.fast;
            Handle.v.playbackRate = Handle.defualtSpeed;
        }
        else if (e.code === "Backquote" && e.altKey) {
            Handle.fast = 1.5;
            console.log("fast", Handle.fast);
        }
        else if (e.code === "Digit2" && e.altKey) {
            Handle.fast = 2;
            console.log("fast", Handle.fast);
        }
        else if (e.code === "Digit1" && e.altKey) {
            Handle.fast = 1;
            console.log("fast", Handle.fast);
        }
        else if (e.code === "Digit0") {
            Handle.v.currentTime = 0;
        }
        else if (e.key === "ArrowLeft") {
            e.preventDefault();
            Handle.v.currentTime -= Handle.seek;
        }
        else if (e.key === "ArrowRight") {
            e.preventDefault();
            Handle.v.currentTime += Handle.seek;
        }
    }
    static zoom(e) {
        let target = e.target;
        //zoom
        if (e.altKey && !Handle.scaled) {
            e.preventDefault();
            if (Handle.readyToZoom === Handle.v) {
                if (Handle.zoomOnFirstClick) {
                    Handle.defualtTop = Handle.readyToZoom.style.top;
                    Handle.defualtLeft = Handle.readyToZoom.style.left;
                    Handle.zoomOnFirstClick = false;
                }
                if (Handle.readyToZoom.parentElement === document.body) {
                    Handle.readyToZoom.parentElement.style.overflow = "hidden";
                }
                Handle.readyToZoom.style.cssText += `transform:scale(${Handle.scale})`;
                Handle.scaled = true;
            }
        }
        //back to the default zoom value which is 1
        else if (e.altKey && Handle.scaled) {
            e.preventDefault();
            Handle.readyToZoom.style.transform = "scale(1)";
            if (Handle.readyToZoom.parentElement === document.body) {
                Handle.readyToZoom.parentElement.style.removeProperty("overflow");
            }
            Handle.v.style.left = Handle.defualtLeft;
            Handle.v.style.top = Handle.defualtTop;
            Handle.currentLeft = 0;
            Handle.currentTop = 0;
            Handle.scaled = false;
            Handle.scale = 1.2;
        }

        else if (e.shiftKey) {
            Handle.scale = prompt("enter scale value (1-6): ") || 2;
        }

    }
    static dragVideoAndZoomInOut(e) {
        if (e.altKey && Handle.scaled) {
            Handle.currentLeft += e.movementX;
            Handle.currentTop += e.movementY;
            Handle.v.style.left = Handle.currentLeft + "px";
            Handle.v.style.top = Handle.currentTop + "px";
        }
        if (e.shiftKey && Handle.scaled) {//zoom in and out
            Handle.scale += e.movementY < 0 ? -0.02 : 0.02;
            Handle.scale = Handle.scale <= 1 ? 1 : Handle.scale;
            Handle.scale = Handle.scale >= 7 ? 7 : Handle.scale;
            Handle.readyToZoom.style.cssText += `transform:scale(${Handle.scale})`;
            Handle.scaled = true;

        }
    }
    static returnDefaultSpeed(e) {
        if (e.key === "Control") {
            Handle.close = true;
            console.log("default speed:", Handle.defualtSpeed);
            console.log("fast speed:", Handle.fast);
            Handle.v.playbackRate = Handle.defualtSpeed;
        }
    }
    static goFullScreen(e) {
        if (e.altKey) {
            e.preventDefault();
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
}
console.log(chrome);