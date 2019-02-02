function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); 
    template.innerHTML = html;
    return template.content.firstChild;
}

function load(url) {
    if (audio.mp3==url && audio.playing==true) {
        audio.pause();
    } else {
        audio.load(url);
        audio.play();              
    };
}

function loadScript(url){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                audiojs.events.ready(function() {
                var as = audiojs.createAll();
                    audio=as[0];
                });
            }
        };
    } else {  //Others
        script.onload = function(){
            audiojs.events.ready(function() {
            var as = audiojs.createAll();
                audio=as[0];
            });
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var templateAudioJs = `
    <div style="visibility: hidden;">
    <audio></audio>
    </div>
    `;
var templateRadio = `
    <state-badge id="ItemId" class="badgeradio" style='background-image: url("ItemImg");border-radius: 0; width:80px; height:80px; margin:10px; filter: grayscale(100%);'></state-badge>
    `;

class RadioCard extends HTMLElement {

    setConfig(config) {
        this.config = config;

        var radiojs = htmlToElement(templateAudioJs);
        document.body.insertBefore(radiojs, document.body.firstChild);

        for (var i = 0; i < config.radios.length; ++i) {
            var item = config.radios[i];
            var radio = htmlToElement(
                templateRadio
                    .replace("ItemId", i)
                    .replace("ItemImg", item.img)
            );
            this.append(radio);
        } 
        loadScript("/local/custom-lovelace/radio-card/audio.js")
        var listOfItems = this.childNodes
        for (var i = 0; i < listOfItems.length; ++i) {
            var item = this.childNodes[i];
            item.onclick = function(){
                load(this.parentElement.config.radios[this.id].stream)
                var listOfBrothers = this.parentElement.childNodes
                for (var i = 0; i < listOfItems.length; ++i) {
                    var item = this.parentElement.childNodes[i];
                    if (item.id==this.id) {
                        if (item.style.filter=="grayscale(100%)") {
                            item.style.filter="grayscale(0%)"
                        } else {
                            item.style.filter="grayscale(100%)"
                        }
                    } else {
                        item.style.filter="grayscale(100%)";
                    }
                }
            }
        }
        

    }
    getCardSize() {
        return this.config.radios.length + 1;
    }
}
customElements.define('radio-card', RadioCard);