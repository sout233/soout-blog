<script lang="ts">
    import AniButton from '$lib/components/AniButton.svelte';
import { animate } from 'animejs';
    import { marked } from 'marked';
    import { onMount } from 'svelte';

    let { data } = $props();

    let contentNode: HTMLElement; 

    let postHtml = $derived(marked.parse(data.post.content));

    onMount(() => {
        animate(contentNode, {
            x: [-100, 0],
            duration: 800,
            ease: 'outElastic'
        });
    });
</script>

<svelte:head>
    <title>{data.post.title} - SOUT BLOG</title>
</svelte:head>


<a class="fixed bottom-4 left-4 z-20" href="/">
    <AniButton text="折返" href="/" svgHtml='<svg xmlns="http://www.w3.org/2000/svg" class="scale-80" width="12" height="24" viewBox="0 0 12 24"><path fill="currentColor" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/></svg>'></AniButton>
</a>

<div bind:this={contentNode}>
    <div class="h-8 sm:h-2 md:h-0"></div>

    <header
        class="noto grid-bg mx-2 mt-10 max-w-2xl lg:max-w-180 rounded-4xl bg-black p-4 text-base-300 shadow-2xl transition-all duration-300 hover:rounded-none hover:p-0 hover:shadow-none md:mx-auto"
    >
        <h1 class="mb-2 text-3xl font-bold">{data.post.title}</h1>
        <div class="flex flex-row">
            <p class="text-sm">
                {new Date(data.post.created_at).toLocaleString()}
            </p>
        </div>
    </header>

    <article
        class="noto mx-auto prose space-y-0 p-4 pt-10 lg:prose-xl prose-headings:my-4 prose-p:my-2"
    >
        <div class="markdown-body">
            {@html postHtml}
        </div>
    </article>
</div>