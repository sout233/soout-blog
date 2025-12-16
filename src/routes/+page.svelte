<script lang="ts">
	import BlogItem from '$lib/components/BlogItem.svelte';
	import AniButton from '$lib/components/AniButton.svelte';
	import AccountPanel from '$lib/components/AccountPanel.svelte';
	import { userState } from '$lib/userData.svelte';

	let svgHtml = `
    <svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		class="translate-y-[0.5px] scale-80"
		><path
			fill="currentColor"
			d="M13 21q-.425 0-.712-.288T12 20t.288-.712T13 19h6V5h-6q-.425 0-.712-.288T12 4t.288-.712T13 3h6q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-1.825-8H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7.175L9.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L14.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288T9.3 16.25q-.275-.3-.262-.712t.287-.688z"
		/></svg
	>
    `;

	let { data } = $props();
</script>

<div class="noto flex flex-col justify-center">
	<div class="grid-bg-white pointer-events-none absolute top-14 z-0 h-screen w-screen"></div>
	<div class="h-8 sm:h-2 md:h-0"></div>
	<ul>
		{#each data.posts as post}
			<BlogItem title={post.title} slug={post.slug} />
		{/each}
	</ul>

	{#if !userState.session}
		<AniButton text="想要登入?" href="/login" {svgHtml} className='btn fixed right-4 bottom-4 btn-neutral' />
	{:else}
		<AccountPanel />
	{/if}
</div>
