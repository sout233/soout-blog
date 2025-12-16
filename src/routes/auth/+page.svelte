<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation'; // SvelteKit 的路由跳转
    import { supabase } from '$lib/supabaseClient';
    import LoadingSvg from "$lib/components/LoadingSvg.svelte";

    onMount(() => {
        // 1. 监听 Auth 状态变化
        // 当页面加载，Supabase 会自动解析 URL 中的 hash
        // 解析成功后，会触发 SIGNED_IN 事件
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                // 登录成功！
                // 使用 replaceState: true 防止用户按“后退”键又回到这个处理页面
                goto('/', { replaceState: true }); 
            } else if (event === 'SIGNED_OUT') {
                // 如果解析失败或用户未登录，踢回登录页
                goto('/login');
            }
        });

        // 2. 兜底逻辑：如果用户已经是登录状态进入这个页面，也直接跳转
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                goto('/', { replaceState: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    });
</script>

<div class="flex flex-col h-screen w-screen justify-center items-center noto">
    <h1 class="font-bold text-4xl z-10">突破結界中</h1>
    <LoadingSvg className="absolute z-0"/>
    <p class="mt-4 z-10">正在进入幻想乡，请稍候</p>
</div>