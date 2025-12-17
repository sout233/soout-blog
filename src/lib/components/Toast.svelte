<script lang="ts">
	let {
		message,
		level = 'info',
		onClose
	}: {
		message: string;
		level?: string;
		onClose?: () => void;
	} = $props();

	let infoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01"/><path d="M11 12h1v4h1"/></g></svg>`;
	let warningSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.875 6.27c.7.398 1.13 1.143 1.125 1.948v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1-2.184 0l-6.75-4.27A2.23 2.23 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98zM12 8v4m0 4h.01"/></svg>`;
	let successSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"/><path d="m9 12l2 2l4-4"/></g></svg>`;
	let errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m7-2l4 4m0-4l-4 4"/></svg>`;
	let wtfSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m6-4h.01M15 8h.01M11 12h2"/></svg>`;

	let svg = $derived.by(() => {
		if (level === 'info') return infoSvg;
		if (level === 'warning') return warningSvg;
		if (level === 'success') return successSvg;
		if (level === 'error') return errorSvg;
		return wtfSvg;
	});

	let css = $derived.by(() => {
		if (level === 'error') return 'bg-error-content text-error border border-error/20'; // 稍微优化了样式
		if (level === 'warning') return 'bg-warning-content text-warning border border-warning/20';
		if (level === 'success') return 'bg-success-content text-success border border-success/20';
		return 'bg-neutral text-neutral-content border border-white/10';
	});
</script>

<button
	type="button"
	onclick={onClose}
	class="noto text-bold max-w-64 md:max-w-lg flex cursor-pointer flex-row items-center rounded-3xl px-3 py-2 text-left shadow-lg transition-all duration-300 ease-in-out hover:scale-95 hover:opacity-80 {css}"
>
	<div class="scale-80">
		{@html svg}
	</div>
	<p class="mx-2 text-sm">{message}</p>
</button>
