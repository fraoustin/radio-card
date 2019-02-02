Radio-card
==========

A minimalistic radio listen card for Home Assistant Lovelace UI.

I use audiojs from A minimalistic radio listener card for Home Assistant Lovelace UI.

Installation
------------

```
cd hass
mkdir -p www/custom-lovelace/
cd www/custom-lovelace/
git clone https://github.com/fraoustin/radio-card.git
  ```
Add a reference to `radio-card.js` inside your `ui-lovelace.yaml`.

```yaml
resources:
- url: /local/custom-lovelace/radio-card/radio-card.js
    type: js
```

Usage
-----

```yaml
views:
  - title: Radio
    path: radio
    icon: mdi:radio
    cards:
      - type: custom:radio-card
        radios:
          - name: france inter
            img: /local/custom-lovelace/radio-card/franceinter.png
            stream: http://direct.franceinter.fr/live/franceinter-midfi.mp3
          - name: france info
            img: /local/custom-lovelace/radio-card/franceinfo.png
            stream:  http://direct.franceinfo.fr/live/franceinfo-midfi.mp3
          - name: france culture
            img: /local/custom-lovelace/radio-card/franceculture.png
            stream: http://direct.franceculture.fr/live/franceculture-midfi.mp3
          - name: france musique
            img: /local/custom-lovelace/radio-card/francemusique.png
            stream: http://direct.francemusique.fr/live/francemusique-midfi.mp3
          - name: tsf jazz
            img: /local/custom-lovelace/radio-card/tsfjazz.png
            stream: http://broadcast.infomaniak.net/tsfjazz-high.mp3
```

![radio-card action](https://github.com/fraoustin/radio-card/blob/master/radio-card.png)
