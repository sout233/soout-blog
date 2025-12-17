<script lang="ts">
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
    import NavBar from '$lib/components/NavBar.svelte';
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';
    import { userState } from '$lib/userData.svelte';
	import ToastContainer from '$lib/components/ToastContainer.svelte';
	import { toast } from '$lib/toastQueue.svelte';

    let { children } = $props();

    onMount(() => {
        // 测试 Toast 系统 (你可以在这里测试，也可以在任何组件里调用)
        // toast.success('系统初始化成功！');

        supabase.auth.getSession().then(({ data }) => {
            userState.setSession(data.session);
        });

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, session) => {
            userState.setSession(session);

            if (event === 'SIGNED_OUT'){
                // 2. 现在的用法示例：
                toast.info('您已安全退出');
            } else if (event === 'SIGNED_IN') {
                toast.success('欢迎回来！');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<main>
    <NavBar />
    {@render children()}
    
    <ToastContainer />
</main>