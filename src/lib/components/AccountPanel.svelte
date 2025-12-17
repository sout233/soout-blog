<script lang="ts">
	import { animate } from 'animejs';
	import { userState } from '$lib/userData.svelte';
	import { onMount } from 'svelte';
	import { getBrowserInfo } from '$lib/utils/broswerCheck';

	let userPanelNode: HTMLElement | null = $state(null);

	let isHovering = $state(false);

	let isMobile = $state(false);

	onMount(() => {
		const info = getBrowserInfo();
		isMobile = info.isMobile;
	});

	function handleUserPanelMouseEnter() {
		if (isMobile) return;

		isHovering = true;

		if (userPanelNode) {
			animate(userPanelNode, {
				width: '10rem',
				duration: 600,
				ease: 'outElastic'
			});

			animate(userPanelNode, {
				scale: 1.1,
				duration: 600,
				ease: 'outBack(3)'
			});
		}
	}

	function handleUserPanelMouseLeave() {
		if (isMobile) return;

		isHovering = false;

		if (userPanelNode) {
			animate(userPanelNode, {
				width: '3rem',
				duration: 300,
				ease: 'outExpo'
			});

			animate(userPanelNode, {
				scale: 1,
				duration: 600,
				ease: 'inOutBack(3)'
			});
		}
	}
</script>

<div
	bind:this={userPanelNode}
	onpointerenter={handleUserPanelMouseEnter}
	onpointerleave={handleUserPanelMouseLeave}
	class="fixed right-4 bottom-4 z-20 flex h-12 w-12 flex-row justify-between rounded-4xl bg-black p-1"
>
	<div class={['flex h-full flex-row items-center justify-center', isHovering ? 'flex' : 'hidden']}>
		<a
			href="/logout"
			class="flex h-full justify-center rounded-4xl bg-black p-2 text-base-300 transition-all hover:font-bold hover:text-error hover:ring hover:ring-error"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				class="translate-px scale-80"
				><path
					fill="currentColor"
					d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
				/></svg
			>
			<span class="translate-y-0.5 text-sm"> LOGOUT </span>
		</a>
	</div>
	<a href="/account" class="block h-10 w-10 place-self-end">
		<img
			class="h-full w-full rounded-full object-cover hover:animate-spin"
			src={userState.avatarUrl}
			alt="avatar"
		/>
	</a>
</div>
