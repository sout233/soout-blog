<script>
	import BlogItem from '$lib/components/BlogItem.svelte';
	import { animate } from 'animejs';

	/**
	 * @type {import("animejs").TargetsParam}
	 */
	let loginButton;

	function handleLoginButtonEnter() {
		animate(loginButton, {
			scale: 1.2,
			duration: 600,
            rotate: -5,
			ease: 'outElastic'
		});
	}

	function handleLoginButtonLeave() {
		animate(loginButton, {
			scale: 1,
			duration: 1000,
            rotate: 0,
			ease: 'outElastic'
		});
	}
</script>

<div class="noto flex flex-col justify-center">
	<div class="grid-bg-white absolute top-14 z-0 h-screen w-screen pointer-events-none"></div>
	<div class="h-8 sm:h-2 md:h-0"></div>
	<ul>
		{#each [1, 2, 3] as i}
			<BlogItem />
		{/each}
	</ul>

	<a
		bind:this={loginButton}
		href="/login"
		class="btn fixed right-4 bottom-4 btn-neutral"
		onpointerenter={handleLoginButtonEnter}
		onpointerleave={handleLoginButtonLeave}
	>
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
		<p class="">想要登入?</p>
	</a>
</div>
