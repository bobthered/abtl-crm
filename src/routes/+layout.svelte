<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Header, Nav, Pwa, Title } from 'sveltewind/components';
	import { theme } from 'sveltewind/stores';
	import { sveltewind } from 'sveltewind/themes';
	import { twMerge } from 'tailwind-merge';
	import '../app.css';

	// props (internal)

	// props (reactive)
	$: navMap = new Map([['/create-interaction', 'Create Interaction']]);

	// set theme
	theme.set(sveltewind);
	theme.set({
		button: 'disabled:bg-slate-300 dark:disabled:bg-slate-700 dark:disabled:text-slate-400',
		header: 'bg-primary-500 text-white',
		modal: 'min-w-[0px]',
		nav: 'flex-row',
		overlay: 'hover:cursor-pointer',
		select: 'py-3',
		th: 'relative top-auto',
		thead: 'sticky top-0',
		tr: 'dark:even:bg-white/5 border-0'
	});
</script>

<Pwa>
	<link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
	<link rel="alternate icon" href="/icons/icon-16x16.png" />
	<link rel="apple-touch-icon" href="/icons/icon-apple-touch.png" />
	<link rel="manifest" href="/manifest.json" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
	/>
	<slot name="theme">
		<meta name="theme-color" content="#09090C" />
	</slot>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</Pwa>
<Title base="CRM" />
<div class="flex max-h-screen min-h-screen flex-col">
	<Header>
		<Nav>
			{#each [...navMap] as [href, label]}
				<a
					class={twMerge(
						'px-6 py-3 transition duration-200',
						$page.url.pathname === href ? 'bg-primary-600' : undefined
					)}
					{href}
				>
					{label}
				</a>
			{/each}
		</Nav>
	</Header>
	<div class="flex flex-grow flex-col overflow-y-auto">
		<slot></slot>
	</div>
</div>
