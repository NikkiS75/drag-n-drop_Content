export default {
    state: {
        containers: [
            {currentContent: {
                type: '',
                link: '',
                file: File
                },
                coords:{
                    X:0,
                    Y:0
                },
                visible: true,
                history:[
                    {point: {
                        X:0,
                        Y:0,
                        content:{
                           type: '',
                            link: '',
                            file: File
                            },
                            visible: true},

                        },

                ]}
        ],
        activeContainer:0,
        counter: 2
    },
    mutations: {
        updateContainer(state, payload) {
          state.containers[payload.ID].coords.X = payload.coords.X,
          state.containers[payload.ID].coords.Y = payload.coords.Y,
          state.containers[payload.ID].history.push({point:{ Y: payload.coords.Y, X: payload.coords.X, content: {type: state.containers[payload.ID].currentContent.type ,
                      link: state.containers[payload.ID].currentContent.link}, visible: state.containers[payload.ID].visible}})
        },
        addContainer(state, payload) {
            state.containers.push(payload.container)
        },
        removeContainer(state, payload) {
            state.containers[payload].visible = false
            state.containers[payload].history.push({point:{ Y: payload.coords.Y, X: payload.coords.X, content: {type: state.containers[payload.ID].currentContent.type ,
                        link: state.containers[payload.ID].currentContent.link}, visible: state.containers[payload.ID].visible}})
           // state.containers = state.containers.filter((item, index) => index != payload)
        },
        activeContainer(state, payload) {
            state.activeContainer = payload
        },
        backContainer(state, payload) {
            if (state.containers[payload].history.length>1){
                if(state.counter<=state.containers[payload].history.length){
                state.containers[payload].coords.X = state.containers[payload].history[state.containers[payload].history.length-state.counter].point.X
                state.containers[payload].coords.Y = state.containers[payload].history[state.containers[payload].history.length-state.counter].point.Y
                state.containers[payload].coords.visible = state.containers[payload].history[state.containers[payload].history.length-state.counter].point.visible
                state.containers[payload].coords.content = state.containers[payload].history[state.containers[payload].history.length-state.counter].point.content
                state.counter+=1;
                }else{
                    state.counter=2;
                }
            }
        },
        forwardContainer(state, payload) {
            if (state.containers[payload].history.length>1){
                if(state.counter<=state.containers[payload].history.length){
                    state.containers[payload].coords.X = state.containers[payload].history[state.counter-1].point.X
                    state.containers[payload].coords.Y = state.containers[payload].history[state.counter-1].point.Y
                    state.containers[payload].coords.visible = state.containers[payload].history[state.counter-1].point.visible
                    state.containers[payload].coords.content = state.containers[payload].history[state.counter-1].point.content
                    state.counter+=1;
                }else{
                    state.counter=2;
                }
            }
        },
        saveContainer(state, payload) {
            console.log(state.containers[payload].history)
            if (state.containers[payload].history.length>1){
                state.containers[payload].history =  state.containers[payload].history.slice(-1)
            }
        },
        addContent(state, payload) {
            console.log(payload)
            state.containers[payload.ID].currentContent.type = payload.content.type
            state.containers[payload.ID].currentContent.link = payload.content.text
            state.containers[payload.ID].history[state.containers[payload.ID].history.length-1].point.content.type = payload.content.type
            state.containers[payload.ID].history[state.containers[payload.ID].history.length-1].point.content.link = payload.content.text
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
        forwardContainer({commit}, payload){
            commit('forwardContainer', payload)
        },
        saveContainer({commit}, payload){
            commit('saveContainer', payload)
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
        updateContainer ({commit}, payload){
            commit ('updateContainer', payload)
        },
        addContent({commit}, payload) {
            commit('addContent', payload)
        }
    }

}
