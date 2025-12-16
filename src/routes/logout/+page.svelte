<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import LoadingSvg from '$lib/components/LoadingSvg.svelte';
	import { onMount } from 'svelte';

	async function handleLogout() {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			goto('/login');
		} catch (error: any) {
			console.error('登出失败:', error.message);
			alert('登出遇到问题，请重试');
		}
	}

	onMount(() => {
		handleLogout();
	});
</script>

<div class="noto flex h-screen w-screen flex-col items-center justify-center">
	<h1 class="z-10 text-4xl font-bold">治退</h1>
	<LoadingSvg className="absolute z-0" />
	<p class="z-10 mt-4">少女折寿中...</p>
</div>
