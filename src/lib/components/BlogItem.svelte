<script>
	import { getBrowserInfo, isBrowserSupportSuperAnimation } from '$lib/utils/broswerCheck';
	import { animate } from 'animejs'; // 确保引入正确
	import { onMount } from 'svelte';

	let { title, slug, desc, createdAt, locked } = $props();

	/**
	 * @type {import("animejs").TargetsParam}
	 */
	let containerNode;

	let isBrowserSupported = $state(true);

	function handleMouseEnter() {
		if (!isBrowserSupported) return;

		animate(containerNode, {
			padding: '2.125rem',
			duration: 800,
			ease: 'outElastic(1, .6)'
		});
	}

	function handleMouseLeave() {
		if (!isBrowserSupported) return;

		animate(containerNode, {
			padding: '0rem',
			duration: 100
		});
	}

	onMount(() => {
		isBrowserSupported = isBrowserSupportSuperAnimation();

		if (!isBrowserSupported) return;

		animate(containerNode, {
			opacity: [0, 1],
			x: [{ from: '-20rem', ease: 'outExpo', duration: 1145 }],
			duration: 1000
		});
	});
</script>

<li
	bind:this={containerNode}
	onpointerenter={handleMouseEnter}
	onpointerleave={handleMouseLeave}
	class="block"
>
	<div
		class="flex h-24 flex-col bg-base-200/90 outline-1 outline-black transition-all duration-300 ease-in-out hover:rounded-2xl hover:p-2 hover:shadow-2xl hover:outline-base-300"
	>
		<div class="flex w-full flex-row justify-between">
			<a class="text-xl font-bold md:text-2xl" href="/post/{slug}">{title}</a>
			{#if isBrowserSupportSuperAnimation()}
				<p class="absolute top-0 right-0 text-4xl opacity-20">{createdAt}</p>
			{:else}
				<p class="text-sm opacity-50">{createdAt}</p>
			{/if}
		</div>
		<a class="text-[0.98rem]" href="/post/{slug}">{desc}</a>
		{#if locked}
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="place-self-end scale-200 items-end opacity-20">
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M18 10.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3v-3a6 6 0 1 1 12 0zm-6-7a4 4 0 0 1 4 4v3H8v-3a4 4 0 0 1 4-4m6 9H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1"
				clip-rule="evenodd"
			/>
		</svg>
		{/if}
	</div>
</li>
