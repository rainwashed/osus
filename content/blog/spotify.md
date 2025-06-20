---
date: 18-Jun-2025
title: Spotify access has been revoked.
author: rainwashed
---

TL;DR: Spotify's new API policies make it impossible for hobby projects to be accessed from other users. If you want to use it with spotify, you must setup your own instance of osus!.

### Spotify's harsh policies

From May 15th 2025, which was only a month ago, Spotify changed their policies to have an app move from **development mode** to **extended access**. Their new policy requires:

1. Established Business Entity (legally registered business or organization)
2. Operating an active, and Launched Service
3. Maintaining a minimum of active users (at least 250k MAUs)
4. Being available in key Spotify markets
5. Commercial Viability
6. Adherence to Terms

osus! would only be able to adhere to policies 2. and 6., as osus! cannot and will not:

- Form as a legal business entity (policy 1)
- Reach 250,000 monthly active users _before_ applying for **extended access** (policy 3)
- Is not monetized nor will be monetized (policy 4 and 5)

The difference in these are substantial, as **extend access** gives the developer more API calls and also allow for the app to be used by other people. This is not the case for **development mode**, which can only allow _added users_ which is limited to 25 users! Therefore, this hobby project cannot be used the way it was intended, and there are only certain workarounds that I can attempt to try. They each have their pros and cons and can be seen in the [current options](#current-options) section.

It seems that there is heavy speculation as to why Spotify is choosing to limit developers, and from reading the replies to the announcement that Spotify made on their developer forums, many seem to speculate that AI is to blame. I think so too, as I believe that Spotify has the ability to send the raw audio file of tracks in their API, which then could be used to train AI for whatever shit that it's used for these days. There was another project I used called [Spotube](https://spotube.krtirtho.dev/) which faced a different but related issue that osus! is facing right now (even before a real "launch" was created); they had been DMCAD out of existence simply for using the API.

Therefore, the best course of action is not to poke the bear and to see what can be done for osus! to still be functional.

### Current options

#### Using a personal OAuth token instead

Currently, osus! is using a workaround method that involves two parts:

1. The authorization header that is Spotify uses on their native platform to create playlist
2. A proxy servers in order to query songs to Spotify

Now, I can understand your distrust when it requires that you give up your own personal OAuth token, and I cannot do much to win your trust except state that this project is **fully open source** and can be found [here](https://github.com/rainwashed/osus). The oauth token that you provide is **only ever stored in localStorage** and never is sent to anywhere except for Spotify's api (which is called in the browser context and not in the server context). The only time the proxy Spotify server is used, whose source can be found [here](https://github.com/rainwashed/spotify-public-proxy), is to query for songs based on the artist and title.

If you are truly distrustful, I suggest you create a temporary or alternate account for Spotify, and once osus! creates the playlist, you can share it with yourself or (if you use spicetify) copy the playlist to your primary account.

Knowing that, if you want Spotify access, this button will confirm it:
::confirm
::

### Setting up an osus! instance

Please see [this blog post]() for more information.

### Closing statement

So, _what's the point of it all?_ Honestly, I don't know. This issue arose right around bare alpha, so, the project isn't dead and isn't going to die either. This project has the chance to be something decently big within the osu! community, and that is my hope for this project. I have personally not played osu! in a long time, yet, the community that gathers around it and the appreciation it has for music is something that is deeply valuable. However, unless Spotify changes it's ways, there is nothing that can be concretely done, and it will always be a tail chase to figure something out.

I believe [this comment](https://community.spotify.com/t5/Spotify-for-Developers/Updating-the-Criteria-for-Web-API-Extended-Access/m-p/7011573/highlight/true#M18167) from _yaktam_ reveals the attitude I have the best:

**Dear Spotify**,
Let me be blunt: unless a developer shows up with **250,000 monthly users**, you're not interested.
Message received. But you might want to look around—because this isn't the first time a company thought it could wall off innovation and still win.
Let's take a walk down “We Could've Owned the Future” Lane:

- **Blackberry** thought people wanted keyboards forever. Then Apple handed developers the keys to the app store. You know how that ended.
- **Kodak** invented digital photography... and buried it to protect their film business. How'd that go? Bankruptcy in 2012.
- **MySpace** ruled the web, until it focused on ads and control instead of enabling users and devs. Now it's a ghost town with autoplaying emo tracks.
- **Sony Betamax** had superior tech—but JVC opened VHS to the world. VHS won.
- **3DFX** made jaw-dropping graphics cards… and insisted on doing everything in-house. Nvidia opened the door to developers and ate their lunch.
- **Nvidia** and **JVC** didn't hoard their power. They _shared_ it—and became legends.

Spotify, you have a choice. You can follow the path of the walled garden kings who crumbled under the weight of their own fences… or you can be the platform that fuels innovation by **inviting others to build with you**, not just for you.
Because here's the hard truth: **your API isn't the product. Your openness is.**
Developers aren't your enemy—they're your free R&D lab. They turn “good platform” into “can't live without it.” But only if you let them in.
Right now, your policy says:
“Come back when you've made it.”
But the next great idea? It usually starts with one dev in a basement, not a startup with a press kit and Series A funding.
If you keep hoarding access, someone else **will** come along, open up their ecosystem, and take the creative world by storm. And when they do, Spotify won't be disrupted—it'll be **forgotten**.
You can still change that.

Sincerely,

A Developer Who Wanted to Build With You
But Will Gladly Build Without You
