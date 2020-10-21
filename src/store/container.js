export default {
    state: {
        containers: [
            {content: 'dkjcbdjbc',
                movements: [],
                coords:{
                    X:undefined,
                    Y:undefined
                },
                history:[]}
        ],
        activeContainer:0,
        counter: 2
    },
    mutations: {
        addMovement(state, payload){
            state.containers[payload.ID].movements.push(payload.movement)
        },
        updateContainer(state, payload) {
          state.containers[payload.ID].coords.X = payload.coords.X,
          state.containers[payload.ID].coords.Y = payload.coords.Y,
          state.containers[payload.ID].history.push({point:{ Y: payload.coords.Y, X: payload.coords.X}})
            //console.log(state.containers)
        },
        addContainer(state, payload) {
            state.containers.push(payload.container)
        },
        removeContainer(state, payload) {
            state.containers = state.containers.filter((item, index) => index != payload)
        },
        activeContainer(state, payload) {
            state.activeContainer = payload
        },
        backContainer(state, payload) {
            if (state.containers[payload].history.length>1){
                if(state.counter<=state.containers[payload].history.length){
                state.containers[payload].coords.X = state.containers[payload].history[state.containers[payload].history.length-state.counter].point.X
                state.containers[payload].coords.Y = state.containers[payload].history[state.containers[payload].history.length-state.counter].point.Y
                state.counter+=1;
                }
            }
        }
    },
    getters: {
        getAllContainers(state){
            return state.containers
        },
        getActiveContainer(state){
            return state.activeContainer
        },
        getContainerByID(state){
            return containerID => {
                return state.containers.find((container, index) => index === containerID )
            }
        }
    },
    actions: {
        backContainer({commit}, payload){
            commit('backContainer', payload)
        },
        addContainer({commit}, payload){
            commit('addContainer', payload)
        },
        removeContainer({commit},payload) {
            commit('removeContainer', payload)
        },
        activeContainer ({commit}, payload){
            commit ('activeContainer', payload)
        },
        addMovement ({commit}, payload){
            commit ('addMovement', payload)
        },
        updateContainer ({commit}, payload){
            commit ('updateContainer', payload)
        }
    }

}
