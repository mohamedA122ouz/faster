function saveToRestore() {
    try {
        let videoID = window.location.href;
        videoID = videoID.slice(videoID.indexOf("/", 9));
        let videoData = {};
        videoData[videoID] = Handle.v.currentTime;
        sessionStorage.setItem("video", JSON.stringify(videoData));
    }
    catch (e) {
        console.error(Error(e));
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
        console.error(Error(e));
    }
}
function addBasicListener() {
    window.onbeforeunload = function () {
        saveToRestore();
        return null;
    }
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
    // console.log(e[0].target);
    e.forEach(el => {
        if (el.isIntersecting) {
            Handle.v = el.target;
            Handle.readyToZoom = Handle.v;
            Handle.v.addEventListener("contextmenu", Handle.goFullScreen);
            if(Handle.restoreOnFirst){
                restoreVideoTime();
                Handle.restoreOnFirst = false;
            }
            try {
                Handle.defualtSpeed = Handle.v.playbackRate;
            } catch {
                Handle.defualtSpeed = 1;
            }
        }
    });
}, { threshold: 0.6 });
Handle.videos.forEach(element => {
    observer.observe(element);
});



function refresh() {
    Handle.videos = document.querySelectorAll("video");
    console.log("refreshing");
    console.log(Handle.videos);
    Handle.videos.forEach(element => {
        observer.observe(element);
    });

};
function eventsHandlers() {
    try {
        document.addEventListener("keydown", Handle.KeyBoard);
        document.addEventListener("keyup", Handle.returnDefaultSpeed);
        document.addEventListener("click", Handle.zoom);
        document.addEventListener("mousemove", Handle.dragVideoAndZoomInOut);
        Handle.isEventsAdded = true;
    }
    catch {
        console.warn("Faster_Script_says:no videos yet");
    }
}
