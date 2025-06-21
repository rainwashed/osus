<div align="center">
    <img src="public/images/osus-icon.png" width="128"/>
    <h1>osus! - A Spotify playlist generator from osu! beatmaps</h1>
</div>

More documentation is to come once it exists pre-alpha. The default configuration for osus! right now is:

- sorted by best performance
- includes all game modes
- includes all map types
- creates 50 songs
- minimum pp, accuracy, and star rating are 0.
- does not require an fc
- all score grades

please see the docker image if you would like to setup it yourself. proper setup instructions will come:

[![rainwashed/osus:latest](/readme_assets/docker_btn.svg)](https://hub.docker.com/r/rainwashed/osus)

you will also need to setup a Spotify proxy api, which I also have an image to:

[![rainwashed/osus:latest](/readme_assets/docker_btn.svg)](https://hub.docker.com/r/rainwashed/spotify-public-proxy)

_this is version 0.1-alpha_
