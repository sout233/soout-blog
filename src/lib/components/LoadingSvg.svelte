<script>
	import { animate, svg, utils } from 'animejs';
	import { onMount } from 'svelte';

	let { className = '', strokeColor = 'var(--color-base-200)' } = $props();

	/** @type {SVGPolygonElement} */
	let svgPath1;
	/** @type {SVGPolygonElement} */
	let svgPath2;

	onMount(() => {
		function generatePoints() {
			const total = utils.random(4, 64);
			const r1 = utils.random(4, 56);
			const r2 = 56;
			const isOdd = (/** @type {number} */ n) => n % 2;
			let points = '';
			for (let i = 0, l = isOdd(total) ? total + 1 : total; i < l; i++) {
				const r = isOdd(i) ? r1 : r2;
				const a = (2 * Math.PI * i) / l - Math.PI / 2;
				const x = 152 + utils.round(r * Math.cos(a), 0);
				const y = 56 + utils.round(r * Math.sin(a), 0);
				points += `${x},${y} `;
			}
			return points;
		}

		function animateRandomPoints() {
			// 安全检查
			if (!svgPath1 || !svgPath2) return;

			utils.set(svgPath2, { points: generatePoints() });

			animate(svgPath1, {
				points: svg.morphTo(svgPath2),
				ease: 'inOutCirc',
				duration: 500,
				onComplete: animateRandomPoints
			});
		}

		animateRandomPoints();
	});
</script>

<svg viewBox="0 0 304 112" class={['motion-svg pointer-events-none ', className]}>
	<g stroke-width="2" stroke={strokeColor} stroke-linejoin="round" fill="none" fill-rule="evenodd">
		<polygon
			bind:this={svgPath1}
			id="path-1"
			points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
		></polygon>
		<polygon
			bind:this={svgPath2}
			style="opacity: 0"
			id="path-2"
			points="152,4 170,38 204,56 170,74 152,108 134,74 100,56 134,38"
		></polygon>
	</g>
</svg>
