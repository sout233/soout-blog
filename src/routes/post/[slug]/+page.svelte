<script lang="ts">
    import AniButton from '$lib/components/AniButton.svelte';
    import { animate } from 'animejs';
    import { marked } from 'marked';
    import { onMount } from 'svelte';

    import hljs from 'highlight.js';
    
    import 'highlight.js/styles/atom-one-dark.css'; 

    let { data } = $props();

    let contentNode: HTMLElement;

    let postHtml = $derived(marked.parse(data.post.content));

    $effect(() => {
        if (contentNode && postHtml) {
            contentNode.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    });

    onMount(() => {
        animate(contentNode, {
            x: [-100, 0],
            duration: 800,
            ease: 'outElastic'
        });
    });
</script>

<svelte:head>
	<title>{data.post.title} - SOUT</title>
</svelte:head>

<a class="fixed bottom-4 left-4 z-20" href="/">
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

<div bind:this={contentNode}>
	<div class="h-8 sm:h-2 md:h-0"></div>

	<header
		class="noto grid-bg mx-2 mt-10 max-w-2xl rounded-4xl bg-black p-4 text-base-300 shadow-2xl transition-all duration-300 hover:rounded-none hover:p-0 hover:shadow-none md:mx-auto lg:max-w-180"
	>
		<h1 class="mb-2 text-3xl font-bold">{data.post.title}</h1>
		<div class="flex flex-row">
			<p class="text-sm">
				{new Date(data.post.created_at).toLocaleString()}
			</p>
		</div>
	</header>

	<article
		class="noto mx-auto prose prose-lg space-y-0 p-4 pt-10 lg:prose-xl prose-headings:my-6 prose-p:my-4 prose-pre:p-0"
	>
		<div class="markdown-body">
			{@html postHtml}
		</div>
	</article>

	<div class="h-24"></div>
</div>
