<script lang="ts">
	import AniButton from '$lib/components/AniButton.svelte';
	import { userState } from '$lib/userData.svelte';
	import { animate } from 'animejs';
	import { onMount } from 'svelte';

	let contentNode: HTMLElement;

	onMount(() => {
		animate(contentNode, {
			x: [-100, 0],
			duration: 800,
			ease: 'outElastic'
		});
	});
</script>

<div class="h-8 sm:h-2 md:h-0"></div>

<div bind:this={contentNode} class="noto m-4 md:m-10 flex flex-col justify-center">
	<h1 class="text-4xl font-bold">賬戶登記簿</h1>
	<div
		class="mt-4 flex max-w-xl flex-col justify-between border-2 border-base-content bg-base-200 p-2 transition-all hover:m-5 hover:gap-4 hover:rounded-2xl hover:border-base-300 hover:p-4 hover:shadow-2xl"
	>
		<div class="itemcen flex flex-row">
			<img
				src={userState.avatarUrl}
				class="h-12 w-12 translate-y-px rounded-full outline-2"
				alt="avatar"
			/>
			<div class="ml-4 flex flex-col">
				<h1 class="text-xl font-bold">{userState.session?.user.user_metadata.full_name}</h1>
				<h1 class="text-sm font-bold">{userState.session?.user.user_metadata.email}</h1>
			</div>
		</div>
		<AniButton text="登出" href="/logout" className="btn btn-neutral mt-2" rotate="-1" scale="1.1">
			{#snippet icon()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="translate-px scale-80"
					><path
						fill="currentColor"
						d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h6q.425 0 .713.288T12 20t-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12t.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7t.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
					/>
				</svg>
			{/snippet}
		</AniButton>
	</div>
</div>

<a class="fixed right-4 bottom-4 z-20" href="/">
	<AniButton text="折返" href="/">
		{#snippet icon()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="scale-80"
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
</a>
