import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      shifts:[
        {
        id: '1',
        title: 'Title',
        description: 'Description',
        events: [ { "date": "2022-02-06T09:17:53.126Z", "id": 1, "start": '8:30', "end":'13:30', "price": 51, "options": "Telephone" },
          { "date": "2022-05-04T09:17:53.126Z", "id": 2, "start": "8:30", "end": "12:30", "price": 200, "options": "Ambulance" },
          { "date": "2022-03-11T09:17:53.126Z", "id": 3, "start": "8:30", "end": "11:30", "price": 500, "options": "Telephone" },
          { "date": "2022-01-14T09:17:53.126Z", "id": 4, "start": "8:30", "end": "12:30", "price": 120, "options": "Consultation" }
        ],

      },
        /*{
          id: '2',
          title: '5555',
          description: 'asdasdasdf',
          events: [ { "date": "2022-05-04T09:17:53.126Z", "id": 1, "start": "8:30", "end": "13:15", "price": 50, "options": "Telephone" },
            { "date": "2022-05-04T09:17:53.126Z", "id": 2, "start": "8:30", "end": "12:30", "price": 11, "options": "Ambulance" },
            { "date": "2022-05-04T09:17:53.126Z", "id": 3, "start": "8:30", "end": "12:30", "price": 500, "options": "Telephone" },
            { "date": "2022-05-04T09:17:53.126Z", "id": 4, "start": "8:30", "end": "12:30", "price": 120, "options": "Consultation" }
          ],

        },
        {
          id: '3',
          title: '3333',
          description: 'dfgdfg',
          events: [ { "date": "2022-05-04T09:17:53.126Z", "id": 1, "start": "8:30", "end": "13:15", "price": 50, "options": "Telephone" },
            { "date": "2022-05-11T09:17:53.126Z", "id": 2, "start": "8:30", "end": "12:30", "price": 355, "options": "Ambulance" },
            { "date": "2022-05-04T09:17:53.126Z", "id": 3, "start": "8:30", "end": "12:30", "price": 500, "options": "Telephone" },
            { "date": "2022-05-04T09:17:53.126Z", "id": 4, "start": "8:30", "end": "12:30", "price": 120, "options": "Consultation" }
          ],

        },
        {
          id: '4',
          title: '123123',
          description: 'ghj',
          events: [ { "date": "2022-05-04T09:17:53.126Z", "id": 1, "start": "8:30", "end": "13:15", "price": 50, "options": "Telephone" },
            { "date": "2022-05-13T09:17:53.126Z", "id": 2, "start": "8:30", "end": "12:30", "price": 200, "options": "Ambulance" },
            { "date": "2022-05-04T09:17:53.126Z", "id": 3, "start": "8:30", "end": "12:30", "price": 700, "options": "Telephone" },
            { "date": "2022-05-04T09:17:53.126Z", "id": 4, "start": "8:30", "end": "12:30", "price": 120, "options": "Consultation" }
          ],

        }*/
      ],
      minMax:null,
      filter: null,
    },
    getters: {
      getShifts(state) {

        function inRange(x, min, max) {
          return ((x-min)*(x-max) <= 0);
        }
        return state.filter
          ? state.shifts.map(el => {
            return {
              ...el,
              events: el.events.filter(event => inRange(event.price, ...state.filter))
            }
          })
          : state.shifts
      },
      getFilter(state) {

        const s = state.shifts.reduce((acc,cur) => {
          const arr = cur.events.map(el => el.price)
          const max = Math.max.apply(null, arr)
          const min = Math.min.apply(null, arr)

          if(!acc) return {max,min}

          if(max > acc.max) acc.max = max
          if(min < acc.min) acc.min = min
          return acc

        }, null)
        // state.minMax = s
        return s
      }
    },
    mutations: {
      addShift(state, payload) {
        state.shifts.push(payload)
      },
      editShift(state, payload) {
        const { index, shift} = payload

        shift
          ? state.shifts.splice(index,1, shift)
          : state.shifts.splice(index,1)

      },

      setFilter(state, payload) {

        state.filter = payload
      },
    },
    actions: {
      saveShift({state, dispatch, commit}, payload) {
        const { shift, operation } = payload
        const shiftObj = state.shifts.find(el => el.id === shift.id)
        const index = state.shifts.indexOf(shiftObj)

        if(index >= 0) {
          if(operation == 'delete') {
            commit('editShift', { index , shift: null})
          }else{
            commit('editShift', { index , shift })
          }
        }
        else if(!operation) {
          shift.id = state.shifts.length +1
          commit('addShift',  shift )
        }

      }
    },

  })
}

export default createStore
