<script lang="ts">
    import Toast from './Toast.svelte';
    import { fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
	import { toast } from '$lib/toastQueue.svelte';
</script>

<div class="fixed bottom-4 left-4 z-50 flex max-w-sm flex-col gap-2">
    {#each toast.toasts as item (item.id)}
        <div 
            animate:flip={{ duration: 300 }} 
            transition:fly={{ y: 20, duration: 300 }}
        >
            <Toast 
                message={item.message} 
                level={item.level} 
                onClose={() => toast.remove(item.id)}
            />
        </div>
    {/each}
</div>