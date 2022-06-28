export class UIRendering {
  static run(entities, turns) {
    const $turnsCounter = document.querySelector("#turns");
    $turnsCounter.innerHTML = turns;

    document.querySelector('#stats').remove()
    const $ui = document.querySelector('.ui')
    const $stats = document.createElement('div')
    $stats.id = "stats"
    $ui.appendChild($stats)

    entities.forEach((entity) => {
      const health =  entity.health.value > 0 ? entity.health.value : 'dead'
        const cardId = `${entity.id}-stats`
        const $card = document.querySelector(`#${cardId}`) || document.createElement("div")
        $card.id = cardId;
        $card.className = "entity-card"
        $card.innerHTML = `${entity.id} - ${health}`
        document.querySelector('#stats').appendChild($card)
    })

  }
}
