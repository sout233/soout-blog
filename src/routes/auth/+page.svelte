<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import LoadingSvg from '$lib/components/LoadingSvg.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
				goto('/', { replaceState: true });
			} else if (event === 'SIGNED_OUT') {
				goto('/login');
			}
		});

		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session) {
				goto('/', { replaceState: true });
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="noto flex h-screen w-screen flex-col items-center justify-center">
	<h1 class="z-10 text-4xl font-bold">突破結界中</h1>
	<LoadingSvg className="absolute z-0" />
	<p class="z-10 mt-4">正在进入幻想乡，请稍候</p>
</div>
