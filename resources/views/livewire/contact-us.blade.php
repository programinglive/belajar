<div class="bg-[#f4ede4] text-[#4b3621] font-serif min-h-screen flex items-center justify-center border-t-8 border-[#4b3621]">
	<div class="container mx-auto p-4 md:p-6 max-w-md">
		<h1 class="text-2xl md:text-3xl font-bold text-center">Hubungi Kami</h1>
		<p class="mt-4 text-lg md:text-xl text-center">Kami senang mendengar dari Anda.</p>
		<div class="border-2 border-[#4b3621] p-4 rounded-md">
			<form class="mt-6" method="POST">
				@csrf
				<div class="grid grid-cols-1 gap-4">
					<div>
						<label for="name" class="block mb-2 text-lg">Nama</label>
						<input type="text" name="name" id="name" class="block w-full px-4 py-2 text-lg rounded-md border-2 border-[#4b3621] focus:outline-none focus:ring-2 focus:ring-[#4b3621] focus:border-transparent" required>
					</div>
					<div>
						<label for="email" class="block mb-2 text-lg">Email</label>
						<input type="email" name="email" id="email" class="block w-full px-4 py-2 text-lg rounded-md border-2 border-[#4b3621] focus:outline-none focus:ring-2 focus:ring-[#4b3621] focus:border-transparent" required>
					</div>
					<div>
						<label for="message" class="block mb-2 text-lg">Pesan</label>
						<textarea name="message" id="message" class="block w-full px-4 py-2 text-lg rounded-md border-2 border-[#4b3621] focus:outline-none focus:ring-2 focus:ring-[#4b3621] focus:border-transparent" required></textarea>
					</div>
					<div class="mt-4 text-center">
						<button type="submit" class="bg-[#4b3621] text-[#f4ede4] px-6 py-2 rounded-md font-bold hover:bg-[#783300]">Kirim</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>