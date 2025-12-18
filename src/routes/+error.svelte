<script lang="ts">
	import { page } from '$app/state';
	import AniButton from '$lib/components/AniButton.svelte';
	import LoadingSvg from '$lib/components/LoadingSvg.svelte';
</script>

<div class="noto flex h-screen w-screen flex-col items-center justify-center">
	<h1 class="z-10 text-4xl font-bold">发生了异变</h1>
	<LoadingSvg className="absolute z-0" />
	<p class="z-10 mt-4">{page.status}: {page.error?.message}</p>
	<AniButton text="折返至主页" href="/" className="btn btn-ghost btn-sm z-10 mt-4">
		{#snippet icon()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="translate-y-[0.5px] scale-70"
				width="12"
				height="24"
				viewBox="0 0 12 24"
				><path
					fill="currentColor"
					fill-rule="evenodd"
					d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
				/></svg
			>
		{/snippet}
	</AniButton>
</div>
