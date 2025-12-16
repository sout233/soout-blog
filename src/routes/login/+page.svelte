<script>
	import { supabase } from '$lib/supabaseClient';
	import { animate } from 'animejs';
	import { onMount } from 'svelte';

	function openModal() {
		// @ts-ignore
		document.getElementById('my_modal_1').showModal();
	}

	/**
	 * @type {import("animejs").TargetsParam}
	 */
	let backButton;
	/**
	 * @type {import("animejs").TargetsParam}
	 */
	let loginPanel;

	function handleBackButtonEnter() {
		animate(backButton, {
			scale: 1.2,
			duration: 600,
			rotate: -5,
			ease: 'outElastic'
		});
	}

	function handleBackButtonLeave() {
		animate(backButton, {
			scale: 1,
			duration: 1000,
			rotate: 0,
			ease: 'outElastic'
		});
	}

	let loading = $state(false);

	const handleGithubLogin = async () => {
		try {
			loading = true;
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: 'github',
				options: {
					redirectTo: `${window.location.origin}/auth`
				}
			});
			if (error) throw error;

		} catch (error) {
			loading = false;

			// @ts-ignore
			console.error('登录出错:', error.message);
			// @ts-ignore
			alert(error.message);
		}
	};

	onMount(() => {
		animate(loginPanel, {
			translateX: [-100, 0],
			duration: 1000,
			ease: 'outElastic'
		});
	});
</script>

<div bind:this={loginPanel} class="grid-bg-white noto flex h-[93vh] flex-col justify-center">
	<div
		class="flex -translate-y-24 flex-col gap-2 bg-base-300 py-4 outline-2 transition-all duration-300 hover:gap-4 hover:p-2 hover:shadow-2xl hover:outline-base-300 md:ml-10 md:h-72 md:w-150 md:py-0"
	>
		<h1
			class="bg-black text-4xl font-bold text-base-100 transition-all duration-300 hover:bg-transparent hover:text-base-content"
		>
			登入
		</h1>

		<div class="flex flex-row gap-2">
			<p
				class="place-content-end bg-black text-end text-base-100 transition-all duration-300 hover:place-content-center hover:bg-transparent hover:text-base-content"
			>
				USERNAME
			</p>
			<input type="text" class="input outline-1 outline-black" />
		</div>
		<div class="flex flex-row-reverse gap-2 transition-all duration-300 hover:flex-row">
			<p
				class="place-content-end bg-black text-end text-base-100 transition-all duration-300 hover:place-content-center hover:bg-transparent hover:text-base-content"
			>
				PASSWORD
			</p>
			<input type="text" class="input outline-1 outline-black" />
		</div>

		<button class="btn w-full" onclick={openModal}>登入</button>

		<button disabled={loading} class="btn text-white btn-neutral" onclick={handleGithubLogin}>
			<svg
				aria-label="GitHub logo"
				width="16"
				height="16"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				><path
					fill="white"
					d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
				></path></svg
			>
			{#if loading}
				登入中...
			{:else}
				使用 GitHub 登入
			{/if}
		</button>

		<dialog id="my_modal_1" class="modal">
			<div class="modal-box">
				<h3 class="text-lg font-bold">哦天呐這是糟糕的!</h3>
				<p class="py-4">登入功能暫時被關閉</p>
				<div class="modal-action">
					<form method="dialog">
						<button class="btn">終了。</button>
					</form>
				</div>
			</div>
		</dialog>
	</div>

	<a
		bind:this={backButton}
		href="/"
		class="btn fixed right-4 bottom-4 btn-neutral"
		onpointerenter={handleBackButtonEnter}
		onpointerleave={handleBackButtonLeave}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="24"
			viewBox="0 0 12 24"
			class=" translate-y-[0.5px] scale-80"
			><path
				fill="currentColor"
				fill-rule="evenodd"
				d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
			/></svg
		>
		<p class="">返回到幻想鄉</p>
	</a>
</div>
