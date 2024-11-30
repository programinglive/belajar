<!-- Navbar -->
<nav class="bg-[#964B00] text-white">
	<div class="container mx-auto flex justify-between items-center px-6 py-4 md:px-12">
		<a href="#" class="text-2xl font-bold text-[#F7F7F7]">ProgramingLive</a>
		<div class="hidden md:flex">
			<button class="bg-[#964B00] px-4 py-2 rounded text-[#F7F7F7] hover:bg-[#783300]">Masuk</button>
			<button class="ml-2 bg-transparent border border-[#F7F7F7] px-4 py-2 rounded hover:bg-[#F7F7F7] hover:text-[#783300]">Daftar</button>
		</div>
		<!-- Drawer Toggle Button -->
		<div class="md:hidden">
			<button id="drawer-button" class="bg-[#964B00] px-4 py-2 rounded text-[#F7F7F7] hover:bg-[#783300]">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>
			</button>
		</div>
	</div>
	
	<!-- Drawer -->
	<div id="drawer" class="fixed inset-0 z-50 hidden bg-black bg-opacity-50">
		<div class="absolute top-0 right-0 w-3/4 max-w-sm bg-[#964B00] h-full shadow-lg">
			<div class="p-6">
				<button id="drawer-close" class="text-white hover:text-gray-300">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
			<div class="p-6 space-y-4">
				<button class="w-full bg-[#964B00] px-4 py-2 rounded text-[#F7F7F7] hover:bg-[#783300]">Masuk</button>
				<button class="w-full bg-transparent border border-[#F7F7F7] px-4 py-2 rounded hover:bg-[#F7F7F7] hover:text-[#783300]">Daftar</button>
			</div>
		</div>
	</div>
</nav>

@push('scripts')
	<!-- JavaScript -->
	<script>
		document.addEventListener('DOMContentLoaded', function () {
			const drawerButton = document.getElementById('drawer-button');
			const drawerClose = document.getElementById('drawer-close');
			const drawer = document.getElementById('drawer');

			// Open Drawer
			drawerButton.addEventListener('click', function () {
				drawer.classList.remove('hidden');
			});

			// Close Drawer
			drawerClose.addEventListener('click', function () {
				drawer.classList.add('hidden');
			});

			// Close Drawer on outside click
			drawer.addEventListener('click', function (event) {
				if (event.target === drawer) {
					drawer.classList.add('hidden');
				}
			});
		});
	</script>
@endpush