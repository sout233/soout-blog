<script lang="ts">
	import BlogItem from '$lib/components/BlogItem.svelte';
	import { animate } from 'animejs';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { fade } from 'svelte/transition';
	import type { Session } from '@supabase/supabase-js';
	import LoginButton from '$lib/components/LoginButton.svelte';
	import AccountPanel from '$lib/components/AccountPanel.svelte';
	import { userState } from '$lib/userData.svelte';

	let avatarUrl: string | null = $state(null);
</script>

<div class="noto flex flex-col justify-center">
	<div class="grid-bg-white pointer-events-none absolute top-14 z-0 h-screen w-screen"></div>
	<div class="h-8 sm:h-2 md:h-0"></div>
	<ul>
		{#each [1, 2, 3] as i}
			<BlogItem />
		{/each}
	</ul>

	{#if !userState.session}
		<LoginButton />
	{:else}
		<AccountPanel />
	{/if}
</div>
