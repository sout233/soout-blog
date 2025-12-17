<script>
	import { getBrowserInfo, isBrowserSupportSuperAnimation } from '$lib/utils/broswerCheck';
	import { animate } from 'animejs'; // 确保引入正确
	import { onMount } from 'svelte';

	let { title, slug, desc, createdAt } = $props();

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
			<a class="text-2xl font-bold" href="/post/{slug}">{title}</a>
			{#if isBrowserSupportSuperAnimation()}
				<p class="absolute top-0 right-0 text-4xl opacity-20">{createdAt}</p>
			{:else}
				<p class="text-sm opacity-50">{createdAt}</p>
			{/if}
		</div>
		<a class="text-md" href="/post/{slug}">{desc}</a>
	</div>
</li>
