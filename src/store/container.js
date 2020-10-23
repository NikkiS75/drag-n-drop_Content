export default {
    state: {
        containers: [
            {currentContent: {
                type: '',
                link: '',
                },
                coords:{
                    X:0,
                    Y:0
                },
                width:200,
                height:200,
                visible: true,
                counter: 0,
                history:[
                    {point: {
                        X:0,
                        Y:0,
                        width:200,
                        height:200,
                        content:{
                           type: '',
                            link: '',
                            },
                            visible: true},

                        },

                ]}
        ],
        activeContainer:0,
    },
    mutations: {
        updateContainer(state, payload) {
          state.containers[payload.ID].coords.X = payload.coords.X,
          state.containers[payload.ID].coords.Y = payload.coords.Y,
          state.containers[payload.ID].width = payload.width,
          state.containers[payload.ID].height = payload.height,
          state.containers[payload.ID].history.push(
              {point:{ Y: payload.coords.Y,
                      X: payload.coords.X,
                      content: {type: state.containers[payload.ID].currentContent.type ,
                      link: state.containers[payload.ID].currentContent.link},
                      visible: state.containers[payload.ID].visible,
                      width:payload.width,
                      height:payload.height,
              }})
            console.log(state.containers[payload.ID])
            state.containers[payload.ID].counter +=1;
        },
        addContainer(state, payload) {
            state.containers.push(payload.container)
        },
        removeContainer(state, payload) {
            state.containers[payload].visible = false
            state.containers[payload].history.push(
                {point:{Y: state.containers[payload].coords.Y,
                        X: state.containers[payload].coords.X,
                        content: {type: state.containers[payload].currentContent.type,
                        link: state.containers[payload].currentContent.link},
                        visible: state.containers[payload].visible,
                        width: state.containers[payload].width,
                        height: state.containers[payload].height
                }})
            state.containers[payload].counter +=1;
           // state.containers = state.containers.filter((item, index) => index != payload)
        },
        activeContainer(state, payload) {
            state.activeContainer = payload
        },
        backContainer(state, payload) {
            if (state.containers[payload].history.length>1 && state.containers[payload].counter!==0){
                state.containers[payload].counter-=1;
                state.containers[payload].coords.X = state.containers[payload].history[state.containers[payload].counter].point.X
                state.containers[payload].coords.Y = state.containers[payload].history[state.containers[payload].counter].point.Y
                state.containers[payload].visible = state.containers[payload].history[state.containers[payload].counter].point.visible
                state.containers[payload].currentContent = state.containers[payload].history[state.containers[payload].counter].point.content
                state.containers[payload].width = state.containers[payload].history[state.containers[payload].counter].point.width
                state.containers[payload].height = state.containers[payload].history[state.containers[payload].counter].point.height
            }
        },
        forwardContainer(state, payload) {
            if (state.containers[payload].history.length>1){
                if(state.containers[payload].counter<state.containers[payload].history.length){
                    state.containers[payload].counter+=1;
                    state.containers[payload].coords.X = state.containers[payload].history[state.containers[payload].counter].point.X
                    state.containers[payload].coords.Y = state.containers[payload].history[state.containers[payload].counter].point.Y
                    state.containers[payload].visible = state.containers[payload].history[state.containers[payload].counter].point.visible
                    state.containers[payload].currentContent = state.containers[payload].history[state.containers[payload].counter].point.content
                    state.containers[payload].width = state.containers[payload].history[state.containers[payload].counter].point.width
                    state.containers[payload].height = state.containers[payload].history[state.containers[payload].counter].point.height
                }

            }
        },
        saveContainer(state, payload) {
            if (state.containers[payload].history.length>1){
                state.containers[payload].history =  state.containers[payload].history.slice(-1)
                state.containers[payload].counter = 0
            }
        },
        addContent(state, payload) {
            state.containers[payload.ID].currentContent.type = payload.content.type
            state.containers[payload.ID].currentContent.link = payload.content.url
            state.containers[payload.ID].history.push({
                point:{ Y: state.containers[payload.ID].coords.Y,
                    X:state.containers[payload.ID].coords.X,
                    content: {
                    type: state.containers[payload.ID].currentContent.type ,
                    link: state.containers[payload.ID].currentContent.link},
                    visible: state.containers[payload.ID].visible,
                    width: state.containers[payload.ID].width,
                    height: state.containers[payload.ID].height}})
            state.containers[payload.ID].counter +=1;
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
