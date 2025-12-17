<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { userState } from '$lib/userData.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { toast } from '$lib/toastQueue.svelte';
	import { random } from 'animejs';

	let { children } = $props();

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			userState.setSession(data.session);
		});

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			userState.setSession(session);

			if (event === 'SIGNED_OUT') {
				toast.info('已離開幻想鄉');
			} else if (event === 'SIGNED_IN') {
				let randomNum = random(1, 5);

				if (randomNum === 1) {
					toast.success('已突破結界');
				} else if (randomNum === 2) {
					toast.success('WELCOME BACK');
				} else if (randomNum === 3) {
					toast.info('你此刻身處於神社之中...');
				} else {
					toast.wtf('怎麽又回來了？');
				}
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main>
	<NavBar />
	{@render children()}

	<ToastContainer />
</main>
