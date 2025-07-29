function saveToRestore() {
    try {
        let videoID = window.location.href;
        videoID = videoID.slice(videoID.indexOf("/", 9));
        let videoData = {};
        videoData[videoID] = Handle.v.currentTime;
        sessionStorage.setItem("video", JSON.stringify(videoData));
    }
    catch (e) {
        console.warn(e);
    }
}
function restoreVideoTime() {
    try {
        let videoID = window.location.href;
        videoID = videoID.slice(videoID.indexOf("/", 9));
        let video = JSON.parse(sessionStorage.getItem("video"));
        Handle.v.currentTime = +video[videoID];
    }
    catch (e) {
        console.warn(e);
    }
}
function addBasicListener() {
    window.onbeforeunload = function () {
        saveToRestore();
        return null;
    }
    document.addEventListener("click", Handle.mousedown);
    document.addEventListener("keydown", Handle.BasicListener);
}
try {
    Handle.videos = document.querySelectorAll("video");
    addBasicListener();
    restoreVideoTime();
}
catch {
    console.warn("Faster_Script_says:no videos exist to select");
    addBasicListener();
}
let observer = new IntersectionObserver((e) => {
    Handle.zoomOnFirstClick = true;
    e.forEach(el => {
        if (el.isIntersecting) {
            Handle.v = el.target;
            Handle.readyToZoom = Handle.v;
            Handle.v.addEventListener("contextmenu", Handle.goFullScreen);
            if (Handle.restoreOnFirst) {//funciton need to set at first time of intersection only
                restoreVideoTime();
                Handle.inputFileds = [...document.querySelectorAll("input")];
                Handle.restoreOnFirst = false;
            }
            try {
                Handle.defualtSpeed = Handle.v.playbackRate;
            } catch {
                Handle.defualtSpeed = 1;
            }
        }
    });
    Handle.mkVideoFitScreen2(new ScreenObject(document.body));
}, { threshold: 0.6 });
Handle.videos.forEach(element => {
    observer.observe(element);
});



function refresh() {
    Handle.videos = document.querySelectorAll("video");
    //console.log("refreshing");
    //console.log(Handle.videos);
    Handle.videos.forEach(element => {
        observer.observe(element);
    });
    Handle.v.style.borderTop = "10px solid #ffaa00";
    setTimeout(() => {
        Handle.v.style.removeProperty("border-top");
    }, 2000);
};
function eventsHandlers() {
    try {
        document.addEventListener("keydown", Handle.KeyBoard);
        document.addEventListener("keyup", Handle.returnDefaultSpeedAndSwap);
        document.addEventListener("click", Handle.zoom);
        document.addEventListener("mousemove", Handle.dragVideoAndZoomInOut);
        Handle.v.addEventListener("mousemove",(e)=>Handle.videoBottomPostion(e));
        Handle.isEventsAdded = true;
    }
    catch {
        console.warn("Faster_Script_says:no videos yet");
    }
}
