export const initializeDebugSystem = (entities) => {
    window.addEventListener('click', (event) => {
        const targetId = event.target.id
        const targetEntity = entities.find(({id}) => id === targetId)

        console.log(targetEntity)
    })
}