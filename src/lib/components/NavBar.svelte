<script>
	import { onMount } from 'svelte';
	import { animate, splitText, stagger, spring, utils, svg } from 'animejs';

    /** @type {HTMLElement} */
	let titleNode;
	/** @type {import("animejs").TextSplitter} */
	let titleSplit;
	/** @type {HTMLElement} */
	let containerNode;

	/** @type {HTMLElement} */
	let idkLinkNode;
	/** @type {HTMLElement} */
	let menuLinkNode;

	/** @type {SVGPolygonElement} */
	let svgPath1;
	/** @type {SVGPolygonElement} */
	let svgPath2;

	const initAnime = () => {
		animate(containerNode, {
			opacity: [0, 1],
			x: [{ from: '-20rem', ease: 'outBounce', duration: 1145 }],
			duration: 1000
		});

		if (titleSplit) titleSplit.revert();

		titleSplit = splitText(titleNode, {
			words: { wrap: 'clip' },
			chars: true,
			debug: true // 保持你原有的 debug 设置
		});

		animate(titleSplit.words, {
			y: [{ to: ['100%', '0%'] }, { to: '-100%', delay: 1145, ease: 'in(3)' }],
			duration: 1145,
			ease: 'out(3)',
			delay: stagger(100),
			loop: true
		});

		// 使用绑定变量替代字符串选择器
		animate([idkLinkNode, menuLinkNode], {
			opacity: [0, 1],
			duration: 100,
			delay: stagger(100, { start: 1000 })
		});

		animate([idkLinkNode, menuLinkNode], {
			fontSize: [{ from: '2rem', to: '1rem' }],
			duration: 100,
			delay: stagger(100, { start: 1200 }),
			ease: spring({
				bounce: 0.15,
				duration: 300
			})
		});

		animate('.motion-svg', {
			rotate: [0, 180],
			duration: 5000,
			loop: true,
			ease: 'linear'
		});
	};

	onMount(() => {
		initAnime();

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

	const handleMouseEnter = () => {
		animate(containerNode, {
			height: '50vh',
			duration: 400,
			ease: 'outExpo'
		});

		animate(titleNode, {
			scale: 1.1,
			x: '8vw',
			y: '25vh',
			color: 'black',
			backgroundColor: 'var(--color-base-200)',
			duration: 400,
			ease: 'outExpo'
		});

		if (titleSplit && titleSplit.words[0]) {
			// @ts-ignore
			titleNode.children[1].style.overflow = 'visible';

			animate(titleSplit.words[0], {
				translateY: '-6vh',
				translateX: '4vw',
				scale: 1.4,
				color: 'var(--color-base-200)',
				duration: 400,
				ease: 'outExpo'
			});

			animate(titleSplit.words[1], {
				y: [{ to: ['100%', '0%'] }, { to: '-100%', delay: 500, ease: 'in(3)' }],
				duration: 500,
				ease: 'out(3)',
				delay: stagger(100),
				loop: true
			});

			animate(titleSplit.words[0], {
				rotate: ['-2deg', '2deg'],
				delay: stagger(100),
				ease: 'out(3)',
				loop: true,
				reversed: true,
				alternate: true
			});
		}

		animate(idkLinkNode, {
			y: '21vh',
			duration: 400,
			ease: 'outExpo',
			scale: 2
		});

		animate(menuLinkNode, {
			y: '24vh',
			x: '-5vw',
			duration: 400,
			ease: 'outExpo',
			scale: 2
		});
	};

	const handleMouseLeave = () => {
		animate(containerNode, {
			height: '3.125rem',
			duration: 600,
			ease: 'outElastic(1, .6)'
		});

		animate(titleNode, {
			scale: 1,
			x: '0vw',
			y: '0',
			color: 'var(--color-base-200)',
			backgroundColor: 'black',
			duration: 600,
			ease: 'outElastic(1, .6)'
		});

		if (titleSplit && titleSplit.words[0]) {
			// @ts-ignore
			titleNode.children[1].style.overflow = 'clip';

			animate(titleSplit.words[0], {
				translateY: '0vh',
				translateX: '0vw',
				scale: 1,
				duration: 400,
				ease: 'outExpo'
			});

			animate(titleSplit.words, {
				y: [{ to: ['100%', '0%'] }, { to: '-100%', delay: 1145, ease: 'in(3)' }],
				duration: 1145,
				ease: 'out(3)',
				delay: stagger(100),
				loop: true
			});

			animate(titleSplit.words[0], {
				rotate: 0
			});
		}

		animate(idkLinkNode, {
			y: '0vh',
			duration: 400,
			ease: 'outExpo',
			scale: 1
		});

		animate(menuLinkNode, {
			y: '0vh',
			x: '0vw',
			duration: 400,
			ease: 'outExpo',
			scale: 1
		});
	};

	function handleIDKAniEnter() {
		animate(idkLinkNode, {
			fontSize: '2.5rem',
			duration: 400,
			ease: 'outExpo'
		});
	}

	function handleIDKAniLeave() {
		animate(idkLinkNode, {
			fontSize: '1rem',
			duration: 400,
			ease: 'outExpo'
		});
	}

	function handleLinkAniEnter() {
		animate(menuLinkNode, {
			fontSize: '2.5rem',
			duration: 400,
			ease: 'outExpo'
		});
	}

	function handleLinkAniLeave() {
		animate(menuLinkNode, {
			fontSize: '1rem',
			duration: 400,
			ease: 'outExpo'
		});
	}

	// 辅助函数
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
</script>

<div
	bind:this={containerNode}
	onpointerenter={handleMouseEnter}
	onpointerleave={handleMouseLeave}
	class="grid-bg h-12.5 bg-black overflow-visible md:overflow-hidden z-10"
>
	<h1
		bind:this={titleNode}
		class="bbh-bartle-regular m-0 bg-black p-0 text-4xl md:text-5xl font-bold tracking-wide text-base-200"
	>
		SOOOOOUT BLOG
	</h1>

	<svg
		viewBox="0 0 304 112"
		class="motion-svg pointer-events-none absolute top-[10vh] -right-50 size-150 hidden md:block"
	>
		<g
			stroke-width="2"
			stroke="var(--color-base-200)"
			stroke-linejoin="round"
			fill="none"
			fill-rule="evenodd"
		>
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
</div>

<div class="justifty-end jetbrains-mono fixed top-auto md:top-0 right-0 h-full">
	<a
		bind:this={idkLinkNode}
		onpointerenter={handleIDKAniEnter}
		onpointerleave={handleIDKAniLeave}
		class="idk-link inline-block text-base-100/80"
		href="https://www.soout.top">IDK</a
	>
	<a
		bind:this={menuLinkNode}
		onpointerenter={handleLinkAniEnter}
		onpointerleave={handleLinkAniLeave}
		class="menu-link inline-block text-base-100/80"
		href="/">LINK</a
	>
</div>
