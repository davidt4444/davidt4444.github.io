var calcformElem = 
document.getElementById("calcform"), 
box2Elem = document.getElementById("box2"), 
langbtns = document.getElementById("lang"), 
dateElem = document.getElementById("date"), 
timeElem = document.getElementById("time"), 
zoneElem = document.getElementById("zone"), 
fullbtn = document.getElementById("full"), 
wctbl = document.getElementById("wctbl"), 
langs = navigator.languages, 
locale = navigator.language, 
wakeLock = null, 
isfullscreen = !1, 
ustest = !1; 
function setLangBtn() { 
    for (var e = 0; e < langs.length; e++)
        langbtns.innerHTML += "<button type='button' class='btn btn-secondary' onclick='setLocale(" + e + ")'>" + langs[e] + "</button>" 
} 
function setZone() { 
    var e = -(new Date().getTimezoneOffset() / 60); e > 0 && (e = "+" + e), 
    zone.innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone + " (GMT" + e + ")" 
} 
function setLocale(e) { 
    locale = langs[e] 
} 
function setPicker() { 
    datepicker("#cal2", 
        { alwaysShow: !0, 
            dateSelected: new Date, 
            defaultView: "calendar" 
        }
    ) 
} 
function drawChart() { 
    var e = new google.visualization.DataTable; 
    e.addColumn({ type: "date", id: "Date" }), 
    e.addColumn({ type: "number", id: "Won/Loss" }), 
    e.addRows(
        [
            [new Date, 0], 
            [new Date, 1]
        ]
    ); 
    var n = new google.visualization.Calendar(document.getElementById("gcal")), 
    l = window, 
    t = document, 
    a = t.documentElement, 
    i = t.getElementsByTagName("body")[0], 
    c = l.innerWidth || a.clientWidth || i.clientWidth; n.draw(e, 
        { 
            height: 130, 
            calendar: { cellSize: c > 700 ? 10 : 5 } 
        }
    ) 
} 
function setTable() { 

} 
function setTime() { 
    ustest && (locale = "en-US"); 
    var e, 
    n = new Date, 
    l = { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
    }, 
    t = n.toLocaleDateString(locale, l), 
    a = { 
        hour: "numeric", 
        minute: "2-digit", 
        second: "2-digit" 
    }, 
    i = n.toLocaleTimeString(locale, a); 
    dateElem.innerHTML = t, 
    timeElem.innerHTML = i; 
    var c = ["America/Los_Angeles", "America/Chicago", "America/New_York", "Europe/London", "Europe/Paris", "Asia/Tokyo", "Australia/Sydney"]; 
    wctbl.rows[0].cells[1].innerHTML = i, wctbl.rows[0].cells[2].innerHTML = t; 
    for (var s = 0; s < c.length; s++)
        a.timeZone = c[s], 
        l.timeZone = c[s], 
        e = n.toLocaleTimeString(locale, a), 
        wctbl.rows[s + 1].cells[1].innerHTML = e, 
        e = n.toLocaleDateString(locale, l), 
        wctbl.rows[s + 1].cells[2].innerHTML = e 
} 
function myTimer() { 
    setTime() 
} 
function reWake() { 
    "wakeLock" in navigator && document.addEventListener(
        "visibilitychange", 
        async () => { 
            null !== wakeLock && 
            "visible" === document.visibilityState && 
            (wakeLock = await navigator.wakeLock.request("screen")) 
        }
    ) 
} 
async function setWake() { 
    if ("wakeLock" in navigator) 
        try { 
            wakeLock = await navigator.wakeLock.request("screen") 
        } catch (e) { 
            console.log(e.name + " " + e.message) 
        } 
} 
function resetWake() { 
    "wakeLock" in navigator && 
    null != wakeLock && 
    wakeLock.release().then(() => { 
        wakeLock = null }
    ) 
} 
function FullscreenReq() { 
    var e = box2Elem; 
    e.requestFullscreen ? e.requestFullscreen() : 
    e.mozRequestFullScreen ? e.mozRequestFullScreen() : 
    e.webkitRequestFullscreen ? e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : 
    e.msRequestFullscreen && 
    indexedDB.msRequestFullscreen() 
} 
function OnFullscreen() { 
    isfullscreen ? (
        isfullscreen = !1, 
        fullbtn.title = "Fullscreen", 
        fullbtn.innerHTML = "<img src='/lib/icons/material/svg/fullscreen_white_24dp.svg' loading='lazy' width='24' height='24' alt=''>", 
        document.removeEventListener("fullscreenchange", OnFullscreen), document.exitFullscreen()
    ) : 
    (
        isfullscreen = !0, 
        fullbtn.title = "Fullscreen exit", 
        fullbtn.innerHTML = "<img src='/lib/icons/material/svg/fullscreen_exit_white_24dp.svg' loading='lazy' width='24' height='24' alt=''>", 
        FullscreenReq(), 
        setTimeout(
            function () { 
                document.addEventListener("fullscreenchange", OnFullscreen) 
            }, 1e3
        )
    ) 
} 
window.addEventListener(
    "DOMContentLoaded", 
    function () { 
        setInterval(
            function () { 
                myTimer() 
            }, 
            500
        ), 
        setLangBtn(), 
        setTime(), 
        setZone(), 
        setPicker(), 
        reWake(), 
        setWake(), 
        google.charts.load(
            "current", 
            { 
                packages: ["calendar"] 
            }
        ), 
        google.charts.setOnLoadCallback(drawChart), 
        box2Elem.onclick = function () { 
            OnFullscreen() 
        } 
    }
);
