<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import type { Session } from '@supabase/supabase-js';
	import { userState } from '$lib/userData.svelte';

	let { children } = $props();

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			userState.setSession(data.session);
		});

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			userState.setSession(session);

			if (event === 'SIGNED_OUT'){
				console.log('User signed out');
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
</main>
