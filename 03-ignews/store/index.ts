import { actionTree, getAccessorType } from 'typed-vuex';
import { Context } from '@nuxt/types';
import { Auth } from '@nuxtjs/auth-next';
import { saveUser } from '~/services/fauna/saveUser';
import { State } from './types';

export const state = (): State => ({
	auth: {} as Auth,
});

export type RootState = ReturnType<typeof state>

export const getters = {
	getUser: (state: RootState) => state.auth.user,
};

export const actions = actionTree(
	{ getters, state },
	{
		nuxtServerInit ({ state, dispatch }, { store }: Context) {
			store.watch(
				(state, getters) => {
					return getters.getUser;
				},
				async (user, oldUser) => {
					if (user !== oldUser) {
						await saveUser(user);
					}
				},
				{
					deep: true,
					immediate: true,
				},
			);
		},
	},
);

export const accessorType = getAccessorType({
	actions,
	getters,
	state,
});
