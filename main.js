// Mass Effect cover generator but theres no restrictions
// 2021 HenBagle - hen.bagle@gmail.com
// Made this in like 20 mins don't @ me

const proxy = window.location.hostname === "localhost" ? 
    "" : "/cors-proxy/";
const url = "https://masseffectcustomizer.com/api/generate/meta?locale=en-us"

function submitForm()
{
    const form = document.getElementById("massEffectForm");
    const formData = new FormData(form);
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if(request.status === 200)
            {
                setStatus("Success!");
                setImage(request.response);
            }
            else{
                setStatus(`Error ${request.status}`);
            }
        }
    }
    request.open("POST", `${proxy}${url}`);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(Object.fromEntries(formData)));
    setStatus("Loading...");
}

function setStatus(status)
{
    const el = document.getElementById("statusArea")
    el.className = status ? "" : "hidden";
    el.innerHTML = status;

}

function setImage(response)
{
    const parsed = JSON.parse(response);
    document.getElementById("output").src = parsed.meta.imageUrl;
}