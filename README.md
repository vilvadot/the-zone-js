# The Zone JS

Lightweight Roguelike built using [Rotjs](https://ondras.github.io/rot/hp/).

⚠️ This is very much a work in progress

## The lore

You are a rookie [S.T.A.L.K.E.R](https://en.wikipedia.org/wiki/S.T.A.L.K.E.R.)

You start on the rookie camp, sad guitars can be heard in the distance. A fain smell of vodka, cold sausage and blood fills the air.

Every morning you venture yourself around the camp to scavenge some stuff. Sometimes you find the balls to get into an anomaly and look for an artifact. Most of times you don't.

You come back to sell the little you can find to Sidorovich. You spend most of your profits in more vodka and sausage, not everyone was lucky today, you share with your comrades. You save some to upgrade your gear.

You dream of venturing far away, to the virgin lands where few stalkers had the courage to step on. Where the artifacts pile on every corner waiting to be discovered. Where the mutants haven't been decimated and rarely eat. But not today.

You must survive to live another day. Every few night blowouts happen, the camp is secure, but The Zone changes. Anomalies switch place, herds of mutants appear out of nowhere, comrades unlucky enough to be caught out there disappear to never be seen again.

But you are still alive today. The grind never ends. Maybe tomorrow. Take care stalker

## Controls

| Action         | Keys         |
| -------------- | ------------ |
| Move up        | W/Arrow up   |
| Move down      | D/Arrow down |
| Move left      | A/Arrow left |
| Aim            | T            |
| Shoot          | Mouse click  |
| Talk           | Space        |
| Pickup objects | E            |

## Debugging Flags

You have a few debug flags that can be used for debugging by setting the parameter in the url like so: `/game?flag=true`

- **text**: Activates text mode
- **debug**: Removes Field of View. Shows anomalies

## How to use it

1. Run `npm install`
2. Run `npm run build`
3. Run `npm run preview`
4. Play!

## How to develop

Same as before but use `npm run dev` in a different terminal session for live reloading

## How to run tests

1. Run `npm install`
2. Run `npm test`

To run a specific suite use `npm test -- testSute`
