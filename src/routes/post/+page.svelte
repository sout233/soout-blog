<script>
	import { goto } from '$app/navigation';
	import LoadingSvg from '$lib/components/LoadingSvg.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/');
	});
</script>

<div class="flex flex-col h-screen w-screen justify-center items-center noto">
    <h1 class="font-bold text-4xl z-10">突破結界中</h1>
    <LoadingSvg className="absolute z-0"/>
    <p class="mt-4 z-10">正在进入幻想乡，请稍候</p>
</div>