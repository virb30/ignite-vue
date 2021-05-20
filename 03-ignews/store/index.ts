import { getterTree, actionTree } from 'typed-vuex'
import { Context } from '@nuxt/types'
import { Auth } from '@nuxtjs/auth-next'
import { saveUser } from '~/services/fauna/saveUser'

export const state = () => ({
  auth: {} as Auth,
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  getUser: (state) => {
    return state.auth.user
  },
})

export const actions = actionTree(
  { state, getters },
  {
    nuxtServerInit({ state, dispatch }, { store }: Context) {
      store.watch(
        (state, getters) => {
          return getters.getUser
        },
        async (user, oldUser) => {
          if (user !== oldUser) {
            await saveUser(user)
          }
        },
        {
          deep: true,
          immediate: true,
        }
      )
    },
  }
)
